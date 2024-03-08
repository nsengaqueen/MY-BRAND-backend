/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with the provided name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/userModel'
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad request, passwords do not match or invalid email format
 *       401:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     description: Logs in an existing user with the provided email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad request, email and password are required
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */




  