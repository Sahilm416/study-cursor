"use server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/db/options";
import { supa } from "@/db/client";
import { v4 as uuidv4 } from "uuid";

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

interface User {
  email: string;
  name: string;
  profile_image: string;
}

export const insertUser = async (user: User) => {
  const id = uuidv4();
  const { data, error } = await supa.from("users").insert({ id, ...user });
  return { success: true };
};
