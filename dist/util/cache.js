"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCached = void 0;
const isCached = (obj) => obj && "__cached" in obj;
exports.isCached = isCached;
