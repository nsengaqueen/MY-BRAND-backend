/**
 * @swagger
 * /message:
 *   post:
 *     summary: Submit a contact message
 *     description: Submits a contact message with the provided name, email, and message.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /message:
 *   get:
 *     summary: Get all contact messages
 *     description: Retrieves all contact messages.
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * message/{id}:
 *   get:
 *     summary: Get a specific contact message by ID
 *     description: Retrieves a specific contact message by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Message not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a specific contact message by ID
 *     description: Deletes a specific contact message by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Message deleted successfully
 *       400:
 *         description: Id not found
 *       500:
 *         description: Internal server error
 */


