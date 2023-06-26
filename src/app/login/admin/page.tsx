import { Login } from "@/components/login/login.component";
import styles from "./page.styles.module.scss";

const LoginAdminPage = ()  => {
  return (
    <div className={styles.loginAdmin}>
      <Login type="admin"/>
    </div>
  );
}

export default LoginAdminPage;