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
  const { title, company, location, description, salary, jobType, requirements, benefits, applicationDeadline, postedBy } = req.body;

  try {
    const newJob = new JobModel({
      title,
      company,
      location,
      description,
      salary,
      jobType,
      requirements,
      benefits,
      applicationDeadline,
      postedBy
    });

    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: 'Error saving job' });
  }
};
