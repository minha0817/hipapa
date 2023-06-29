"use client";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from "./teachers.styles.module.scss";
import { getTeachers } from "@/api/get";
import { Teacher } from "@/dbModels/types";

type TeachersProps = {};

const TeachersComponent: FC<PropsWithChildren<TeachersProps>> = () => {
  const supabase = createClientComponentClient();

  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    getTeachers(supabase).then((data) => setTeachers(data));
  }, []);

  return (
    <div className={styles.teachers}>
      <h1>List of teachers</h1>
      {teachers.map((teacher) => {
        return (
          <div key={teacher.id}>
            <p>{teacher.name}</p>
          </div>
        );
      })}
    </div>
  );
};
TeachersComponent.displayName = "Teachers";

export const Teachers = TeachersComponent;
