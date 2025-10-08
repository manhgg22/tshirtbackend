// Test API connection
import axios from 'axios';

const testAPI = async () => {
  try {
    console.log('🧪 Testing API connection...');
    
    // Test products endpoint
    const productsResponse = await axios.get('http://localhost:5000/api/products');
    console.log('✅ Products API:', productsResponse.status, productsResponse.data);
    
    // Test categories endpoint  
    const categoriesResponse = await axios.get('http://localhost:5000/api/categories');
    console.log('✅ Categories API:', categoriesResponse.status, categoriesResponse.data);
    
  } catch (error) {
    console.error('❌ API Test failed:', error.message);
    console.error('Error details:', error.response?.data || error);
  }
};

export default testAPI;


