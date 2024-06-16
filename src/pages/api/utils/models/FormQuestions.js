import mongoose from 'mongoose';
import { mongoModels } from '../enums/models';

const formQuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    type: { type: String, required: true }, // Example: 'text', 'textarea', 'radio', 'checkbox', etc.
    options: [{ type: String }], // Only applicable for 'radio' and 'checkbox' types
});

const Question = mongoose.models[mongoModels.QUESTION] || mongoose.model(mongoModels.QUESTION, formQuestionSchema);

export default Question;