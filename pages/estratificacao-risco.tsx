
import { useState } from "react";
import Header from "@/components/Header";
import FormEstratificacao from "@/components/FormEstratificacao";
import SeoConfig from "@/components/SeoConfig";

const EstratificacaoRisco = () => {

  return (
    <>
      <SeoConfig title="Estratificação de Risco" />
      <Header />
      <FormEstratificacao />
    </>
  );
};

export default EstratificacaoRisco;
