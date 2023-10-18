"use client";
import { Child } from "@/app/api/getChild/types";
import { CurrentTime } from "@/components/currentTime/currentTime.component";
import { Avatar, Badge, Paper } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./parentHomePage.styles.module.scss";

const ParentHomePage = () => {
  const [child, setChild] = useState<Child>();

  useEffect(() => {
    axios
      .post("/api/getChild")
      .then((res) => {
        setChild(res.data);
      })
      .catch((error) => {
        const {
          response: { data, status },
        } = error;
        console.error(`Failed: ${status}`, data);
      });
  }, []);

  if (!child) return;

  return (
    <div className={styles.parentHome}>
      <CurrentTime />
      <Paper shadow="sm" radius="lg" p="xl" className="title">
        <Avatar src="avatar.png" alt="it's me" />
        <p>{child.childName}</p>
      </Paper>

      {/* 해당날짜, 해당 아이의 리포트 */}
    </div>
  );
};

export default ParentHomePage;

// getReport
