import fs from 'fs';
import path from 'path';

const storageFolderPath = './src/temp';
const storageFilePath = path.join(storageFolderPath, 'storedIds.json');

// Check if the temp folder exists, if not, create it
function ensureStorageFolderExists(): void {
  if (!fs.existsSync(storageFolderPath)) {
    fs.mkdirSync(storageFolderPath, { recursive: true });
  }
}

function readStoredIds(): string[] {
  ensureStorageFolderExists();

  try {
    const data = fs.readFileSync(storageFilePath, 'utf8');
    return JSON.parse(data) as string[];
  } catch (error) {
    return []; // Return an empty array if the file doesn't exist
  }
}

function writeStoredIds(ids: string[]): void {
  ensureStorageFolderExists();
  fs.writeFileSync(storageFilePath, JSON.stringify(ids, null, 2), 'utf8');
}

export { readStoredIds, writeStoredIds };
