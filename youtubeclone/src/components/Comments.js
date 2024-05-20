import React, { useEffect, useState } from "react";
import { YOUTUBE_COMMENT_DATA_API } from "./constants";

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(YOUTUBE_COMMENT_DATA_API + videoId);
        const json = await data.json();
        setComments(json);
        console.log(json);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching comments:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, [videoId]);

  console.log(videoId);

  return (
    <div className="flex flex-col pt-2">
      <p className="font-bold text-[1.3rem] pt-3 ">Comments</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        comments?.items?.map((comment) => (
          <div key={comment.id} className="flex  px-3 items-center mb-4 ">
            <img
              src={
                comment?.snippet?.topLevelComment?.snippet
                  ?.authorProfileImageUrl
              }
              alt={
                comment?.snippet?.topLevelComment?.snippet?.authorDisplayName
              }
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="font-bold">
                {comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}
              </p>
              <p className="text-[large]">
                {comment?.snippet?.topLevelComment?.snippet?.textOriginal}
              </p>
              <p className="text-[large] p-2">
                👍 {comment?.snippet?.topLevelComment?.snippet?.likeCount}
              </p>
              <p>Replies {comment?.snippet?.totalReplyCount}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;
