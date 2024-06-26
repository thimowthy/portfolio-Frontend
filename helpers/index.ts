import fetcher from "../api/fetcher";

const confirmNotification = async (notificationId: string) => {
  try {
    await fetcher({
      rota: `/Notificacao/ConfirmReading/${notificationId}`,
      metodo: "GET",
    });
    let existingNotifications = localStorage["notifications"]
      ? JSON.parse(localStorage.getItem("notifications") || "")
      : [];
    const index = existingNotifications.findIndex(
      (notificacao: Notificacao) => notificacao.id == parseInt(notificationId)
    );
    existingNotifications[index].isLida = true;
    localStorage.setItem(
      "notifications",
      JSON.stringify(existingNotifications)
    );
    return true;
  } catch (error) {
    console.error(error);
  }
  return true;
};

const setDischargePatient = async (pacienteId: number) => {
  try {
    await fetcher({
      rota: `/Internacao/SetAlta/${pacienteId}`,
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
