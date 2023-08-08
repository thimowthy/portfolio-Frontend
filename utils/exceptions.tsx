import React from "react";
const loginError = () => {
  return <div>Erro de login</div>;
};

const serverError = () => {
  return <div>Erro do servidor</div>;
};

export default {
  serverError,
  loginError,
};
