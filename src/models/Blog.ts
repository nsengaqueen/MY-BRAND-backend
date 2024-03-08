

import mongoose, { Schema, Document } from 'mongoose';

const myDate = new Date();
const dates = myDate.toISOString();

export interface IBlog extends Document {
  title: string;
  content: string;
  likes: number;
  images:string;
  likedBy:string[];
  comments: Comment[];
  date:string;
}
export interface Comment{
  Name:string;
  comment:string;
}

const BlogSchema: Schema = new  Schema<IBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  images:{type:String,required:true},
  comments:[{Name:{ type: String, required:true,},comment:{type:String,required:true,},
  date: {type: String,default: `${dates}`, },},],
  likes: {type: Number,default: 0,},
  likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  date: {type: String,default: `${dates}`,
  },

});

export default mongoose.model<IBlog>('Blog', BlogSchema);
