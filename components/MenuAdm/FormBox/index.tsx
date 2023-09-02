import { useState } from "react";
import styles from "./styles.module.css";
import BackIcon from "@/components/backIcon";

interface FormBoxProps {
    title: string;
    content: React.ReactNode;
    showButton: boolean;
    openWin: string;
    closeWin: string;
    setOpenWindow: React.Dispatch<React.SetStateAction<string>>;
    setCloseWindow: React.Dispatch<React.SetStateAction<string>>;
  }
  
const FormBox: React.FC<FormBoxProps> = ({ title, content, showButton, openWin, closeWin, setOpenWindow, setCloseWindow }) => {
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
                  type="button"
                  onClick={() => {
                    console.log(openWin, closeWin);
                    setOpenWindow(openWin);
                    setCloseWindow(closeWin);

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
