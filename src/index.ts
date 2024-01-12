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

async function retrievePageContent(pageId: string): Promise<any[]> {
  const response = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 50, // adjust the page size as needed
  });
  return response.results;
}

async function findUpdatedPages(): Promise<void> {
  const newPages = await getNewPages();

  for (const page of newPages) {
    const contentBlocks = await retrievePageContent(page.id);

    // Process the content to extract text from rich text blocks
    //let contentText = 

    const eventData = {
      id: page.id,
      taskName: page.properties["Task name"]?.title?.map(t => t.plain_text).join('') || 'Unnamed Task',
      status: page.properties["Status"]?.status?.name || 'No Status',
      start: page.properties["Due"]?.date?.start || new Date().toISOString(),
      end: page.properties["Due"]?.date?.end || new Date().toISOString(),
      priority: page.properties["Priority"]?.select?.name || 'No Priority',
      content: contentBlocks.map(block => {
        if (block.type === 'paragraph' && block.paragraph.rich_text) {
          return block.paragraph.rich_text.map((textItem: RichTextItem) => textItem.plain_text).join('');
        } else {
          return ''; // Return an empty string for non-paragraph or empty blocks
        }
      }).join('') // Join paragraph texts with a newline
    };

    console.log(eventData)
  }

  // Update stored IDs with the new one
  const newIds = newPages.map(page => page.id);
  writeStoredIds([...readStoredIds(), ...newIds]);
}

findUpdatedPages();