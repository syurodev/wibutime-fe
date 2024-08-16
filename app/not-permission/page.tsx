"use client";
import React from "react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

const NotPermissionPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      NotPermissionPage
      <Link href={"/"} className={buttonVariants({ rounded: "full" })}>
        Quay lại trang chủ
      </Link>
    </div>
  );
};

export default NotPermissionPage;
