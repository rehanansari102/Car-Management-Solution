const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true } // Reference to User model
}, { timestamps: true });
CategorySchema.index({ userId: 1 });
module.exports = mongoose.model('Category', CategorySchema);
