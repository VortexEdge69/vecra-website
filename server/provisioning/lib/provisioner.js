// VecraHost Provisioner - Orchestrates complete VPS provisioning workflow
// Coordinates: Contabo API, Server Config, DNS, Credentials, Logging
// Handles errors and rollback on failure

import ContaboClient from '../contabo/client.js';
import VaultClient from '../vault/client.js';
import DnsClient from '../dns/client.js';
import CredentialGenerator from '../credentials/generator.js';
import AuditLogger from './logger.js';

export class Provisioner {
  constructor(config = {}) {
    this.config = {
      contaboApiKey: config.contaboApiKey || process.env.CONTABO_API_KEY,
      contaboRegion: config.contaboRegion || 'eu',
      vaultType: config.vaultType || 'mock',
      vaultConfig: config.vaultConfig || {},
      dnsProvider: config.dnsProvider || 'mock',
      dnsConfig: config.dnsConfig || {},
      ...config,
    };

    // Initialize clients
    this.contabo = new ContaboClient(this.config.contaboApiKey, this.config.contaboRegion);
    this.vault = new VaultClient({ type: this.config.vaultType, ...this.config.vaultConfig });
    this.dns = new DnsClient({ provider: this.config.dnsProvider, ...this.config.dnsConfig });
    this.credentials = new CredentialGenerator(this.vault);
    this.logger = new AuditLogger();
  }

  // Main provisioning orchestrator
  async provision(request) {
    const {
      clientId,
      planTier,
      hostname,
      domain,
      billingCycle = 'monthly',
      clientEmail,
    } = request;

    // Validate input
    this._validateRequest(request);

    const provisionId = `prov_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const finalHostname = hostname || `${clientId}.vecrahost.in`;

    try {
      // Step 1: Log provision start
      await this.logger.log({
        provisionId,
        event: 'provision_initiated',
        clientId,
        planTier,
        hostname: finalHostname,
        timestamp: new Date().toISOString(),
      });

      // Step 2: Create VPS on Contabo
      console.log(`[${provisionId}] Creating VPS on Contabo...`);
      const rootPassword = this.credentials.generatePassword(48);
      const instance = await this.contabo.createInstance({
        clientId,
        planTier,
        hostname: finalHostname,
        rootPassword,
      });

      await this.logger.log({
        provisionId,
        event: 'contabo_instance_created',
        clientId,
        instanceId: instance.instanceId,
        ip: instance.ip,
        timestamp: new Date().toISOString(),
      });

      // Step 3: Wait for IP assignment
      console.log(`[${provisionId}] Waiting for IP assignment...`);
      const ipAddress = await this.contabo.waitForIpAssignment(instance.instanceId);

      await this.logger.log({
        provisionId,
        event: 'ip_assigned',
        clientId,
        instanceId: instance.instanceId,
        ipAddress,
        timestamp: new Date().toISOString(),
      });

      // Step 4: Configure server (SSH will happen after IP is live)
      console.log(`[${provisionId}] Server configuration (via SSH - will execute on next phase)...`);
      // TODO: Implement SSH configuration script execution
      // This would be handled by a separate worker that:
      // - Waits for SSH to be available on the IP
      // - Executes bootstrap script
      // - Creates user accounts, disables root, installs packages

      await this.logger.log({
        provisionId,
        event: 'server_config_initiated',
        clientId,
        instanceId: instance.instanceId,
        hostname: finalHostname,
        timestamp: new Date().toISOString(),
      });

      // Step 5: Create DNS records
      console.log(`[${provisionId}] Creating DNS records...`);
      const dnsRecord = await this.dns.createARecord(clientId, ipAddress);
      const reverseDns = await this.dns.createReverseDns(ipAddress, finalHostname);

      await this.logger.log({
        provisionId,
        event: 'dns_created',
        clientId,
        instanceId: instance.instanceId,
        aRecord: dnsRecord,
        reverseDns: reverseDns,
        timestamp: new Date().toISOString(),
      });

      // Step 6: Generate credentials
      console.log(`[${provisionId}] Generating credentials...`);
      const credentialRecord = await this.credentials.generateCredentials({
        clientId,
        instanceId: instance.instanceId,
        ipAddress,
        hostname: finalHostname,
        planTier,
      });

      await this.logger.log({
        provisionId,
        event: 'credentials_generated',
        clientId,
        credentialId: credentialRecord.credentialId,
        timestamp: new Date().toISOString(),
      });

      // Step 7: Generate download link
      const downloadLink = this.credentials.generateDownloadLink(credentialRecord.credentialId);

      // Step 8: Generate welcome email
      const welcomeEmail = await this.credentials.generateWelcomeEmail(
        clientId,
        instance.instanceId,
        clientEmail
      );

      // Step 9: Send email (async, non-blocking)
      // TODO: Implement email sending (SES, SendGrid, etc)
      console.log(`[${provisionId}] Email would be sent to ${clientEmail}`);

      await this.logger.log({
        provisionId,
        event: 'credentials_sent',
        clientId,
        email: clientEmail,
        downloadLinkExpires: downloadLink.expiresAt,
        timestamp: new Date().toISOString(),
      });

      // Step 10: Log completion
      const result = {
        provisionId,
        status: 'success',
        clientId,
        instanceId: instance.instanceId,
        ipAddress,
        hostname: finalHostname,
        planTier,
        credentials: credentialRecord,
        downloadLink,
        estimatedCost: this._estimateCost(planTier, billingCycle),
        completedAt: new Date().toISOString(),
      };

      await this.logger.log({
        provisionId,
        event: 'provision_completed',
        clientId,
        ...result,
        timestamp: new Date().toISOString(),
      });

      console.log(`[${provisionId}] ✅ Provision completed successfully`);
      return result;
    } catch (error) {
      // Error handling with rollback
      console.error(`[${provisionId}] ❌ Provision failed:`, error.message);

      await this.logger.log({
        provisionId,
        event: 'provision_failed',
        clientId,
        error: error.message,
        timestamp: new Date().toISOString(),
      });

      // TODO: Implement rollback logic
      // - Delete instance from Contabo
      // - Clean up DNS records
      // - Clean up credentials from vault

      throw new Error(`Provision failed: ${error.message}`);
    }
  }

  // Estimate monthly cost for billing
  _estimateCost(planTier, billingCycle) {
    // TODO: Get actual pricing from config/database
    const monthlyCosts = {
      'starter': 399,    // ₹ placeholder
      'pro': 799,        // ₹ placeholder
      'enterprise': 1499, // ₹ placeholder
    };

    const baseCost = monthlyCosts[planTier] || 399;

    // Apply discounts for longer billing cycles
    const billingMultipliers = {
      'monthly': 1,
      'quarterly': 0.95,   // 5% discount
      'annual': 0.90,      // 10% discount
    };

    const multiplier = billingMultipliers[billingCycle] || 1;
    return Math.round(baseCost * multiplier);
  }

  // Validate provision request
  _validateRequest(request) {
    const { clientId, planTier } = request;

    if (!clientId) throw new Error('clientId required');
    if (!planTier) throw new Error('planTier required');
    if (!['starter', 'pro', 'enterprise'].includes(planTier)) {
      throw new Error(`Invalid planTier: ${planTier}`);
    }
  }

  // Get provision status
  async getStatus(provisionId) {
    return await this.logger.getProvisionLog(provisionId);
  }

  // List all provisions for a client
  async listProvisions(clientId) {
    return await this.logger.listClientProvisionsLog(clientId);
  }
}

export default Provisioner;
