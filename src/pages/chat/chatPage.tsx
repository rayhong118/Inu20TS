import "firebase/firestore";
import firebase from "firebase/app";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ChatRoomComponent } from "./chatRoom";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ChatRoomInfo {
  id: string;
  name: string;
}

export const ChatPageComponent = () => {
  const [selectedRoom, selectRoom] = useState("");
  const [user, isAuthLoading, authError] = useAuthState(firebase.auth());

  const listOfRooms: ChatRoomInfo[] = [
    { id: "message", name: "Message" },
    { id: "test1", name: "Test1" },
  ];

  if (user)
    return (
      <div className="chat-container page">
        <div className={!!selectedRoom ? "chat-rooms-list" : "chat-rooms-list"}>
          {listOfRooms.map((roomInfo) => {
            return (
              <button
                className={
                  selectedRoom === roomInfo.id ? "chat-room-selected" : "chat-room-select"
                }
                onClick={() => {
                  selectRoom(roomInfo.id);
                }}
                key={roomInfo.id}
              >
                {roomInfo.name}
              </button>
            );
          })}
        </div>
        {selectedRoom ? (
          <div className={selectedRoom ? "chat-room-active" : "chat-room"}>
            <button
              onClick={() => {
                selectRoom("");
              }}
            >
              Back
            </button>
            <ChatRoomComponent user={user} roomName={selectedRoom} />
          </div>
        ) : (
          <div className={selectedRoom ? "chat-room-active" : "chat-room"}>
            Please select a room
          </div>
        )}
      </div>
    );
  else if (!isAuthLoading) return <div>not validated</div>;
  else
    return (
      <div className="chat-container page">
        <FontAwesomeIcon icon={faCircleNotch} spin />
      </div>
    );
};
