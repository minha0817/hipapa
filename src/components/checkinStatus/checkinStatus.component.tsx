'use client';
import { FC, PropsWithChildren } from "react";

import styles from "./checkinStatus.styles.module.scss";
import { PiCircleBold, PiCircleDashedBold} from "react-icons/pi";
import {RiCheckboxBlankCircleFill} from "react-icons/ri";

type CheckinStatusProps = {
  // ...
};

const CheckinStatusComponent: FC<PropsWithChildren<CheckinStatusProps>> = () => {
  return (<div className={styles.checkinStatus}>
    <div className="box">
      <RiCheckboxBlankCircleFill size={20} color="green"/> 
      <span>3</span>
      <PiCircleBold size={20} />
      <span>1</span>
      <PiCircleDashedBold size={20} />
      <span>1</span>
    </div>

  </div>);
};
CheckinStatusComponent.displayName = "CheckinStatus";

export const CheckinStatus = CheckinStatusComponent;