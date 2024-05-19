import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const { method } = req;

  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "POST") {
    const {
      name,
      category,
      description,
      price,
      images,
      featured,
      slug,
      properties,
    } = req.body;

    console.log("El slug es: " + slug);

    const productDoc = await Product.create({
      name,
      category,
      description,
      price,
      images,
      featured,
      properties,
      slug,
    });

    res.json(productDoc);
  }

  if (method === "PUT") {
    const {
      name,
      category,
      description,
      price,
      images,
      featured,
      slug,
      properties,
      _id,
    } = req.body;

    console.log("El slug es: " + slug);
    await Product.updateOne(
      { _id },
      { name, category, description, price, images, featured, slug, properties }
    );

    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
