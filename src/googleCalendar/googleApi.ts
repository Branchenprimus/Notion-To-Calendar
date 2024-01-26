import { google, Auth, calendar_v3 } from 'googleapis';
/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {Auth.OAuth2Client} auth An authorized OAuth2 client.
 */
async function listEvents(auth: Auth.OAuth2Client): Promise<void> {
    const calendar = google.calendar({ version: 'v3', auth });
    try {
        const res = await calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        });
        const events = res.data.items;
        if (!events || events.length === 0) {
            console.log('No upcoming events found.');
            return;
        }
        console.log('Upcoming 10 events:');
        events.forEach((event) => {
            const start = event.start?.dateTime || event.start?.date;
            console.log(`${start} - ${event.summary}`);
        });
    } catch (err) {
        console.error('Error retrieving events:', err);
    }
}

async function insertGoogleCalendarEvent(auth: Auth.OAuth2Client, eventData: UnifiedEventData): Promise<void> {
    const calendar = google.calendar({ version: 'v3', auth });

    // Default time values if not provided
    const defaultStart = new Date();
    const defaultEnd = new Date(defaultStart.getTime() + 60 * 60000); // 1 hour later

    console.log(eventData)
    // Use provided values or default values
    const startDateTime = eventData.start || defaultStart;
    const endDateTime = eventData.end || defaultEnd;

    const event: calendar_v3.Schema$Event = {
        summary: eventData.taskName,
        description: `Status: ${eventData.status}\nPriority: ${eventData.priority}\nContent: ${eventData.content}`,
        start: {
            dateTime: startDateTime.toISOString(),
            timeZone: 'Europe/Berlin', // Adjust timeZone as needed
        },
        end: {
            dateTime: endDateTime.toISOString(),
            timeZone: 'Europe/Berlin', // Adjust timeZone as needed
        },
        // ...other properties
    };

    try {
        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: event,
        });
        console.log('Event created: %s', response.data.htmlLink);
    } catch (err) {
        console.error('There was an error contacting the Calendar service:', err);
    }
}



// Example usage
// Note: You need to obtain 'auth' from Google's authentication flow
const exampleEventData: CalendarEventData = {
    id: 'example_id',
    start: new Date('2024-01-13T09:00:00-07:00'),
    end: new Date('2024-01-14T17:00:00-07:00'),
    taskName: 'Google I/O 2015',
    status: 'Confirmed',
    priority: 'High',
    content: 'A chance to hear more about Google\'s developer products.',
};


export { insertGoogleCalendarEvent, listEvents }

