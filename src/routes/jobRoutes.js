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
 *           description: The city of the job's location
 *         state:
 *           type: string
 *           description: The state of the job's location
 *         country:
 *           type: string
 *           description: The country of the job's location
 *         zipCode:
 *           type: string
 *           description: The zip code of the job's location (optional)
 *     Salary:
 *       type: object
 *       properties:
 *         min:
 *           type: number
 *           description: The minimum salary for the job
 *         max:
 *           type: number
 *           description: The maximum salary for the job
 *         currency:
 *           type: string
 *           description: The currency of the salary (default is USD)
 *           default: 'USD'
 *     Job:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the job (e.g., Software Developer)
 *         company:
 *           type: string
 *           description: The name of the company offering the job
 *         location:
 *           $ref: '#/components/schemas/Location'
 *         description:
 *           type: string
 *           description: A description of the job responsibilities and expectations
 *         jobResponsibilities:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of job responsibilities
 *         skillRequirements:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of skills required for the job
 *         salary:
 *           $ref: '#/components/schemas/Salary'
 *         jobType:
 *           type: string
 *           enum: ['Full-time', 'Part-time', 'Contract', 'Internship']
 *           description: The type of job (e.g., Full-time, Part-time)
 *         requirements:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of other job requirements
 *         benefits:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of benefits provided by the employer
 *         applicationDeadline:
 *           type: string
 *           format: date
 *           description: The deadline for job applications
 *         jobStatus:
 *           type: string
 *           enum: ['Active', 'Closed', 'On Hold']
 *           description: The status of the job posting
 *           default: 'Active'
 *         postedBy:
 *           type: string
 *           description: The ID of the user who posted the job
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
 *         examples:
 *           application/json:
 *             value: [
 *               {
 *                 "title": "Software Developer",
 *                 "company": "TechCorp",
 *                 "location": {
 *                   "city": "New York",
 *                   "state": "NY",
 *                   "country": "USA",
 *                   "zipCode": "10001"
 *                 },
 *                 "description": "Developing cutting-edge software",
 *                 "jobResponsibilities": [
 *                   "Collaborate with the team to develop features",
 *                   "Write clean, maintainable code"
 *                 ],
 *                 "skillRequirements": [
 *                   "JavaScript",
 *                   "Node.js",
 *                   "MongoDB"
 *                 ],
 *                 "salary": {
 *                   "min": 60000,
 *                   "max": 120000,
 *                   "currency": "USD"
 *                 },
 *                 "jobType": "Full-time",
 *                 "requirements": ["JavaScript", "Node.js", "MongoDB"],
 *                 "benefits": ["Health Insurance", "401K"],
 *                 "applicationDeadline": "2023-12-31",
 *                 "jobStatus": "Active",
 *                 "postedBy": "603c72ef5f2a4b1b88cd9a8e"
 *               }
 *             ]
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
router.post('/', authenticateJWT, addJob); 
module.exports = router;
