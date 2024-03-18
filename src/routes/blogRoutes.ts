

import express from 'express';
import { createBlog,getAllBlogs,getBlogById,updateBlog,deleteBlog } from '../controllers/blogController';
import {file} from '../more/multer';
import admin from '../middlewares/checkAdmin';
import aunthentication from '../middlewares/hasAccount'

const router = express.Router();

router.post('/blogs',file.single("image"), createBlog);
router.get('/blogs',getAllBlogs );
router.get('/blogs/:id',getBlogById);
router.put('/blogs/:Id',admin, updateBlog);
router.delete('/blogs/:id',admin, deleteBlog);


export default router;
