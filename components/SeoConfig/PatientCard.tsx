// components/PatientCard.tsx

import React from 'react';
import { Patient } from '@/types/patient';
import styles from '@/styles/patientCard.module.css';

type PatientCardProps = {
  patient: Patient;
};

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const openInfoBox = () => {
    console.log(`Opening info box for patient ${patient.name}`);
  };

  const getSmileyOrSadFace = () => {
    switch (patient.risk) {
      case 'low':
        return '😊';
      case 'medium':
        return '😐';
      case 'high':
        return '🤒';
      default:
        return '😐';
    }
  };

  return (
    <div className={styles['patient-card']}>
      <span className={styles['patient-smiley']}>{getSmileyOrSadFace()}</span>
      <div className={styles['patient-info']}>
        <span className={styles['patient-name']}>{patient.name}</span>
        <span className={styles['patient-id']}>ID: {patient.id}</span>
      </div>
      <button className={styles['patient-button']} onClick={openInfoBox}>
        Ver Paciente
      </button>
    </div>
  );
};

export default PatientCard;
