import React, { useState, useEffect } from "react";
import { YOUTUBE_SEARCH_QUERY, YOUTUBE_VIDEO_API_KEY } from "./constants";
import VideoCard from "./VideoCard";

function SimilarVideos({ videoTitle, videoTags }) {
  const [similarVideos, setSimilarVideos] = useState([]);
  useEffect(() => {
    const fetchSimilarVideos = async () => {
      try {
        // Retrieve video information

        const searchQuery = `${videoTitle} ${videoTags.join(" ")}`;

        // Search for similar videos
        const searchResponse = await fetch(YOUTUBE_SEARCH_QUERY + searchQuery);
        const searchData = await searchResponse.json();

        setSimilarVideos(searchData.items);
        // Process search results
      } catch (error) {
        console.error("Error fetching similar videos:", error);
      }
    };

    fetchSimilarVideos();
  }, [videoTitle]);

  return (
    <div className="m-2">
      <span className="text-[25px] px-2 p-2">Similar Videos</span>
      <ul>
        {similarVideos.map((video) => (
          <VideoCard info={video} />
        ))}
      </ul>
    </div>
  );
}

export default SimilarVideos;
