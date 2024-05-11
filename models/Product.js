import mongoose, { model, Schema, models } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Types.ObjectId, ref: "Category" },
  description: String,
  price: { type: Number, required: true },
  images: [{ type: String }],
  featured: Boolean,
});

export const Product = models.Product || model("Product", ProductSchema);
