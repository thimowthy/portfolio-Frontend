import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

const MedicamentoSelector = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedMedicamento, setSelectedMedicamento] = useState(null);

  useEffect(() => {
    const fetchMedicamentos = async () => {
      setLoading(true);
      try {
        // Faça a requisição à API para obter a lista de medicamentos
        // Substitua a URL abaixo pela sua API real
        const response = await fetch(`https://sua-api.com/medicamentos?q=${inputValue}`);
        const data = await response.json();
        setMedicamentos(data);
      } catch (error) {
        console.error("Erro ao buscar medicamentos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (inputValue.length > 2) {
      fetchMedicamentos();
    } else {
      setMedicamentos([]);
    }
  }, [inputValue]);

  return (
    <Autocomplete
      id="medicamento-selector"
      options={medicamentos}
      getOptionLabel={(option) => option.nome} // Substitua "nome" pelo campo que contém o nome do medicamento na resposta da API
      value={selectedMedicamento}
      onChange={(_, newValue) => setSelectedMedicamento(newValue)}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Pesquisar Medicamento"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default MedicamentoSelector;