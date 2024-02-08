import { Toast, ShellBar, ShellBarItem, ResponsivePopover, Title, List, StandardListItem, CustomListItem, Button } from "@ui5/webcomponents-react";
import MyNotificationItem from "./MyNotificationItem";
import { useRef, useState } from "react";
import { socket } from '../socket';
import { render, createPortal } from 'react-dom';


function Notifications() {
  const toast = useRef(null);

  const showToast = (message) => {
    const modalRoot = document.getElementById('modal-root');
    render(createPortal(<Toast ref={toast} duration={3000} style={{ color: "#ebeb84" }}>{message}</Toast>, modalRoot), document.createElement("div"));
    toast.current.show();

  };
  const notificationData = [
    { id: 1, title: "Notification 1", message: "Notification message will be Warning", type: "Warning" },
    { id: 2, title: "Notification 2", message: "Notification message will be Success", type: "Success" },
    { id: 3, title: "Notification 3", message: "Notification message will be Error", type: "Error" },
    { id: 4, title: "Notification 4", message: "Notification message will be Info", type: "Info" },
    { id: 5, title: "Notification 5", message: "Notification message will be Info", type: "Info" },
    { id: 6, title: "Notification 6", message: "Notification message will be Warning", type: "Warning" },
    { id: 7, title: "Notification 7", message: "Notification message will be Success", type: "Success" },
  ]
  const [userNotifications, setUserNotificaitions] = useState(notificationData);

  socket.on("NotificationFromAdmin", (notification) => {
    console.log("new Notification from Admin", notification);
    setUserNotificaitions([...userNotifications, notification]);
    showToast("New Notification \n" + notification.title);

  })
  const removeNotification = (notificationId) => {
    setUserNotificaitions(userNotifications.filter(item => item.id !== notificationId));
  }
  return <>

    <ResponsivePopover
      id="notificationPopOver"
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
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column", width: "300px", height: "80vh" }}>
        {userNotifications?.length > 0 && userNotifications.map((_notification) => {
          return <MyNotificationItem key={_notification.id} data={_notification} removeNotification={removeNotification} />
        })}
        {userNotifications?.length === 0 && <div className="noNotificationItem"> No new Notifications available</div>}
      </div>


    </ResponsivePopover>


  </>
}
export default Notifications;