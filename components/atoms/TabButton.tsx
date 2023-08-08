// components/TabButton.tsx

import React from "react";
import styles from "@/styles/patientList.module.css";

type TabButtonProps = {
  active: boolean;
  onClick: () => void;
  label: string;
};

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, label }) => {
  return (
    <button
      className={`${styles["patient-button"]} ${
        active ? styles["active"] : ""
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TabButton;
