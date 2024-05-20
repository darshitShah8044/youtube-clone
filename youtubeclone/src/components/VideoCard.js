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
            {formatViewCount(viewCount)} views •{" "}
            {getVideoAge(publishedAt.split("T")[0])}
          </li>
        )}
      </ul>
    </div>
  );
};

export default VideoCard;

function getVideoAge(dateInput) {
  const now = new Date();
  const inputDate = new Date(dateInput);

  // Calculate the difference in milliseconds
  let diff = now - inputDate;

  // Calculate the number of days, months, and years
  const msInDay = 24 * 60 * 60 * 1000;
  const msInMonth = msInDay * 30.44; // average days in a month
  const msInYear = msInDay * 365.25; // average days in a year

  const years = Math.floor(diff / msInYear);
  diff = diff % msInYear;

  const months = Math.floor(diff / msInMonth);
  diff = diff % msInMonth;

  const days = Math.floor(diff / msInDay);

  // Construct the output string based on the calculated time difference
  if (years > 0) {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else {
    return "Few hours ago";
  }
}
