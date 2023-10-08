"use client";

import "chart.js/auto";
import Image from "next/image";
import React from "react";
import { Bar } from "react-chartjs-2";
import BedBaixo from "../../public/bed-baixo.svg";
import BedAlto from "../../public/bed-alto.svg";
export default function Dashboard() {
  const dadosLeitos = [
    { leito: "01", risco: "alto" },
    { leito: "02", risco: "alto" },
    { leito: "03", risco: "baixo" },
    { leito: "04", risco: "baixo" },
    { leito: "05", risco: "baixo" },
  ];

  const data = {
    labels: ["Neutropenia Febril", "Sem neutropenia febril"],
    datasets: [{
      label: "Visão geral",
      data: [2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1
    }]
  };

  return (
    <div className="flex min-h-full items-center">
      <div className="w-[100%] h-[70vh] mx-auto pt-3 px-7 bg-[#fff] pb-6 rounded-lg flex gap-3">
        <aside className="w-[250px] h-[100%] p-4" style={{ border: "1px solid #689f92" }}>
          <button className="h-[60px] w-full bg-[#90D8C7] text-[#fff] text-xl rounded-lg mb-3">Dashboard</button>
          <button className="h-[60px] w-full bg-[#CCDBD8] text-[#689F92] text-xl rounded-lg">Pacientes</button>
        </aside>
        <div className="flex flex-col gap-4">
          <main className="w-[750px] h-[280px]" style={{ border: "1px solid #689f92" }}>
            <Bar
              data={data}
              width={400}
              height={200}
              options={{
                maintainAspectRatio: false
              }}
            />
          </main>
          <section className="w-[750px] h-[170px] p-1" style={{ border: "1px solid #689f92" }}>
            <h2 className="text-center">Leitos</h2>
            <div className="grid grid-cols-3">

              {dadosLeitos.map((el) => (
                <div className="flex items-center gap-4" key={el.leito}>
                  <p>{el.leito}</p>
                  {el.risco === "alto" && <Image src={BedAlto} alt="Alto Risco" />}
                  {el.risco === "baixo" && <Image src={BedBaixo} alt="Baixo Risco" />}
                </div>)
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );

}