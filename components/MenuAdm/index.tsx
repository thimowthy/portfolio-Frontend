import React, { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import styles from "./Menu.module.css";
import Link from "next/link";


const Menu = () => {
  
  const mockedData = [
    { id: 1, name: "Protocolo Neutropenia 2022 V1.0" },
    { id: 2, name: "Protocolo Neutropenia 2022 V1.1" },
    { id: 3, name: "Protocolo Neutropenia 2022 V1.2" },
    { id: 4, name: "Protocolo Neutropenia 2023 V1.0" },
  ];

  const [ listData, setListData ] = useState(mockedData);
  const [ selectedItemId, setSelectedItemId ] = useState<number | null>(null);
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        // Handle the uploaded file here
        console.log("Uploaded file:", file);
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
        <>
        <div className={styles.header}></div>
        <div className={styles.container}>
          <form className={styles.menuForm}>
            <div className={styles.menuHeader}>
                <h1>PROCOTOLOS</h1>
            </div>
            <div className={styles.sep}></div>
            <div className={styles.menuDiv}>
                <div className={styles.buttons}>
                    <button className={styles.button}>Novo Protocolo</button>
                    <button className={styles.button}>Editar Protocolo</button>
                    <button className={styles.button}>Efetivar Protocolo</button>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        style={{ display: "none" }}
                        id="fileInput"
                    />
                    <label htmlFor="fileInput" className={styles.button}>
                      Importar Protocolo
                    </label>
                    <button className={styles.button}><Link href="/crud-usuarios">Gerenciar Usuários</Link></button>
                </div>
                <div className={styles.textDiv}>
                  <ul>
                    {listData.map(item => (
                      <li
                        key={item.id}
                        onClick={() => handleItemClick(item.id)}
                        className={`${styles.listItem} ${selectedItemId === item.id ? styles.selected : ""}`}
                      >
                        <span className={styles.marker}>•</span>
                        {"  " + item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
          </form>
        </div>
        </>
      );
};

export default Menu;