import mongoose from 'mongoose';
import { mongoModels } from '../enums/models';

const answerSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    zipcode: { type: String, required: true },
    responses: [{
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: mongoModels.QUESTION, required: true },
        answer: { type: String, required: true },
    }],
});

const Answer = mongoose.models[mongoModels.ANSWER] || mongoose.model(mongoModels.ANSWER, answerSchema);

export default Answer;
