// Contabo API Client - Wrapper for VPS provisioning
// Uses root API key stored in vault (Secrets Manager / HashiCorp Vault)
// Handles all communication with Contabo API for VPS creation and management

import axios from 'axios';

const CONTABO_API_BASE = 'https://api.contabo.com/v1';
const CONTABO_REGIONS = {
  'eu': 'ctto', // EU (Germany)
  'us': 'usw',  // US West
  'ap': 'sgp',  // Asia Pacific
};

const PLAN_MAPPING = {
  'starter': { productId: 'V22', specs: { cpu: 2, ram: 4, storage: 50 } },
  'pro': { productId: 'V25', specs: { cpu: 4, ram: 8, storage: 100 } },
  'enterprise': { productId: 'V26', specs: { cpu: 6, ram: 16, storage: 200 } },
};

export class ContaboClient {
  constructor(apiKey, region = 'eu') {
    if (!apiKey) {
      throw new Error('Contabo API key required (from vault)');
    }
    this.apiKey = apiKey;
    this.region = CONTABO_REGIONS[region] || CONTABO_REGIONS.eu;
    this.client = axios.create({
      baseURL: CONTABO_API_BASE,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });
  }

  // Create a new VPS on Contabo
  // Returns: { instanceId, ip, hostname, status }
  async createInstance(config) {
    const { clientId, planTier, hostname, rootPassword, labels = [] } = config;

    if (!PLAN_MAPPING[planTier]) {
      throw new Error(`Invalid plan tier: ${planTier}`);
    }

    const plan = PLAN_MAPPING[planTier];
    const timestamp = new Date().toISOString();

    const payload = {
      imageId: 'ubuntu-22-04-x64', // Ubuntu 22.04 LTS x64
      productId: plan.productId,
      region: this.region,
      period: 'P1M', // Monthly billing
      hostname: hostname,
      rootPassword: rootPassword,
      labels: ['vecrahost', `client_id:${clientId}`, `tier:${planTier}`, ...labels],
      sshKeys: [], // Client will be added after provision
    };

    try {
      const response = await this.client.post('/compute/instances', payload);
      const instance = response.data.data;

      return {
        instanceId: instance.instanceId,
        ip: instance.publicIpv4?.ip || null, // May be null initially
        hostname: instance.hostname,
        status: instance.status,
        region: instance.region,
        specs: plan.specs,
        createdAt: timestamp,
      };
    } catch (error) {
      throw new Error(`Contabo API error: ${error.response?.data?.message || error.message}`);
    }
  }

  // Poll for IP assignment
  // Contabo takes time to assign IP, need to wait and retry
  async waitForIpAssignment(instanceId, maxWaitSeconds = 300) {
    const startTime = Date.now();
    const pollInterval = 5000; // 5 second intervals

    while (Date.now() - startTime < maxWaitSeconds * 1000) {
      try {
        const instance = await this.getInstanceDetails(instanceId);

        if (instance.ip) {
          return instance.ip;
        }

        await new Promise(resolve => setTimeout(resolve, pollInterval));
      } catch (error) {
        // Continue polling on error
        await new Promise(resolve => setTimeout(resolve, pollInterval));
      }
    }

    throw new Error(`IP assignment timeout for instance ${instanceId} after ${maxWaitSeconds}s`);
  }

  // Get instance details
  async getInstanceDetails(instanceId) {
    try {
      const response = await this.client.get(`/compute/instances/${instanceId}`);
      const instance = response.data.data;

      return {
        instanceId: instance.instanceId,
        ip: instance.publicIpv4?.ip || null,
        hostname: instance.hostname,
        status: instance.status,
        region: instance.region,
        createdAt: instance.createdDate,
      };
    } catch (error) {
      throw new Error(`Failed to fetch instance ${instanceId}: ${error.message}`);
    }
  }

  // List all instances (for tracking/management)
  async listInstances(filter = {}) {
    try {
      const params = new URLSearchParams();
      if (filter.label) params.append('label', filter.label);
      if (filter.status) params.append('status', filter.status);

      const response = await this.client.get('/compute/instances', { params });
      return response.data.data || [];
    } catch (error) {
      throw new Error(`Failed to list instances: ${error.message}`);
    }
  }

  // Create sub-account API key for client (scoped to their VPS only)
  // Note: This requires Contabo to support sub-account creation via API
  // Current implementation: placeholder for future implementation
  async createClientApiKey(instanceId, clientId) {
    // TODO: Implement when Contabo API supports sub-account/API key creation
    // For now, return error and require manual creation
    throw new Error(
      'Sub-account API key creation not yet implemented. ' +
      'Manual creation in Contabo panel required or wait for API update.'
    );

    /* Expected payload when API is available:
    const payload = {
      name: `client_${clientId}`,
      instanceId: instanceId,
      permissions: ['read', 'restart', 'stop'], // Limited permissions
    };
    */
  }

  // Reboot an instance
  async rebootInstance(instanceId) {
    try {
      await this.client.post(`/compute/instances/${instanceId}/actions/restart`);
      return { success: true, message: `Rebooting instance ${instanceId}` };
    } catch (error) {
      throw new Error(`Failed to reboot instance: ${error.message}`);
    }
  }

  // Delete/terminate an instance (for rollback on provision failure)
  async deleteInstance(instanceId) {
    try {
      await this.client.delete(`/compute/instances/${instanceId}`);
      return { success: true, message: `Deleted instance ${instanceId}` };
    } catch (error) {
      throw new Error(`Failed to delete instance: ${error.message}`);
    }
  }
}

export default ContaboClient;
