import React from "react";
import Loading from "../../shared/components/loading";
import WIP from "../../shared/components/wip";
import "./home.scss";

const HomePageComponent = () => {
  return (
    <div className="page">
      <WIP />
      <p>HomePage</p>
      <p>
        This personal site is built without using UI libraries (e.g. Boorstrap,
        Material UI)
      </p>
    </div>
  );
};

export default HomePageComponent;
