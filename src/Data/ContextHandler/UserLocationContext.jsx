import React, { createContext, useEffect, useState } from "react";

import { LocalStorage } from "../LocalStorage";
const _myLocalStorageUtility = LocalStorage();
export let UserLocationContext = createContext({
    locationPermission: false,
    location: { lat: 0, lng: 0 },
    weatherToday: {},
    weatherForcast: {}
});
export default function UserLocationContextProvider({ children }) {
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [locationPermission, setLocationPermission] = useState(false);
    const [weatherToday, setweatherToday] = useState(null);
    const [weatherForcast, setWeatherForcast] = useState(null);
    //const checkWeather = useCallback ((lat,lng)=>{fetchWeatherData(lat,lng)},[location]);
    function getLocation() {
        if (!navigator.geolocation) {
            console.log('Geolocation API not supported by this browser.');
        } else {
            console.log('Checking location...');
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }
    function success(position) {
        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude);

        if (!weatherToday) {
            fetchWeatherData(position.coords.latitude, position.coords.longitude);
            //  checkWeather(position.coords.latitude, position.coords.longitude);
        }

    }
    function error() {
        setLocationPermission(false);
        console.log('Geolocation error!');
    }
    async function fetchWeatherData(lat, lng) {
        const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
        const _token = loggedInUser?.token || "";
        if (lat && lng) {
            console.log("Fetching WeatherData for ", lat, lng);
            const baseURL = process.env.REACT_APP_SERVER_URI;
            try {

                const response = await fetch(baseURL + `/weatherdata?lat=${lat}&lng=${lng}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${_token}`
                    }
                });
                const result = await response.json();

                setweatherToday(result.weathertoday);
                let timeZone = result.weathertoday.timezone;
                //delete weather forcast prior to 3 hours of current time
                let currentTime = new Date().getTime() / 1000; //in seconds
                let filteredData = result.forcast.list.filter((item)=>{
                  let localtime = item.dt - timeZone;
                  let diffence =  localtime - currentTime;
                    if(diffence > -10800){
                        return item;
                    }
                });
                console.log(filteredData);
                setWeatherForcast({list : filteredData});
                setLocationPermission(true);
                setLocation({ lat: lat, lng: lng });
                //   console.log("Weather Data", result);
            } catch (error) {
                console.log(error);
            }

        }
    }
    useEffect(() => {
        getLocation();
    }, []);

    const values = {
        location,
        locationPermission,
        weatherToday,
        weatherForcast
    };
    return (
        <>
            <UserLocationContext.Provider value={values}>
                {children}
            </UserLocationContext.Provider>
        </>
    );
}


