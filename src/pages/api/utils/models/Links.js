// models/House.js
import mongoose from 'mongoose';
import { mongoModels } from '../enums/models';

const linkSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['myCredit', 'noThanks'], // Enum values
    },
    link: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

export default mongoose.models[mongoModels.LINK] || mongoose.model(mongoModels.LINK, linkSchema);
