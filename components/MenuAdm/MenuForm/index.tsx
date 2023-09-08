import MenuForm from "./MenuForm/index";
import styles from "./styles.module.css";


const Menu = () => {
    return (
      <>
        <div className={styles.header}></div>
        <div className={styles.container}>
          <form className={styles.menuForm}>
            <div className={styles.menuHeader}>
              <h1 className={styles.headerTitle}>PROTOCOLOS</h1>
            </div>
            <div className={styles.sep}></div>
            <div className={styles.content}>
              {<MenuForm />}
            </div>
          </form>
        </div>
      </>
    );
  };

export default Menu;