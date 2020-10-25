import firebase from "firebase/app";
import React, { createRef, useEffect, useState } from "react";
import "./chat.scss";
interface ChatRoomProps {
  messages: ChatMessage[];
  user: firebase.User;
  room: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
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
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputVal(value);
  };

  const scrollToBottom = () => {
    bottomOfChat.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [props.messages]);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputVal.length) {
      console.log("send");
      const { uid, photoURL } = props.user;
      setInputVal("");
      await props.room.add({
        text: inputVal,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
      });
      setInputVal("");
      // bottomOfChat.current?.scrollIntoView(true);
    }
  };

  const setMessageType = (uid: string | undefined) => {
    if (uid) return uid === props.user.uid ? "sent" : "received";
    else return "notification";
  };

  return (
    <div className="chat-room">
      <div className="chat-messages">
        {props.messages.map((msg, index) => {
          return (
            <div className={"message-container " + setMessageType(msg.uid)}>
              {msg.photoURL && <img src={msg.photoURL} />}
              <div key={"msg" + index} className="message-text">
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={bottomOfChat} />
      </div>

      <form onSubmit={(e) => sendMessage(e)}>
        <input onChange={(e) => handleInput(e)} value={inputVal} />
        <button>Send</button>
      </form>
    </div>
  );
};

export { ChatRoomComponent };
export type { ChatMessage };
