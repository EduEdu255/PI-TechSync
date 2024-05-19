import { useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.css";


export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className={ styles.root}>
      <img src="./public/airplane-crash.svg" />
      <h1>Ops!</h1>
      <p className={styles.text }>Desculpe, ocorreu um erro inesperado.</p>
      <p className={styles.status}>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
