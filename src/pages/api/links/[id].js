import Link from '../utils/models/Links';
import dbConnect from '../../../lib/mongodb';

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const link = await Link.findById(id);
                if (!link) {
                    return res.status(404).json({ success: false, error: 'Link not found' });
                }
                res.status(200).json({ success: true, data: link });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;
        case 'PUT':
            try {
                const { type } = req.body;
                if (type && !['myCredit', 'noThanks'].includes(type)) {
                    return res.status(400).json({ success: false, error: 'Invalid type' });
                }

                const link = await Link.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!link) {
                    return res.status(404).json({ success: false, error: 'Link not found' });
                }
                res.status(200).json({ success: true, data: link });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;
        case 'DELETE':
            try {
                const deletedLink = await Link.deleteOne({ _id: id });
                if (!deletedLink.deletedCount) {
                    return res.status(404).json({ success: false, error: 'Link not found' });
                }
                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;
        default:
            res.status(405).json({ success: false, error: 'Method not allowed' });
            break;
    }
}
