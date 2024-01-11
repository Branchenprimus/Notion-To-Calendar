"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCalendarEvent = void 0;
const ical_generator_1 = __importDefault(require("ical-generator"));
const fs_1 = __importDefault(require("fs"));
function createCalendarEvent(eventData) {
    const calendar = (0, ical_generator_1.default)({ name: 'notion calendar' });
    calendar.createEvent({
        start: eventData.start,
        end: eventData.end,
        summary: eventData.summary,
        description: eventData.description
    });
    fs_1.default.writeFileSync('./temp/event.ics', calendar.toString());
}
exports.createCalendarEvent = createCalendarEvent;
