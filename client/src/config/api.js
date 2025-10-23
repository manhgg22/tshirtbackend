// API Configuration - Auto detect environment
const getApiConfig = () => {
  // Check if running locally (development)
  const isLocal = window.location.hostname === 'localhost' || 
                  window.location.hostname === '127.0.0.1' ||
                  window.location.hostname === '0.0.0.0' ||
                  window.location.port === '3000';

  // Check if running on production
  const isProduction = window.location.hostname === 'inkverse.online' ||
                       window.location.hostname.includes('inkverse');

  // Default API URLs
  const configs = {
    local: {
      baseURL: 'http://localhost:5000/api',
      name: 'Local Development',
      color: '#52c41a'
    },
    production: {
      baseURL: 'https://inkverse.online/api',
      name: 'Production',
      color: '#1890ff'
    }
  };

  // Auto detect environment
  if (isLocal) {
    console.log('🔧 Running in LOCAL mode - Using local API');
    return configs.local;
  } else if (isProduction) {
    console.log('🚀 Running in PRODUCTION mode - Using production API');
    return configs.production;
  } else {
    // Fallback to production for other domains
    console.log('🌐 Running on custom domain - Using production API');
    return configs.production;
  }
};

// Export current config
export const apiConfig = getApiConfig();

// Export function to get config (useful for dynamic switching)
export const getCurrentApiConfig = () => getApiConfig();

// Export individual values for convenience
export const API_BASE_URL = apiConfig.baseURL;
export const API_ENVIRONMENT = apiConfig.name;
export const API_COLOR = apiConfig.color;

// Debug info
console.log(`📍 API Config: ${API_ENVIRONMENT} (${API_BASE_URL})`);
