'use client';
import { FC, PropsWithChildren } from "react";
import { Title } from "@mantine/core";
import styles from "./currentTime.styles.module.scss";
import { DateTime } from "luxon";

type CurrentTimeProps = {
  // ...
};

const CurrentTimeComponent: FC<PropsWithChildren<CurrentTimeProps>> = () => {
  const currentDate = DateTime.now().toLocaleString(DateTime.DATE_FULL);
  const currentDay = DateTime.now().weekdayLong;
  const today = `${currentDay}, ${currentDate}`;


  return (
    <div className={styles.currentTime}>
      <Title order={3} weight={300} align="center">
        {today}
      </Title>
    </div>
  );
};
CurrentTimeComponent.displayName = "CurrentTime";

export const CurrentTime = CurrentTimeComponent;
