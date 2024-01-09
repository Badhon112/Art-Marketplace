import User from "@/model/User";
import { connectToDB } from "@/mongodb/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        try {
          await connectToDB();
          let user = await User.findOne({ email: profile.email });
          if (!user) {
            user = await User.create({
              email: profile.email,
              username: profile.name,
              profileImagePath: profile.image,
              wishlist: [],
              cart: [],
              order: [],
              work: [],
            });
          }
          return user;
        } catch (error) {
            console.log("Error chacking if user exists" ,error);
        }
      }
    },
  },
});

export { handler as GET, handler as POST };
