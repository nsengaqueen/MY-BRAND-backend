import mongoose, { Schema, Document } from 'mongoose';


export interface UserInterface extends Document {
  Name:string;
  email: string;
  password: string;
  role: 'admin' | 'user'; 
}


const userSchema: Schema = new Schema({
  Name:{type: String, required: true, unique: true, trim: true, minlength: 1 },
  email: { type: String, required: true, unique: true, trim: true, minlength: 1 },
  password: { type: String, required: true, minlength: 1 },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
});


const User = mongoose.model<UserInterface>('User', userSchema);
export default User;

