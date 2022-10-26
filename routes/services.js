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
const ServiceSchema_1 = __importDefault(require("../schemas/ServiceSchema"));
const connection_1 = __importDefault(require("../hooks/connection"));
const handleError_1 = __importDefault(require("../hooks/handleError"));
const insufficientHeaders_1 = __importDefault(require("../hooks/insufficientHeaders"));
function ServiceHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const headers = req.headers;
        const method = req.headers.method;
        if (!method)
            return (0, insufficientHeaders_1.default)(req, res);
        yield (0, connection_1.default)();
        switch (method) {
            case "getAll":
                ServiceSchema_1.default.find({})
                    .lean()
                    .exec((error, result) => {
                    if (error)
                        return (0, handleError_1.default)(req, res, {
                            type: "server",
                            message: error.message,
                        });
                    const payload = result.map((one) => {
                        return Object.assign(Object.assign({}, one), { _id: one._id.toString() });
                    });
                    return res.status(200).json(payload);
                });
                break;
            case "get":
                if (!headers.sid)
                    return (0, insufficientHeaders_1.default)(req, res);
                ServiceSchema_1.default.findById(headers.sid).exec((error, result) => {
                    if (error)
                        return (0, handleError_1.default)(req, res, {
                            type: 'server',
                            message: error.message
                        });
                    if (result) {
                        return res.status(200).json(result.toObject());
                    }
                    else {
                        return (0, handleError_1.default)(req, res, {
                            type: "client",
                            message: "No such service exists..."
                        });
                    }
                });
                break;
        }
    });
}
exports.default = ServiceHandler;
//# sourceMappingURL=services.js.map