import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import BackIcon from "@/components/buttons/backIcon";
import Router from "next/router";
import ExameForm from "./CadastrarExameForm";
import ExamesList from "../ExameList";
import { CrudExameProps } from "./CrudExameProps";
import Link from "next/link";

const CadastrarExame: React.FC<CrudExameProps> = ({
  pacientes,
  medicos,
}) => {

  const [exame, setExame] = useState<Hemograma>();
  
  useEffect(() => {
    console.log(exame);
  }, [exame]);
  
  return (
    <>
      <div className={styles.header}></div>
      <div className="flex w-full ml-0">
        <div className="mt-8 mr-16 overflow-auto bg-gray-200 p-8 w-min-96 rounded">
          <ExamesList
            id={""}
            setExame={setExame}
          />
        </div>
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
                exame={exame}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CadastrarExame;
