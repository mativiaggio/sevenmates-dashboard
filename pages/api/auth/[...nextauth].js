import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db";

import { Admin } from "@/models/Admin";

const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: async ({ session, token, user }) => {
      const admins = await Admin.find({}, "email");
      const adminEmails2 = admins.map((admin) => admin.email);
      console.log("Estos son los emails: ", adminEmails2);

      if (adminEmails2.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);

  const admins = await Admin.find({}, "email");
  const adminEmails2 = admins.map((admin) => admin.email);
  console.log("Estos son los emails: ", adminEmails2);

  if (!adminEmails2.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw "not an admin";
  }
}
