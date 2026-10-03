# VecraHost Provisioning Service

Automated VPS provisioning pipeline for Contabo, branded as VecraHost.

## Features

- **Automated VPS Creation**: Create VPS on Contabo via API
- **Server Configuration**: SSH-based server setup (user creation, firewall, packages)
- **DNS Management**: Create A records and reverse DNS for provisioned servers
- **Credential Generation**: Secure credential generation and encrypted storage
- **Credential Delivery**: 24-hour expiring download links for client credentials
- **Audit Logging**: Complete audit trail of all provisioning events
- **Error Handling**: Rollback capability on provision failure

## Architecture

```
Trigger (Admin API)
    ↓
Contabo API Call (Create VPS)
    ↓
Wait for IP Assignment
    ↓
Server Configuration (SSH)
    ↓
DNS Setup (A record + Reverse DNS)
    ↓
Generate Credentials
    ↓
Create Download Link
    ↓
Send Welcome Email
    ↓
Log Completion
```

## Installation

```bash
cd server/provisioning
npm install
```

## Configuration

Create `.env` file:

```env
# Contabo API (from vault in production)
CONTABO_API_KEY=your_api_key_here
CONTABO_REGION=eu  # eu, us, ap

# Vault Configuration
VAULT_TYPE=mock  # mock, aws-secrets-manager, hashicorp-vault
VAULT_ENCRYPTION_KEY=your_encryption_key_32_bytes_long

# DNS Configuration
DNS_PROVIDER=mock  # mock, route53, linode
DNS_ZONE=vecrahost.in

# Logging
LOG_PROVIDER=mock  # mock, cloudwatch, datadog, file
NODE_ENV=development
```

## Usage

### Direct API Call

```javascript
import Provisioner from './lib/provisioner.js';

const provisioner = new Provisioner({
  contaboApiKey: process.env.CONTABO_API_KEY,
  vaultType: 'mock',
  dnsProvider: 'mock',
});

const result = await provisioner.provision({
  clientId: 'customer-123',
  planTier: 'pro',
  hostname: 'client.vecrahost.in',
  billingCycle: 'monthly',
  clientEmail: 'customer@example.com',
});

console.log('Provision ID:', result.provisionId);
console.log('IP Address:', result.ipAddress);
```

### Express Integration

```javascript
import express from 'express';
import ProvisioningApi from './lib/api.js';

const app = express();
const api = new ProvisioningApi({
  contaboApiKey: process.env.CONTABO_API_KEY,
  vaultType: 'mock',
  dnsProvider: 'mock',
});

api.attachToApp(app);
app.listen(3000);

// POST /api/v1/provision
// GET /api/v1/provision/:provisionId/status
// GET /api/v1/credentials/download/:credentialId
// GET /api/v1/client/:clientId/provisions
```

### AWS Lambda

```javascript
import ProvisioningApi from './lib/api.js';

const api = new ProvisioningApi({
  contaboApiKey: process.env.CONTABO_API_KEY,
  vaultType: 'aws-secrets-manager',
  dnsProvider: 'route53',
});

export const handler = api.getLambdaHandler();
```

## API Endpoints

### POST /api/v1/provision

Request:
```json
{
  "clientId": "cust-123",
  "planTier": "pro",
  "hostname": "optional-hostname.vecrahost.in",
  "domain": "optional-custom-domain.com",
  "billingCycle": "monthly",
  "clientEmail": "customer@example.com"
}
```

Response (202 Accepted):
```json
{
  "provisionId": "prov_1696...",
  "status": "provisioning_started",
  "statusUrl": "/api/v1/provision/prov_1696.../status"
}
```

### GET /api/v1/provision/:provisionId/status

Response:
```json
{
  "provisionId": "prov_1696...",
  "status": "provision_completed",
  "events": [
    { "event": "provision_initiated", "timestamp": "..." },
    { "event": "contabo_instance_created", "timestamp": "..." },
    ...
  ],
  "lastUpdate": "2026-10-03T10:30:00Z"
}
```

