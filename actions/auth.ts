"use server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/db/options";

export async function getUser() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return {
      success: true,
      user: session.user,
    };
  }
  return {
    success: false,
    user: null,
  };
}
