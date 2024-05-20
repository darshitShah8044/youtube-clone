import React, { useEffect, useState } from "react";

import VideoCard from "./VideoCard";
import { Link, useLocation, useSearchParams } from "react-router-dom";

import { YOUTUBE_SEARCH_QUERY } from "./constants";

const SearchVideoResult = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("v");
  const location = useLocation();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getQueryVideos = async () => {
    try {
      const response = await fetch(YOUTUBE_SEARCH_QUERY + searchQuery);
      const data = await response.json();
      console.log(data?.items);
      setVideos(data?.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQueryVideos();
  }, [location.search]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="w-full flex flex-wrap justify-center">
      {videos.map((video) => (
        <Link to={"/watch?v=" + video?.id?.videoId} key={video?.id?.videoId}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default SearchVideoResult;
