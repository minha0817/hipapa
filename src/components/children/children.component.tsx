'use client';
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

type ChildrenProps = {
  // ...
};

const ChildrenComponent: FC<PropsWithChildren<ChildrenProps>> = () => {
  const supabase = createClientComponentClient();

  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    getChildren(supabase).then((data) => setChildren(data));
  }, []);

  return (
    <div className={styles.children}>
      <h1>chilren list</h1>
      {children.map((child) => {
        return (
          <div key={child.id}>
            <p>{child.name}</p>
          </div>
        );
      })}
    </div>
  );
};
ChildrenComponent.displayName = "Children";

export const Children = ChildrenComponent;
