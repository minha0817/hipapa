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
import { amaticScFontClass } from "@/lib/font";

type TeachersProps = {};

const jobColors: Record<string, string> = {
  teacher: "blue",
  admin: "pink",
};

const TeachersComponent: FC<PropsWithChildren<TeachersProps>> = () => {
  const theme = useMantineTheme();
  const supabase = createClientComponentClient();
  const [teachers, setTeachers] = useState<Teacher[]>([]);

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
          <ActionIcon>
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
      <p className={amaticScFontClass}>Teachers</p>
      <Table verticalSpacing="sm">
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
TeachersComponent.displayName = "Teachers";

export const Teachers = TeachersComponent;
