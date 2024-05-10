import mongoose, { model, Schema, models } from "mongoose";

const AdminSchema = new Schema({
  email: { type: String, required: true },
  creation_date: { type: Date, default: Date.now },
});

export const Admin = models?.Admin || model("Admin", AdminSchema);
