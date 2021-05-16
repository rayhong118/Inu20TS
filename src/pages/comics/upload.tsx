import React, { useState } from "react";
import { firebaseStorage } from "../../App";

export const ComicsUploadPage = () => {
  const [imageFile, setImageFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();

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
          });
      }
    );
  };

  return (
    <div>
      Upload
      <form onSubmit={handleFileUpload}>
        <input type="file" accept=".jpg" onChange={handleFileChange} />
        {imageUrl && <img src={imageUrl} alt="preview" />}
        <button>Submit</button>
      </form>
    </div>
  );
};
