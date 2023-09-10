import React, { FC } from "react";

interface BackIconProps {
  width: number;
  height: number;
  color: string;
}

const BackIcon: FC<BackIconProps> = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 12H5M12 19L5 12L12 5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BackIcon;
