import ical from 'ical-generator';
import fs from 'fs';
import path from 'path';


export function createCalendarEvent(eventData: CalendarEventData): void {
    const calendar = ical({ name: 'Notion Calendar' });

    // Use eventData to access the properties
    const startDate = eventData.start;
    const endDate = eventData.end || startDate; // Use the end date or default to start date
    const tempDir = './temp';
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }

    calendar.createEvent({
        start: startDate,
        end: endDate,
        summary: eventData.taskName,
        description: `Status: ${eventData.status}\nPriority: ${eventData.priority}`
    });

    const filePath = path.join(tempDir, `${eventData.id}.ics`);
    fs.writeFileSync(filePath, calendar.toString());
}
