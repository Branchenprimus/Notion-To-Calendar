"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeStoredIds = exports.readStoredIds = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const storageFolderPath = './src/temp';
const storageFilePath = path_1.default.join(storageFolderPath, 'storedIds.json');
// Check if the temp folder exists, if not, create it
function ensureStorageFolderExists() {
    if (!fs_1.default.existsSync(storageFolderPath)) {
        fs_1.default.mkdirSync(storageFolderPath, { recursive: true });
    }
}
function readStoredIds() {
    ensureStorageFolderExists();
    try {
        const data = fs_1.default.readFileSync(storageFilePath, 'utf8');
        return JSON.parse(data);
    }
    catch (error) {
        return []; // Return an empty array if the file doesn't exist
    }
}
exports.readStoredIds = readStoredIds;
function writeStoredIds(ids) {
    ensureStorageFolderExists();
    fs_1.default.writeFileSync(storageFilePath, JSON.stringify(ids, null, 2), 'utf8');
}
exports.writeStoredIds = writeStoredIds;
