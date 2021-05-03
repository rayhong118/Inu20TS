import React, { useState } from "react";
import { storage } from "firebase";

export const ComicsUploadPage = () => {
  const [imageFile, setImageFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files && e.target.files[0];
    if (img) setImageFile(img);
  };

  const handleFileUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      Upload
      <form onSubmit={handleFileUpload}>
        <input type="file" onChange={handleFileChange} />
      </form>
    </div>
  );
};
