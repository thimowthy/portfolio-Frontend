"use client";
import { useAuthRole } from "@/hooks/useAuthRole";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const AuthProvider = ({
  children,
  permission,
  redirect,
}: {
  children?: any;
  permission?: string[];
  redirect?: string;
}) => {
  const router = useRouter();
  const authRole = useAuthRole();
  const cargo = authRole?.cargo || "";
  console.log(cargo);
  useEffect(() => {
    if (
      permission &&
      !permission.includes(cargo) &&
      cargo !== "ADMINISTRADOR"
    ) {
      if (redirect) {
        router.push(redirect);
        return;
      }
      router.push("/");
      return;
    }
  }, []);
  return <>{children};</>;
};
