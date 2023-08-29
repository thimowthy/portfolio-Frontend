import { useState } from "react";
import styles from "./styles.module.css";
import BackIcon from "@/components/backIcon";

interface FormBoxProps {
    title: string;
    content: React.ReactNode;
    showButton: boolean;
    setWinCriarProt: React.Dispatch<React.SetStateAction<boolean>>;
    setFormVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
const FormBox: React.FC<FormBoxProps> = ({ title, content, showButton, setWinCriarProt, setFormVisibility }) => {
  return (
    <>
      <div className={styles.header}></div>
      <div className={styles.container}>
        <form className={styles.menuForm}>
          <div className={styles.menuHeader}>
            {showButton && (
              <>
                <button
                  id="backBtn"
                  style={{ display: "none" }}
                  onClick={() => {
                    setWinCriarProt(false);
                    setFormVisibility(true);
                  }}/>
                <label htmlFor="backBtn" className={styles.backButton}>
                  <BackIcon width={40} height={40} color="#333"/>
                </label>
              </>
            )}
            <h1 className={styles.headerTitle}>{title}</h1>
          </div>
          <div className={styles.sep}></div>
          <div className={styles.content}>{content}</div>
        </form>
      </div>
    </>
  );
};

export default FormBox;
