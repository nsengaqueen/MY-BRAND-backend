import { Request, Response } from "express";
import Blog from "../models/Blog";
import User, { UserInterface } from "../models/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: UserInterface;
    }
  }
}

export default class CommentController {
    static async addComment(req: Request, res: Response) {
      const blogId = req.params.blogId as any;
  
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return res.status(404).json({ message: "Blog non existent" });
      }
  
      if (!req.user) {
        return res.status(401).json({ message: "you're required to login" });
      }
      const newcomment = {
       Name: req.user.fullName,
        comment: req.body.comment,
      };
  
      blog.comments.push(newcomment);
      const newcom = await blog.save();
  
      return res.status(201).json(newcom);
    }
  
   
    static async toggleLikeBlog(req: Request, res: Response) {
      const blogId = req.params.blogId;
      const userId = req.user?.id;
      const blog = await Blog.findById(blogId);
    
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      if (!req.user) {
        return res.status(401).json({ message: "you're required to login" });
      }
     
      const hasLiked = blog.likedBy.includes(userId);

    
      if (hasLiked) {
       
        
        const index = blog.likedBy.indexOf(userId);
        blog.likes--
        blog.likedBy.splice(index, 1); 
      } else {
        
        blog.likes++;
        blog.likedBy.push(userId);
      }
    
      await blog.save();
    
      return res.status(200).json({ message: "Blog liked/unliked", likes: blog.likes});
    }
    


    
  }