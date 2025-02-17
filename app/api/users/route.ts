import { NextApiRequest, NextApiResponse } from "next";
import { getUsers, updateUserRole, deleteUser } from "@/lib/admin/actions/users";
import { protectedByAdmin } from "@/lib/admin/actions/protectedbyadmin";

// Handle GET request
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return protectedByAdmin(req, res, async () => {
    const users = await getUsers();
    return res.json(users);
  });
}

// Handle PUT request
export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  return protectedByAdmin(req, res, async () => {
    const body = await req.body;
    const updatedUser = await updateUserRole(body.userId, body.role);
    return res.json(updatedUser);
  });
}

// Handle DELETE request
export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  return protectedByAdmin(req, res, async () => {
    const body = await req.body;
    await deleteUser(body.userId);
    return res.json({ message: "User deleted successfully." });
  });
}
