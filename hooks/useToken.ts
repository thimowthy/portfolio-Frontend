import checkAuthentication from "@/utils/checkAuth";

const useToken = async () => {
  const token = localStorage.getItem("Authorization");
  if (token && checkAuthentication()) {
    return token;
  }
  return false;
};

export default useToken;
