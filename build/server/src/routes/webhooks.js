// Webhook routes cho SePay integration
import express from 'express';
import * as webhookController from '../controllers/webhookController.js';
import { verifySePayWebhook } from '../controllers/webhookController.js';

const router = express.Router();

// SePay webhook endpoint
router.post('/sepay-payment', verifySePayWebhook, webhookController.handleSePayWebhook);

// Test webhook endpoint
router.post('/test', webhookController.testWebhook);

// Webhook logs management
router.get('/logs', webhookController.getWebhookLogs);

export default router;
