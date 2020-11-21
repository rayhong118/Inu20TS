import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "firebase/app";
import React, { createRef, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./chat.scss";
interface ChatRoomProps {
  user: firebase.User;
  roomName: string;

  //room: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
}

interface ChatMessage {
  createdAt: Date;
  text: string;
  uid: string;
  photoURL: string;
}

const ChatRoomComponent = (props: ChatRoomProps) => {
  const [inputVal, setInputVal] = useState("");
  const bottomOfChat = createRef<HTMLDivElement>();
  const firestore = firebase.firestore();

  const roomRef = firestore.collection(props.roomName);
  const query = roomRef.orderBy("createdAt");

  const [messages, loading, error] = useCollectionData<ChatMessage>(query, {
    idField: "id",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputVal(value);
  };

  const scrollToBottom = () => {
    bottomOfChat.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputVal.length) {
      const { uid, photoURL } = props.user;
      setInputVal("");
      await roomRef.add({
        text: inputVal,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
      });
      // bottomOfChat.current?.scrollIntoView(true);
    }
  };

  const setMessageType = (uid: string | undefined) => {
    if (uid) return uid === props.user.uid ? "sent" : "received";
    else return "notification";
  };
  if (loading)
    return (
      <div className="chat-messages-placeholder">
        <FontAwesomeIcon icon={faCircleNotch} spin />
        loading
      </div>
    );
  else if (error) return <>{error}</>;
  else
    return (
      <>
        <div className="chat-messages">
          {messages?.map((msg, index) => {
            return (
              <div
                key={"msg" + index}
                className={"message-container " + setMessageType(msg.uid)}
              >
                {msg.photoURL && <img src={msg.photoURL} alt="user icon" />}
                <div className="message-text">{msg.text}</div>
              </div>
            );
          })}
          <div ref={bottomOfChat} />
        </div>

        <form onSubmit={(e) => sendMessage(e)}>
          <input onChange={(e) => handleInput(e)} value={inputVal} />
          <button>Send</button>
        </form>
      </>
    );
};

export { ChatRoomComponent };
export type { ChatMessage };
