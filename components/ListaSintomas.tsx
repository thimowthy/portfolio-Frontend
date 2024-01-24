import React from "react";

interface SintomasListaProps {
    sintomas: Record<string, boolean>;
    labels: string[];
    handleCheckboxChange: (key: string) => void;
}

const ListaSintomas: React.FC<SintomasListaProps> = ({ sintomas, labels, handleCheckboxChange }) => {
    return (
    <>
      {Object.keys(sintomas).map((key, index) => (
        <>
          <div key={key} className="flex mb-4 justify-between">
              <p>{labels[index]}</p>
              <input
                className="w-8"
                type="checkbox"
                onChange={() => handleCheckboxChange(key)}
                checked={sintomas[key]} />
          </div>
          <div className="border-b my-4" />
        </>
      ))}
    </>
  );
};

export default ListaSintomas;
