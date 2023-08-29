import SeoConfig from "@/components/SeoConfig";
import MenuForm from "@/components/MenuAdm/MenuForm/index";
import NovoProtForm from "@/components/MenuAdm/CriarProtocolo/index";

import Header from "@/components/Header";
import { useState } from "react";

const MenuAdm = () => {

  const [ winCriarProt, setWinCriarProt ] = useState(false);
  const [ formVisibility, setFormVisibility ] = useState(true);

    return (
      <>
        <div>
          <SeoConfig title="Menu" />
          <Header />
          
          {formVisibility &&
          <MenuForm 
            setFormVisibility={setFormVisibility}
            setWinCriarProt={setWinCriarProt}
          />}
          {winCriarProt &&
          <NovoProtForm 
            setFormVisibility={setFormVisibility}
            setWinCriarProt={setWinCriarProt}
          />}

        </div>
      </>
    );
  };
  
  export default MenuAdm;