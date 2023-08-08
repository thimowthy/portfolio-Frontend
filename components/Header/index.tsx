// Header.js

import React from "react";
import styles from "@/styles/Header.module.css";
import Image from "next/image";
import logo from "@/public/logo.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <a className={styles.logo} href="/">
        <Image className="logo-img" src={logo} alt="" width="75" height="75" />
        <span className={styles.logoname}>OncoCareSystem</span>
      </a>
      <nav className={styles.nav}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/login">Acesso ao Sistema</a>
          </li>
          <li>
            <a href="/about">Sobre o OncoCare</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
