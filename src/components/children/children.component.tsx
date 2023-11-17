"use client";
import { FC, PropsWithChildren } from "react";
import { Button, Group } from "@mantine/core";
import { RxAvatar } from "react-icons/rx";
import styles from "./children.styles.module.scss";
import { Child } from "@/app/api/getChild/types";

type ChildrenProps = {
  childrenList: Child[];
  handleSelectChildren: any;
  selectedChildren: string[];
};

const ChildrenComponent: FC<PropsWithChildren<ChildrenProps>> = ({
  childrenList,
  handleSelectChildren,
  selectedChildren,
}) => {
  const checkActive = (childId: string) => {
    const isActive = selectedChildren.includes(childId);
    return isActive ? "light" : "subtle";
  };

  return childrenList.map((child, index) => {
    return (
      <Group spacing="sm" key={child.name} className={styles.childrenList}>
        {/* DB 에 image 추가해서 사진이 나올수있도록 추후 변경!!! */}
        {/* <Avatar size={30} src={teacher.avatar} radius={30} /> */}

        <Button
          variant={checkActive(child.childId)}
          color="dark"
          onClick={() => handleSelectChildren(child.childId, index)}
          className="childBtn"
        >
          <RxAvatar />
          &nbsp;
          {child.name}
        </Button>
      </Group>
    );
  });
};

ChildrenComponent.displayName = "Children";

export const Children = ChildrenComponent;
