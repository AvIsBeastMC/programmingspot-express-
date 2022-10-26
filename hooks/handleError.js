"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleError(req, res, error) {
    return res.status(400).json(error);
}
exports.default = handleError;
//# sourceMappingURL=handleError.js.map