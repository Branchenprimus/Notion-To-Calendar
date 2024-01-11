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
const client_1 = require("@notionhq/client");
const dotenv_1 = __importDefault(require("dotenv"));
const storage_1 = require("./storage");
dotenv_1.default.config();
const notion = new client_1.Client({ auth: process.env.NOTION_SECRET });
const databaseId = process.env.NOTION_DB_ID;
const findUpdatedPages = () => __awaiter(void 0, void 0, void 0, function* () {
    const storedIds = (0, storage_1.readStoredIds)();
    const response = yield notion.databases.query({
        database_id: databaseId,
    });
    const newPages = response.results.filter(page => !storedIds.includes(page.id));
    const pagesData = newPages.map(page => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let pageData = { id: page.id, taskName: '', status: '', start: '', end: '', priority: '' };
        pageData.taskName = ((_b = (_a = page.properties["Task name"]) === null || _a === void 0 ? void 0 : _a.title) === null || _b === void 0 ? void 0 : _b.map((titlePart) => titlePart.plain_text).join('')) || 'Unnamed Task';
        pageData.status = ((_d = (_c = page.properties["Status"]) === null || _c === void 0 ? void 0 : _c.status) === null || _d === void 0 ? void 0 : _d.name) || 'No Status';
        // Accessing start and end dates correctly
        pageData.start = ((_f = (_e = page.properties["Due"]) === null || _e === void 0 ? void 0 : _e.date) === null || _f === void 0 ? void 0 : _f.start) || 'No Start Date';
        pageData.end = ((_h = (_g = page.properties["Due"]) === null || _g === void 0 ? void 0 : _g.date) === null || _h === void 0 ? void 0 : _h.end) || 'No End Date';
        pageData.priority = ((_k = (_j = page.properties["Priority"]) === null || _j === void 0 ? void 0 : _j.select) === null || _k === void 0 ? void 0 : _k.name) || 'No Priority';
        return pageData;
    });
    const newIds = newPages.map(page => page.id);
    (0, storage_1.writeStoredIds)([...storedIds, ...newIds]);
    console.log(pagesData);
    console.log(newIds);
});
findUpdatedPages();
