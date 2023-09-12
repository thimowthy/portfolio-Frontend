import fetcher from "../api/fetcher";

const apiURL = "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com";
const confirmNotification = async (notificationId: string) => {
  try {
    await fetcher({
      rota: `${apiURL}/Notificacao/ConfirmReading/${notificationId}`,
      metodo: "GET",
    });
    return true;
  } catch (error) {
    console.error(error);
  }
  return true;
};

const api = { confirmNotification };

export default api;
