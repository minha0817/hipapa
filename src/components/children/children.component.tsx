"use client";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Table, Group, Text, ScrollArea } from "@mantine/core";
import { RxAvatar } from "react-icons/rx";
import styles from "./children.styles.module.scss";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Child } from "@/dbModels/types";
import { getChildren } from "@/api/get";

type ChildrenProps = {
  // ...
};

const ChildrenComponent: FC<PropsWithChildren<ChildrenProps>> = () => {
  const supabase = createClientComponentClient();

  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    getChildren(supabase).then((data) => setChildren(data));
  }, []);

  const items = children.map((child) => (
    <Group spacing="sm" key={child.name}>
      {/* DB 에 image 추가해서 사진이 나올수있도록 추후 변경!!! */}
      {/* <Avatar size={30} src={teacher.avatar} radius={30} /> */}
      <RxAvatar />
      <Text fz="sm" fw={500}>
        {child.name}
      </Text>
    </Group>
  ));

  return (
    <div>{items}</div>
  );
};
ChildrenComponent.displayName = "Children";

export const Children = ChildrenComponent;
