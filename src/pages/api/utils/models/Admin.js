// models/Admin.js
import mongoose from 'mongoose';
import { mongoModels } from '../enums/models';

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
});

export default mongoose.models[mongoModels.ADMIN] || mongoose.model(mongoModels.ADMIN, AdminSchema);
