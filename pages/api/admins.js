import { mongooseConnect } from "@/lib/mongoose";
import { Admin } from "@/models/Admin";
import { authOptions, isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    res.json(await Admin.find());
  }

  if (method === "POST") {
    const { email } = req.body;
    const adminDoc = await Admin.create({
      email,
    });
    res.json(adminDoc);
  }

  if (method === "PUT") {
    const { email, _id } = req.body;
    const adminDoc = await Admin.updateOne(
      { _id },
      {
        email,
      }
    );
    res.json(adminDoc);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await Admin.deleteOne({ _id });
    res.json("Admin deleted successfully");
  }
}
