
import ChatitingBox from "./ChattingBox";
import { OnlineUsersContext } from '../Data/ContextHandler/OnlineUsersContext';
import { useContext } from "react";
import styles from "./ChatComponents.module.css";

function ChatingBoxContainer() {
    const { activeChatsList, currentUserDetail } = useContext(OnlineUsersContext);
    
    return (
        <div className={styles.chatBoxesContainer}>
            {activeChatsList.length > 0 && currentUserDetail.name && activeChatsList.map((user, index) => {
                return (
                    <ChatitingBox
                        key={user.name}
                        user={user}
                        currentUser={currentUserDetail.name}
                        index={index}
                    />
                );
            })}
        </div>
    );
}

export default ChatingBoxContainer;