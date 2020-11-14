import "firebase/firestore";
import firebase from "firebase/app";
import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { ChatMessage, ChatRoomComponent } from "./chatRoom";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ChatRoomInfo {
  id: string;
  name: string;
}

export const ChatPageComponent = () => {
  const [selectedRoom, selectRoom] = useState("message");
  const [user, isAuthLoading, authError] = useAuthState(firebase.auth());
  const firestore = firebase.firestore();
  const roomRef = firestore.collection(selectedRoom);
  const query = roomRef.orderBy("createdAt");

  const [messages, loading, error] = useCollectionData<ChatMessage>(query, {
    idField: "id",
  });

  const listOfRooms: ChatRoomInfo[] = [
    { id: "message", name: "Message" },
    { id: "test1", name: "Test1" },
  ];

  if (!loading && user)
    return (
      <div className="chat-container page">
        <div className="chat-rooms-list">
          {listOfRooms.map((roomInfo) => {
            return (
              <button
                className="chat-room-select"
                onClick={() => {
                  selectRoom(roomInfo.id);
                }}
              >
                {roomInfo.name}
              </button>
            );
          })}
        </div>
        <ChatRoomComponent messages={messages || []} user={user} room={roomRef} />
      </div>
    );
  else if (!loading) return <div>not validated</div>;
  else
    return (
      <div className="chat-container page">
        <FontAwesomeIcon icon={faCircleNotch} spin />
      </div>
    );
};
