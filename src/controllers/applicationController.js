const ApplicationModel = require('../models/applicationModel');

// Apply for a job
exports.applyForJob = async (req, res) => {
  const {
    jobId, name, email, cvLink, phoneNumber, coverLetter, applicantAddress
  } = req.body;

  try {
    const newApplication = new ApplicationModel({
      jobId,
      name,
      email,
      cvLink,
      phoneNumber,
      coverLetter,
      applicantAddress
    });

    await newApplication.save();
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting application' });
  }
};

// Get all applications
exports.getApplications = async (req, res) => {
  try {
    const applications = await ApplicationModel.find();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
};
