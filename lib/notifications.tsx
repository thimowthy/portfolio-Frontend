"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import exclamationImg from "../public/exclamation.svg";
import browserNotification from "../utils/browserNotification";
import syncNotification from "./syncNotifications";
import api from "@/helpers";
import { useAuthRole } from "@/hooks/useAuthRole";
/**
 * Component that show the notifications in the layout.
 * @component
 */
export default function Notifications() {
  browserNotification.requestPermission();
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();
  const isLoginPage = router.pathname === "/login";
  const authRole = useAuthRole();
  const cargo = authRole?.cargo || "";

  useEffect(() => {
    if (!isLoginPage && (cargo !== "ADMINISTRADOR") && (cargo !== "LABORATORISTA")) {
      const getAllNotifications = async () => {
        const allNotifications = await syncNotification();
        setNotifications(allNotifications);
      };
      setInterval(getAllNotifications, 30000);

      getAllNotifications();
    }
  }, [cargo]);
  return (
    <>
      {notifications?.map((notification: Notificacao) => {
        if (notification.id && !notification.isLida) {
          toast.custom(
            (t) => (
              <div
                className={`${
                  t.visible ? "animate-enter" : "animate-leave"
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 border-2 border-gray-600`}
              >
                <div className="flex-1 w-0 p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                      <Image
                        className="h-10 w-10 rounded-full"
                        src={exclamationImg}
                        alt="Aviso"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Nova notificação!
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {notification?.tipoNotificacao?.mensagem}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex border-l border-gray-200 flex-col">
                  {cargo !== "LABORATORISTA" && cargo !== "ADMINISTRADOR" && (
                    <>
                      <button
                        onClick={() =>
                          api
                            .confirmNotification(`${notification.id}`)
                            .then(() => {
                              toast.dismiss(t.id);
                            })
                        }
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        Confirmar leitura
                      </button>

                      <Link
                        href={{
                          pathname: "/dados-paciente",
                          query: { id: notification?.idPaciente },
                        }}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        Visualizar
                      </Link>
                    </>
                  )}
                </div>
              </div>
            ),
            {
              position: "top-right",
              duration: Infinity,
              id: `${notification.id}`,
            },
          );
        }
      })}
    </>
  );
}
