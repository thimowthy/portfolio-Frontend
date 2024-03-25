/**
 * Requer a permissão para as notificações do sistema.
 * @returns {void}.
 */
const requestPermission = () => {
  if (typeof window !== "undefined") {
    if (!("Notification" in window)) {
      console.log("Browser does not support desktop notification");
    } else {
      Notification.requestPermission();
      if (Notification.permission) {
        if (Notification.permission !== "granted") {
          Notification.requestPermission();
        }
        Notification.requestPermission();
      } else if (Notification.permission === "granted") {
        console.log("Notification permission already granted!");
      }
    }
  }
};
/**
 * Método para mostrar a notificação nativa do browser baseada em um título e um corpo da mensagem.
 * @param {title} string - Título da notificação.
 * @param {body} string - Corpo da notificação.
 * @returns {void}.
 */
const browserNotify = ({ title, body }: { title: string; body: string }) => {
  if (!("Notification" in window)) {
    console.log("Browser does not support desktop notification");
  } else {
    if (Notification.permission !== "granted") {
      requestPermission();
    } else {
      const notification = new Notification(title, {
        body,
        icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjQ0QzMzMzIj48cGF0aCBkPSJNMTIgMWwtMTIgMjJoMjRsLTEyLTIyem0tMSA4aDJ2N2gtMnYtN3ptMSAxMS4yNWMtLjY5IDAtMS4yNS0uNTYtMS4yNS0xLjI1cy41Ni0xLjI1IDEuMjUtMS4yNSAxLjI1LjU2IDEuMjUgMS4yNS0uNTYgMS4yNS0xLjI1IDEuMjV6Ii8+PC9zdmc+",
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        dir: "ltr",
      });
    }
  }
};

const browserNotification = {
  requestPermission,
  browserNotify,
};

export default browserNotification;
