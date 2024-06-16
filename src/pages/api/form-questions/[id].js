// pages/api/form-questions/[id].js

import FormQuestion from '../utils/models/FormQuestions';
import dbConnect from '../../../lib/mongodb';

export default async function handler(req, res) {
    const {
        query: { id },
        method,
        body
    } = req;

    await dbConnect();

    switch (method) {
        case 'DELETE':
            try {
                const deletedFormQuestion = await FormQuestion.findByIdAndDelete(id);
                if (!deletedFormQuestion) {
                    return res.status(404).json({ message: 'Form question not found' });
                }
                res.status(200).json({ message: 'Form question deleted successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Failed to delete form question' });
            }
            break;
        default:
            res.setHeader('Allow', ['DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
