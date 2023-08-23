"use client";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Table,ScrollArea } from "@mantine/core";
import styles from "./teachers.styles.module.scss";
import { getTeachers } from "@/api/get";
import { Teacher } from "@/dbModels/types";
import { amaticScFontClass } from "@/lib/font";
import { createCheckIn, getTeacherCheckIn } from "@/api/checkIn/checkIn.apis";
import { CheckinStatus } from "@/components/checkinStatus/checkinStatus.component";
import { v4 } from "uuid";
import { GetRows } from "./getRows";

type TeacherCheckInProps = {};

const TeacherCheckInComponent: FC<PropsWithChildren<TeacherCheckInProps>> = () => {
  const supabase = createClientComponentClient();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [teacherCheckinData, setTeacherCheckInData] = useState([]);

  useEffect(() => {
    getTeachers(supabase).then((data) => setTeachers(data));
    getTeacherCheckIn(supabase).then((data: any) => {
      return setTeacherCheckInData(data);
    });
  }, []);

  useEffect(() => {
    const checkIn = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "check_in" },
        () => {
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

  const findCurrentUserCheckinState = (teacherId: string) => {
    const clickedTeacher = teacherCheckinData.find((checkindata: any) => {
      return checkindata.teacher_id === teacherId;
    });
    return clickedTeacher;
  };

  const handleTeacherCheckIn = (teacher: Teacher) => {
    const daycareId = teacher.daycare_id;
    const teacherId = teacher.teacher_id;
    const checkedInObj: any = findCurrentUserCheckinState(teacherId);
    if (!checkedInObj) {
      const inputValues = {
        check_in_id: v4(),
        daycare_id: daycareId,
        teacher_id: teacherId,
        is_checked_in: true,
      };
      createCheckIn(supabase, inputValues);
      return;
    }

    const checkInId = checkedInObj?.check_in_id;
    const isCheckedIn = () => {
      if (checkedInObj?.is_checked_in) {
        return false;
      }
      return true;
    };

    const inputValues = {
      check_in_id: checkInId,
      daycare_id: daycareId,
      teacher_id: teacherId,
      is_checked_in: isCheckedIn(),
    };

    createCheckIn(supabase, inputValues);
  };

  const isUserCheckedIn = (user: any) => {
    const foundUser: any = findCurrentUserCheckinState(user.teacher_id);
    return foundUser?.is_checked_in;
  };

  return (
    <ScrollArea className={styles.teachers}>
      <div className="titleBox">
        <p className={amaticScFontClass}>Teachers</p>
        <CheckinStatus data={teachers} checkInData={teacherCheckinData} />
      </div>
      <Table verticalSpacing="sm">
        <tbody>
          <GetRows
            users={teachers}
            isUserCheckedIn={isUserCheckedIn}
            handleUserCheckIn={handleTeacherCheckIn}
          />
        </tbody>
      </Table>
    </ScrollArea>
  );
};
TeacherCheckInComponent.displayName = "TeacherCheckIn";

export const TeacherCheckIn = TeacherCheckInComponent;
