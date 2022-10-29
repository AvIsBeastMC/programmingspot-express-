"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    by: String,
    service: {
        name: String,
        titleImage: String,
        createdOn: String,
        orders: Number,
        description: String,
        price: Number,
        lessons: [],
        points: [],
        _id: String
    },
    purchasedOn: Date,
});
exports.default = mongoose_1.default.model("orders", OrderSchema);
//# sourceMappingURL=OrderSchema.js.map