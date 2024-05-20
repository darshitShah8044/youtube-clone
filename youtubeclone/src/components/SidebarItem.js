import React from "react";
import { Link } from "react-router-dom";

const SidebarItem = ({ path, text }) => {
  const linkTo = text === "Home" ? "/" : `search_query?v=${text}`;

  return (
    <Link to={linkTo}>
      <li className="flex hover:bg-slate-200 rounded-lg text-lg ">
        <svg className="h-12 w-12">
          <g>
            <path d={path}></path>
          </g>
        </svg>
        {text}
      </li>
    </Link>
  );
};

export default SidebarItem;
