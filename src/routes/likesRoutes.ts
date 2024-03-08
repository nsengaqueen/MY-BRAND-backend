import Router from "express";
const router = Router();
import authentication from "../middlewares/hasAccount";
import CommentController from "../controllers/likesController";
router.post(
  "/add-comment/:blogId",
  authentication,
  CommentController.addComment
);
router.post("/like/:blogId", CommentController.likeBlog);
export default router;
