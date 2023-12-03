import { useState } from "react";
import styles from "./styles.module.css";
import BackIcon from "@/components/buttons/backIcon";
import Router from "next/router";
import ExameForm from "./CadastrarExameForm";
import { ExameProps } from "./ExameProps";
import Link from "next/link";

const CadastrarExame: React.FC<ExameProps> = ({
  pacientes,
  medicos
}) => {
  return (
    <>
      <div className={styles.header}></div>
      <div className={styles.container}>
        <form className={styles.menuForm}>
          <div className={styles.menuHeader}>
            <Link
              id="backBtn"
              type="button"
              href={{
                pathname: "/dados-paciente",
              }}
            >
              <label htmlFor="backBtn" className={styles.backButton}>
                <BackIcon width={40} height={40} color="#333" />
              </label>
            </Link>
            <h1 className={styles.headerTitle}>Cadastrar Exame</h1>
          </div>
          <div className={styles.sep}></div>
          <div className={styles.content}>
            <ExameForm
              pacientes={pacientes}
              medicos={medicos}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CadastrarExame;
