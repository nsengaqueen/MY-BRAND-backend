/**
 * @swagger
 * /like/{blogId}/comments:
 *   post:
 *     summary: Add a comment to a blog
 *     parameters:
 *       - name: blogId
 *         in: path
 *         description: ID of the blog to add a comment to
 *         required: true
 *         type: string
 *       - name: comment
 *         in: body
 *         description: Comment object containing Name and comment fields
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             Name:
 *               type: string
 *             comment:
 *               type: string
 *     responses:
 *       201:
 *         description: Comment added successfully
 *         schema:
 *           type: object
 *           properties:
 *             Name:
 *               type: string
 *             comment:
 *               type: string
 *       401:
 *         description: User authentication required
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */