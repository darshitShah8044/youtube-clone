import React, { useState, useEffect } from "react";
import { VIDEO_CATEGORY_API } from "./constants";
import { Link } from "react-router-dom";

const ButtonList = () => {
  const [videoCategories, setVideoCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const getVideoCategory = async () => {
    try {
      const response = await fetch(VIDEO_CATEGORY_API);
      const data = await response.json();

      setVideoCategory(data?.items?.slice(0, 10));
      setLoading(true);
    } catch (error) {
      console.error("Error fetching video categories:", error);
    }
  };

  useEffect(() => {
    getVideoCategory();
  }, []);

  return loading ? (
    <div>
      {videoCategories.map((vidCat) => (
        <Link to={`/search_query?v=${vidCat.snippet.title}`} key={vidCat.id}>
          <button className="p-2 m-2 h-11 rounded-md bg-slate-200 hover:bg-slate-400 transition">
            {vidCat.snippet.title}
          </button>
        </Link>
      ))}
    </div>
  ) : null;
};

export default ButtonList;
