import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from '../Data/ContextHandler/AuthContext';
import { ThemeProvider } from '@ui5/webcomponents-react';
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import MyShellBar from '../ShellBarComponents/MyShellBar';
import UserPopover from '../ShellBarComponents/UserPopover';
import Notifications from '../ShellBarComponents/Notifications';
import OnlineUsersContextProvider, { OnlineUsersContext } from '../Data/ContextHandler/OnlineUsersContext';
import ChatingBoxContainer from '../chatComponents/ChatingBoxContainer';
import ChatBox from '../chatComponents/ChatBox';
import React, { useEffect, useState } from "react";
import { socket } from '../socket';
const ProtectedRoutes = ({ children }) => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const baseURL = process.env.REACT_APP_SERVER_URI;
    const { contextData } = useAuth();
    const navigate = useNavigate();
    const { token, user, userDetail, settingConfig } = contextData;
    //const user = useSelector((state) => state.user);
    let location = useLocation();
    console.log("location", location);
    console.log("Executed here Protected router", userDetail);
    const checkIfUserSessionIsValid = async () => {
        const response = await fetch(baseURL + '/realusers/nouser', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status < 300) {
            return children;

        } else {
            // return <Navigate to="/welcome" state={{ from: location }} replace />
          
            navigate("/welcome");
        }
    }
    if (!userDetail) {
        checkIfUserSessionIsValid();
    }
    if (settingConfig?.theme) {
        setTheme(settingConfig.theme);
    } else {
        setTheme("sap_horizon_dark");
    }
    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }
        function onDisconnect() {
            setIsConnected(false);
        }
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        const shellbar = document.getElementById("shellBar");
        const actionPopover = document.getElementById(
            "userPopOver"
        );
        const notificationPopover = document.getElementById(
            "notificationPopOver"
        );
        if (shellbar) {
            shellbar.addEventListener(
                "ui5-profile-click",
                function (event) {
                    actionPopover.showAt(event.detail.targetRef);
                }
            );
            shellbar.addEventListener(
                "ui5-notifications-click",
                function (event) {
                    notificationPopover.showAt(event.detail.targetRef);
                }
            );
        }
        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, [user]);
    return (
        <ThemeProvider>
            <div className="mainContainer" style={{ height: `${user && isConnected ? "82vh" : "91vh"}`, overflow: "auto", overflowX: "hidden", background: "var(--sapBackgroundColor)" }}>
                <MyShellBar />
                <UserPopover isConnected={isConnected} setIsConnected={setIsConnected} />
                <Notifications />
                <Outlet />
                {user && isConnected &&
                    <div className="pageFooter">
                        <OnlineUsersContextProvider>
                            <ChatingBoxContainer />
                            <ChatBox />
                        </OnlineUsersContextProvider>
                    </div>
                }
            </div>

        </ThemeProvider>
    );

};

export default ProtectedRoutes;