import "firebase/firestore";
import firebase from "firebase/app";
import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { ChatMessage, ChatRoomComponent } from "./chatRoom";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ChatPageComponent = () => {
  const [selectedRoom, selectRoom] = useState("message");
  const [user, isAuthLoading, authError] = useAuthState(firebase.auth());
  const firestore = firebase.firestore();
  const roomRef = firestore.collection(selectedRoom);
  const query = roomRef.orderBy("createdAt");

  const [messages, loading, error] = useCollectionData<ChatMessage>(query, {
    idField: "id",
  });

  if (user)
    return (
      <div className="chat-container">
        {loading ? (
          <FontAwesomeIcon icon={faCircleNotch} spin />
        ) : (
          <ChatRoomComponent messages={messages || []} user={user} room={roomRef} />
        )}
      </div>
    );
  else return <div>not validated</div>;
};
