import { Icon } from "@ui5/webcomponents-react";
import { useContext, useEffect, useRef, useState } from "react";
import { OnlineUsersContext } from '../Data/ContextHandler/OnlineUsersContext';
import ChatMessage from "./ChatMessage";
import { socket } from '../socket';
import styles from "./ChatComponents.module.css";

function ChatitingBox({ user, currentUser }) {
    const [expandChat, setExpandChat] = useState(false);
    const { activeChatsList, setActiveChatList } = useContext(OnlineUsersContext);
    const [currentMessage, setCurrentMessage] = useState("");
    const [oldMessages, setOldMessages] = useState([]);
    const [chattingUser] = useState(user.name);
    const [userTyping, setUserTyping] = useState(false);
    const currentUserTypingRef = useRef(false);
    const sendChatMessage = (chatData) => {
        if (chatData) {
            socket.emit("chatMessage", chatData);
            //   console.log("Message Sent to Server", chatData);
        }
    }
    const chatbox = useRef(null);
    useEffect(() => {
        //    console.log("Fetching old Chats",currentUser ,user.name);
        socket.emit("fetchUserChat", { "currentUser": currentUser, "chatUser": user.name });
    }, []);
    useEffect(() => {
        if (expandChat) {


            chatbox.current.scrollIntoView(false);
        }
    }, [oldMessages]);
    socket.on("chatHistoryLoad", (oldMessages) => {
        // console.log("Inside chatHistoryLoad", currentUser ,user.name);
        //  console.log(oldMessages.oldChat);
        if (chattingUser === oldMessages.chatUser) {
            setOldMessages(oldMessages.oldChat);
            const currentChatbox = document.getElementById("chat_" + chattingUser);
            if (currentChatbox) {
                currentChatbox.scrollTop = currentChatbox.scrollHeight;
            }
        }
    })
    socket.on("newChatMessageRecieved", (newMessage) => {
        //  console.log(newMessage);
        if (newMessage.sender === currentUser) {
            if (chattingUser === newMessage.receiver) {
                setOldMessages([...oldMessages, newMessage]);
                // console.log(document.getElementById("chat_"+newMessage.receiver));
                const currentChatbox = document.getElementById("chat_" + newMessage.receiver);
                if (currentChatbox) {
                    currentChatbox.scrollTop = currentChatbox.scrollHeight + 40;
                }

            }
        }
        if (newMessage.receiver === currentUser) {
            if (chattingUser === newMessage.sender) {
                setOldMessages([...oldMessages, newMessage]);
                // console.log(document.getElementById("chat_"+chattingUser));

                const currentChatbox = document.getElementById("chat_" + chattingUser);
                if (currentChatbox) {
                    currentChatbox.scrollTop = currentChatbox.scrollHeight + 40;
                }
                const currentChatboxBtn = document.getElementById("chatBtn_" + chattingUser);
                if (currentChatboxBtn) {
                    console.log(currentChatboxBtn);
                    currentChatboxBtn.classList.add("blinkDiv")
                }
            }
        }

    })
    socket.on("chatUserTyping", (data) => {
        // console.log("Chatting Event Triggered", data);
        if (!userTyping) {
            setUserTyping(true);
            setTimeout(() => {
                setUserTyping(false);
            }, 3000)
        }

    })
    socket.on("receiveChatMessage", (chatData) => {
        // console.log(chatData);
        if (chatData.sender === currentUser) {
            if (chattingUser === chatData.receiver) {
                setOldMessages([...oldMessages, chatData]);
            }
        }
        if (chatData.receiver === currentUser) {
            if (chattingUser === chatData.sender) {
                setOldMessages([...oldMessages, chatData]);
            }
        }
        //  setAllChatMessages(chatData);
    })
    const handleOnMessageChange = (e) => {
        setCurrentMessage(e.target.value);
        if (!currentUserTypingRef.current) {
            socket.emit("typingEvent", { sender: currentUser, receiver: user.name });
            currentUserTypingRef.current = true;
            setTimeout(() => {
                currentUserTypingRef.current = false;
            }, 5000);
        }
    }

    const handleSendMessage = () => {
        if (currentMessage.trim()) {
            sendChatMessage({ sender: currentUser, receiver: user.name, currentMessage: currentMessage });
            setCurrentMessage("");
        }
    }

    const handleCloseChat = (e) => {
        e.stopPropagation();
        const otherActiveChats = activeChatsList.filter((item) => item.name !== user.name);
        setActiveChatList([...otherActiveChats]);
    }

    return (
        <div className={styles.chatBoxContainer}>
            <div
                id={`chatBtn_${user.name}`}
                className={styles.chatHeader}
                onClick={(e) => {
                    setExpandChat(!expandChat);
                    e.currentTarget.classList.remove(styles.blinkDiv);
                }}
            >
                <button className={styles.chatButton}>
                    {user.name}
                </button>
                <Icon
                    className={styles.chatHeaderIcon}
                    name="decline"
                    interactive
                    onClick={handleCloseChat}
                />
            </div>
            
            {expandChat && (
                <div className={styles.chatWindowWrapper}>
                    <div className={styles.chatWindow}>
                        <div
                            id={`chat_${user.name}`}
                            className={styles.chatMessagesContainer}
                        >
                            <ChatMessage user={user} oldMessages={oldMessages} />
                            <div ref={chatbox} className={styles.typingIndicator}>
                                {userTyping && (
                                    <>
                                        <span>{user.name} is typing</span>
                                        <span className={styles.typingDots}>
                                            <span className={styles.typingDot}></span>
                                            <span className={styles.typingDot}></span>
                                            <span className={styles.typingDot}></span>
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                        
                        <div className={styles.chatInputContainer}>
                            <input
                                className={styles.chatInput}
                                value={currentMessage}
                                placeholder="Type a message..."
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSendMessage();
                                    }
                                }}
                                onChange={handleOnMessageChange}
                            />
                            <button
                                className={styles.sendButton}
                                onClick={handleSendMessage}
                                aria-label="Send message"
                            >
                                <Icon name="paper-plane" className={styles.sendIcon} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatitingBox;