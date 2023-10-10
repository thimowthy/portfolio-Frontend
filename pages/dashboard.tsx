import dynamic from "next/dynamic";
import { useState } from "react";
import Header from "@/components/Header";
import SeoConfig from "@/components/SeoConfig";
import Dashboard from "@/components/Dashboard";

const DashboardPage = () => {
  return (
    <>
      <SeoConfig title="Dashboard" />
      <Header />
      <Dashboard />
    </>
  );
};

export default DashboardPage;
