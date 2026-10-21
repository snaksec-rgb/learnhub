const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
    description: { type: String, required: [true, 'Description is required'] },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    lessons: [{ title: String, content: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);