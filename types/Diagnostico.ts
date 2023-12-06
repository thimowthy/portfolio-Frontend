import DiagnosticoNode from "./diagNode";

  type Diagnostico = {
    nodes: {
      [key: string]: DiagnosticoNode;
    };
  };
  
  export default Diagnostico;
  