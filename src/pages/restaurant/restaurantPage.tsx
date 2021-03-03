import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppState } from "../../redux/store";
import { ROUTES } from "../../shared/constants/routes";
import { RestaurantFilter } from "./restaurantFilter";
import { RestaurantListing } from "./restaurantListing";

export const RestaurantPage = () => {
  const { credential } = useSelector((state: AppState) => ({
    ...state.authReducer,
  }));
  const history = useHistory();
  useEffect(() => {
    if (!credential) history.push(`${ROUTES.AUTH}?fromUrl=/restaurants`);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <RestaurantFilter />
      <RestaurantListing />
    </div>
  );
};
