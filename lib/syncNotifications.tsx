import fetcher from "@/api/fetcher";
import browserNotification from "@/utils/browserNotification";
import checkAuthentication from "@/utils/checkAuth";
/**
 * função para sincronizar as notificações com o back.
 * @returns {object[]} array com o objeto de notificações.
 */

export default async function SyncNotification() {
  const notifications = await fetcher({
    rota: "/Notificacao/GetAllNotSent",
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
