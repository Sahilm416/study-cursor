"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Button onClick={() => signIn("google")}>Continue with Google</Button>
    </div>
  );
};

export default page;
