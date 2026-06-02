const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a project title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a project description'],
  },
  tags: {
    type: [String],
    default: [],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  githubLink: {
    type: String,
    trim: true,
  },
  liveLink: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Project', ProjectSchema);
