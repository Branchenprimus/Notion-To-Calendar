import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
import { readStoredIds, writeStoredIds } from './storage';
import { createCalendarEvent } from './generateICS';

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_SECRET as string });
const databaseId = process.env.NOTION_DB_ID as string;

interface PageData {
    id: string;
    taskName: string;
    status: string;
    start: string;
    end: string;
    priority: string;
}

const findUpdatedPages = async (): Promise<void> => {
    const storedIds = readStoredIds();

    const response = await notion.databases.query({
        database_id: databaseId,
    });

    const newPages = response.results.filter(page => !storedIds.includes(page.id)) as NotionPage[];

    const pagesData = newPages.map(page => {
        let pageData: PageData = { id: page.id, taskName: '', status: '', start: '', end: '', priority: '' };

        pageData.taskName = page.properties["Task name"]?.title?.map((titlePart: { plain_text: string }) => titlePart.plain_text).join('') || 'Unnamed Task';    
        pageData.status = page.properties["Status"]?.status?.name || 'No Status';

        // Accessing start and end dates correctly
        pageData.start = page.properties["Due"]?.date?.start || 'No Start Date';
        pageData.end = page.properties["Due"]?.date?.end || 'No End Date';

        pageData.priority = page.properties["Priority"]?.select?.name || 'No Priority';

        return pageData;
    });

    const newIds = newPages.map(page => page.id);
    writeStoredIds([...storedIds, ...newIds]);

    console.log(pagesData);
    console.log(newIds);
}

findUpdatedPages();
