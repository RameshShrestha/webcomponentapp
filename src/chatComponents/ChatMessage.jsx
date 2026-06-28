import { useContext } from "react";
import { OnlineUsersContext } from '../Data/ContextHandler/OnlineUsersContext';
import styles from "./ChatComponents.module.css";

function ChatMessage({ user, oldMessages }) {
    const { currentUserDetail } = useContext(OnlineUsersContext);
    
    return (
        <>
            {oldMessages && oldMessages.map((message) => {
                const isCurrentUser = message.sender === currentUserDetail.name;
                
                return (
                    <div key={new Date(message.createdAt).getTime()} className={styles.chatMessage}>
                        <div className={isCurrentUser ? styles.userMessage : styles.senderMessage}>
                            <div className={styles.chatMessageText}>
                                {message.content}
                            </div>
                            <div className={styles.messageTime}>
                                {new Date(message.createdAt).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default ChatMessage;