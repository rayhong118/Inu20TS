import firebase from "firebase/app";
import { useDispatch } from "react-redux";
import { firestore } from "firebase";
import { setAlert } from "../../redux/actions/alert";

export interface Comic {
  title: string;
  description: string;
  imgUrl: string;
  creationDateString: string;
}

export interface ComicFields {
  title?: string;
  description?: string;
  creationDate?: string;
}

const dispatch = useDispatch();
const COMICS_COLLECTION_NAME = "comics";
const DUPLICATE_COMIC_IMG_ERROR = "comic post with this image already exists";
const CANNOT_FIND_COMIC_POST = "can not find comic post";
const comicsRef = firebase.firestore().collection(COMICS_COLLECTION_NAME);

const checkDuplicateComic = (imageUrl: string) => {
  return comicsRef
    .where("imgUrl", "==", imageUrl)
    .get()
    .then((doc) => {
      if (doc.docs.length) {
        throw DUPLICATE_COMIC_IMG_ERROR;
      }
    });
};

const addComicPost = (input: Comic) => {
  checkDuplicateComic(input.imgUrl)
    .then(() => {
      comicsRef.add(input);
    })
    .catch((err) =>
      setAlert({ type: "warning", duration: 5, message: err.message })
    );
};

// need to get id of the post?
// or only use this for info update?
const editComicPost = (input: Comic) => {};

const deleteComicPost = (id: string) => {
  comicsRef
    .where("id", "==", id)
    .get()
    .then((doc) => {
      if (doc.docs[0]) comicsRef.doc(id).delete();
      else throw CANNOT_FIND_COMIC_POST;
    });
};
export { addComicPost, editComicPost, deleteComicPost };
