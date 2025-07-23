import mongoose from "mongoose";

import IProduct from "./product.interface";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    alias: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    shortDescription: {
      type: String,
      required: true
    },
    stock: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

ProductSchema.set("toJSON", {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: function (doc, ret: any) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model<IProduct & mongoose.Document>("product", ProductSchema);
