// pages/api/form-questions/index.js

import FormQuestion from '../utils/models/FormQuestions';
import dbConnect from '../../../lib/mongodb';

export default async function handler(req, res) {
    const { method, body } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const formQuestions = await FormQuestion.find({});
                res.status(200).json(formQuestions);
            } catch (error) {
                res.status(500).json({ message: 'Failed to fetch form questions' });
            }
            break;
        case 'POST':
            try {
                const formQuestion = new FormQuestion(body);
                await formQuestion.save();
                res.status(201).json(formQuestion);
            } catch (error) {
                res.status(500).json({ message: 'Failed to create form question' });
            }
            break;
        // Add cases for PUT (update) and DELETE operations
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
