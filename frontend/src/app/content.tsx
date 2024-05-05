"use client";
import classNames from "classnames";
import classes from "./home.module.css";
import HomepageHeader from "@/components/templates/homepage-header";

export default function Content() {

  return (
    <>
      <main className={classNames(classes.main, "flex flex-col ")}>
        <HomepageHeader />
      </main>
    </>
  );
}
