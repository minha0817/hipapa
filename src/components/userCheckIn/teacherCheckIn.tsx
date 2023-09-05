"use client";
import { FC, PropsWithChildren } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Table, ScrollArea } from "@mantine/core";
import styles from "./teachers.styles.module.scss";
import { Teacher } from "@/dbModels/types";
import { amaticScFontClass } from "@/lib/font";
import { createCheckIn, deleteCheckIn } from "@/api/checkIn/checkIn.apis";
import { CheckinStatus } from "@/components/checkinStatus/checkinStatus.component";
import { v4 } from "uuid";
import { GetRows } from "./getRows";

type TeacherCheckInProps = {
  teachers: Teacher[];
  checkInData: any;
};

const TeacherCheckInComponent: FC<PropsWithChildren<TeacherCheckInProps>> = ({
  teachers,
  checkInData,
}) => {
  const supabase = createClientComponentClient();

  const findCurrentUserCheckinState = (teacherId: string) => {
    const clickedTeacher = checkInData.find((checkindata: any) => {
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
      };
      createCheckIn(supabase, inputValues);
    } else {
      deleteCheckIn(supabase, "teacher_id", teacherId);
    }
  };

  const isUserCheckedIn = (user: any) => {
    const foundUser: any = findCurrentUserCheckinState(user.teacher_id);
    return foundUser
  };

  return (
    <ScrollArea className={styles.teachers}>
      <div className="titleBox">
        <p className={amaticScFontClass}>Teachers</p>
        <CheckinStatus data={teachers} checkInData={checkInData} />
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
