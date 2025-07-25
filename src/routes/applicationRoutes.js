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
 *         city:
 *           type: string
 *         country:
 *           type: string
 *       required:
 *         - street
 *         - city
 *         - country
 *     Application:
 *       type: object
 *       properties:
 *         jobId:
 *           type: string
 *           description: ID of the job being applied for
 *         name:
 *           type: string
 *           description: Full name of the applicant
 *         email:
 *           type: string
 *           description: Email address of the applicant
 *         cvLink:
 *           type: string
 *           description: Link to the applicant's CV
 *         phoneNumber:
 *           type: string
 *           description: Phone number of the applicant
 *         coverLetter:
 *           type: string
 *           description: The applicant's cover letter
 *         applicantAddress:
 *           $ref: '#/components/schemas/Address'
 *         applicationStatus:
 *           type: string
 *           enum: [Pending, Under Review, Accepted, Rejected]
 *           description: Current status of the application
 *       required:
 *         - jobId
 *         - name
 *         - email
 *         - cvLink
 *         - phoneNumber
 *         - coverLetter
 *         - applicantAddress
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