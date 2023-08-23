"use client";
import { FC, PropsWithChildren } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Table, ScrollArea } from "@mantine/core";
import styles from "./teachers.styles.module.scss";
import { Child } from "@/dbModels/types";
import { amaticScFontClass } from "@/lib/font";
import { createCheckIn } from "@/api/checkIn/checkIn.apis";
import { CheckinStatus } from "@/components/checkinStatus/checkinStatus.component";
import { v4 } from "uuid";
import { GetRows } from "./getRows";

type ChildrenCheckInProps = {
  children: Child[],
  checkInData: any
};

const ChildrenCheckInComponent: FC<
  PropsWithChildren<ChildrenCheckInProps>
> = ({children, checkInData}) => {
  const supabase = createClientComponentClient();

  const findCurrentUserCheckinState = (childId: string) => {
    const clickedChild = checkInData.find((checkindata: any) => {
      return checkindata.child_id === childId;
    });
    return clickedChild;
  };

  const handleChildrenCheckIn = (child: Child) => {
    const daycareId = child.daycare_id;
    const childId = child.child_id;
    const checkedInObj: any = findCurrentUserCheckinState(childId);
    if (!checkedInObj) {
      const inputValues = {
        check_in_id: v4(),
        daycare_id: daycareId,
        child_id: childId,
        is_checked_in: true,
      };
      createCheckIn(supabase, inputValues);
      return;
    }

    const checkInId = checkedInObj?.check_in_id;
    const isCheckedIn = () => {
      if (checkedInObj?.is_checked_in) {
        return false;
      }
      return true;
    };

    const inputValues = {
      check_in_id: checkInId,
      daycare_id: daycareId,
      child_id: childId,
      is_checked_in: isCheckedIn(),
    };

    createCheckIn(supabase, inputValues);
  };

  const isUserCheckedIn = (user: any) => {
    const foundUser: any = findCurrentUserCheckinState(user.child_id);
    return foundUser?.is_checked_in;
  };

  return (
    <ScrollArea className={styles.teachers}>
      <div className="titleBox">
        <p className={amaticScFontClass}>Children</p>
        <CheckinStatus data={children} checkInData={checkInData} />
      </div>
      <Table verticalSpacing="sm">
        <tbody>
          <GetRows
            users={children}
            isUserCheckedIn={isUserCheckedIn}
            handleUserCheckIn={handleChildrenCheckIn}
          />
        </tbody>
      </Table>
    </ScrollArea>
  );
};
ChildrenCheckInComponent.displayName = "ChildrenCheckIn";

export const ChildrenCheckIn = ChildrenCheckInComponent;
