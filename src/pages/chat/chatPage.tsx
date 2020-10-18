import "firebase/firestore";
import firebase from "firebase/app";
import React, { useState } from "react";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";

export const ChatPageComponent = () => {
  const [selectedRoom, selectRoom] = useState("");

  const firestore = firebase.firestore();
  const roomsRef = firestore.collection("chat");
  const query = roomsRef;

  const [rooms, loading, error] = useCollectionData<any[]>(query, { idField: "id" });

  return (
    <div>
      this is chat page. message length: {rooms?.length || 0}
      {loading && "loading"}
      {error}
      {
        !!rooms && JSON.stringify(rooms)
        // messages.map((msg: any) => {
        //   return <div key={msg.id}>{JSON.stringify(msg)}</div>;
        // })
      }
    </div>
  );
};
