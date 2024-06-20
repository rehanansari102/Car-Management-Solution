/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Car management
 */

/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Create a new car
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 example: 60d21b4667d0d8992e610c85
 *               color:
 *                 type: string
 *                 example: Red
 *               model:
 *                 type: string
 *                 example: Model S
 *               make:
 *                 type: string
 *                 example: Tesla
 *               registrationNo:
 *                 type: string
 *                 example: ABC-1234
 *     responses:
 *       201:
 *         description: Car created
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Get all cars
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: Successful retrieval
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Update a car
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The car ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 example: 60d21b4667d0d8992e610c85
 *               color:
 *                 type: string
 *                 example: Blue
 *               model:
 *                 type: string
 *                 example: Model X
 *               make:
 *                 type: string
 *                 example: Tesla
 *               registrationNo:
 *                 type: string
 *                 example: XYZ-5678
 *     responses:
 *       200:
 *         description: Car updated
 *       404:
 *         description: Car not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Delete a car
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The car ID
 *     responses:
 *       200:
 *         description: Car removed
 *       404:
 *         description: Car not found
 *       500:
 *         description: Server error
 */
