import { insertUser } from "@/actions/auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
const CLIENT_ID = process.env.OAUTH_CLIENT_ID!;
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET!;

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email || !profile?.name) {
        throw new Error("NO profile email");
      }

      await insertUser({
        email: profile.email,
        name: profile.name,
        // @ts-ignore
        profile_image: profile.picture,
      });

      return true;
    },
  },
};
