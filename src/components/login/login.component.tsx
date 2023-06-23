"use client";
import { FC, PropsWithChildren } from "react";
import { Button, ButtonProps, Group } from "@mantine/core";
import styles from "./login.styles.module.scss";
import { FcGoogle } from "react-icons/fc";
import { LuBaby } from "react-icons/lu";
import { Amatic_SC } from "next/font/google";

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
};

const LoginComponent: FC<PropsWithChildren<LoginProps>> = () => {
  return (
    <div className={styles.login}>
      <div className="title">
        <h1>{<LuBaby />}</h1>
        <h2 className={amaticSc.variable}>Hipapa</h2>
      </div>
      <div className="loginButton">
        <GoogleButton className="googleButton">Login with Google</GoogleButton>
      </div>
    </div>
  );
};
LoginComponent.displayName = "Login";

export const Login = LoginComponent;
