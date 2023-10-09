import jwt_decode from "jwt-decode";

/**
 * Verifica se o usuário está autenticado com base no token JWT armazenado no localStorage.
 * @returns {boolean} Retorna verdadeiro se o usuário estiver autenticado; caso contrário, retorna falso.
 */
const checkAuthentication = (): boolean => {
  const token = localStorage.getItem("Authorization");

  if (!token) {
    return false;
  }

  try {
    const decodedToken: JwtPayload = jwt_decode(token || "");
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (decodedToken.exp && decodedToken.exp < currentTimestamp) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export default checkAuthentication;
