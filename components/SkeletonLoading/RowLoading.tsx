import React from "react";
import SkeletonLoader from "./SkeletonLoader";
import SkeletonRectangle from "./SkeletonRectangle";

export default function RowLoading() {
  return (
    <SkeletonLoader className="flex gap-2 my-10 w-100">
      <SkeletonRectangle
        lines={3}
        unEqualWidth
        gap={8}
        className="bg-gray-200 rounded-md"
      />
    </SkeletonLoader>
  );
}
