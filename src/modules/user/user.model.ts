import mongoose from "mongoose";

import IProduct from "./user.interface";

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      index: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

UserSchema.set("toJSON", {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: function (doc, ret: any) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model<IProduct & mongoose.Document>("user", UserSchema);
