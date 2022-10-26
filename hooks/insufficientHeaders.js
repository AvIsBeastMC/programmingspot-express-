"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function insufficientHeaders(req, res) {
    return res.status(400).json({
        error: "Insufficient Headers",
        message: "Insufficient Headers"
    });
}
exports.default = insufficientHeaders;
//# sourceMappingURL=insufficientHeaders.js.map