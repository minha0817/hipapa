'use client';
import { FC, PropsWithChildren } from "react";
import { Title } from "@mantine/core";
import styles from "./currentTime.styles.module.scss";
import { DateTime } from "luxon";
import { amaticScFontClass } from "@/lib/font";

type CurrentTimeProps = {
  // ...
};

const CurrentTimeComponent: FC<PropsWithChildren<CurrentTimeProps>> = () => {
  const currentDate = DateTime.now().toLocaleString(DateTime.DATE_FULL);
  const currentDay = DateTime.now().weekdayLong;
  const today = `${currentDay}, ${currentDate}`;


  return (
    <div className={styles.currentTime}>
      <h1 className={amaticScFontClass}>{today}</h1>
    </div>
  );
};
CurrentTimeComponent.displayName = "CurrentTime";

export const CurrentTime = CurrentTimeComponent;
