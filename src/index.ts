import { authorize } from './googleCalendar/authentication'; // Adjust the path as necessary
import { iterateNewPages } from './notion/notionApi';
import { insertGoogleCalendarEvent, listEvents } from './googleCalendar/googleApi';

async function main() {
  try {
    const auth = await authorize();
    await iterateNewPages(); // Iterate over new Notion pages and do something
    //await listEvents(auth); // List events from Google Calendar
  } catch (error) {
    console.error('Error:', error);
  }
}

main();

