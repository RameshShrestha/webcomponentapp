import { Avatar, ShellBar, ShellBarItem, ResponsivePopover, Title, List, StandardListItem, CustomListItem, Button, Panel, GroupHeaderListItem } from "@ui5/webcomponents-react";
import { useState } from "react";
import { socket } from '../socket';
import OnlineStatusIcon from "../LoginComponents/OnlineStatusIcon";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Data/ContextHandler/AuthContext";
function UserPopover({ isConnected, setIsConnected }) {

  const navigate = useNavigate();
  const { contextData } = useAuth();
  const { logout, token, user, userDetail } = contextData;
  return <>
    <ResponsivePopover
      id="userPopOver"
      className="footerPartNoPadding"

      hideArrow
      horizontalAlign="Center"
      onAfterClose={function _a() { }}
      onAfterOpen={function _a() { }}
      onBeforeClose={function _a() { }}
      onBeforeOpen={function _a() { }}
      opener="openResponsivePopoverBtn"
      placementType="Bottom"
      verticalAlign="Center"
    >
      {/* <Label>
            Press "Esc", click outside or in mobile-mode press the "x" in the corner to close the ResponsivePopover.
          </Label> */}
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <img src={userDetail?.image} alt="usr pic" style={{ height: "80px", width: "80px", border: "solid white", borderRadius: "40px" }} />
        <Title style={{ padding: "0.25rem 1rem 0rem 1rem" }}>{userDetail?.firstName} {userDetail?.lastName}</Title>
      </div>
      <div style={{ marginTop: "1rem" }}>

        <List separators="None"
          onItemToggle={(e) => {
            console.log("Toggle Parent");
          }
          }
          onItemClick={async (e) => {
            console.log(e);
            const actionPopover = document.getElementById(
              "userPopOver"
            );
            const selectedItem = e.detail.item.innerHTML;
            if (selectedItem === "Sign out") {
              //Sign out trigger
              console.log("sign out");

              await logout();
              actionPopover.close();
            }
            else if (selectedItem === "Reset Password") {
              //Sign out trigger
              console.log("Reset Password");
              actionPopover.close();
              navigate("/resetPassword");

            } else if (selectedItem === "My Profile") {
              //Sign out trigger
              console.log("My Profile");
              actionPopover.close();
              navigate("/myprofile");

            } else if (selectedItem === "About") {
              //Sign out trigger
              console.log("About");
              actionPopover.close();
              navigate("/about1");

            } else if (selectedItem === "Contact") {
              //Sign out trigger
              console.log("Contact");
              actionPopover.close();
              navigate("/contact1");

            } else if (selectedItem === "My Todo Activity") {
              //Sign out trigger
              console.log("Contact");
              actionPopover.close();
              navigate("/todolist");

            }
            else if (selectedItem === "Weathers") {
              //Sign out trigger
              console.log("Contact");
              actionPopover.close();
              navigate("/weather1");

            }
            else if (selectedItem === "Images") {
              //Sign out trigger
              console.log("Images");
              actionPopover.close();
              navigate("/images1");

            }
            else if (selectedItem === "Useful Links") {
              //Sign out trigger
              console.log("Useful Links");
              actionPopover.close();
              navigate("/usefullinks");

            }
            else if (selectedItem === "Settings") {
              //Sign out trigger
              console.log("Settings");
              actionPopover.close();
              navigate("/settings");

            }
            else if (selectedItem === "Help") {
              //Sign out trigger
              console.log("Help");
              actionPopover.close();
              navigate("/help1");

            }
            else if (selectedItem === "Countries") {
              //Sign out trigger
              console.log("Help");
              actionPopover.close();
              navigate("/countries1");

            }
            


          }}>

          <CustomListItem>
            <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
              <OnlineStatusIcon height={20} width={20} status={`${isConnected ? "Online" : "Offline"}`} showText={true} />
              {/* <StatusMenu></StatusMenu> */}
              <Button design="Transparent" onClick={(e) => {
                setIsConnected(!isConnected);
                if (isConnected) {
                  socket.disconnect();
                } else {
                  //     const userDummylist = ["ramesh", "test1", "Shrestha", "Rasal", "Test user2", "Test 4", "Test5", "Mills", "last user", "last 2"];
                  //        const currentUser = userDummylist[Math.floor(Math.random() * 10)]
                  socket.connect();
                  socket.emit('getOnline', {
                    "name": user,
                    "image": "https://robohash.org/cupiditatererumquos.png",
                    "loginTime": new Date().toLocaleTimeString()
                  })
                }

              }} >
                {`${isConnected ? "Go Offline" : "Go Online"}`}
              </Button>
            </div></CustomListItem>

          <StandardListItem key="profile" icon="employee">My Profile</StandardListItem>
          <StandardListItem key="todolist" icon="employee">My Todo Activity</StandardListItem>
          <StandardListItem key="settings" icon="settings">Settings</StandardListItem>
          <StandardListItem key="ResetPw" icon="edit">Reset Password</StandardListItem>
          <StandardListItem key="About" icon="information">About</StandardListItem>
          <StandardListItem key="Contact" icon="call">Contact</StandardListItem>
          <StandardListItem key="help" icon="sys-help">Help</StandardListItem>
          <StandardListItem key="logout" icon="log">Sign out</StandardListItem>
          <GroupHeaderListItem>
            Others
          </GroupHeaderListItem>
          <StandardListItem key="Usefullinks" icon="information">Useful Links</StandardListItem>
          <StandardListItem key="Countries" icon="information">Countries</StandardListItem>
          <StandardListItem key="Weathers" icon="information">Weathers</StandardListItem>
          <StandardListItem key="Images" icon="information">Images</StandardListItem>

        </List>

      </div>

    </ResponsivePopover>
  </>
}
export default UserPopover;