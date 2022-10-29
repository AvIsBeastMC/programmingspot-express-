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
const connection_1 = __importDefault(require("../hooks/connection"));
const handleError_1 = __importDefault(require("../hooks/handleError"));
const insufficientHeaders_1 = __importDefault(require("../hooks/insufficientHeaders"));
function AuthHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const headers = req.headers;
        const method = req.headers.method;
        if (!method)
            return (0, insufficientHeaders_1.default)(req, res);
        yield (0, connection_1.default)();
        switch (method) {
            case "signup":
                if (!headers.email || !headers.password || !headers.name)
                    return (0, insufficientHeaders_1.default)(req, res);
                AccountSchema_1.default.findOne({
                    email: headers.email,
                }).exec((error, result) => {
                    if (error)
                        return (0, handleError_1.default)(req, res, {
                            type: "server",
                            message: error.message,
                        });
                    if (result)
                        return (0, handleError_1.default)(req, res, {
                            type: "server",
                            message: "Account with this email already exists",
                        });
                    AccountSchema_1.default.create({
                        email: headers.email,
                        createdOn: Date(),
                        password: headers.password,
                        name: headers.name,
                        isAdmin: false,
                        services: [],
                        orders: [],
                    }).then(() => {
                        res.end("Success");
                    });
                });
                break;
            case "login":
                if (!headers.email || !headers.password)
                    return (0, insufficientHeaders_1.default)(req, res);
                AccountSchema_1.default.findOne({
                    email: headers.email,
                    password: headers.password,
                }).exec((error, result) => {
                    if (error)
                        return (0, handleError_1.default)(req, res, {
                            type: "server",
                            message: error.message,
                        });
                    if (!result)
                        return (0, handleError_1.default)(req, res, {
                            type: "client",
                            message: "No such account exists",
                        });
                    return res.status(200).json(result.toObject());
                });
                break;
            case "get":
                if (!headers.id)
                    return (0, insufficientHeaders_1.default)(req, res);
                break;
        }
    });
}
exports.default = AuthHandler;
//# sourceMappingURL=auth.js.map