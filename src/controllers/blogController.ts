
import { Request, Response } from 'express';
import Blog, { IBlog } from '../models/Blog';
import {v2 as cloudinary} from 'cloudinary';

 
cloudinary.config({ 
  cloud_name: 'dzw9v8msm', 
  api_key: '247848362397359', 
  api_secret: 'tY83pGa-br7IfTwu5LsCBjXpLrU' 
});



export const createBlog = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, content } = req.body;
    const image = req.file; 

    if (!title || !content || !image) {
      return res.status(400).json({ error: 'Title, content, and image are required' });
    }
    const existingBlog = await Blog.findOne({ title: req.body.title });
    if (existingBlog) {
      return res.status(409).json({
        message: "This Blog already exists",
      });
    }
     
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const myImage = await cloudinary.uploader.upload(image.path); 
    const newBlog = new Blog({
      title,
      content,
      images: myImage.secure_url, 
    });

    const savedBlog = await newBlog.save();

    res.status(201).json({ data: savedBlog });
  } catch (error) {
    console.error('Error creating new blog:', error);
    res.status(500).send('Internal server error');
  }
};



export const getAllBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs: IBlog[] = await Blog.find();
    res.status(200).json({data:blogs});
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getBlogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogId: string = req.params.id;
    const blog: IBlog | null = await Blog.findById(blogId);
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  // try {
   
    
  const {Id} = req.params;
  const blog = await Blog.findById(Id);
  if (!blog) {
    return res.status(404).json({
      message: "Id of a Blog not found",
    });
  }
  let result;
  if (req.file) {
    result = await cloudinary.uploader.upload(req.file.path);
  }
  const { title, content } = req.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    Id,
    {
      title: title || blog.title,
      content: content || blog.content,
      images: result || blog.images,
    },
    { new: true }
  );
  return res.status(200).json({
    data: updatedBlog,
    message: "your Blog was successfully updated",
  });
  // } catch (err) {
  //   console.log(err)
  //  return  res.status(500).json(err);
  // }
};

export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogId: string = req.params.id;
    const deletedBlog: IBlog | null = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    res.status(204).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
};
