import ical from 'ical-generator';
import fs from 'fs';

interface CalendarEventData {
    start: Date;
    end: Date;
    summary: string;
    description: string;
}

function createCalendarEvent(eventData: CalendarEventData): void {
    const calendar = ical({name: 'notion calendar'});

    calendar.createEvent({
        start: eventData.start,
        end: eventData.end,
        summary: eventData.summary,
        description: eventData.description
    });

    fs.writeFileSync('./temp/event.ics', calendar.toString());
}

export { createCalendarEvent };
