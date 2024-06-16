import House from '../utils/models/Houses';
import dbConnect from '../../../lib/mongodb';


export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                const house = await House.findById(id);
                if (!house) {
                    return res.status(404).json({ success: false });
                }
                res.status(200).json(house);
            } catch (error) {
                res.status(400).json({ success: false, error });
            }
            break;
        case 'PUT':
            try {
                const house = await House.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
                if (!house) {
                    return res.status(404).json({ success: false });
                }
                res.status(200).json(house);
            } catch (error) {
                res.status(400).json({ success: false, error });
            }
            break;
        case 'DELETE':
            try {
                const deletedHouse = await House.deleteOne({ _id: id });
                if (!deletedHouse) {
                    return res.status(404).json({ success: false });
                }
                res.status(200).json({ success: true });
            } catch (error) {
                res.status(400).json({ success: false, error });
            }
            break;
        default:
            res.status(405).json({ success: false });
            break;
    }
}