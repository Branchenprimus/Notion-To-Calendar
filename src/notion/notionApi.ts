import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
import { readStoredIds, writeStoredIds } from '../utils/storage';
import { authorize } from '../googleCalendar/authentication';
import { insertGoogleCalendarEvent } from '../googleCalendar/googleApi';

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_SECRET as string });
const databaseId = process.env.NOTION_DB_ID as string;

async function getNewPages(): Promise<UnifiedEventData[]> {
    const storedIds = readStoredIds();
    const response = await notion.databases.query({
        database_id: databaseId,
    });

    return response.results
        .filter(page => !storedIds.includes(page.id))
        .map(notionPage => transformToUnifiedEventData(notionPage));
}

function transformToUnifiedEventData(page: any): UnifiedEventData {
    const startString = page.properties["Due"]?.date?.start;
    const endString = page.properties["Due"]?.date?.end;
    const startDate = startString ? new Date(startString) : undefined;
    const endDate = endString ? new Date(endString) : undefined;

    return {
        id: page.id,
        taskName: page.properties["Task name"]?.title?.map((t: any) => t.plain_text).join('') || 'Unnamed Task',
        status: page.properties["Status"]?.status?.name || 'No Status',
        start: startDate,
        end: endDate,
        priority: page.properties["Priority"]?.select?.name || 'No Priority',
        content: '', // This will be filled later
    };
}

async function retrievePageContent(pageId: string): Promise<any[]> {
    const response = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 50, // adjust the page size as needed
    });
    return response.results;
}

async function iterateNewPages(): Promise<void> {
    const newEvents = await getNewPages();
    const auth = await authorize();

    for (const event of newEvents) {
        if (!event.start || !event.end) {
            continue;
        }

        const contentBlocks = await retrievePageContent(event.id);
        event.content = contentBlocks.map(block => {
            if (block.type === 'paragraph' && block.paragraph.rich_text) {
                return block.paragraph.rich_text.map((textItem: any) => textItem.plain_text as string).join('');
            }
            return '';
        }).join('\n');
        

        await insertGoogleCalendarEvent(auth, event);
    }

    const newIds = newEvents.map(event => event.id);
    writeStoredIds([...readStoredIds(), ...newIds]);
}


export { iterateNewPages }