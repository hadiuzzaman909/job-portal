const express = require('express');
const { getJobs, getJobById, addJob } = require('../controllers/jobController');
const { authenticateJWT } = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       properties:
 *         city:
 *           type: string
 *           example: New York
 *         state:
 *           type: string
 *           example: NY
 *         country:
 *           type: string
 *           example: USA
 *         zipCode:
 *           type: string
 *           example: "10001"
 *     Salary:
 *       type: object
 *       properties:
 *         min:
 *           type: number
 *           example: 60000
 *         max:
 *           type: number
 *           example: 120000
 *         currency:
 *           type: string
 *           default: USD
 *     Job:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Software Developer
 *         company:
 *           type: string
 *           example: TechCorp
 *         location:
 *           $ref: '#/components/schemas/Location'
 *         description:
 *           type: string
 *           example: Developing cutting-edge software
 *         jobResponsibilities:
 *           type: array
 *           items:
 *             type: string
 *           example: 
 *             - Collaborate with the team to develop features
 *             - Write clean, maintainable code
 *         skillRequirements:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - JavaScript
 *             - Node.js
 *             - MongoDB
 *         salary:
 *           $ref: '#/components/schemas/Salary'
 *         jobType:
 *           type: string
 *           enum: ['Full-time', 'Part-time', 'Contract', 'Internship']
 *           example: Full-time
 *         requirements:
 *           type: array
 *           items:
 *             type: string
 *           example: ['JavaScript', 'Node.js', 'MongoDB']
 *         benefits:
 *           type: array
 *           items:
 *             type: string
 *           example: ['Health Insurance', '401K']
 *         applicationDeadline:
 *           type: string
 *           format: date
 *           example: '2023-12-31'
 *         jobStatus:
 *           type: string
 *           enum: ['Active', 'Closed', 'On Hold']
 *           default: Active
 *         postedBy:
 *           type: string
 *           example: '603c72ef5f2a4b1b88cd9a8e'  # Example user ID
 */


/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of all jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 *       500:
 *         description: Internal server error
 */
router.get('/', getJobs);

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The job ID
 *     responses:
 *       200:
 *         description: Details of a specific job
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getJobById);

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Add a new job (Admin only)
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       403:
 *         description: Forbidden - Only admins can add jobs
 *       500:
 *         description: Internal server error
 */

router.post('/', authenticateJWT, addJob); // Only admin can add a job

module.exports = router;
