"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AccountSchema_1 = __importDefault(require("../schemas/AccountSchema"));
const ServiceSchema_1 = __importDefault(require("../schemas/ServiceSchema"));
const connection_1 = __importDefault(require("../hooks/connection"));
const handleError_1 = __importDefault(require("../hooks/handleError"));
const insufficientHeaders_1 = __importDefault(require("../hooks/insufficientHeaders"));
function AdminHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const headers = req.headers;
        const method = req.headers.method;
        if (!method)
            return (0, insufficientHeaders_1.default)(req, res);
        yield (0, connection_1.default)();
        switch (method) {
            case "login":
                if (!headers.email || !headers.password)
                    return (0, insufficientHeaders_1.default)(req, res);
                AccountSchema_1.default.findOne({
                    email: headers.email,
                    password: headers.password,
                }).exec((error, account) => {
                    if (error)
                        (0, handleError_1.default)(req, res, {
                            type: "server",
                            message: error.message,
                        });
                    if (account && account.isAdmin) {
                        return res.status(200).json(account.toObject());
                    }
                    else {
                        return (0, handleError_1.default)(req, res, {
                            type: "client",
                            message: "No such admin account exists",
                        });
                    }
                });
                break;
            case "createService":
                if (!headers.name ||
                    !headers.description ||
                    !headers.price ||
                    !headers.points ||
                    !headers.image)
                    (0, insufficientHeaders_1.default)(req, res);
                const payload = {
                    name: headers.name,
                    description: headers.description,
                    price: parseInt(headers.price) * 100,
                    points: JSON.parse(headers.points),
                    titleImage: headers.image,
                    createdOn: Date(),
                    orders: 0,
                    lessons: [],
                };
                ServiceSchema_1.default.create(payload)
                    .then((doc) => {
                    return res.status(200).end("Success");
                })
                    .catch((e) => (0, handleError_1.default)(req, res, {
                    type: "server",
                    message: e.message,
                }));
                break;
            case "modifyService":
                if (!headers.name ||
                    !headers.description ||
                    !headers.price ||
                    !headers.points ||
                    !headers.image ||
                    !headers.id)
                    (0, insufficientHeaders_1.default)(req, res);
                const modifyPayload = {
                    name: headers.name,
                    description: headers.description,
                    price: parseInt(headers.price) * 100,
                    points: JSON.parse(headers.points),
                    titleImage: headers.image,
                };
                ServiceSchema_1.default.findById(headers.id).exec((error, result) => {
                    if (error)
                        return (0, handleError_1.default)(req, res, {
                            type: "server",
                            message: error.message
                        });
                    if (result) {
                        result.update(modifyPayload).exec((error) => {
                            if (error)
                                return (0, handleError_1.default)(req, res, {
                                    type: "server",
                                    message: error.message
                                });
                            return res.status(200).end("Success");
                        });
                    }
                    else {
                        return (0, handleError_1.default)(req, res, {
                            type: 'server',
                            message: "No service with this ID exists..."
                        });
                    }
                });
                break;
        }
    });
}
exports.default = AdminHandler;
//# sourceMappingURL=admin.js.map