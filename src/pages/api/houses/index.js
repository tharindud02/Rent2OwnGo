import House from '../utils/models/Houses';
import dbConnect from '../../../lib/mongodb';

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const houses = await House.find({});
                res.status(200).json(houses);
            } catch (error) {
                res.status(400).json({ success: false, error });
            }
            break;
        case 'POST':
            try {
                const house = await House.create(req.body);
                res.status(201).json(house);
            } catch (error) {
                res.status(400).json({ success: false, error });
            }
            break;
        default:
            res.status(405).json({ success: false });
            break;
    }
}
