import mongoose from 'mongoose';

const schema = mongoose.Schema({
  visitorName: {
    type: String,
    default: 'Anonymous',
  },
  heading: {
    type: String,
    required: true,
  },
  expSummary: {
    type: String,
    maxLength: 300,
  },
  exp: {
    type: String,
    minLength: 100,
    required: true,
  },
  visitDate: {
    type: Date,
    required: true,
  },
  photos: [
    {
      fileUrl: String,
      fileName: String,
    },
  ],
  userName: {
    type: String,
  },
  editPassword: {
    type: String,
  },
});

export const logs = mongoose.model('Logs', schema);
