"use client";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Table,
  Group,
  Text,
  ActionIcon,
  ScrollArea,
} from "@mantine/core";
import styles from "./teachers.styles.module.scss";
import { getTeachers } from "@/api/get";
import { Teacher } from "@/dbModels/types";
import { RxAvatar } from "react-icons/rx";
import { TbDoorEnter, TbDoorExit } from "react-icons/tb";
import { amaticScFontClass } from "@/lib/font";
import { createCheckInTeacher, getCheckIn } from "@/api/checkIn/checkIn.apis";
import { CheckinStatus } from "@/components/checkinStatus/checkinStatus.component";
import { v4 } from "uuid";

type TeachersProps = {};

const TeachersComponent: FC<PropsWithChildren<TeachersProps>> = () => {
  const supabase = createClientComponentClient();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [teacherCheckinData, setTeacherCheckInData] = useState([]);

  useEffect(() => {
    getTeachers(supabase).then((data) => setTeachers(data));
    getCheckIn(supabase).then((data: any) => {
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
          getCheckIn(supabase).then((data: any) => {
            return setTeacherCheckInData(data);
          });
        }
      )
      .subscribe();

    return () => {
      checkIn.unsubscribe();
    };
  }, [supabase]);

  const findCurrentTeacherCheckinState = (teacherId: string) => {
    const clickedTeacher = teacherCheckinData.find((checkindata: any) => {
      return checkindata.teacher_id === teacherId;
    });
    return clickedTeacher;
  };

  const handleTeacherCheckIn = (teacher: Teacher) => {
    const daycareId = teacher.daycare_id;
    const teacherId = teacher.teacher_id;
    const checkedInObj: any = findCurrentTeacherCheckinState(teacherId);
    if(!checkedInObj) {
      const inputValues = {
        check_in_id: v4(),
        daycare_id: daycareId,
        teacher_id: teacherId,
        is_checked_in: true,
      }
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

  const isTeacherCheckedIn = (teacherId: string) => {
    const foundTeacher: any = findCurrentTeacherCheckinState(teacherId);
    return foundTeacher?.is_checked_in
  };

  const rows = teachers.map((teacher) => (
    <tr key={teacher.name}>
      <td>
        <Group spacing="sm">
          {/* DB 에 image 추가해서 사진이 나올수있도록 추후 변경!!! */}
          {/* <Avatar size={30} src={teacher.avatar} radius={30} /> */}
          <RxAvatar />
          <Text fz="sm" fw={500}>
            {teacher.name}
          </Text>
        </Group>
      </td>
      <td></td>
      {isTeacherCheckedIn(teacher.teacher_id) ? (
        // Show check out button.
        <td>
          <Group spacing={0} position="right">
            <ActionIcon onClick={() => handleTeacherCheckIn(teacher)}>
              <TbDoorExit size={20} />
            </ActionIcon>
          </Group>
        </td>
      ) : (
        // Show check in button.
        <td>
          <Group spacing={0} position="right">
            <ActionIcon onClick={() => handleTeacherCheckIn(teacher)}>
              <TbDoorEnter size={20} />
            </ActionIcon>
          </Group>
        </td>
      )}
    </tr>
  ));

  return (
    <ScrollArea className={styles.teachers}>
      <div className="titleBox">
        <p className={amaticScFontClass}>Teachers</p>
        <CheckinStatus data={teachers} checkInData={teacherCheckinData} />
      </div>
      <Table verticalSpacing="sm">
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
TeachersComponent.displayName = "Teachers";

export const Teachers = TeachersComponent;
