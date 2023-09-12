
import { useState } from "react";
import Header from "@/components/Header";
import FormEstratificacao from "@/components/FormEstratificacao";
import SeoConfig from "@/components/SeoConfig";
import Router, { useRouter } from "next/router";
import Loader from "@/components/Loader";


const EstratificacaoRisco = () => {
  const [ loading, setLoading ] = useState(false);

  const router = useRouter();
  const data = router.query;

  return (
    <>
      <SeoConfig title="Estratificação de Risco" />
      {loading && <Loader />}
      <Header />
      <FormEstratificacao paciente={data} setLoading={setLoading}/>
    </>
  );
};

export default EstratificacaoRisco;
