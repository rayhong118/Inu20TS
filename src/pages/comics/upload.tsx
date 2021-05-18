import firebase from "firebase";
import React, { useState } from "react";
import { firebaseStorage } from "../../App";
import { Comic, ComicFields } from "./comic.model";

export const ComicsUploadPage = () => {
  const [imageFile, setImageFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [formFields, setFormFields] = useState<ComicFields>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files && e.target.files[0];
    if (img) setImageFile(img);
  };

  const handleFileUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageFile) {
      console.log("image file error");
      return;
    }
    const uploadTask = firebaseStorage
      .ref(`/comics/${imageFile?.name}`)
      .put(imageFile);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        console.log(snapShot);
      },
      (err) => {
        console.log(err);
      },
      () => {
        firebaseStorage
          .ref("comics")
          .child(imageFile.name)
          .getDownloadURL()
          .then((firebaseDownloadUrl) => {
            console.log(firebaseDownloadUrl);
            setImageUrl(firebaseDownloadUrl);

            let comicData: Comic = {
              title: formFields?.title || "",
              description: formFields?.description || "",
              imgUrl: firebaseDownloadUrl,
              creationDate: new firebase.firestore.Timestamp(0, 0),
            };
          });
      }
    );
  };

  return (
    <div className="comic-edit">
      Upload
      <form onSubmit={handleFileUpload}>
        <label>Title</label>
        <input type="text" name="title" onChange={handleInputChange} />
        <label>Description</label>
        <input type="text" name="description" onChange={handleInputChange} />
        <label>Comic Upload</label>
        <input type="file" accept=".jpg" onChange={handleFileChange} />
        {imageUrl && <img src={imageUrl} alt="preview" />}
        <label>Creation Date</label>
        <input type="text" name="creationDate" onChange={handleInputChange} />
        <button>Submit</button>
      </form>
    </div>
  );
};
