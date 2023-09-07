"use client";
import { FC, PropsWithChildren } from "react";
import { Group, Text } from "@mantine/core";
import { RxAvatar } from "react-icons/rx";
import { Child } from "@/dbModels/types";

type ChildrenProps = {
  childrenList: Child[];
};

const ChildrenComponent: FC<PropsWithChildren<ChildrenProps>> = ({
  childrenList,
}) => {
  return childrenList.map((child) => {
    return (
      <Group spacing="sm" key={child.name}>
        {/* DB 에 image 추가해서 사진이 나올수있도록 추후 변경!!! */}
        {/* <Avatar size={30} src={teacher.avatar} radius={30} /> */}
        <RxAvatar />
        <Text fz="sm" fw={500}>
          {child.name}
        </Text>
      </Group>
    );
  });
};

ChildrenComponent.displayName = "Children";

export const Children = ChildrenComponent;
