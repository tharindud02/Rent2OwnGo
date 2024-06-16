import FormAnswer from '../utils/models/FormAnswers';
import dbConnect from '../../../lib/mongodb';

export default async function handler(req, res) {
    const { method, query, body } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const page = parseInt(query.page) || 1; // Default to page 1
                const limit = parseInt(query.limit) || 10; // Default to 10 items per page

                const totalItems = await FormAnswer.countDocuments({});
                const totalPages = Math.ceil(totalItems / limit);

                const formAnswers = await FormAnswer.find({})
                    .populate('responses.questionId')
                    .skip((page - 1) * limit)
                    .limit(limit);

                res.status(200).json({ data: formAnswers, totalPages });
            } catch (error) {
                res.status(500).json({ message: 'Failed to fetch form answers' });
            }
            break;
        case 'POST':
            try {
                const formAnswer = new FormAnswer(body);
                await formAnswer.save();
                res.status(201).json(formAnswer);
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: 'Failed to create form answer' });
            }
            break;
        // Add cases for PUT (update) and DELETE operations
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }

}
