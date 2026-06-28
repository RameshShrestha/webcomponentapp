import { getDataProvider } from '../Data/ContextHandler/constant';
import { LocalStorage } from '../Data/LocalStorage';

/**
 * API Client for making HTTP requests
 * Provides centralized configuration and error handling
 */

const _myLocalStorageUtility = LocalStorage();

/**
 * Get authorization headers
 * @returns {Object} Headers object with authorization
 */
const getAuthHeaders = () => {
  const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
  const token = loggedInUser?.token || '';
  
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

/**
 * Handle API response
 * @param {Response} response - Fetch API response
 * @returns {Promise} Parsed response data
 */
const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  
  const data = isJson ? await response.json() : await response.text();
  
  if (!response.ok) {
    const error = new Error(data.message || `HTTP Error: ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  
  return data;
};

/**
 * Make a GET request
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Additional fetch options
 * @returns {Promise} Response data
 */
export const get = async (endpoint, options = {}) => {
  const baseURL = getDataProvider();
  const url = `${baseURL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: getAuthHeaders(),
      ...options
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error(`GET ${endpoint} failed:`, error);
    throw error;
  }
};

/**
 * Make a POST request
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request body data
 * @param {Object} options - Additional fetch options
 * @returns {Promise} Response data
 */
export const post = async (endpoint, data = {}, options = {}) => {
  const baseURL = getDataProvider();
  const url = `${baseURL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
      ...options
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error(`POST ${endpoint} failed:`, error);
    throw error;
  }
};

/**
 * Make a PUT request
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request body data
 * @param {Object} options - Additional fetch options
 * @returns {Promise} Response data
 */
export const put = async (endpoint, data = {}, options = {}) => {
  const baseURL = getDataProvider();
  const url = `${baseURL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method: 'PUT',
      credentials: 'include',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
      ...options
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error(`PUT ${endpoint} failed:`, error);
    throw error;
  }
};

/**
 * Make a DELETE request
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Additional fetch options
 * @returns {Promise} Response data
 */
export const del = async (endpoint, options = {}) => {
  const baseURL = getDataProvider();
  const url = `${baseURL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
      headers: getAuthHeaders(),
      ...options
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error(`DELETE ${endpoint} failed:`, error);
    throw error;
  }
};

/**
 * Make a PATCH request
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request body data
 * @param {Object} options - Additional fetch options
 * @returns {Promise} Response data
 */
export const patch = async (endpoint, data = {}, options = {}) => {
  const baseURL = getDataProvider();
  const url = `${baseURL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
      ...options
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error(`PATCH ${endpoint} failed:`, error);
    throw error;
  }
};

// Export default object with all methods
const apiClient = {
  get,
  post,
  put,
  delete: del,
  patch
};

export default apiClient;

// Made with Bob
