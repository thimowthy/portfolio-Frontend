"use client";

import "chart.js/auto";
import Image from "next/image";
import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import BedBaixo from "../../public/bed-baixo.svg";
import dynamic from "next/dynamic";
import BedAlto from "../../public/bed-alto.svg";
import Link from "next/link";
import TabList from "../TabList";
import TabItem from "../TabItem";
import TabContents from "../TabContents/index";
import { useDashboard } from "@/hooks/useDashboard";
export default function Dashboard() {
  const InitTab = dynamic(() => import("../Tab"), {
    ssr: false,
  });

  const [neutropenicos, internamentos] = useDashboard();

  const data = {
    labels: ["Pacientes neutropênicos", "Pacientes internados"],
    datasets: [
      {
        label: "Visão geral",
        data: [
          neutropenicos,
          typeof internamentos == "object" ? internamentos.length : 0,
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.4)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex min-h-full items-center">
      <div className="w-full h-[90vh] mx-auto pt-3 px-7 pb-6 rounded-lg flex gap-3 mt-[75px]">
        <div className="flex flex-col gap-3 h-full w-1/4">
          <aside
            className="h-[100%] p-4 rounded-lg border-1 bg-[#fff] h-3/5"
            style={{ border: "1px solid #689f92" }}
          >
            <button className="h-[60px] w-full bg-[#90D8C7] text-[#fff] text-xl rounded-lg mb-3">
              Dashboard
            </button>
            <Link
              href="/pacientes"
              className="block text-center py-3 h-[60px] w-full bg-[#CCDBD8] text-[#689F92] text-xl rounded-lg mb-3"
            >
              Pacientes
            </Link>
            <Link
              href="/dados-paciente"
              className="block text-center py-3 h-[60px] w-full bg-[#CCDBD8] text-[#689F92] text-xl rounded-lg mb-3"
            >
              Internações
            </Link>
          </aside>

          <div className="bg-[#fff] p-5 rounded-lg flex flex-col justify-center items-center h-2/5">
            <h1 className="text-lg">Pacientes neutropênicos</h1>
            <div className="inline-flex mt-4 items-center">
              <Image src={BedAlto} alt="Alto Risco" width="60" />
              <span className="text-[#cB2828] ml-4 text-2xl">
                {neutropenicos}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-lg w-3/4 h-full">
          <main
            className="rounded-lg bg-[#fff] p-8 h-3/5 flex flex-col justify-between align-center"
            style={{ border: "1px solid #689f92" }}
          >
            <InitTab />
            <div className="w-full flex justify-center items-center h-full">
              <TabContents
                tabId="tabs-barra"
                active={true}
                className="h-full w-full flex justify-center items-center"
              >
                <Bar
                  data={data}
                  width={400}
                  height={200}
                  options={{
                    maintainAspectRatio: false,
                  }}
                />
              </TabContents>
              <TabContents
                tabId="tabs-pie"
                active={false}
                className="w-2/3 h-full flex justify-center items-center"
              >
                <Pie
                  data={data}
                  width={50}
                  height={50}
                  options={{ maintainAspectRatio: false }}
                />
              </TabContents>
            </div>
            <div>
              <TabList className="flex list-none flex-row flex-wrap border-b-0 justify-center items-center mt-5">
                <TabItem
                  href="tabs-barra"
                  className="px-5 mx-3 rounded border-x-0 border-b-2 border-t-0 border-transparent p-1 font-medium uppercase hover:isolate hover:border-transparent hover:bg-gray-300 focus:isolate focus:border-transparent dark:text-[#16161D] bg-[#CCDBD8] data-[te-nav-active]:bg-[#90D8C7]"
                  title=""
                  active={true}
                />
                <TabItem
                  href="tabs-pie"
                  className="px-5 mx-3 rounded border-x-0 border-b-2 border-t-0 border-transparent p-1 font-medium uppercase hover:isolate hover:border-transparent hover:bg-gray-300 focus:isolate focus:border-transparent dark:text-[#16161D] bg-[#CCDBD8] data-[te-nav-active]:bg-[#90D8C7]"
                  title=""
                />
              </TabList>
            </div>
          </main>

          <section
            className="rounded-lg bg-[#fff] pb-4 px-4 h-2/5"
            style={{ border: "1px solid #689f92" }}
          >
            <h2 className="text-center mb-2 mt-4 text-lg">Internamento</h2>
            <div className="grid grid-cols-5">
              {typeof internamentos == "object" &&
                internamentos.map((el: any) => (
                  <div className="flex items-center gap-4" key={el.leito}>
                    <p
                      className={`${
                        el.risco === "ALTO"
                          ? "text-[#EB2828]"
                          : "text-[#689F92]"
                      } text-xl`}
                    >
                      {el.leito}
                    </p>
                    {el.risco === "ALTO" && (
                      <Image
                        src={BedAlto}
                        alt="Alto Risco"
                        width="40"
                        className="my-1"
                      />
                    )}
                    {el.risco === "BAIXO" && (
                      <Image
                        src={BedBaixo}
                        alt="Baixo Risco"
                        width="40"
                        className="my-1"
                      />
                    )}
                  </div>
                ))}
            </div>
            <div className="absolute bottom-[40px] float-right flex">
              <div className="flex items-center justify-center mr-4">
                <span className="mr-2">Baixo risco</span>
                <Image
                  src={BedBaixo}
                  alt="Baixo Risco"
                  width="30"
                  className="my-1"
                />
              </div>
              <div className="flex items-center justify-center mr-2">
                <span className="mr-2">Alto risco</span>
                <Image
                  src={BedAlto}
                  alt="Alto Risco"
                  width="30"
                  className="my-1"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
