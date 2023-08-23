"use client";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Table, ScrollArea } from "@mantine/core";
import styles from "./teachers.styles.module.scss";
import { getChildren } from "@/api/get";
import { Child } from "@/dbModels/types";
import { amaticScFontClass } from "@/lib/font";
import { createCheckIn, getChildrenCheckIn } from "@/api/checkIn/checkIn.apis";
import { CheckinStatus } from "@/components/checkinStatus/checkinStatus.component";
import { v4 } from "uuid";
import { GetRows } from "./getRows";

type ChildrenCheckInProps = {};

const ChildrenCheckInComponent: FC<
  PropsWithChildren<ChildrenCheckInProps>
> = () => {
  const supabase = createClientComponentClient();
  const [children, setChildren] = useState<Child[]>([]);
  const [childrenCheckInData, setChildrenCheckInData] = useState([]);

  useEffect(() => {
    getChildren(supabase).then((data) => setChildren(data));
    getChildrenCheckIn(supabase).then((data: any) => {
      return setChildrenCheckInData(data);
    });
  }, []);

  useEffect(() => {
    const checkIn = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "check_in" },
        () => {
          getChildrenCheckIn(supabase).then((data: any) => {
            return setChildrenCheckInData(data);
          });
        }
      )
      .subscribe();

    return () => {
      checkIn.unsubscribe();
    };
  }, [supabase]);

  const findCurrentUserCheckinState = (childId: string) => {
    const clickedChild = childrenCheckInData.find((checkindata: any) => {
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
        <CheckinStatus data={children} checkInData={childrenCheckInData} />
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
