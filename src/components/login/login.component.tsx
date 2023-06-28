"use client";
import { FC, PropsWithChildren } from "react";
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
import { Amatic_SC } from "next/font/google";
import Link from "next/link";

const amaticSc = Amatic_SC({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-amaticSc",
  weight: "700",
});

export function GoogleButton(props: ButtonProps) {
  return (
    <Button leftIcon={<FcGoogle />} variant="light" color="gray" {...props} />
  );
}

type LoginProps = {
  // ...
  type: string;
};

const LoginComponent: FC<PropsWithChildren<LoginProps>> = ({ type }) => {
  return (
    <div className={styles.login}>
      <div className="title">
        <h1>{<LuBaby />}</h1>
        <h2 className={amaticSc.variable}>Hipapa</h2>

        {/* 여기서 type === "admin" && show the toggle  */}
        {type === "admin" && (
          <Group position="center" my={20}>
            <SegmentedControl
              // value=["teacher", "admin"]
              // onChange={(value: "light" | "dark") => toggleColorScheme(value)}
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
        <Link href={`/${type}/home`}>
          <GoogleButton className="googleButton">
            Login with Google
          </GoogleButton>
        </Link>
      </div>
    </div>
  );
};
LoginComponent.displayName = "Login";

export const Login = LoginComponent;
