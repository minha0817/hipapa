import { TeacherCheckIn } from "@/components/userCheckIn/teacherCheckIn";
import styles from "./adminHomePage.module.scss";
import { CurrentTime } from "@/components/currentTime/currentTime.component";
import { ChildrenCheckIn } from "@/components/userCheckIn/childrenCheckIn";

const AdminHomePage = () => {
  return (
    <div className={styles.adminHome}>
      <CurrentTime />
      <div>
        <TeacherCheckIn />
      </div>
      <div>
        <ChildrenCheckIn />
      </div>
    </div>
  );
};

export default AdminHomePage;
