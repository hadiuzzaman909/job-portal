const JobModel = require('../models/jobModel');

// Get all jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await JobModel.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
};

// Get a job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await JobModel.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job details' });
  }
};

// Add a new job (Admin only)
exports.addJob = async (req, res) => {
  // Destructure the fields from the request body
  const { 
    title, 
    company, 
    location, 
    description, 
    jobResponsibilities, 
    skillRequirements, 
    salary, 
    jobType, 
    requirements, 
    benefits, 
    applicationDeadline, 
    postedBy 
  } = req.body;

  // Validate required fields
  if (!title || !company || !location || !description || !jobResponsibilities || !skillRequirements || !salary || !jobType || !requirements || !applicationDeadline || !postedBy) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Create a new Job document
    const newJob = new JobModel({
      title,
      company,
      location,
      description,
      jobResponsibilities,  // Array of job responsibilities
      skillRequirements,    // Array of required skills
      salary,
      jobType,
      requirements,         // Array of job requirements
      benefits,
      applicationDeadline,
      postedBy
    });

    // Save the new job to the database
    await newJob.save();

    // Return the created job in the response
    res.status(201).json(newJob);
  } catch (error) {
    console.error("Error saving job:", error);
    res.status(500).json({ message: 'Error saving job', error: error.message });
  }
};

// Delete a job by ID (Admin only)
exports.deleteJob = async (req, res) => {
  try {
    const job = await JobModel.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job' });
  }
};
