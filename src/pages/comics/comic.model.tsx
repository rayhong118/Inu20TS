import { firestore } from "firebase";

export interface Comic {
  title: string;
  description: string;
  imgUrl: string;
  creationDate: firestore.Timestamp;
}
