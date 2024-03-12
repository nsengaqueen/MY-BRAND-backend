import mongoose, { Schema, Document } from "mongoose";
import Joi from "joi";
const myDate = new Date();
const dates = myDate.toUTCString();
export interface UserInterface extends Document {
  fullName: string;
  email: string;
  password: string;
  role: string;
  date: string;
}
const userSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string(),
  date: Joi.string().default(new Date().toUTCString()),
});

export const validateUser = (data: UserInterface) => {
  return userSchema.validate(data);
};
// ===================login validation =================
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const validatelogin = (data: UserInterface) => {
  return loginSchema.validate(data);
};
// ========================updateUserSchema =================
const updateSchema = Joi.object({
  fullName: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(8),
  role: Joi.string(),
});

export const validateUserUpdating = (data: UserInterface) => {
  return updateSchema.validate(data);
};

const userMongooseSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  date: { type: String, default: `${dates}` },
});

const User = mongoose.model<UserInterface>("User", userMongooseSchema);

export default User;