import fetcher from "@/api/fetcher";

export default async function syncNotification() {
  const notificacions = await fetcher({
    rota: "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Notificacao/GetAllNotSent",
    metodo: "GET",
  });
  let existingNotifications = localStorage["notifications"]
    ? JSON.parse(localStorage.getItem("notifications") || "")
    : [];
  let existingNotificationIds = existingNotifications?.map(
    (notification: Notificacao) => notification.id,
  );
  notificacions.map((notification: Notificacao) => {
    if (existingNotificationIds.indexOf(notification.id) < 0) {
      existingNotifications.push(notification);
    }
  });
  return existingNotifications;
}
