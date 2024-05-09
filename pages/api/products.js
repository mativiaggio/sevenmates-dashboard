import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  const { method } = req;

  await mongooseConnect();
  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "POST") {
    const { name, category, description, price, images } = req.body;

    const productDoc = await Product.create({
      name,
      category,
      description,
      price,
      images,
    });

    res.json(productDoc);
  }

  if (method === "PUT") {
    const { name, category, description, price, images, _id } = req.body;

    await Product.updateOne(
      { _id },
      { name, category, description, price, images }
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