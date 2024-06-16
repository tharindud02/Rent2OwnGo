// models/House.js
import mongoose from 'mongoose';
import { mongoModels } from '../enums/models';

const houseSchema = new mongoose.Schema({
    rentType: {
        type: String,
        required: true,
        enum: ['rent to own', 'owner finance'],
    },
    price: {
        type: String,
        required: true,
    },
    priceType: {
        type: String,
        required: true,
        enum: ['estimate price', 'last price'],
    },
    houseType: {
        type: String,
        required: true,
        enum: ['single family', 'multi family', 'apartment', 'condo'],
    },
    imageUrls: {
        type: [String],
        required: true,
        validate: [arrayLimit, '{PATH} exceeds the limit of 10'],
    },
}, {
    timestamps: true,
});

function arrayLimit(val) {
    return val.length <= 10;
}

export default mongoose.models[mongoModels.HOUSE] || mongoose.model(mongoModels.HOUSE, houseSchema);
