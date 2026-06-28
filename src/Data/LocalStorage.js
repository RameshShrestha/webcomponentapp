/**
 * LocalStorage utility for managing application data
 * Provides type-safe methods for storing and retrieving data
 */
const LocalStorage = function() {
    /**
     * Generic method to safely get data from localStorage
     * @param {string} key - The localStorage key
     * @returns {any|null} Parsed data or null if not found
     */
    const getItem = (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(`Error reading ${key} from localStorage:`, error);
            return null;
        }
    };

    /**
     * Generic method to safely set data in localStorage
     * @param {string} key - The localStorage key
     * @param {any} value - The value to store
     */
    const setItem = (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error writing ${key} to localStorage:`, error);
        }
    };

    /**
     * Generic method to remove data from localStorage
     * @param {string} key - The localStorage key
     */
    const removeItem = (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing ${key} from localStorage:`, error);
        }
    };

    // User authentication data methods
    const setLoggedInUserData = (user, token, role) => {
        setItem('loggedInUserData', { user, token, role });
    };
    
    const removeLoggedInUserData = () => {
        removeItem('loggedInUserData');
    };

    const getLoggedInUserData = () => {
        return getItem('loggedInUserData');
    };

    // Weather data methods
    const setWeatherData = (weatherData) => {
        setItem('weatherData', {
            data: weatherData,
            time: new Date().getTime()
        });
    };

    const removeWeatherData = () => {
        removeItem('weatherData');
    };

    const getWeatherData = () => {
        return getItem('weatherData');
    };

    // Server status methods
    const setServerStatus = (ServerStatusData) => {
        setItem('ServerStatus', {
            data: ServerStatusData,
            time: new Date().getTime()
        });
    };

    const removeServerStatus = () => {
        removeItem('ServerStatus');
    };

    const getServerStatus = () => {
        return getItem('ServerStatus');
    };

    // Return public API
    return {
        setLoggedInUserData,
        removeLoggedInUserData,
        getLoggedInUserData,
        setWeatherData,
        removeWeatherData,
        getWeatherData,
        setServerStatus,
        removeServerStatus,
        getServerStatus
    };
};

export { LocalStorage };
export default LocalStorage;