import { useState, FormEvent } from "react";
import jwt_decode from "jwt-decode";
import Image from "next/image";
import Router from "next/router";
import logo from "@/public/logo.png";
import ErrorToast from "@/components/toasts/errorToast";
import styles from "./styles.module.css";
import fetcher from "@/api/fetcher";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [LoginError, setLoginError] = useState(false);
  const [error, setError] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  /**
   * Manipula o envio do formulário de login.
   * @param {FormEvent<HTMLFormElement>} e - O evento de envio do formulário.
   * @returns {Promise<void>} Uma promessa que é resolvida após o processamento do envio do formulário.
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    /**
     * As credenciais de login do usuário.
     * @type {Object}
     * @property {string} login - O nome de usuário.
     * @property {string} password - A senha do usuário.
     */
    e.preventDefault();
    const credentials = {
      login: username,
      senha: password,
    };

    try {
      /**
       * A resposta da solicitação de envio do formulário.
       * @type {Response}
       */
      const response = await fetcher({
        rota: "/Auth/Autenticacao",
        metodo: "POST",
        cabecalho: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      localStorage.setItem("Authorization", response.token);
      localStorage.setItem("Cargo", response.token);

      const decodedToken: JwtPayload = jwt_decode(response.token);

      switch (decodedToken.cargo) {
        case "ADMINISTRADOR":
          Router.push("/menu");
          break;
        case "MEDICO":
          Router.push("/dados-paciente");
          break;
        case "ENFERMEIRO":
          Router.push("/dados-paciente");
          break;
        case "LABORATORISTA":
          Router.push("/cadastrar-exame");
          break;
        default:
          Router.push("/dashboard");
      }
      //console.log("Login successful!");
      // } else if (response.status == 401) {
      //   setLoginError(true);
      //   // console.log("Invalid credentials");
      // } else {
      //   setError(true);
      //   // console.error("Error occurred during login:", error);
      // }
    } catch (error) {
      setError(true);
      // console.error("Error occurred during login:", error);
    }

    // console.log("Login credentials:", { username, password });
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.formHeader}>
          <Image
            className="logo-img"
            src={logo}
            alt=""
            width="100"
            height="100"
          />
        </div>
        <h1 className={styles.headerText}>Acesse o sistema</h1>
        <div className={styles.sep}></div>
        <div className={styles.dataInput}>
          <input
            type="text"
            id="username"
            placeholder="Usuário"
            className={styles.input}
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className={styles.dataInput}>
          <input
            type="password"
            id="password"
            placeholder="Senha"
            className={styles.input}
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className={styles.dataInput}>
          <button type="submit" className={styles.button}>
            Login
          </button>
        </div>
        <div className={styles.sep}></div>
        <div>
          <p className={styles.infoText}>
            A EBSERH protege os dados pessoais com seriedade, respeito e de
            acordo com a lei. Pedimos que você faça o mesmo com os dados
            pessoais de terceiros ao acessar o OncoCareSystem. Não divulgue ou
            compartilhe dados pessoais de terceiros contidos no sistema sem o
            consentimento expresso do titular de dados.
          </p>
        </div>
      </form>
      <div className={styles.loginError}>
        {LoginError && (
          <ErrorToast
            title="Erro de login"
            message="Erro ao realizar login, credenciais inválidas"
            onClose={() => {
              setLoginError(false);
            }}
          />
        )}
        {error && (
          <ErrorToast
            title="Ops, algo deu errado"
            message="Ocorreu um problema ao tentar efetuar o login. Tente novamente mais tarde"
            onClose={() => {
              setError(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
