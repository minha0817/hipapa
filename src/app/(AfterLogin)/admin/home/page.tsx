import { Children } from "@/components/children/children.component";
import { Teachers } from "@/components/teachers/teachers.component";
import styles from "./adminHomePage.module.scss";
import { CurrentTime } from "@/components/currentTime/currentTime.component";
import { amaticScFontClass } from "@/lib/font";
import { CheckinStatus } from "@/components/checkinStatus/checkinStatus.component";

const AdminHomePage = async () => {

  return (
    <div className={styles.adminHome}>
      <CurrentTime />
      <div>
        <Teachers />
      </div>
      <div>
        <div className="titleBox">
          <p className={amaticScFontClass}>Children</p>
          {/* <CheckinStatus /> */}
        </div>
        <Children />
      </div>
    </div>
  );
};

export default AdminHomePage;
