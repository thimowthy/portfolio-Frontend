import checkAuthentication from "@/utils/checkAuth";

const useToken = () => {
  const token = localStorage.getItem("Authorization");
  if (token && checkAuthentication()) {
    return token;
  }
  return false;
};

export default useToken;
