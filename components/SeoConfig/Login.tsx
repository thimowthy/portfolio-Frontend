import { useState, FormEvent } from 'react';
import styles from '@/styles/Login.module.css'; // Import the CSS module

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle the login logic here
    console.log('Login credentials:', { username, password });
  };

  return (
    <div className={styles.loginContainer}> {/* Add the container div */}
        <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
            Usuário:
            </label>
            <input
            type="text"
            id="username"
            className={styles.input}
            value={username}
            onChange={handleUsernameChange}
            />
        </div>
        <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
            Senha:
            </label>
            <input
            type="password"
            id="password"
            className={styles.input}
            value={password}
            onChange={handlePasswordChange}
            />
        </div>
        <button type="submit" className={styles.button}>
            Login
        </button>
        </form>
    </div>
  );
};

export default Login;
