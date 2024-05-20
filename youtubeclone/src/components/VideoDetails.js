import React, { useState, useEffect } from "react";
import { YOUTUBE_VIDEO_API_KEY } from "./constants";

const VideoDetails = ({ videoId }) => {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadVideoDetails = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_VIDEO_API_KEY}`
      );
      const data = await response.json();
      setVideoData(data.items[0]);
      console.log(data.items[0]);
      setLoading(true);
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  useEffect(() => {
    loadVideoDetails();
  }, [videoId]);

  return (
    <div>
      {loading ? (
        <div>
          <ul>
            <li className="py-3 text-2xl font-bold">
              {videoData?.snippet.title}
            </li>
          </ul>
          <div>
            <li className="text-2xl font-bold">
              {videoData?.snippet.channelTitle}
            </li>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VideoDetails;
