const express = require('express');
const { applyForJob, getApplications } = require('../controllers/applicationController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Job application management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         street:
 *           type: string
 *           example: "1234 Elm Street"
 *         city:
 *           type: string
 *           example: "New York"
 *         country:
 *           type: string
 *           example: "USA"
 *     Application:
 *       type: object
 *       properties:
 *         jobId:
 *           type: string
 *           description: ID of the job being applied for
 *           example: "603c72ef5f2a4b1b88cd9a8e"  # Example Job ID
 *         name:
 *           type: string
 *           description: Full name of the applicant
 *           example: "John Doe"
 *         email:
 *           type: string
 *           description: Email address of the applicant
 *           example: "john.doe@example.com"
 *         cvLink:
 *           type: string
 *           description: Link to the applicant's CV
 *           example: "https://example.com/cv.pdf"
 *         phoneNumber:
 *           type: string
 *           description: Phone number of the applicant
 *           example: "+1234567890"
 *         coverLetter:
 *           type: string
 *           description: The applicant's cover letter
 *           example: "I am very interested in this position because..."
 *         applicantAddress:
 *           $ref: '#/components/schemas/Address'
 *         applicationStatus:
 *           type: string
 *           enum: [Pending, Under Review, Accepted, Rejected]
 *           description: Current status of the application
 *           example: "Pending"
 */

/**
 * @swagger
 * /applications:
 *   post:
 *     summary: Apply for a job
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Application'
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */
router.post('/', applyForJob);

/**
 * @swagger
 * /applications:
 *   get:
 *     summary: Get all applications
 *     tags: [Applications]
 *     responses:
 *       200:
 *         description: List of all applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 *       500:
 *         description: Internal server error
 */
router.get('/', getApplications);

module.exports = router;
