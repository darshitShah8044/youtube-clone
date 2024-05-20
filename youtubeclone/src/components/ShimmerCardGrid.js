import React from "react";
import ShimmerCard from "./ShimmerCard";

const ShimmerCardGrid = () => {
  const shimmerCards = Array.from({ length: 10 }, (_, index) => (
    <ShimmerCard key={index} />
  ));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {shimmerCards}
    </div>
  );
};

export default ShimmerCardGrid;
