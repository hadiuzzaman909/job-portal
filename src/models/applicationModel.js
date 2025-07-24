const mongoose = require('mongoose');

// Address Schema
const AddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
}, { _id: false });

// Application Schema
const ApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true }, // Reference to Job model
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    lowercase: true, 
    match: [/\S+@\S+\.\S+/, 'Invalid email format'] 
  },
  cvLink: { 
    type: String, 
    required: true, 
    match: [/^https?:\/\/.+/, 'Invalid URL'] 
  },
  phoneNumber: { 
    type: String, 
    required: true, 
    match: [/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'] 
  },
  coverLetter: { 
    type: String, 
    required: true, 
    maxlength: [5000, 'Cover letter too long']
  },
  applicantAddress: { type: AddressSchema, required: true },
  applicationStatus: { 
    type: String, 
    enum: ['Pending', 'Under Review', 'Accepted', 'Rejected'], 
    default: 'Pending' 
  },
}, {
  timestamps: true,
});

// Indexes for faster querying
ApplicationSchema.index({ jobId: 1, email: 1 });
ApplicationSchema.index({ applicationStatus: 1 });

// Export the Application Model
const ApplicationModel = mongoose.model('Application', ApplicationSchema);

module.exports = ApplicationModel;
