import React from "react";

export const nodeStyle: React.CSSProperties = {
  background: "#C9DDD8",
  color: "#2A423C",
  border: "1px solid #689F92",
  height: "70px",
  width: "150px",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const decisionNodeStyle: React.CSSProperties = {
  background: "#C9DDD8",
  color: "#2A423C",
  border: "1px solid #689F92",
  height: "35px",
  width: "35px",
  clipPath: "polygon(0% 50%,50% 0%,50% 0%,100% 50%,100% 50%,50% 100%, 50% 100%,  0 50%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const edgeStyle: React.CSSProperties = {
  stroke: "#a4c5bd",
};
