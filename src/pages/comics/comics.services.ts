import firebase from "firebase/app";
import { useDispatch } from "react-redux";
import { firestore } from "firebase";

export interface Comic {
  title: string;
  description: string;
  imgUrl: string;
  creationDate: firestore.Timestamp;
}

export interface ComicFields {
  title?: string;
  description?: string;
  creationDate?: string;
}
const COMICS_COLLECTION_NAME = "comics";
const comicsRef = firebase.firestore().collection(COMICS_COLLECTION_NAME);
const addComicPost = (input: Comic) => {};
