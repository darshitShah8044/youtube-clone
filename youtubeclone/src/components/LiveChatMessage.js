import React, { useEffect } from "react";

const LiveChatMessage = ({ imageURL, name, comment }) => {
  return (
    <div className="flex shadow-sm items-center p-1">
      <img src={imageURL} alt={name} className="w-8 h-8 rounded-full" />
      <span className="px-2 font-bold m-1">{name}</span>
      <span>{comment}</span>
    </div>
  );
};

export default LiveChatMessage;
