

import express from 'express';
import { createBlog,getAllBlogs,getBlogById,updateBlog,deleteBlog } from '../controllers/blogController';
import {file} from '../more/multer'

const router = express.Router();

router.post('/blogs',file.single("image"), createBlog);
router.get('/blogs',getAllBlogs );
router.get('/blogs/:id',getBlogById);
router.put('/blogs/:id', updateBlog);
router.delete('/blogs/:id', deleteBlog);


export default router;
