// Credential Generator - Creates and encrypts credentials for provisioned VPS
// Generates: SSH keys, passwords, API tokens
// Encrypts and stores in vault, generates secure download links

import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

export class CredentialGenerator {
  constructor(vaultClient) {
    this.vault = vaultClient;
  }

  // Generate a secure random password
  generatePassword(length = 32) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  // Generate RSA SSH key pair
  generateSshKeyPair() {
    // TODO: Use node's crypto module or ssh-keygen
    // For now, return placeholder that would be replaced with actual implementation
    const privateKey = crypto.randomBytes(32).toString('base64');
    const publicKey = crypto.randomBytes(32).toString('base64');

    return {
      privateKey: `-----BEGIN RSA PRIVATE KEY-----\n${privateKey}\n-----END RSA PRIVATE KEY-----`,
      publicKey: `ssh-rsa ${publicKey} vecrahost@provision`,
      fingerprint: crypto.createHash('sha256').update(publicKey).digest('hex'),
    };
  }

  // Create a complete credential set for a provisioned instance
  async generateCredentials(config) {
    const {
      clientId,
      instanceId,
      ipAddress,
      hostname,
      planTier,
      adminUsername = 'vecrahost-admin',
    } = config;

    const credentials = {
      clientId,
      instanceId,
      ipAddress,
      hostname,
      planTier,
      adminUsername,
      adminPassword: this.generatePassword(),
      rootPassword: this.generatePassword(48), // Longer root password
      sshKeyPair: this.generateSshKeyPair(),
      // TODO: Add when Contabo API supports sub-account creation
      // contaboApiKey: await this._generateContaboApiKey(instanceId, clientId),
      // contaboApiSecret: this.generatePassword(48),
      generatedAt: new Date().toISOString(),
      credentialId: uuid(),
    };

    // Store in vault (encrypted)
    const vaultPath = `clients/${clientId}/instances/${instanceId}`;
    await this.vault.putSecret(vaultPath, JSON.stringify(credentials));

    // Return redacted version (without sensitive data for logging)
    return {
      credentialId: credentials.credentialId,
      clientId,
      instanceId,
      ipAddress,
      hostname,
      adminUsername,
      sshKeyFingerprint: credentials.sshKeyPair.fingerprint,
      storedAt: vaultPath,
      generatedAt: credentials.generatedAt,
    };
  }

  // Retrieve credentials from vault
  async getCredentials(clientId, instanceId) {
    const vaultPath = `clients/${clientId}/instances/${instanceId}`;
    const stored = await this.vault.getSecret(vaultPath);
    await this.vault.logAccess(vaultPath, 'read');
    return JSON.parse(stored);
  }

  // Generate a secure, temporary download link for credentials
  // Link expires after 24 hours and can only be used once
  generateDownloadLink(credentialId) {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    const token = crypto.randomBytes(32).toString('hex');

    return {
      token,
      url: `/api/v1/credentials/download/${credentialId}?token=${token}`,
      expiresAt,
      maxDownloads: 1,
    };
  }

  // Package credentials for delivery (as JSON file content)
  async packageCredentialsForDownload(clientId, instanceId) {
    const credentials = await this.getCredentials(clientId, instanceId);

    const packageData = {
      title: 'VecraHost VPS Credentials',
      generatedAt: credentials.generatedAt,
      credentialId: credentials.credentialId,
      instance: {
        hostname: credentials.hostname,
        ipAddress: credentials.ipAddress,
        planTier: credentials.planTier,
      },
      access: {
        username: credentials.adminUsername,
        password: credentials.adminPassword,
        sshPrivateKey: credentials.sshKeyPair.privateKey,
      },
      support: {
        email: 'support@vecrahost.in',
        documentation: 'https://docs.vecrahost.in/vps-setup',
        dashboard: 'https://dashboard.vecrahost.in',
      },
      security: {
        note: 'Keep these credentials secure. Do not share or commit to version control.',
        rootPassword: credentials.rootPassword,
        sshKeyFingerprint: credentials.sshKeyPair.fingerprint,
      },
    };

    return JSON.stringify(packageData, null, 2);
  }

  // Generate welcome email content
  async generateWelcomeEmail(clientId, instanceId, clientEmail) {
    const credentials = await this.getCredentials(clientId, instanceId);

    return {
      to: clientEmail,
      subject: `Your VecraHost VPS is Ready - ${credentials.hostname}`,
      html: `
        <h1>Welcome to VecraHost!</h1>
        <p>Your VPS has been successfully provisioned and is ready to use.</p>

        <h2>Server Details</h2>
        <ul>
          <li><strong>Hostname:</strong> ${credentials.hostname}</li>
          <li><strong>IP Address:</strong> ${credentials.ipAddress}</li>
          <li><strong>Plan:</strong> ${credentials.planTier}</li>
        </ul>

        <h2>Access Your Server</h2>
        <p><strong>SSH Access:</strong></p>
        <code>ssh ${credentials.adminUsername}@${credentials.ipAddress}</code>

        <h2>Download Your Credentials</h2>
        <p>
          <strong>⚠️ Important:</strong>
          Your credentials are available for download for the next 24 hours.
          After that, you can reset your password through the VecraHost dashboard.
        </p>
        <p><a href="https://dashboard.vecrahost.in/credentials/${credentials.credentialId}">Download Credentials</a></p>

        <h2>Next Steps</h2>
        <ol>
          <li>Download your credentials immediately</li>
          <li>Log in via SSH using the provided credentials</li>
          <li>Change the default password for security</li>
          <li>Configure your firewall and security settings</li>
          <li>Deploy your application</li>
        </ol>

        <h2>Support</h2>
        <p>Need help? Visit our documentation or contact support@vecrahost.in</p>
      `,
      text: `
Welcome to VecraHost!

Your VPS has been successfully provisioned.

Server Details:
- Hostname: ${credentials.hostname}
- IP Address: ${credentials.ipAddress}
- Plan: ${credentials.planTier}

Access your server via SSH:
ssh ${credentials.adminUsername}@${credentials.ipAddress}

Download your credentials at:
https://dashboard.vecrahost.in/credentials/${credentials.credentialId}

⚠️ Credentials available for 24 hours only. Download immediately!

Support: support@vecrahost.in
      `,
    };
  }

  // Rotate client API key (quarterly or on demand)
  async rotateApiKey(clientId, instanceId) {
    // TODO: Implement when Contabo supports API key rotation
    const credentials = await this.getCredentials(clientId, instanceId);
    // const newApiKey = this.generatePassword(48);
    // await vault.putSecret(`clients/${clientId}/instances/${instanceId}/api_key`, newApiKey);
    // return { success: true, rotatedAt: new Date() };
    throw new Error('API key rotation not yet implemented');
  }

  // ===== Internal Helpers =====

  async _generateContaboApiKey(instanceId, clientId) {
    // TODO: Implement when Contabo API supports sub-account creation
    // For now, return placeholder requiring manual creation
    return `TODO_CONTABO_APIKEY_${clientId}_${instanceId}`;
  }
}

export default CredentialGenerator;
