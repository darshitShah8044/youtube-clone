import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/navSlice";
import { useSearchParams } from "react-router-dom";
import { YOUTUBE_VIDEO_API_KEY } from "./constants";
import VideoDetails from "./VideoDetails";
import AllComments from "./AllComments";
import LiveChat from "./LiveChat";
import SimilarVideos from "./SimilarVideos";

const WatchPage = () => {
  const [searchParam] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [liveChatId, setLiveChatId] = useState(null);
  const [isLiveVideo, setIsLiveVideo] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoTags, setVideoTags] = useState([]);
  const dispatch = useDispatch();

  const loadVideoDetails = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${searchParam.get(
          "v"
        )}&key=${YOUTUBE_VIDEO_API_KEY}`
      );
      const data = await response.json();
      const isLive = data.items[0]?.snippet.liveBroadcastContent !== "none";
      const videoTitle = data.items[0]?.snippet?.title;
      const videoTags = data.items[0]?.snippet?.tags || [];
      setVideoTags(videoTags);
      setVideoTitle(videoTitle);
      console.log(data);
      setVideoId(data.items[0]?.id);
      setLiveChatId(data.items[0]?.liveStreamingDetails?.activeLiveChatId);
      setIsLiveVideo(isLive);
      setLoading(true);
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  useEffect(() => {
    dispatch(closeMenu());
    loadVideoDetails();
  }, [dispatch, searchParam]);

  return (
    <div className="col-span-11 m-2 flex">
      <div className="w-full md:w-2/3 mr-0 md:mr-4">
        <div className="aspect-w-16 aspect-h-9 mb-4 flex">
          <div>
            <iframe
              className="w-[1030px]"
              width="1030px"
              height="615px"
              src={"https://www.youtube.com/embed/" + searchParam.get("v")}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div>
          {loading && videoId ? <VideoDetails videoId={videoId} /> : null}
          {loading && !isLiveVideo ? (
            <div className="mb-4 flex">
              <AllComments videoId={videoId} />
            </div>
          ) : null}
        </div>
      </div>
      {loading && isLiveVideo && liveChatId ? (
        <div className="w-full md:w-1/3 ml-0 md:ml-4 mt-4 md:mt-0">
          <div className="flex">
            <LiveChat liveChatId={liveChatId} />
          </div>
        </div>
      ) : null}
      {!isLiveVideo ? (
        <div className="m-2 p-2">
          <SimilarVideos videoTitle={videoTitle} videoTags={videoTags} />
        </div>
      ) : null}
    </div>
  );
};

export default WatchPage;
