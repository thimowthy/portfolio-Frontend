// components/TabButtonList.tsx

import React from 'react';
import TabButton from './TabButton';
import styles from '../../styles/patientList.module.css';

type TabButtonListProps = {
  activeTab: number;
  onTabChange: (tab: number) => void;
};

enum Tab {
  All,
  WithDependencies,
  DiagnosedWithDisease,
}

const TabButtonList: React.FC<TabButtonListProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className={styles['tab-buttons']}>
      <TabButton active={activeTab === Tab.All} onClick={() => onTabChange(Tab.All)} label="Todos" />
      <TabButton active={activeTab === Tab.WithDependencies} onClick={() => onTabChange(Tab.WithDependencies)} label="Pendentes" />
      <TabButton active={activeTab === Tab.DiagnosedWithDisease} onClick={() => onTabChange(Tab.DiagnosedWithDisease)} label="Diagnosed" />
    </div>
  );
};

export default TabButtonList;
