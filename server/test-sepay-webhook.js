// Script test webhook SePay cho inkverse.online
import axios from 'axios';

const BASE_URL = 'https://inkverse.online';
const WEBHOOK_URL = `${BASE_URL}/api/webhooks/sepay-payment`;
const TEST_URL = `${BASE_URL}/api/webhooks/test`;

// Test data mẫu
const testWebhookData = {
  amount: 150000,
  description: "Thanh toan don hang #TEST123",
  bank_account: "686829078888",
  transaction_id: `test_${Date.now()}`,
  transaction_time: new Date().toISOString(),
  status: "success",
  order_code: "TEST123",
  bank_name: "MBBank"
};

// Test 1: Kiểm tra server có hoạt động không
const testServerConnection = async () => {
  try {
    console.log('🔍 Testing server connection...');
    const response = await axios.get(`${BASE_URL}/api/test`);
    console.log('✅ Server is running:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Server connection failed:', error.message);
    return false;
  }
};

// Test 2: Test webhook endpoint
const testWebhookEndpoint = async () => {
  try {
    console.log('🔔 Testing webhook endpoint...');
    const response = await axios.post(TEST_URL);
    console.log('✅ Webhook test successful:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Webhook test failed:', error.message);
    return false;
  }
};

// Test 3: Test webhook với dữ liệu thật
const testRealWebhook = async () => {
  try {
    console.log('💰 Testing real webhook data...');
    console.log('📤 Sending data:', testWebhookData);
    
    const response = await axios.post(WEBHOOK_URL, testWebhookData, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'SePay-Webhook-Test/1.0'
      }
    });
    
    console.log('✅ Real webhook test successful:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Real webhook test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return false;
  }
};

// Test 4: Kiểm tra webhook logs
const testWebhookLogs = async () => {
  try {
    console.log('📊 Testing webhook logs endpoint...');
    const response = await axios.get(`${BASE_URL}/api/webhooks/logs`);
    console.log('✅ Webhook logs accessible:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Webhook logs test failed:', error.message);
    return false;
  }
};

// Chạy tất cả tests
const runAllTests = async () => {
  console.log('🚀 Starting SePay Webhook Tests for inkverse.online\n');
  
  const results = {
    serverConnection: await testServerConnection(),
    webhookEndpoint: await testWebhookEndpoint(),
    realWebhook: await testRealWebhook(),
    webhookLogs: await testWebhookLogs()
  };
  
  console.log('\n📋 Test Results Summary:');
  console.log('========================');
  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${test}: ${passed ? 'PASSED' : 'FAILED'}`);
  });
  
  const allPassed = Object.values(results).every(result => result);
  console.log(`\n🎯 Overall Status: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
  
  if (allPassed) {
    console.log('\n🎉 Webhook integration is ready!');
    console.log('📝 Next steps:');
    console.log('1. Configure webhook on SePay dashboard');
    console.log('2. Set webhook URL: https://inkverse.online/api/webhooks/sepay-payment');
    console.log('3. Monitor logs at: https://inkverse.online/admin/webhooks');
  } else {
    console.log('\n⚠️ Please fix the failed tests before deploying webhook');
  }
};

// Chạy tests
runAllTests().catch(console.error);
