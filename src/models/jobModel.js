const mongoose = require('mongoose');

// Location Schema
const LocationSchema = new mongoose.Schema({
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipCode: { type: String },
}, { _id: false });

// Salary Schema
const SalarySchema = new mongoose.Schema({
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  currency: { type: String, default: 'USD' }
}, { _id: false });

// Job Schema
const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: LocationSchema, required: true },
  description: { type: String, required: true },  // Job description (text)
  jobResponsibilities: { 
    type: [String], 
    required: true, 
    validate: [(arr) => arr.length > 0, 'At least one responsibility is required']
  },  // Multiple responsibilities (array of strings)
  skillRequirements: { 
    type: [String], 
    required: true, 
    validate: [(arr) => arr.length > 0, 'At least one skill requirement is required']
  },  // Multiple skills (array of strings)
  salary: { type: SalarySchema, required: true },
  jobType: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], required: true },
  requirements: { 
    type: [String], 
    required: true, 
    validate: [(arr) => arr.length > 0, 'At least one requirement is required']
  },
  benefits: { type: [String] },
  applicationDeadline: { type: Date, required: true },
  jobStatus: { type: String, enum: ['Active', 'Closed', 'On Hold'], default: 'Active' },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
});

// Indexes
JobSchema.index({ company: 1, jobStatus: 1 });
JobSchema.index({ applicationDeadline: 1 });

// Export the Job Model
const JobModel = mongoose.model('Job', JobSchema);

module.exports = JobModel;
