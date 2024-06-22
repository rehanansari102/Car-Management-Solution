const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  color: { type: String, required: true },
  model: { type: String, required: true },
  make: { type: String, required: true },
  registrationNo: { type: String, required: true },
  userId: { type: String, required: true }, // Using string for userId
  categoryId: { type: String, required: true }, // Using string for categoryId
}, { timestamps: true }); // Add timestamps option here

// Add indexes for better performance on frequent queries
CarSchema.index({ userId: 1 });
CarSchema.index({ categoryId: 1 });

module.exports = mongoose.model('Car', CarSchema);
