import { List, ListItemCustom, Icon } from "@ui5/webcomponents-react";
import ChatListItem from "./ChatListItem";
import { useContext, useEffect, useState } from "react";
import { OnlineUsersContext } from "../Data/ContextHandler/OnlineUsersContext";
import { socket } from "../socket";
import styles from "./ChatComponents.module.css";

function ChatBox() {
    const [userListVisible, setUserListVisible] = useState(false);
    const { onlineUsersData, setActiveChatList, activeChatsList, currentUserDetail } = useContext(OnlineUsersContext);
    
    useEffect(() => {
        if (socket.connected) {
            fetchOnlineUsers();
        }
    }, []);

    const fetchOnlineUsers = () => {
        if (socket.connected) {
            socket.emit('getOnlineUsers');
            console.log("fetching online users");
        }
    }

    return (
        <div className={styles.chatBoxContainer}>
            <div
                className={styles.chatHeader}
                onClick={() => setUserListVisible(!userListVisible)}
            >
                <button className={styles.chatButton}>
                    Online Users ({onlineUsersData.users?.length || 0})
                </button>
                <Icon
                    className={styles.chatHeaderIcon}
                    name={userListVisible ? "navigation-down-arrow" : "navigation-up-arrow"}
                />
            </div>
            
            {userListVisible && (
                <div className={styles.chatWindowWrapper}>
                    <List
                        className={styles.onlineUsersList}
                        onItemClick={function _a() { }}
                        onItemClose={function _a() { }}
                        onItemDelete={function _a() { }}
                        onItemToggle={function _a() { }}
                        onLoadMore={function _a() { }}
                        onSelectionChange={function _a() { }}
                    >
                        {onlineUsersData.users && onlineUsersData.users.length > 0 ? (
                            onlineUsersData.users.map((user) => {
                                if (user.name === currentUserDetail?.name) {
                                    return null;
                                }
                                return (
                                    <ListItemCustom
                                        key={"chatli" + user.name}
                                        onClick={() => {
                                            if (!activeChatsList.find((item) => item.name === user.name)) {
                                                setActiveChatList([...activeChatsList, user]);
                                            }
                                        }}
                                    >
                                        <ChatListItem user={user} />
                                    </ListItemCustom>
                                );
                            })
                        ) : (
                            <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
                                No users online
                            </div>
                        )}
                    </List>
                </div>
            )}
        </div>
    );
}

export default ChatBox;