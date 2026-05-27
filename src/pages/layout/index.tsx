import React, { useState, ReactNode, useEffect } from "react";
import Header from "./header";
import NavBarVertical from "./navbar";
import "./layout.css";
interface DashboardPageProps {
  children: ReactNode;
  className?: string;
}

export default function DashboardPage({
  children,
  className,
}: DashboardPageProps) {
  const [open, setOpen] = useState(false);

  const openClose = () => {
    setOpen(!open);
  };

  const [isRTL, setIsRTL] = useState(false);

  const dir = document.documentElement.getAttribute("dir");
  useEffect(() => {
    let isRtl = false;
    isRtl = dir === "rtl";
    setIsRTL(isRtl);
  }, [dir]);

  return (
    <>
      <>
        <Header openClose={openClose} />
        <NavBarVertical open={open} setOpen={setOpen} />
        <div
          className={`relative pt-[5px] h-[calc(100vh-48px)] flex-grow overflow-y-auto scrollbar scrollbar-thin   pb-8 md:pb-0 ${
            isRTL ? "md:pr-[72px]" : "md:pl-[72px]"
          }`}
        >
          {children}
        </div>
      </>
    </>
  );
}
