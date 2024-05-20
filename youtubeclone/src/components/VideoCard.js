import React from "react";

const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails, publishedAt } = snippet;
  // Check if statistics object is available before accessing viewCount
  const viewCount = statistics ? statistics.viewCount : undefined;

  const formatViewCount = (count) => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
    if (count >= 1000) return (count / 1000).toFixed(1) + "K";
    return count.toString();
  };

  return (
    <div className="p-2 m-2 w-[25rem] h-80 shadow-lg transition duration-300 ease-in-out transform hover:bg-gray-300 hover:scale-105">
      <img
        className="rounded-md w-96"
        src={thumbnails.medium.url}
        alt="thumbnail"
      ></img>
      <ul>
        <li className="font-bold mt-3 truncate">{title}</li>
        <li className="font-bold truncate">{channelTitle}</li>
        {/* Check if viewCount is available before rendering */}
        {viewCount && (
          <li>
            {formatViewCount(viewCount)} views • {publishedAt.split("T")[0]}
          </li>
        )}
      </ul>
    </div>
  );
};

export default VideoCard;
