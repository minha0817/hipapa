"use client";
import { TeacherCheckIn } from "@/components/userCheckIn/teacherCheckIn";
import styles from "./adminHomePage.module.scss";
import { CurrentTime } from "@/components/currentTime/currentTime.component";
import { ChildrenCheckIn } from "@/components/userCheckIn/childrenCheckIn";
import { useEffect, useState } from "react";
import { Child, Teacher } from "@/dbModels/types";
import { getChildren, getTeachers } from "@/api/get";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  getChildrenCheckIn,
  getTeacherCheckIn,
} from "@/api/checkIn/checkIn.apis";
import { Affix } from "@mantine/core";

const AdminHomePage = () => {
  const supabase = createClientComponentClient();
  const [children, setChildren] = useState<Child[]>([]);
  const [childrenCheckInData, setChildrenCheckInData] = useState([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [teacherCheckinData, setTeacherCheckInData] = useState([]);

  useEffect(() => {
    getTeachers(supabase).then((data) => setTeachers(data));
    getTeacherCheckIn(supabase).then((data: any) => {
      return setTeacherCheckInData(data);
    });
    getChildren(supabase).then((data) => setChildren(data));
    getChildrenCheckIn(supabase).then((data: any) => {
      return setChildrenCheckInData(data);
    });
  }, []);

  useEffect(() => {
    const checkIn = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "check_in" },
        () => {
          getChildrenCheckIn(supabase).then((data: any) => {
            return setChildrenCheckInData(data);
          });
          getTeacherCheckIn(supabase).then((data: any) => {
            return setTeacherCheckInData(data);
          });
        }
      )
      .subscribe();

    return () => {
      checkIn.unsubscribe();
    };
  }, [supabase]);

  return (
    <div className={styles.adminHome}>
      <CurrentTime />
      <div>
        <TeacherCheckIn teachers={teachers} checkInData={teacherCheckinData}/>
      </div>
      <div>
        <ChildrenCheckIn childrenList={children} checkInData={childrenCheckInData}/>
      </div>
      <Affix />
    </div>
  );
};

export default AdminHomePage;
