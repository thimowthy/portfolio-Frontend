import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";

export const useLoggedUser = () => {
  const [loggedUser, setLoggedUser] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("Authorization");
      if (token) {
        const decodedToken: JwtPayload = jwt_decode(token || "");
        if (decodedToken && decodedToken?.nome) {
          setLoggedUser(decodedToken.nome);
        }
      }
    }
  }, []);
  return [loggedUser];
};
