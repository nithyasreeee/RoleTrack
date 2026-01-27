const mongoose = require('mongoose');

/**
 * Employee Schema
 * Stores detailed employee information
 */
const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide first name'],
      trim: true,
      maxlength: [50, 'First name cannot be more than 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Please provide last name'],
      trim: true,
      maxlength: [50, 'Last name cannot be more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[\d\s\-\+\(\)]+$/, 'Please provide a valid phone number'],
    },
    department: {
      type: String,
      required: [true, 'Please provide a department'],
      enum: {
        values: ['Engineering', 'Design', 'HR', 'Sales', 'Marketing', 'Finance', 'Operations'],
        message: '{VALUE} is not a valid department',
      },
    },
    position: {
      type: String,
      required: [true, 'Please provide a position'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    joinDate: {
      type: Date,
      required: [true, 'Please provide join date'],
      default: Date.now,
    },
    salary: {
      type: Number,
      min: [0, 'Salary cannot be negative'],
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for full name
employeeSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Index for search optimization
employeeSchema.index({ firstName: 'text', lastName: 'text', email: 'text' });
employeeSchema.index({ department: 1, status: 1 });

module.exports = mongoose.model('Employee', employeeSchema);
