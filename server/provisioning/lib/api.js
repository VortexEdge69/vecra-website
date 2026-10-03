// Provisioning API Handler - Express/Lambda handler for provision requests
// Handles: Provision requests, status checks, credential downloads

import Provisioner from './provisioner.js';

export class ProvisioningApi {
  constructor(config = {}) {
    this.provisioner = new Provisioner(config);
    this.activeProvisionsStore = new Map(); // Track in-progress provisions
  }

  // POST /api/v1/provision
  // Create a new VPS provision
  async handleProvisionRequest(req, res) {
    try {
      const request = req.body || req.data;

      // Validate request
      if (!request.clientId) {
        return res.status(400).json({ error: 'clientId required' });
      }
      if (!request.planTier) {
        return res.status(400).json({ error: 'planTier required' });
      }

      // Check if client already has provision in progress
      const clientKey = `${request.clientId}:${request.planTier}`;
      if (this.activeProvisionsStore.has(clientKey)) {
        return res.status(409).json({
          error: 'Provision already in progress for this client/plan combination',
          activeProvisionId: this.activeProvisionsStore.get(clientKey),
        });
      }

      // Start async provision
      const provisionId = `prov_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      this.activeProvisionsStore.set(clientKey, provisionId);

      // Return immediately with provision ID (async process)
      res.status(202).json({
        provisionId,
        status: 'provisioning_started',
        statusUrl: `/api/v1/provision/${provisionId}/status`,
        message: 'Provision initiated. Check status at statusUrl.',
      });

      // Run provision in background
      this.provisioner.provision(request)
        .then(result => {
          this.activeProvisionsStore.delete(clientKey);
          console.log(`[${provisionId}] Provision completed:`, result);
        })
        .catch(error => {
          this.activeProvisionsStore.delete(clientKey);
          console.error(`[${provisionId}] Provision failed:`, error);
        });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // GET /api/v1/provision/:provisionId/status
  // Check provision status
  async handleStatusRequest(req, res) {
    try {
      const { provisionId } = req.params;
      const logs = await this.provisioner.getStatus(provisionId);

      if (!logs || logs.length === 0) {
        return res.status(404).json({ error: 'Provision not found' });
      }

      const latestEvent = logs[logs.length - 1];
      res.json({
        provisionId,
        status: latestEvent.event,
        events: logs,
        lastUpdate: latestEvent.timestamp,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // GET /api/v1/credentials/download/:credentialId
  // Download credentials (24-hour expiring link)
  async handleCredentialDownload(req, res) {
    try {
      const { credentialId } = req.params;
      const { token } = req.query;

      if (!token) {
        return res.status(400).json({ error: 'token required' });
      }

      // TODO: Validate token expiration and download limit
      // For now, assuming token is valid

      // Get credentials from vault
      // TODO: Lookup credentialId to find clientId and instanceId
      // const { clientId, instanceId } = await lookupCredential(credentialId);
      // const content = await provisioner.credentials.packageCredentialsForDownload(clientId, instanceId);

      const mockContent = JSON.stringify({
        message: 'Credential download implemented after CEO approval of infrastructure setup',
      });

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="vecrahost-credentials-${credentialId}.json"`);
      res.send(mockContent);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // GET /api/v1/client/:clientId/provisions
  // List all provisions for a client
  async handleListProvisions(req, res) {
    try {
      const { clientId } = req.params;
      const provisions = await this.provisioner.listProvisions(clientId);

      res.json({
        clientId,
        provisions,
        count: provisions.length,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Attach to Express app
  attachToApp(app) {
    app.post('/api/v1/provision', (req, res) => this.handleProvisionRequest(req, res));
    app.get('/api/v1/provision/:provisionId/status', (req, res) => this.handleStatusRequest(req, res));
    app.get('/api/v1/credentials/download/:credentialId', (req, res) => this.handleCredentialDownload(req, res));
    app.get('/api/v1/client/:clientId/provisions', (req, res) => this.handleListProvisions(req, res));
  }

  // Attach to Lambda handler
  getLambdaHandler() {
    return async (event, context) => {
      const method = event.requestContext.http.method;
      const path = event.rawPath;

      if (method === 'POST' && path === '/api/v1/provision') {
        return await this._lambdaProvisionRequest(event);
      }
      if (method === 'GET' && path.match(/\/api\/v1\/provision\/[^/]+\/status/)) {
        return await this._lambdaStatusRequest(event);
      }

      return { statusCode: 404, body: JSON.stringify({ error: 'Not found' }) };
    };
  }

  async _lambdaProvisionRequest(event) {
    const req = { body: JSON.parse(event.body) };
    const res = {
      status: (code) => {
        res.statusCode = code;
        return res;
      },
      json: (data) => {
        res.body = JSON.stringify(data);
      },
    };

    await this.handleProvisionRequest(req, res);

    return {
      statusCode: res.statusCode,
      body: res.body,
      headers: { 'Content-Type': 'application/json' },
    };
  }

  async _lambdaStatusRequest(event) {
    const provisionId = event.rawPath.split('/')[4];
    const req = { params: { provisionId } };
    const res = {
      status: (code) => {
        res.statusCode = code;
        return res;
      },
      json: (data) => {
        res.body = JSON.stringify(data);
      },
    };

    await this.handleStatusRequest(req, res);

    return {
      statusCode: res.statusCode,
      body: res.body,
      headers: { 'Content-Type': 'application/json' },
    };
  }
}

export default ProvisioningApi;
