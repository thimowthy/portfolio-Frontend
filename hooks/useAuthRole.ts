import checkAuthentication from "@/utils/checkAuth";
import useToken from "./useToken";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
export const useAuthRole = () => {
  // console.log(checkAuthentication());
  // return "";
  const token =
    typeof window != "undefined" ? localStorage?.getItem("Authorization") : "";
  if (token) {
    const decodedToken: JwtPayload = jwt_decode(token || "");
    const cargo = decodedToken.cargo || null;
    if (!decodedToken || !cargo) {
      return { cargo: null };
    }
    return { cargo };
  }
  return null;
};
