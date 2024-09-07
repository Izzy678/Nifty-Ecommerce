import mongoose, { model } from "mongoose";
import { mongooseSchemaConfig } from "../../utils/config/mongooseSchemaConfig";

export interface Product extends Document {
  name: string;
  description: string;
  price: number;
  createdBy: mongoose.Schema.Types.ObjectId;
}

const productSchema = new mongoose.Schema<Product>(
  {
    name: String,
    description: String,
    price: Number,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  mongooseSchemaConfig,
); // Apply the global schema configuration);

export const ProductModel = model<Product>("Product", productSchema);
