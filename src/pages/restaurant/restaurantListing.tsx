import firebase from "firebase/app";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FIRESTORE_COLLECTION } from "../../shared/constants/collections";

export const RestaurantListing = () => {
  const firestore = firebase.firestore();
  const restaurantRef = firestore.collection(FIRESTORE_COLLECTION.RESTAURANT);

  //are we going to have a dynamic query?
  const query = restaurantRef;

  const [restaurants, loading, error] = useCollectionData(query, {
    idField: "id",
  });

  return (
    <div>
      <h1>Restaurants list</h1>
      {restaurants ? (
        restaurants.map((restaurant: any) => {
          return <div key={restaurant.id}>{restaurant.name}</div>;
        })
      ) : (
        <div>no result</div>
      )}
    </div>
  );
};
