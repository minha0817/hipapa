import { Children } from "@/components/children/children.component";
import { Teachers } from "@/components/teachers/teachers.component";
import styles from "./adminHomePage.module.scss";
import { CurrentTime } from "@/components/currentTime/currentTime.component";

const AdminHomePage = () => {
  return (
    <div className={styles.adminHome}>
      <CurrentTime />
      <div>
        <Teachers />
      </div>
      <div>
        <Children />
      </div>
    </div>
  )
}

export default AdminHomePage;