import React, { useState, useEffect } from "react";
import { YOUTUBE_VIDEO_API_KEY } from "./constants";
import LiveChat from "./LiveChat";

const Comment = ({ comment, replies }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [commentReplies, setCommentReplies] = useState([]);

  useEffect(() => {
    const fetchCommentReplies = async () => {
      if (showReplies && replies) {
        const data = await replies;
        setCommentReplies(data);
      }
    };

    fetchCommentReplies();
  }, [showReplies, replies]);

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  return (
    <div className="flex rounded p-4 mb-1">
      <img
        src={comment.authorProfileImageUrl}
        alt={comment.author}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div className="flex-grow">
        <p className="font-bold">{comment.author}</p>
        <p className="text-lg">{comment.text}</p>
        {comment.totalReplies > 0 && (
          <p>Total Replies: {comment.totalReplies}</p>
        )}
        {comment.totalReplies > 0 && (
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={toggleReplies}
          >
            {showReplies ? "Hide Replies" : "View Replies"}
          </button>
        )}
        {showReplies && (
          <div className="ml-4 mt-2 flex-grow">
            {commentReplies.map((reply) => (
              <div key={reply.id} className="mb-2">
                <img
                  src={reply.authorProfileImageUrl}
                  alt={reply.author}
                  className="w-8 h-8 rounded-full mr-2 inline-block"
                />
                <span className="font-bold">{reply.author}</span>
                <p className="text-lg">{reply.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const AllComments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (videoId) {
      fetchComments(videoId);
    }
  }, [videoId]);

  const fetchComments = async (videoId) => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&order=relevance&maxResults=100&moderationStatus=published&order=time&textFormat=plainText&key=${YOUTUBE_VIDEO_API_KEY}&videoId=${videoId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await response.json();

      // Extract main comments from response
      const mainComments = extractMainComments(data?.items);

      setComments(mainComments);
      setLoading(false); // Set loading to false after comments are fetched
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
      setLoading(false); // Set loading to false on error
    }
  };

  const extractMainComments = (comments) => {
    return (
      comments?.map((comment) => {
        const topLevelComment = comment?.snippet?.topLevelComment; // Optional chaining here
        const totalReplies = comment?.snippet?.totalReplyCount || 0;
        return {
          id: topLevelComment?.id,
          author: topLevelComment?.snippet?.authorDisplayName,
          text: topLevelComment?.snippet?.textDisplay,
          authorProfileImageUrl:
            topLevelComment?.snippet?.authorProfileImageUrl,
          totalReplies: totalReplies,
        };
      }) || []
    );
  };

  const fetchReplies = async (commentId) => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/comments?part=snippet&order=time&textFormat=plainText&key=${YOUTUBE_VIDEO_API_KEY}&parentId=${commentId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch replies");
      }

      const data = await response.json();

      return (
        data?.items?.map((item) => ({
          id: item?.id,
          author: item?.snippet?.authorDisplayName,
          text: item?.snippet?.textDisplay,
          authorProfileImageUrl: item?.snippet?.authorProfileImageUrl,
        })) || []
      );
    } catch (error) {
      console.error("Error fetching replies:", error);
      return [];
    }
  };

  return (
    <>
      <div className="mt-4">
        {loading ? (
          // Show loading indicator if comments are still loading
          <p className="text-gray-600">Loading comments...</p>
        ) : (
          <div>
            <span className="font-bold text-lg[24px]">Comments</span>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  replies={
                    comment.totalReplies > 0 ? fetchReplies(comment.id) : []
                  }
                />
              ))
            ) : (
              <p>No comments available</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AllComments;
