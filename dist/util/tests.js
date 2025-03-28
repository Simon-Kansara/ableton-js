"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAbleton = void 0;
const __1 = require("..");
const withAbleton = async (callback) => {
    const ab = new __1.Ableton();
    ab.on("error", console.error);
    await ab.start(2000);
    try {
        await callback(ab);
    }
    finally {
        await ab.close();
    }
};
exports.withAbleton = withAbleton;
