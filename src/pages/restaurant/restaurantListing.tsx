import { faEdit, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "firebase/app";
import React, { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDispatch } from "react-redux";
import { setAlert } from "../../redux/actions/alert";
import Loading from "../../shared/components/loading";
import { FIRESTORE_COLLECTION } from "../../shared/constants/collections";
import { Restaurant } from "./restaurant.service";

const RestaurantCard = (data: Restaurant) => {
  return (
    <div className="restaurant-card">
      <span className="restaurant-card-title">{data.name}</span>
      {data.price}
      {data.address}
      <span className="restaurant-card-actions">
        <button onClick={() => window.open(data.url, "blank")}>
          <FontAwesomeIcon icon={faLocationArrow} />
          Direction
        </button>
        <button>
          <FontAwesomeIcon icon={faEdit} /> Edit
        </button>
      </span>
    </div>
  );
};

export const RestaurantListing = () => {
  const firestore = firebase.firestore();
  const restaurantRef = firestore.collection(FIRESTORE_COLLECTION.RESTAURANT);

  //are we going to have a dynamic query?
  const query = restaurantRef;

  const [restaurants, loading, error] = useCollectionData<Restaurant>(query, {
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
      <div className="restaurant-page-listing">
        <h5>Restaurants list</h5>
        {restaurants ? (
          restaurants.map((restaurant: Restaurant) => {
            return (
              <div key={restaurant.id}>
                <RestaurantCard {...restaurant} />
              </div>
            );
          })
        ) : (
          <div>no result</div>
        )}
      </div>
    );
  else return <Loading />;
};
