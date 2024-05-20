import React from "react";
import ButtonList from "./ButtonList";
import Videocontainer from "./Videocontainer";

const MainVideoContainer = () => {
  return (
    <div className="col-span-11 m-2">
      <ButtonList />
      <Videocontainer />
    </div>
  );
};

export default MainVideoContainer;
