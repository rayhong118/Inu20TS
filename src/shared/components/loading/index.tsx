import React from "react";
import "./loading.scss";

const Loading = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner-container">
        <div className="spinner-background" />
        <div className="spinner-arc"></div>
      </div>
    </div>
  );
};

export default Loading;
