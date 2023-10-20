import React from "react";
import Link from "next/link";
import Image from "next/image";
import logoIcon from "@/public/logo.png";
import sairIcon from "@/public/sair.svg";
import novoPacienteIcon from "@/public/add_patient.svg";
import medicamentoIcon from "@/public/medicine.svg";
import anotacoesIcon from "@/public/notes.svg";
import styles from "./styles.module.css";
import { clearLocalStorage } from "@/utils/clearLocalStorage";


const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href="/">
        <Image className="logo-img" src={logoIcon} alt="" width="75" height="75" />
        <span className={styles.logoname}>OncoCareSystem</span>
        <div className={styles.sep}></div>
      </Link>
      <div className={styles.icons}>
        <div className={styles.sep}></div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <button>
                <div className="flex items-center gap-2">
                  <Image src={novoPacienteIcon} alt="Adicionar Paciente" width="40" height="40" />
                  <span>Novo Paciente</span>
                </div>
              </button>
            </li>
            <div className={styles.sep}></div>
            <li>
              <button>
                <div className="flex items-center gap-2">
                  <Image src={medicamentoIcon} alt="Prescrever Medicação" width="35" height="35" />
                  <span>Prescrever Medicação</span>
                </div>
              </button>
            </li>
            <div className={styles.sep}></div>
            <li>
              <button>
                <div className="flex items-center gap-2">
                  <Image src={anotacoesIcon} alt="Cuidados e Recomendações" width="40" height="40" />
                  <span>Cuidados e Recomendações</span>
                </div>
              </button>
            </li>
          </ul>
        </nav>
        <div className={styles.sep}></div>
        <Link className={styles.sair} href="/login" onClick={clearLocalStorage}>
          <span className="mr-2 text-lg font-bold">Sair</span>
          <Image src={sairIcon} alt="" width="30" height="30" />
        </Link>
      </div>

    </header>
  );
};

export default Header;
