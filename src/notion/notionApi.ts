import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
import { readStoredIds, writeStoredIds } from '../utils/storage';
import { createCalendarEvent } from '../utils/generateICS';
import { authorize } from '../googleCalendar/authentication';
import { insertGoogleCalendarEvent } from '../googleCalendar/googleApi';

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_SECRET as string });
const databaseId = process.env.NOTION_DB_ID as string;

async function getNewPages(): Promise<NotionPage[]> {
    const storedIds = readStoredIds();
    const response = await notion.databases.query({
        database_id: databaseId,
    });
    return response.results.filter(page => !storedIds.includes(page.id)) as NotionPage[];
}

async function retrievePageContent(pageId: string): Promise<any[]> {
    const response = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 50, // adjust the page size as needed
    });
    return response.results;
}

async function iterateNewPages(): Promise<void> {
    const newPages = await getNewPages();
    const auth = await authorize();

    for (const page of newPages) {
        const startString = page.properties["Due"]?.date?.start;
        const endString = page.properties["Due"]?.date?.end;
        // Skip the page if the start or end date is not set
        if (!startString || !endString) {
            continue;
        }

        const startDate = new Date(startString);
        const endDate = new Date(endString);

        const contentBlocks = await retrievePageContent(page.id);

        const eventData: CalendarEventData = {
            id: page.id,
            taskName: page.properties["Task name"]?.title?.map(t => t.plain_text).join('') || 'Unnamed Task',
            status: page.properties["Status"]?.status?.name || 'No Status',
            start: startDate,
            end: endDate,
            priority: page.properties["Priority"]?.select?.name || 'No Priority',
            content: contentBlocks.map(block => {
                if (block.type === 'paragraph' && block.paragraph.rich_text) {
                    return block.paragraph.rich_text.map((textItem: RichTextItem) => textItem.plain_text).join('');
                } else {
                    return '';
                }
            }).join('\n')
        };
        createCalendarEvent(eventData);
        await insertGoogleCalendarEvent(auth, eventData);
    }

    const newIds = newPages.map(page => page.id);
    writeStoredIds([...readStoredIds(), ...newIds]);
}

export { iterateNewPages }