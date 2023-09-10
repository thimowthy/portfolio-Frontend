import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import Router from "next/router";

const mockedData = [
    { id: 1, name: "Protocolo Neutropenia 2022 V1.0" },
    { id: 2, name: "Protocolo Neutropenia 2022 V1.1" },
    { id: 3, name: "Protocolo Neutropenia 2022 V1.2" },
    { id: 4, name: "Protocolo Neutropenia 2023 V1.0" },
  ];


const MenuFormContent = () => {

    const [ listData, setListData ] = useState(mockedData);
    const [ selectedItemId, setSelectedItemId ] = useState<number | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          // Handle the uploaded file here
          //console.log("Uploaded file:", file);
      }
    };

    const handleItemClick = (itemId:number) => {
      setSelectedItemId(itemId);
    };

    useEffect(() => {
      fetch("")
        .then(response => response.json())
        .then(data => setListData(data))
        .catch(error => console.error("Error ", error));
    }, []);

  return (
    <div className={styles.menuDiv}>
      <div className={styles.buttons}>
      <button
        className={styles.button}
        type="button"
        onClick={() => {
          Router.push("/criar-protocolo");
        }}
      >Novo Protocolo</button>
      <button className={styles.button} type="button">Editar Protocolo</button>
      <button className={styles.button} type="button">Efetivar Protocolo</button>
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        style={{ display: "none" }}
        id="fileInput"
      />
      <label htmlFor="fileInput" className={styles.button}>Importar Protocolo</label>
      <button className={styles.button}>
        <Link href="/crud-usuarios">Gerenciar Usuários</Link>
      </button>
      </div>
      <div className={styles.textDiv}>
        <ul>
            { listData.map(item => (
              <li
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`${styles.listItem} ${
                selectedItemId === item.id ? styles.selected : ""
                }`}
              >
                <span className={styles.marker}>•</span> {"  " + item.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuFormContent;
