"use client";
import { FC, PropsWithChildren } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Table, ScrollArea } from "@mantine/core";
import styles from "./teachers.styles.module.scss";
import { amaticScFontClass } from "@/lib/font";
import { createCheckIn, deleteCheckIn } from "@/app/api/checkIn/checkIn.apis";
import { CheckinStatus } from "@/components/checkinStatus/checkinStatus.component";
import { v4 } from "uuid";
import { GetRows } from "./getRows";
import {Child} from "@/app/api/getChild/types";

type ChildrenCheckInProps = {
  childrenList: Child[];
  checkInData: any;
};

const ChildrenCheckInComponent: FC<PropsWithChildren<ChildrenCheckInProps>> = ({
  childrenList: children,
  checkInData,
}) => {
  const supabase = createClientComponentClient();

  const findCurrentUserCheckinState = (childId: string) => {
  //undefined
    const clickedChild = checkInData.find((checkindata: any) => {
      return checkindata.child_id === childId;
    });

    return clickedChild;
  };

  const handleChildrenCheckIn = (child: Child) => {
    const daycareId = child.daycareId;
    const childId = child.childId;
    const checkedInObj: any = findCurrentUserCheckinState(childId);
    if (!checkedInObj) {
      const inputValues = {
        check_in_id: v4(),
        daycare_id: daycareId,
        child_id: childId,
      };
      createCheckIn(supabase, inputValues);
    } else {
      deleteCheckIn(supabase, "child_id", childId);
    }
  };

  const isUserCheckedIn = (user: any) => {
    const foundUser: any = findCurrentUserCheckinState(user.childId);
    return foundUser;
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
