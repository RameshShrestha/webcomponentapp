import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from '../Data/ContextHandler/AuthContext';

import React, { useEffect, useState } from "react";
import WelcomeHeader from "../WelcomePage/WelcomeHeader";
import WelcomeFooter from "../WelcomePage/WelcomeFooter";
const UnProtectedRoutes = ({ children }) => {
    const baseURL = process.env.REACT_APP_SERVER_URI;
    const { contextData } = useAuth();
    const { token, user, userDetail } = contextData;
    //const user = useSelector((state) => state.user);
    let location = useLocation();
    const [dbConnected, setDBConnected] = useState(false);
    const getServerStatus = async () => {
        const baseURL = process.env.REACT_APP_SERVER_URI;
        console.log(baseURL);
        try {

            const response = await fetch(baseURL + '/serverstatus', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();
            setDBConnected(result.dbConnected);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getServerStatus();
    }, []);
    console.log("location", location);
    console.log("Executed here Un Protected router", userDetail);
    const checkIfUserSessionIsValid = async () => {
        const response = await fetch(baseURL + '/realusers/nouser', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // if (response.status < 300) {
        //     return children;

        // } else {
        //     return <Navigate to="/welcome" state={{ from: location }} replace />
        // }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", minWidth: "350px", flexWrap: "wrap" }}>
            <WelcomeHeader dbConnected={dbConnected} />
            <div className="unprotectedContainer sapScrollBar">
            <Outlet />
            </div>
            <WelcomeFooter />
            
        </div>


    );

};

export default UnProtectedRoutes;