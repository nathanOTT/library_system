import { NextApiRequest, NextApiResponse } from "next";
import getServerSession from "next-auth";
import { auth } from "@/auth";

export async function protectedByAdmin(req: NextApiRequest, res: NextApiResponse, next: Function) {
  // ✅ Get session data
  const session = await auth();

  // ❌ If no session, deny access
  if (!session || !session.user?.id) {
    return res.status(401).json({ message: "Unauthorized: No session found" });
  }

  // ❌ If user is not a "superadmin", deny access
  if (session.user?.id !== "superadmin") {
    return res.status(403).json({ message: "Forbidden: Admin access required" });
  }

  // ✅ User is a "superadmin", proceed with request
  return next();
}
