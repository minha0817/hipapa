import { Login } from "@/components/login/login.component";
import styles from "./page.styles.module.scss";

export default function () {
  return (
    <div className={styles.loginAdmin}>
      <Login />
    </div>
  );
}
