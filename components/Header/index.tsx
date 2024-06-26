import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import { clearLocalStorage } from "@/utils/clearLocalStorage";
import { useAuthRole } from "@/hooks/useAuthRole";
import checkAuthentication from "@/utils/checkAuth";
import { useLoggedUser } from "@/hooks/useLoggedUser";

import styles from "./styles.module.css";
import logo from "@/public/logo.png";
import sairIcon from "@/public/sair.svg";
import userIcon from "@/public/male-icon.svg";

const Header = () => {
  const [router, setRouter] = useState(useRouter());
  const Logout = () => {
    Swal.fire({
      title: "Tem certeza que deseja sair? Sua sessão será encerrada",
      showCancelButton: true,
      confirmButtonColor: "#f44336",
      confirmButtonText: "Sair",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        clearLocalStorage();
        router.push("/login");
      }
    });
  };
  const [loggedUserName] = useLoggedUser();
  const { cargo } = useAuthRole();
  const [isAuthenticated, setIsAuthenticated] = useState<any>();

  const getLogo = (cargo: String | null) => {
    if (!isAuthenticated) {
      return (
        <Link className="flex items-center" href="/login">
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
      case "LABORATORISTA":
        return (
          <Link className="flex items-center" href="/cadastrar-exame">
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
                <li className="font-light text-base ml-2 mr-2 flex">
                  {loggedUserName && <p>{loggedUserName}</p>}
                  <Image
                    src={userIcon}
                    alt=""
                    width="20"
                    height="20"
                    className="ml-2"
                  />
                </li>
              </ul>
            </nav>
            <div className="border-l-2 border-gray-300 h-12 mx-8"></div>
            <a className="flex items-center cursor-pointer" onClick={Logout}>
              <span className="font-bold text-lg mr-2">Sair</span>
              <Image src={sairIcon} alt="" width="30" height="30" />
            </a>
          </div>
        );
      case "LABORATORISTA":
        return (
          <div className="w-full flex items-center justify-end">
            <nav className={styles.nav}>
              <ul className="flex">
                <li className="font-light text-base mx-4">
                  <Link href="/cadastrar-exame">Home</Link>
                </li>
                <li className="font-light text-base mx-4">
                  <Link
                    href="https://oncocaresystem.nicepage.io/"
                    target="_blank"
                  >
                    Sobre o OncoCare
                  </Link>
                </li>
                <li className="font-light text-base ml-2 mr-2 flex">
                  {loggedUserName && <p>{loggedUserName}</p>}
                  <Image
                    src={userIcon}
                    alt=""
                    width="20"
                    height="20"
                    className="ml-2"
                  />
                </li>
              </ul>
            </nav>
            <div className="border-l-2 border-gray-300 h-12 mx-8"></div>
            <a className="flex items-center cursor-pointer" onClick={Logout}>
              <span className="font-bold text-lg mr-2">Sair</span>
              <Image src={sairIcon} alt="" width="30" height="30" />
            </a>
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
                  <Link
                    href="https://oncocaresystem.nicepage.io/"
                    target="_blank"
                  >
                    Sobre o OncoCare
                  </Link>
                </li>
                <li className="font-light text-base ml-2 mr-2 flex">
                  {loggedUserName && <p>{loggedUserName}</p>}
                  <Image
                    src={userIcon}
                    alt=""
                    width="20"
                    height="20"
                    className="ml-2"
                  />
                </li>
              </ul>
            </nav>
            <div className="border-l-2 border-gray-300 h-12 mx-8"></div>
            <a className="flex items-center cursor-pointer" onClick={Logout}>
              <span className="font-bold text-lg mr-2">Sair</span>
              <Image src={sairIcon} alt="" width="30" height="30" />
            </a>
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
        </div>
      )}
    </header>
  );
};

export default Header;
