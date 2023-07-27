// components/PatientList.tsx

import React, { useState } from 'react';
import PatientCard from './PatientCard';
import { Patient } from '../../types/patient';
import styles from '../../styles/patientList.module.css';
import TabButtonList from './TabButtonList'; // Import the TabButtonList component

type PatientListProps = {
  patients: Patient[];
};

enum Tab {
  All,
  Pending,
  Diagnosed,
}

const PatientList: React.FC<PatientListProps> = ({ patients }) => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.All);

  const filterPatients = (tab: Tab) => {
    switch (tab) {
      case Tab.All:
        return patients;
      case Tab.Pending:
        return patients.filter((patient) => patient.pending);
      case Tab.Diagnosed:
        return patients.filter((patient) => patient.diagnosed);
      default:
        return patients;
    }
  };

  return (
    <div className={styles['patient-box']}>
      <TabButtonList activeTab={activeTab} onTabChange={setActiveTab} />
      <div className={styles['list-container']}>
        <div className={styles['patient-list-container']}>
          {filterPatients(activeTab).map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientList;
