import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { getServerSession } from "next-auth";
import { authOptions, isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    res.json(await Category.find().populate("parent"));
  }

  if (method === "POST") {
    const { name, parentCategory, properties, slug } = req.body;
    const categoryDoc = await Category.create({
      name,
      parent: parentCategory || undefined,
      properties,
      slug,
    });
    res.json(categoryDoc);
  }

  if (method === "PUT") {
    const { name, parentCategory, properties, slug, _id } = req.body;

    console.log("Parent Category: " + parentCategory);
    // const categoryDoc = await Category.updateOne(
    //   { _id },
    //   {
    //     name,
    //     parent: parentCategory,
    //     properties,
    //     slug,
    //   }
    // );
    let categoryDoc;
    if (parentCategory) {
      categoryDoc = await Category.updateOne(
        { _id },
        {
          name,
          parent: parentCategory,
          properties,
          slug,
        }
      );
    } else {
      categoryDoc = await Category.updateOne(
        { _id },
        {
          name,
          properties,
          slug,
        }
      );
    }
    res.json(categoryDoc);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await Category.deleteOne({ _id });
    res.json("Category deleted successfully");
  }
}
