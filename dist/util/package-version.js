"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageVersion = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getPackageVersion = () => {
    const parentPath = path_1.default.join(__dirname, "..", "package.json");
    const parent2Path = path_1.default.join(__dirname, "..", "..", "package.json");
    if (fs_1.default.existsSync(parentPath)) {
        return require(parentPath).version;
    }
    if (fs_1.default.existsSync(parent2Path)) {
        return require(parent2Path).version;
    }
    throw new Error("Could not find package.json");
};
exports.getPackageVersion = getPackageVersion;
