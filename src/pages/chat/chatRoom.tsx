import firebase from "firebase/app";
import React, { useState } from "react";

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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputVal(value);
  };

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputVal.length) {
      console.log("send");
      const { uid, photoURL } = props.user;
      await props.room.add({
        text: inputVal,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
      });
      setInputVal("");
    }
  };

  return (
    <div className="chat-room">
      <div>
        {props.messages.map((msg, index) => {
          return (
            <div key={"msg" + index} className={msg.uid || "notification"}>
              {msg.photoURL && <img src={msg.photoURL} />}
              {msg.text}
            </div>
          );
        })}
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
