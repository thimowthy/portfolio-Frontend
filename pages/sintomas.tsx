import { useState } from "react";
import Header from "@/components/Header";
import SeoConfig from "@/components/SeoConfig";
import Loader from "@/components/Loader";
import fetcher from "@/api/fetcher";
import Form01Sintomas from "@/components/Form01Sintomas";
import Form02Sintomas from "@/components/Form02Sintomas";
const Sintomas = () => {
  const [loading, setLoading] = useState(false);
  const [instabilidadeH, setInstabilidadeH] = useState(false);
  const [formInicial, setFormInicial] = useState(true);

  return (
    <>
      <SeoConfig title="Sintomas" />
      <Header />
      {loading && <Loader />}
      {formInicial && <Form01Sintomas setInstabilidadeH={setInstabilidadeH} setFormInicial={setFormInicial} />}
      {instabilidadeH && <Form02Sintomas />}
      {!instabilidadeH && <Form02Sintomas />}
    </>
  );
};

export default Sintomas;
