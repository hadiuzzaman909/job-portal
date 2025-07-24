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
 *           example: "603c72ef5f2a4b1b88cd9a8e"  # Job ID example
 *         name:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           example: "john.doe@example.com"
 *         cvLink:
 *           type: string
 *           example: "https://example.com/cv.pdf"
 *         phoneNumber:
 *           type: string
 *           example: "+1234567890"
 *         coverLetter:
 *           type: string
 *           example: "I am very interested in this position because..."
 *         applicantAddress:
 *           $ref: '#/components/schemas/Address'
 *         applicationStatus:
 *           type: string
 *           enum: [Pending, Under Review, Accepted, Rejected]
 *           example: "Pending"
 */

/**
 * @swagger
 * /api/applications:
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
 * /api/applications:
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
