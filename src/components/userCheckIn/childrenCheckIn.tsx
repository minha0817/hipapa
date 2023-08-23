"use client";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Table,ScrollArea } from "@mantine/core";
import styles from "./teachers.styles.module.scss";
import { getTeachers } from "@/api/get";
import { Teacher } from "@/dbModels/types";
import { amaticScFontClass } from "@/lib/font";
import { createCheckInTeacher, getCheckIn } from "@/api/checkIn/checkIn.apis";
import { CheckinStatus } from "@/components/checkinStatus/checkinStatus.component";
import { v4 } from "uuid";
import { GetRows } from "./getRows";

type ChildrenCheckInProps = {};

const ChildrenCheckInComponent: FC<PropsWithChildren<ChildrenCheckInProps>> = () => {
  const supabase = createClientComponentClient();
  const [children, setChildren] = useState<Teacher[]>([]);
  const [childrenCheckInData, setChildrenCheckInData] = useState([]);

  useEffect(() => {
    getTeachers(supabase).then((data) => setChildren(data));
    getCheckIn(supabase).then((data: any) => {
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
          getCheckIn(supabase).then((data: any) => {
            return setChildrenCheckInData(data);
          });
        }
      )
      .subscribe();

    return () => {
      checkIn.unsubscribe();
    };
  }, [supabase]);

  const findCurrentUserCheckinState = (teacherId: string) => {
    const clickedChild = childrenCheckInData.find((checkindata: any) => {
      return checkindata.teacher_id === teacherId;
    });
    return clickedChild;
  };

  const handleChildrenCheckIn = (teacher: Teacher) => {
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
      createCheckInTeacher(supabase, inputValues);
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

    createCheckInTeacher(supabase, inputValues);
  };

  const isUserCheckedIn = (userId: string) => {
    const foundUser: any = findCurrentUserCheckinState(userId);
    return foundUser?.is_checked_in;
  };

  return (
    <ScrollArea className={styles.teachers}>
      <div className="titleBox">
        <p className={amaticScFontClass}>Children</p>
        <CheckinStatus data={children} checkInData={childrenCheckInData} />
      </div>
      <Table verticalSpacing="sm">
        <tbody>
          <GetRows
            users={children}
            isUserCheckedIn={isUserCheckedIn}
            handleUserCheckIn={handleChildrenCheckIn}
          />
        </tbody>
      </Table>
    </ScrollArea>
  );
};
ChildrenCheckInComponent.displayName = "ChildrenCheckIn";

export const ChildrenCheckIn = ChildrenCheckInComponent;
