import fetcher from "@/api/fetcher";
import browserNotification from "@/utils/browserNotification";
/**
 * função para sincronizar as notificações com o back.
 * @returns {object[]} array com o objeto de notificações.
 */
export default async function syncNotification() {
  const notifications = await fetcher({
    rota: "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Notificacao/GetAllNotSent",
    metodo: "GET",
  });
  let existingNotifications = localStorage["notifications"]
    ? JSON.parse(localStorage.getItem("notifications") || "")
    : [];
  let existingNotificationIds = existingNotifications?.map(
    (notification: Notificacao) => notification.id,
  );
  notifications.map((notification: Notificacao) => {
    if (
      existingNotificationIds.indexOf(notification.id) < 0 &&
      !notification.isLida
    ) {
      existingNotifications.push(notification);
      browserNotification.browserNotify({
        title: "Atenção!!",
        body: notification?.tipoNotificacao?.mensagem || "",
      });
    }
  });
  localStorage.setItem("notifications", JSON.stringify(existingNotifications));
  return existingNotifications;
}
