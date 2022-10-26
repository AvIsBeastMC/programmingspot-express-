"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const admin_1 = __importDefault(require("./routes/admin"));
const auth_1 = __importDefault(require("./routes/auth"));
const order_1 = __importDefault(require("./routes/order"));
const services_1 = __importDefault(require("./routes/services"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
// import AccountHandler from './routes/accountHandler'
// import ItemHandler from './routes/itemHandler';
// import { MongooseAccountInterface } from './interfaces/account';
// import { MongooseItemInterface } from './interfaces/item';
// import OrderHandler from './routes/orderHandler';
// import SellerHandler from './routes/sellerHandler';
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)({
    origin: '*'
}));
app.get('/auth', (req, res) => (0, auth_1.default)(req, res));
app.get('/services', (req, res) => (0, services_1.default)(req, res));
app.get('/orders', (req, res) => (0, order_1.default)(req, res));
app.get('/admin', (req, res) => (0, admin_1.default)(req, res));
app.listen(port, () => {
    console.log('Listening');
});
//# sourceMappingURL=index.js.map