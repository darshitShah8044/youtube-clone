import React from "react";

const ShimmerCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden m-2 p-2">
      {/* Shimmer effect for thumbnail */}
      <div className="animate-pulse h-40 bg-gray-300 mb-2"></div>

      {/* Shimmer effect for title */}
      <div className="animate-pulse">
        <div className="w-3/4 h-4 bg-gray-300 mb-2"></div>
        <div className="w-1/2 h-4 bg-gray-300"></div>
      </div>
    </div>
  );
};

export default ShimmerCard;
