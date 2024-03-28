"use client";
import { useState } from "react";
import Content from "./content";
import SidebarMenu from "@/components/templates/Sidebar/sidebar";

export default function Home() {
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);

  return (
    <>
      <SidebarMenu setExpand={setSideMenuIsExpand} />
      <div
        className={`flex-1 min-h-screen mx-0 bg-slate-100 transition-all duration-300 ease-in-out ${
          sideMenuIsExpand ? "md:ml-72" : "md:ml-20"
        }`}
      >
        <Content />
      </div>
    </>
  );
}
