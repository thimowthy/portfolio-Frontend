import { useState } from "react";
import styles from "./styles.module.css";
import BackIcon from "@/components/buttons/backIcon";
import Router from "next/router";
import ExameForm from "./SolicitarExameForm";
import { ExameProps } from "./ExameProps";


const SolicitarExame: React.FC<ExameProps> = ({ id, paciente, leito, prontuario }) => {

  return (
    <>
      <div className={styles.header}></div>
      <div className={styles.container}>
        <form className={styles.menuForm}>
          <div className={styles.menuHeader}>
            <button
                id="backBtn"
                style={{ display: "none" }}
                type="button"
                onClick={() => {
                  Router.push(`/dados-paciente/${id}`);
                }}/>
            <label htmlFor="backBtn" className={styles.backButton}>
                <BackIcon width={40} height={40} color="#333"/>
            </label>
            <h1 className={styles.headerTitle}>Solicitar Exame</h1>
          </div>
          <div className={styles.sep}></div>
          <div className={styles.content}>
            <ExameForm
              id={id}
              prontuario={prontuario}
              leito={leito}
              paciente={paciente}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SolicitarExame;