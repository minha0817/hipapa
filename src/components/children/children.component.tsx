"use client";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
} from "@mantine/core";
import { RxAvatar } from "react-icons/rx";
import { TbDoorEnter, TbDoorExit } from "react-icons/tb";
import styles from "./children.styles.module.scss";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Child } from "@/dbModels/types";
import { getChildren } from "@/api/get";
import { amaticScFontClass } from "@/lib/font";

type ChildrenProps = {
  // ...
};

const ChildrenComponent: FC<PropsWithChildren<ChildrenProps>> = () => {
  const supabase = createClientComponentClient();

  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    getChildren(supabase).then((data) => setChildren(data));
  }, []);

  const rows = children.map((child) => (
    <tr key={child.name}>
      <td>
        <Group spacing="sm">
          {/* DB 에 image 추가해서 사진이 나올수있도록 추후 변경!!! */}
          {/* <Avatar size={30} src={teacher.avatar} radius={30} /> */}
          <RxAvatar />
          <Text fz="sm" fw={500}>
            {child.name}
          </Text>
        </Group>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <TbDoorEnter size={20} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea className={styles.children}>
      <p className={amaticScFontClass}>Children</p>
      <Table verticalSpacing="sm">
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
ChildrenComponent.displayName = "Children";

export const Children = ChildrenComponent;
