import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
import { readStoredIds, writeStoredIds } from './storage';
import { createCalendarEvent } from './generateICS';

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

async function findUpdatedPages(): Promise<void> {
    const newPages = await getNewPages();

    newPages.forEach(page => {
        const eventData: CalendarEventData = {
            id: page.id,
            taskName: page.properties["Task name"]?.title?.map(t => t.plain_text).join('') || 'Unnamed Task',
            status: page.properties["Status"]?.status?.name || 'No Status',
            start: page.properties["Due"]?.date?.start || new Date(),
            end: page.properties["Due"]?.date?.end || new Date(),
            priority: page.properties["Priority"]?.select?.name || 'No Priority'
        };

        createCalendarEvent(eventData);
    });

    // Update stored IDs
    const newIds = newPages.map(page => page.id);
    writeStoredIds(newIds);
}

findUpdatedPages();
