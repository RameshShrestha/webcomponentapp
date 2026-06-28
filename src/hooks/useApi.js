import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook for making API calls with built-in loading and error states
 * @returns {Object} API utilities
 */
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Make an API call with automatic loading and error handling
   * @param {Function} apiFunction - The API function to call
   * @param {Object} options - Configuration options
   * @returns {Promise} API response
   */
  const execute = useCallback(async (apiFunction, options = {}) => {
    const {
      onSuccess,
      onError,
      showLoading = true,
      errorMessage = 'An error occurred'
    } = options;

    try {
      if (showLoading) setLoading(true);
      setError(null);

      const response = await apiFunction();
      
      if (onSuccess) {
        onSuccess(response);
      }
      
      return response;
    } catch (err) {
      const errorMsg = err.message || errorMessage;
      setError(errorMsg);
      
      if (onError) {
        onError(err);
      } else {
        console.error('API Error:', err);
      }
      
      throw err;
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  /**
   * Reset error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    execute,
    clearError
  };
};

/**
 * Custom hook for fetching data with caching
 * @param {Function} fetchFunction - Function to fetch data
 * @param {Array} dependencies - Dependencies array for re-fetching
 * @returns {Object} Data, loading, error states and refetch function
 */
export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const { loading, error, execute, clearError } = useApi();

  const fetchData = useCallback(async () => {
    try {
      const result = await execute(fetchFunction);
      setData(result);
      return result;
    } catch (err) {
      // Error already handled by useApi
      return null;
    }
  }, [fetchFunction, execute]);

  // Auto-fetch on mount and when dependencies change
  useEffect(() => {
    fetchData();
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    clearError
  };
};

export default useApi;

// Made with Bob
