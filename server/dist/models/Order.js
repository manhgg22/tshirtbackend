"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
            productId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product' },
            designId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Design' },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        }],
    total: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered'],
        default: 'pending'
    },
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    createdAt: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model('Order', orderSchema);
