"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ServiceSchema = new mongoose_1.Schema({
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
            points: [String],
            dateCreated: Date,
            id: String
        }
    ],
    points: [String],
});
exports.default = (0, mongoose_1.model)("service", ServiceSchema);
//# sourceMappingURL=ServiceSchema.js.map