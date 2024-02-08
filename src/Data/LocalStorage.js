const LocalStorage = function() {
    const setLoggedInUserData = (user, token,role) => {
        localStorage.setItem('loggedInUserData', JSON.stringify({ user: user, token: token ,role:role}));
    }
    const removeLoggedInUserData = () => {
        localStorage.removeItem('loggedInUserData');
    }
    const getLoggedInUserData = () => {
        let loggedInUserData = localStorage.getItem('loggedInUserData');
        if (loggedInUserData) {
            loggedInUserData = JSON.parse(loggedInUserData)
        } else {
            return null;
        }
        return loggedInUserData;
    }
    return {setLoggedInUserData: setLoggedInUserData,removeLoggedInUserData:removeLoggedInUserData,getLoggedInUserData:getLoggedInUserData};
}
export  { LocalStorage };