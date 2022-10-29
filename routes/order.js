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
const OrderSchema_1 = __importDefault(require("../schemas/OrderSchema"));
const ServiceSchema_1 = __importDefault(require("../schemas/ServiceSchema"));
const connection_1 = __importDefault(require("../hooks/connection"));
const handleError_1 = __importDefault(require("../hooks/handleError"));
const insufficientHeaders_1 = __importDefault(require("../hooks/insufficientHeaders"));
const moment_1 = __importDefault(require("moment"));
function OrderHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const headers = req.headers;
        const method = headers.method;
        if (!method)
            return (0, insufficientHeaders_1.default)(req, res);
        const handleAnError = (req, res, error, extra) => {
            return (0, handleError_1.default)(req, res, {
                type: 'server',
                message: extra ? `${error.message} - ${extra}` : error.message
            });
        };
        yield (0, connection_1.default)();
        switch (method) {
            case "new":
                if (!headers.acc || !headers.serv)
                    return (0, insufficientHeaders_1.default)(req, res);
                const accountRef = AccountSchema_1.default.findById(headers.acc);
                const serviceRef = ServiceSchema_1.default.findById(headers.serv);
                accountRef.exec((error, account) => __awaiter(this, void 0, void 0, function* () {
                    if (error)
                        return handleAnError(req, res, error);
                    if (account) {
                        serviceRef.exec((error, service) => __awaiter(this, void 0, void 0, function* () {
                            if (error)
                                return (0, handleError_1.default)(req, res, {
                                    type: 'server',
                                    message: error.message
                                });
                            if (service) {
                                account.updateOne({
                                    $push: {
                                        services: {
                                            expiresOn: (0, moment_1.default)().add(1, 'year').toString(),
                                            boughtOn: (0, moment_1.default)().toString(),
                                            servId: headers.serv,
                                            transactionId: headers.tid
                                        }
                                    }
                                }).exec((error) => {
                                    if (error)
                                        return handleAnError(req, res, error, "couldn't add service to account...");
                                    service.updateOne({
                                        $inc: {
                                            orders: +1
                                        }
                                    }).exec((error) => __awaiter(this, void 0, void 0, function* () {
                                        if (error)
                                            return handleAnError(req, res, error);
                                        yield OrderSchema_1.default.create({
                                            by: account._id.toString(),
                                            service: Object.assign(Object.assign({}, service.toObject()), { _id: service._id.toString() }),
                                            purchasedOn: new Date()
                                        });
                                        return res.end("Success!");
                                    }));
                                });
                                return res.end("Success");
                            }
                            else {
                                return (0, handleError_1.default)(req, res, {
                                    type: 'client',
                                    message: "No Such Service Exists..."
                                });
                            }
                        }));
                    }
                    else {
                        return (0, handleError_1.default)(req, res, {
                            type: 'client',
                            message: "No Such Account Exists..."
                        });
                    }
                }));
                break;
        }
    });
}
exports.default = OrderHandler;
//# sourceMappingURL=order.js.map