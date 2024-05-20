import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEO_API } from "./constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import ShimmerCard from "./ShimmerCard";
import ShimmerCardGrid from "./ShimmerCardGrid";
const Videocontainer = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const getVideoData = async () => {
    const response = await fetch(YOUTUBE_VIDEO_API);
    const data = await response.json();

    setVideos(data.items);
    setLoading(true);
  };

  useEffect(() => {
    getVideoData();
  }, []);
  return loading ? (
    <div className="flex flex-wrap">
      {videos?.map((videoItem) => (
        <Link to={"/watch?v=" + videoItem.id}>
          <VideoCard key={videoItem.id} info={videoItem} />
        </Link>
      ))}
    </div>
  ) : (
    <ShimmerCardGrid />
  );
};

export default Videocontainer;
