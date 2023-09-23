import fetcher from "../api/fetcher";

// const apiURL = "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com";
const apiURL = "https://localhost:7091";
const confirmNotification = async (notificationId: string) => {
  try {
    await fetcher({
      rota: `${apiURL}/Notificacao/ConfirmReading/${notificationId}`,
      metodo: "GET",
    });
    let existingNotifications = localStorage["notifications"]
      ? JSON.parse(localStorage.getItem("notifications") || "")
      : [];
    const index = existingNotifications.findIndex(
      (notificacao: Notificacao) => notificacao.id == parseInt(notificationId),
    );
    existingNotifications[index].isLida = true;
    localStorage.setItem(
      "notifications",
      JSON.stringify(existingNotifications),
    );
    console.log(existingNotifications[index]);
    return true;
  } catch (error) {
    console.error(error);
  }
  return true;
};

const setDischargePatient = async (pacienteId: number) => {
  try {
    await fetcher({
      rota: `${apiURL}/Paciente/SetAlta/${pacienteId}`,
      metodo: "PUT",
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const api = { confirmNotification, setDischargePatient };

export default api;
