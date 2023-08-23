"use client";
import { FC, PropsWithChildren } from "react";

import styles from "./checkinStatus.styles.module.scss";
import { PiCircleBold, PiCircleDashedBold } from "react-icons/pi";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

type CheckinStatusProps = {
  data: any;
  checkInData: any;
};

const CheckinStatusComponent: FC<PropsWithChildren<CheckinStatusProps>> = ({
  data,
  checkInData,
}) => {
  const totalNumber = data.length;
  const checkedInNumber = () => {
    const checkedInTrueArr = checkInData.filter(
      (checkIn: any) => checkIn.is_checked_in === true
    );
    return checkedInTrueArr.length;
  };

  return (
    <div className={styles.checkinStatus}>
      <div className="box">
        <RiCheckboxBlankCircleFill size={20} color="green" />
        <span>{checkedInNumber()}</span>
        <PiCircleBold size={20} />
        <span>{totalNumber - checkedInNumber()}</span>
        <PiCircleDashedBold size={20} />
        <span>0</span>
      </div>
    </div>
  );
};
CheckinStatusComponent.displayName = "CheckinStatus";

export const CheckinStatus = CheckinStatusComponent;
