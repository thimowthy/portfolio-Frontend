import { useState, FormEvent } from "react";
import Image from "next/image";
import Router from 'next/router';
import logo from "@/public/logo.png";
import ErrorToast from "@/components/toasts/errorToast";
import styles from "./Login.module.css";

const Login: React.FC = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  /**
   * As credenciais de login do usuário.
   * @type {Object}
   * @property {string} username - O nome de usuário.
   * @property {string} password - A senha do usuário.
   */
    e.preventDefault();
    const credentials = {
      userName: username,
      senha: password,
    };

    try {
      /**
       * A resposta da solicitação de envio do formulário.
       * @type {Response}
       */
      const response = await fetch("https://localhost:7091/api/v1/autenticacao", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("Authorization", "Bearer " + data.value);
          Router.push('/dados-paciente')
          console.log("Login successful!");
        } else {
          setError(true);
          console.log("Login failed!");
        }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }

    /**
     * Imprime as credenciais de login no console.
     * @type {Object}
     * @property {string} username - O nome de usuário.
     * @property {string} password - A senha do usuário.
     */
    console.log("Login credentials:", { username, password });
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
      <div className="loginError">
        {error && (
          <ErrorToast
            title="Erro de login"
            message="Erro ao realizar login, credenciais inválidas"
            onClose={() => { setError(false) } }
          />
        )}
      </div>
    </div>
  );
};

export default Login;