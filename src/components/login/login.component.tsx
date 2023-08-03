"use client";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import {
  SegmentedControl,
  Group,
  Center,
  Box,
} from "@mantine/core";
import styles from "./login.styles.module.scss";
import { LuBaby } from "react-icons/lu";
import { amaticScFontClass } from "@/lib/font";
import AuthForm from "./authForm/authForm";


type LoginProps = {
  // ...
  type: string;
};

const LoginComponent: FC<PropsWithChildren<LoginProps>> = ({ type }) => {
  const [value, setValue] = useState(type);

  useEffect(() => {
    if(type === "parent"){
      return setValue("parent")
    }
    setValue(value);
  }, []);

  // const saveToLocalStorage = (e: any) => {
  //   e.preventDefault();
  //   localStorage.setItem("value", value);
  // };
  
  return (
    <div className={styles.login}>
      <div className="title">
        <h1>{<LuBaby />}</h1>
        <h2 className={amaticScFontClass}>Hipapa</h2>

        {type === "admin" && (
          <Group position="center" my={20}>
            <SegmentedControl
              radius={16}
              value={value}
              onChange={setValue}
              data={[
                {
                  value: "teacher",
                  label: (
                    <Center>
                      <Box>Teacher</Box>
                    </Center>
                  ),
                },
                {
                  value: "admin",
                  label: (
                    <Center>
                      <Box>Admin</Box>
                    </Center>
                  ),
                },
              ]}
            />
          </Group>
        )}
      </div>
      <div className="loginButton">
        <AuthForm value={value}/>
      </div>
    </div>
  );
};
LoginComponent.displayName = "Login";

export const Login = LoginComponent;
