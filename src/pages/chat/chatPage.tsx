import "firebase/firestore";
import firebase from "firebase/app";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ChatRoomComponent } from "./chatRoom";
import { faAngleLeft, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotValidated from "../../shared/components/notValidated";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppState } from "../../redux/store";

interface ChatRoomInfo {
  id: string;
  name: string;
}

export const ChatPageComponent = () => {
  const [selectedRoom, selectRoom] = useState("");

  const listOfRooms: ChatRoomInfo[] = [
    { id: "message", name: "Message" },
    { id: "test1", name: "Test1" },
  ];

  const { credential } = useSelector((state: AppState) => ({
    ...state.authReducer,
  }));
  const history = useHistory();
  useEffect(() => {
    if (!credential) history.push("/auth?fromUrl=/chat");
  }, [credential]);

  if (credential)
    return (
      <div className="chat-container page">
        <div className={!!selectedRoom ? "chat-rooms-list" : "chat-rooms-list"}>
          {listOfRooms.map((roomInfo) => {
            return (
              <button
                className={
                  selectedRoom === roomInfo.id
                    ? "chat-room-selected"
                    : "chat-room-select"
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
            <div className="action-bar">
              <button
                onClick={() => {
                  selectRoom("");
                }}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
              <b>
                {listOfRooms.find((room) => room.id === selectedRoom)?.name}
              </b>
            </div>

            <ChatRoomComponent user={credential} roomName={selectedRoom} />
          </div>
        ) : (
          <div className={selectedRoom ? "chat-room-active" : "chat-room"}>
            Please select a room
          </div>
        )}
      </div>
    );
  else
    return (
      <div className="chat-container page">
        <FontAwesomeIcon icon={faCircleNotch} spin />
      </div>
    );
};
