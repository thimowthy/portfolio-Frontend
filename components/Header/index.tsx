import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import styles from "./styles.module.css";
import sairIcon from "@/public/sair.svg";
import { clearLocalStorage } from "@/utils/clearLocalStorage";
import { useAuthRole } from "@/hooks/useAuthRole";
import checkAuthentication from "@/utils/checkAuth";
import { useLoggedUser } from "@/hooks/useLoggedUser";

const Header = () => {
  // useLoggedUser();
  const { cargo } = useAuthRole();
  const [isAuthenticated, setIsAuthenticated] = useState<any>();

  const getLogo = (cargo: String | null) => {
    switch (cargo) {
      case "ADMINISTRADOR":
        return (
          <Link className="flex items-center" href="/menu">
            <Image
              className="logo-img"
              src={logo}
              alt=""
              width="75"
              height="75"
            />{" "}
            <span className={styles.logoname}>OncoCareSystem</span>
          </Link>
        );
      default:
        return (
          <Link className="flex items-center" href="/">
            <Image
              className="logo-img"
              src={logo}
              alt=""
              width="75"
              height="75"
            />{" "}
            <span className={styles.logoname}>OncoCareSystem</span>
          </Link>
        );
    }
  };

  const getHeader = (cargo: String | null) => {
    switch (cargo) {
      case "ADMINISTRADOR":
        return (
          <div className="w-full flex items-center justify-end">
            <nav className={styles.nav}>
              <ul className="flex">
                <li className="font-light text-base mx-4">
                  <Link href="/menu">Home</Link>
                </li>
                <li className="font-light text-base mx-4">
                  <Link
                    href="https://oncocaresystem.nicepage.io/"
                    target="_blank"
                  >
                    Sobre o OncoCare
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="border-l-2 border-gray-300 h-12 mx-8"></div>
            <Link
              className="flex items-center"
              href="/login"
              onClick={clearLocalStorage}
            >
              <span className="font-bold text-lg mr-2">Sair</span>
              <Image src={sairIcon} alt="" width="30" height="30" />
            </Link>
          </div>
        );
      default:
        return (
          <div className="w-full flex items-center justify-end">
            <nav className={styles.nav}>
              <ul className="flex">
                <li className="font-light text-base mx-4">
                  <Link href="/">Home</Link>
                </li>
                <li className="font-light text-base mx-4">
                  <Link href="/login">Acesso ao Sistema</Link>
                </li>
                <li className="font-light text-base mx-4">
                  <Link
                    href="https://oncocaresystem.nicepage.io/"
                    target="_blank"
                  >
                    Sobre o OncoCare
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="border-l-2 border-gray-300 h-12 mx-8"></div>
            <Link
              className="flex items-center"
              href="/login"
              onClick={clearLocalStorage}
            >
              <span className="font-bold text-lg mr-2">Sair</span>
              <Image src={sairIcon} alt="" width="30" height="30" />
            </Link>
          </div>
        );
    }
  };
  useEffect(() => {
    const auth = checkAuthentication();
    setIsAuthenticated(auth);
  }, []);
  return (
    <header className="flex items-center p-4 bg-white w-full h-16 fixed left-0 shadow-md">
      {getLogo(cargo)}
      {isAuthenticated ? (
        getHeader(cargo)
      ) : (
        <div className="w-full flex items-center justify-end">
          <nav className={styles.nav}>
            <ul className="flex">
              <li className="font-light text-base mx-4">
                <Link
                  href="https://oncocaresystem.nicepage.io/"
                  target="_blank"
                >
                  Sobre o OncoCare
                </Link>
              </li>
            </ul>
          </nav>
          <div className="border-l-2 border-gray-300 h-12 mx-8"></div>
        </div>
      )}
    </header>
  );
};

export default Header;
