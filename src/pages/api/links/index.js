import Link from '../utils/models/Links';
import dbConnect from '../../../lib/mongodb';

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const links = await Link.find({});
                res.status(200).json({ success: true, data: links });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;
        case 'POST':
            try {
                const { type } = req.body;
                if (!['myCredit', 'noThanks'].includes(type)) {
                    return res.status(400).json({ success: false, error: 'Invalid type' });
                }

                const existingLink = await Link.findOne({ type });
                if (existingLink) {
                    return res.status(400).json({ success: false, error: 'Link of this type already exists' });
                }

                const link = await Link.create(req.body);
                res.status(201).json({ success: true, data: link });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;
        default:
            res.status(405).json({ success: false, error: 'Method not allowed' });
            break;
    }
}
