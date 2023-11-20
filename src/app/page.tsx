import Link from "next/link";
import styles from "./homePage.module.scss";
import { LuBaby } from "react-icons/lu";
import { amaticScFontClass } from "@/lib/font";

export default async function Home() {
  return (
    <div className={styles.home}>
      <div className="title">
        <span className="icon">
          <LuBaby style={{ fontSize: "larger" }} />
        </span>
        <span className={amaticScFontClass}>Welcome to HIPAPA</span>
      </div>
      <div className="loginBox">
        <div className={`box ${amaticScFontClass}`}>
          <Link href="/login/admin">Admin/Teacher</Link>
        </div>
        <div className={`box ${amaticScFontClass}`}>
          <Link href="/login/parent">Parents</Link>
        </div>
      </div>
    </div>
  );
}
