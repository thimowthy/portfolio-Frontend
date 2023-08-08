import { useState, FormEvent } from "react";
import styles from "@/styles/Login.module.css";
import Image from "next/image";
import logo from "@/public/logo.png";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        console.log("Login successful!");
      } else {
        console.log("Login failed!");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }

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
        <div className={styles.textInput}>
          <input
            type="text"
            id="username"
            placeholder="Usuário"
            className={styles.input}
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className={styles.textInput}>
          <input
            type="password"
            id="password"
            placeholder="Senha"
            className={styles.input}
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className={styles.textInput}>
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
    </div>
  );
};

export default Login;
