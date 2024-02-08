import { Avatar, ShellBar, ShellBarItem,  ResponsivePopover, Title, List, StandardListItem,  CustomListItem, Button } from "@ui5/webcomponents-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Data/ContextHandler/AuthContext";

function MyShellBar(){
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate("./");
      };
      const { contextData } = useAuth();
const { userDetail,settingConfig } = contextData;
    return<>
    <ShellBar
            id="shellBar"
            logo={<img src="Logo.PNG" alt="logo" />}
            show-notifications ={settingConfig?.showNotification}
            notifications-count="99+"
            profile={
              <Avatar>
                <img src={userDetail?.image} alt="logo" />
              </Avatar>
            }
            primaryTitle="Ramesh Learning Hub"
            onLogoClick={handleLogoClick}
            style={{ background: "#a9b0ca" }}
          >
          </ShellBar>
    </>
}
export default MyShellBar;