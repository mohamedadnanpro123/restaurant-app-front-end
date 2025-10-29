// Centralized API configuration
// Uses environment variable in production, localhost in development

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export const API_BASE = `${API_BASE_URL}/api`;

// For debugging
console.log('🔗 API Base URL:', API_BASE_URL);
console.log('🔗 API Endpoint:', API_BASE);