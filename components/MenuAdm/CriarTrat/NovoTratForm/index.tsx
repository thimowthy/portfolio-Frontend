import React, { useState } from "react";
import styles from "./styles.module.css";

const TratFormContent: React.FC = () => {
  
  return (
    <div className={styles.formContainer}>
      <div className={styles.textDiv}>
        <p className={styles.textInfo}>
          Um fluxograma de diagnóstico é uma representação visual que ilustra o 
          processo de determinar a presença ou ausência de uma determinada condição
          médica com base em uma série de condições e restrições lógicas.
          Um fluxograma de tratamento é uma representação visual das etapase decisões
          envolvidas no tratamento de uma condição médica específica. Ele é projetado
          para fornecer uma visão geral clara e organizada do plano de tratamento, 
          incluindo as intervenções médicas, terapias, medicamentos e ações a serem
          tomadas em diferentes estágios da doença.
        </p>
      </div>
    </div>
  );
};

export default TratFormContent;
