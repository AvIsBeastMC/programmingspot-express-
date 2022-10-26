"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ServiceSchema = new mongoose_1.default.Schema({
    name: String,
    titleImage: String,
    createdOn: String,
    orders: Number,
    description: String,
    price: Number,
    lessons: [
        {
            title: String,
            description: String,
            videoUrl: String,
            points: String,
        }
    ],
    points: Array,
});
exports.default = mongoose_1.default.model("service", ServiceSchema);
//# sourceMappingURL=ServiceSchema.js.map