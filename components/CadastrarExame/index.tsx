import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import BackIcon from "@/components/buttons/backIcon";
import Router from "next/router";
import ExameForm from "./CadastrarExameForm";
import ExamesList from "../ExameList";
import { CrudExameProps } from "./CrudExameProps";
import Link from "next/link";

const CadastrarExame: React.FC<CrudExameProps> = () => {
  const [exame, setExame] = useState<Hemograma>();

  return (
    <>
      <div className={styles.header}></div>
      <div className="flex">
        <div className="mt-[40px] mr-4 p-2 bg-gray-100 h-[560px] w-96 rounded-lg">
          <div className="overflow-auto h-[540px] px-4">
            <ExamesList id={""} setExame={setExame} />
          </div>
        </div>
        <div className="flex items-center justify-center h-[630px]">
          <div className={styles.menuForm}>
            <div className={styles.menuHeader}>
              <h1 className={styles.headerTitle}>Cadastrar Exame</h1>
              <button
                className="ml-auto w-8 h-8 rounded-full flex text-xl text-white justify-center bg-orange-500"
                type="button"
                title="Cadastrar novo exame"
                onClick={() => {
                  setExame(undefined);
                }}
              >
                <span>+</span>
              </button>
            </div>
            <div className={styles.sep}></div>
            <div className="w-min">
              <ExameForm exame={exame} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CadastrarExame;
