"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Internal = void 0;
const _1 = require(".");
const package_version_1 = require("../util/package-version");
const semver_1 = __importDefault(require("semver"));
class Internal extends _1.Namespace {
    constructor(ableton) {
        super(ableton, "internal");
    }
    async isPluginUpToDate() {
        const pluginVersion = await this.get("version");
        return !semver_1.default.lt(pluginVersion, (0, package_version_1.getPackageVersion)());
    }
}
exports.Internal = Internal;