### GET /api/v1/credentials/download/:credentialId

Downloads credentials JSON file with 24-hour expiring token.

## Plan Tiers

| Tier | vCPU | RAM | Storage | Price/mo |
|------|------|-----|---------|----------|
| Starter | 2 | 4GB | 50GB | ₹399 (TBD) |
| Pro | 4 | 8GB | 100GB | ₹799 (TBD) |
| Enterprise | 6 | 16GB | 200GB | ₹1499 (TBD) |

*Prices pending CEO approval*

## Security Notes

### Credential Isolation
- Root Contabo API key stored in vault (AWS Secrets Manager / HashiCorp Vault)
- Each client gets scoped API sub-account (when Contabo API supports it)
- Client credentials encrypted at rest (AES-256) and in transit (TLS 1.3)
- Credentials never logged or exposed in audit trail

### Access Control
- All provision requests require authentication (TBD: auth method)
- Service account runs provisioning (no root/admin access)
- Per-client scoped API keys (read-only access to their own VPS)
- Credential downloads require signed, expiring token

### Audit Trail
- All events logged with timestamp and actor
- Accessible via CloudWatch, Datadog, or local logs
- 90-day retention (configurable)
- Encrypted storage for sensitive fields

## TODO / Implementation Phases

### Phase 1: Core Pipeline (Current)
- [x] Design architecture
- [x] Contabo API client wrapper
- [x] Vault client (AWS Secrets Manager, HashiCorp Vault)
- [x] DNS client (Route53, Linode)
- [x] Credential generation & encryption
- [x] Main provisioner orchestrator
- [x] Audit logging framework
- [x] API handler (Express/Lambda)
- [ ] SSH server configuration script
- [ ] Email sending integration (SES/SendGrid)
- [ ] Testing (unit, integration, e2e)

### Phase 2: Infrastructure Setup (Parallel - VEC-18)
- [ ] Set up AWS Secrets Manager or HashiCorp Vault
- [ ] Set up DNS provider (Route53, Linode, etc)
- [ ] Configure Contabo API credentials
- [ ] Set up CloudWatch/Datadog logging
- [ ] Deploy provisioning service (Lambda, EC2, containerized)

### Phase 3: Client Integration
- [ ] Admin dashboard for triggering provisions
- [ ] Client dashboard to view VPS list
- [ ] Credentials management UI
- [ ] VPS management actions (reboot, resize, delete)

### Phase 4: Operations
- [ ] Monitoring and alerts
- [ ] Health checks and auto-recovery
- [ ] Billing integration
- [ ] Auto-renewal logic
- [ ] Cleanup jobs (stale credentials, old logs)

## Testing

```bash
# Run all tests
npm test

# Run specific test
npm test -- tests/provisioner.test.js

# Run with coverage
npm test -- --coverage
```

Mock mode enabled for testing:
- Contabo client: simulated API responses
- Vault: in-memory encrypted storage
- DNS: simulated record creation
- Logging: in-memory event store

## Production Deployment

1. **Environment Setup**
   - AWS Secrets Manager with Contabo API key
   - Route53 or Linode DNS configured
   - CloudWatch or Datadog connected

2. **Service Deployment**
   - Lambda function (serverless, auto-scaling)
   - Or containerized (ECS, Docker)
   - Or traditional (EC2 with auto-scaling)

3. **Configuration**
   - Set `VAULT_TYPE=aws-secrets-manager`
   - Set `DNS_PROVIDER=route53`
   - Set `LOG_PROVIDER=cloudwatch`

4. **Monitoring**
   - CloudWatch metrics for provision count, duration, success rate
   - Alarms for failed provisions
   - Dashboard for operational visibility

## Support

For provisioning issues, check:
1. Provision status endpoint: `/api/v1/provision/:provisionId/status`
2. Audit logs in CloudWatch or Datadog
3. Vault logs for credential access audit trail

## License

VecraHost Internal - 2026
