import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLiveChatMessage } from "../utils/chatSlice";
import LiveChatMessage from "./LiveChatMessage";
import { YOUTUBE_VIDEO_API_KEY } from "./constants";

const LiveChat = ({ liveChatId }) => {
  const dispatch = useDispatch();
  const liveChatMessages = useSelector((store) => store.chat.chatMessages);
  const [lastMessageId, setLastMessageId] = useState(null);

  useEffect(() => {
    const fetchLiveChatMessages = async () => {
      try {
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/liveChat/messages?part=snippet,authorDetails&liveChatId=${liveChatId}&maxResults=2&key=${YOUTUBE_VIDEO_API_KEY}`
        );
        const data = await response.json();

        if (data.items.length > 0) {
          const latestMessage = data.items[0];
          const messageId = latestMessage.id;

          // Check if the message is different from the last one
          if (messageId !== lastMessageId) {
            const { displayName, profileImageUrl } =
              latestMessage.authorDetails;
            const { displayMessage } = latestMessage.snippet;

            dispatch(
              addLiveChatMessage({
                name: displayName,
                comment: displayMessage,
                imageURL: profileImageUrl,
              })
            );

            // Update the last message ID
            setLastMessageId(messageId);
          }
        }
      } catch (error) {
        console.error("Error fetching live chat messages:", error);
      }
    };

    const interval = setInterval(fetchLiveChatMessages, 500);

    return () => clearInterval(interval);
  }, [dispatch, liveChatId, lastMessageId]);

  return (
    <div className="border border-black mx-3 w-full h-[615px] p-2 overflow-y-scroll scroll flex flex-col-reverse">
      {liveChatMessages.map((message, index) => (
        <LiveChatMessage
          key={index}
          name={message.name}
          comment={message.comment}
          imageURL={message.imageURL}
        />
      ))}
    </div>
  );
};

export default LiveChat;
