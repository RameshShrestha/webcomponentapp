/**
 * Application Constants
 * Centralized configuration for the application
 */

// Action Types for Reducers
export const ADD_USER = "ADD USER";
export const REMOVE_USER = "REMOVE USER";

// Default Configuration
const DEFAULT_CONFIG = {
  API_URL: 'http://localhost:3004',
  SOCKET_URL: 'http://localhost:3004/chat'
};

/**
 * Get the API base URL from environment variables
 * Falls back to localhost if not configured
 * @returns {string} API base URL
 */
export const getDataProvider = () => {
  return import.meta.env.VITE_API_URL || DEFAULT_CONFIG.API_URL;
};

/**
 * Get the WebSocket URL from environment variables
 * Falls back to localhost if not configured
 * @returns {string} WebSocket URL
 */
export const getSocketURL = () => {
  return import.meta.env.VITE_SOCKET_URL || DEFAULT_CONFIG.SOCKET_URL;
};

/**
 * Check if running in development mode
 * @returns {boolean}
 */
export const isDevelopment = () => {
  return import.meta.env.DEV;
};

/**
 * Check if running in production mode
 * @returns {boolean}
 */
export const isProduction = () => {
  return import.meta.env.PROD;
};

/**
 * Get current environment mode
 * @returns {string} 'development' or 'production'
 */
export const getEnvironment = () => {
  return import.meta.env.MODE;
};
