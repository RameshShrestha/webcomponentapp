import OnlineStatusIcon from "../LoginComponents/OnlineStatusIcon";
import styles from "./ChatComponents.module.css";

function ChatListItem({ user }) {
    return (
        <>
            {user && (
                <div className={styles.chatListItem}>
                    <div>
                        <img
                            className={styles.userAvatar}
                            src={user.image || "./dummyUser.PNG"}
                            loading="lazy"
                            alt={user.name}
                            height={40}
                            width={40}
                        />
                    </div>
                    
                    <div className={styles.userName}>
                        {user.name}
                    </div>
                    
                    <div className={styles.userStatus}>
                        <OnlineStatusIcon
                            height={30}
                            width={30}
                            status={user.status}
                            showText={false}
                        />
                        {user.chatNotification > 0 && (
                            <span className={styles.chatNotificationBadge}>
                                {user.chatNotification}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatListItem;