"use client";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import {
  Button,
  ButtonProps,
  SegmentedControl,
  Group,
  Center,
  Box,
} from "@mantine/core";
import styles from "./login.styles.module.scss";
import { FcGoogle } from "react-icons/fc";
import { LuBaby } from "react-icons/lu";
import Link from "next/link";
import { amaticScFontClass } from "@/lib/font";

type LoginProps = {
  // ...
  type: string;
};

function GoogleButton({ onClick, ...props }: ButtonProps & { onClick: any }) {
  return (
    <Button
      leftIcon={<FcGoogle />}
      variant="light"
      color="gray"
      onClick={onClick}
      {...props}
    />
  );
}

const LoginComponent: FC<PropsWithChildren<LoginProps>> = ({ type }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    let value;
    value = localStorage.getItem("value") || "";
    if(type === "parent"){
      return setValue("parent")
    }
    setValue(value);
  }, []);

  const saveToLocalStorage = (e: any) => {
    e.preventDefault();
    localStorage.setItem("value", value);
  };
  
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
        <GoogleButton className="googleButton" onClick={saveToLocalStorage}>
          <Link href={`/${type}/home`}>Login with Google</Link>
        </GoogleButton>
      </div>
    </div>
  );
};
LoginComponent.displayName = "Login";

export const Login = LoginComponent;
