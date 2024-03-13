import SeoConfig from "@/components/SeoConfig";
import CadastrarExameForm from "@/components/CadastrarExame";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import fetcher from "@/api/fetcher";

const CadastrarExame = () => {
  return (
    <div>
      <SeoConfig title="Cadastrar Exame" />
      <Header />
      <CadastrarExameForm/>
    </div>
  );
};

export default CadastrarExame;
