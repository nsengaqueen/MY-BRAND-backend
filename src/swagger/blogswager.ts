/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Create a new Blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Successfully created a new Blog
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 saveBlog:
 *                   type: object
 *                   $ref: '#/components/schemas/blogModel'
 *                 status:
 *                   type: string
 *       '400':
 *         description: Bad request, missing required fields
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Get all blogs
 *     responses:
 *       200:
 *         description: A list of blogs
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Blog'
 *       500:
 *         description: Internal server error
 */

  
  /**
   * @swagger
   * /blogs/{id}:
   *   get:
   *     summary: Get a blog by ID
   *     parameters:
   *       - name: id
   *         in: path
   *         description: ID of the blog
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Blog found
   *         schema:
   *           $ref: '#/definitions/Blog'
   *       404:
   *         description: Blog not found
   *       500:
   *         description: Internal server error
   */
  /**
 * @swagger
 * /blogs/{id}:
 *   put:
 *     summary: Update a blog by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the blog
 *         required: true
 *         type: string
 *       - name: body
 *         in: body
 *         description: New content of the blog
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Blog'
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *         schema:
 *           $ref: '#/definitions/Blog'
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the blog
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */