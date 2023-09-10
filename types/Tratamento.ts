import TratamentoNode from "./tratNode";

type Tratamento = {
    nodes: {
      [key: string]: TratamentoNode;
    };
  };
  
  export default Tratamento;
  