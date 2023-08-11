"use client";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Table,
  Group,
  Text,
  ActionIcon,
  ScrollArea,
  useMantineTheme,
} from "@mantine/core";
import styles from "./teachers.styles.module.scss";
import { getTeachers } from "@/api/get";
import { Teacher } from "@/dbModels/types";
import { RxAvatar } from "react-icons/rx";
import { TbDoorEnter, TbDoorExit } from "react-icons/tb";
import { createCheckInTeacher, getCheckIn } from "@/api/checkIn/checkIn.apis";

type TeachersProps = {};

const jobColors: Record<string, string> = {
  teacher: "blue",
  admin: "pink",
};

const TeachersComponent: FC<PropsWithChildren<TeachersProps>> = () => {
  const supabase = createClientComponentClient();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [teacherCheckinData, setTeacherCheckInData] = useState([]);

  useEffect(() => {
    getCheckIn(supabase).then((data: any) => setTeacherCheckInData(data));
  }, [supabase]);

  console.log(teacherCheckinData, "teacherCheckInStates");

  const findCurrentTeacherCheckinState = (teacherId: string) => {
    return teacherCheckinData.find((teacher: any) => {
      teacher.teacher_id === teacherId;
    });
  };

  const handleTeacherCheckIn = (teacher: Teacher) => {
    const daycareId = teacher.daycare_id;
    const teacherId = teacher.teacher_id;
    const isCheckedIn = findCurrentTeacherCheckinState(teacherId);
    createCheckInTeacher(supabase, daycareId, teacherId, !isCheckedIn)
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
      <td>
        <Group spacing={0} position="right">
          <ActionIcon onClick={() => handleTeacherCheckIn(teacher)}>
            <TbDoorEnter size={20} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  useEffect(() => {
    getTeachers(supabase).then((data) => setTeachers(data));
  }, []);

  return (
    <ScrollArea className={styles.teachers}>
      <Table verticalSpacing="sm">
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
TeachersComponent.displayName = "Teachers";

export const Teachers = TeachersComponent;
