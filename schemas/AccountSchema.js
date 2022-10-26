"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AccountSchema = new mongoose_1.default.Schema({
    createdOn: String,
    email: String,
    password: String,
    name: String,
    isAdmin: Boolean,
    services: Array
});
exports.default = mongoose_1.default.model("accounts", AccountSchema);
//# sourceMappingURL=AccountSchema.js.map