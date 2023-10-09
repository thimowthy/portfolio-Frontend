import jwt_decode from "jwt-decode";

export const getId = (token: string | null): string => {
  if (!token)
    return "";
  try {
    const decodedToken: JwtPayload = jwt_decode(token);
    return decodedToken.id;
  } catch (error) {
    return "";
  }
};
