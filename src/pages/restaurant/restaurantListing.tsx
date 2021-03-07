import firebase from "firebase/app";
import React, { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDispatch } from "react-redux";
import { setAlert } from "../../redux/actions/alert";
import Loading from "../../shared/components/loading";
import { FIRESTORE_COLLECTION } from "../../shared/constants/collections";

export const RestaurantListing = () => {
  const firestore = firebase.firestore();
  const restaurantRef = firestore.collection(FIRESTORE_COLLECTION.RESTAURANT);

  //are we going to have a dynamic query?
  const query = restaurantRef;

  const [restaurants, loading, error] = useCollectionData(query, {
    idField: "id",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(
        setAlert({ type: "warning", duration: 10, message: error.message })
      );
    }
  }, [error]);

  if (!loading)
    return (
      <div>
        <h5>Restaurants list</h5>
        {restaurants ? (
          restaurants.map((restaurant: any) => {
            return <div key={restaurant.id}>{restaurant.name}</div>;
          })
        ) : (
          <div>no result</div>
        )}
      </div>
    );
  else return <Loading />;
};
