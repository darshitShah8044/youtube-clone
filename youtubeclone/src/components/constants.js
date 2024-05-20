export const YOUTUBE_VIDEO_API_KEY = "AIzaSyADohsdk6dM3cPJ9fvP8cX30a0Cpl14aOA";
export const VIDEO_CATEGORY_API =
  "https://youtube.googleapis.com/youtube/v3/videoCategories?maxResults=10&regionCode=IN&key=" +
  YOUTUBE_VIDEO_API_KEY;
export const YOUTUBE_VIDEO_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=50&&chart=mostPopular&regionCode=in&key=" +
  YOUTUBE_VIDEO_API_KEY;

export const YOUTUBE_COMMENT_DATA_API =
  "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&order=relevance&maxResults=100&moderationStatus=published&order=time&textFormat=plainText&key=" +
  YOUTUBE_VIDEO_API_KEY +
  "&videoId=";
export const YOUTUBE_SEARCH_QUERY =
  " https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&order=viewCount&regionCode=in&key=" +
  YOUTUBE_VIDEO_API_KEY +
  "&q=";
export const YOUTUBE_SEARCH_SUGGESTION_API =
  "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";
