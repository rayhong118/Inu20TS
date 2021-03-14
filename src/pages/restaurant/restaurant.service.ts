import firebase from "firebase/app";
import { useDispatch } from "react-redux";
import { setAlert } from "../../redux/actions/alert";
// we need two collections: restaurants and tags

export interface Restaurant {
  name: string;
  id: string;
  price: number;
  tags: RestaurantTag[];
  comments: RestaurantComment[];
  address: string;
  url: string;
}
interface RestaurantComment {
  userName: string;
  content: string;
  date: Date;
}
interface RestaurantTag {
  tagName: string;
  id: string;
}
const dispatch = useDispatch();

const RESTAURANT_COLLECTION_NAME = "restaurants";
const DUPLICATE_ADDRESS_ERROR =
  "Action failed: a restaurant at this address already exist in the database";
const CANNOT_FIND_RESTAURANT = "Action failed: can not find this restaurant";

const firestore = firebase.firestore();
const restaurantRef = firestore.collection(RESTAURANT_COLLECTION_NAME);

const checkDuplicateAddress = (input: Restaurant) => {
  return restaurantRef
    .where("address", "==", input.address)
    .get()
    .then((doc) => {
      if (doc.docs.length && doc.docs[0].id !== input.id) {
        throw DUPLICATE_ADDRESS_ERROR;
      }
      return restaurantRef.doc(input.id);
    });
};

const addRestaurant = (input: Restaurant) => {
  checkDuplicateAddress(input)
    .then(() => {
      restaurantRef.add(input);
    })
    .catch((err) => {
      dispatch(
        //not sure if constant error message will be handled correctly by catch throw
        setAlert({ type: "warning", duration: 5, message: err.message })
      );
    });
};

const editRestaurant = (input: Restaurant) => {
  checkDuplicateAddress(input)
    .then((docRef) => {
      docRef.update({ input });
    })
    .catch((err) => {
      dispatch(
        //not sure if constant error message will be handled correctly by catch throw
        setAlert({ type: "warning", duration: 5, message: err.message })
      );
    });
};

const deleteRestaurant = (id: string) => {
  restaurantRef
    .where("id", "==", id)
    .get()
    .then((doc) => {
      if (doc.docs[0]) restaurantRef.doc(id).delete();
      else throw CANNOT_FIND_RESTAURANT;
    });
};

export { addRestaurant, editRestaurant, deleteRestaurant };
