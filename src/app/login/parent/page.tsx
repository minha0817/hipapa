import { Login } from "@/components/login/login.component";
import styles from "./page.styles.module.scss";

const LoginParentPage = ()  => {
  return (
    <div className={styles.loginParent}>
      <Login type="parent"/>
    </div>
  )
}

export default LoginParentPage;