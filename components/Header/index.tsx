// Header.js

import React from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href="/">
        <Image className="logo-img" src={logo} alt="" width="75" height="75" />
        <span className={styles.logoname}>OncoCareSystem</span>
      </Link>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/login">Acesso ao Sistema</Link>
          </li>
          <li>
            <Link href="/about">Sobre o OncoCare</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
