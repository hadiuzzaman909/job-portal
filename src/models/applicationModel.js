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
  email: { type: String, lowercase: true, required: true },
  cvLink: { type: String, required: true },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Regular expression for international phone number
        // + followed by country code (1-3 digits, not starting with 0) and 6-12 digits
        const phoneRegex = /^\+[1-9]\d{1,2}\d{6,12}$/;
        return phoneRegex.test(v);
      },
      message: props => `${props.value} is not a valid phone number! Use format: +[countrycode][number], e.g., +12025550123`
    }
  },
  coverLetter: { type: String, required: true },
  applicantAddress: { type: AddressSchema, required: true },
  applicationStatus: { 
    type: String, 
    default: 'Pending',
    enum: ['Pending', 'Accepted', 'Rejected'] // Optional: restrict to these values
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