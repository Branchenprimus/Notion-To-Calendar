# Notion-To-Calendar

## Description
Notion-To-Calendar is a tool designed to synchronize Notion pages with calendar events. It automates the process of transferring your scheduled tasks and events from Notion into a calendar format.

## Features
- Automatic synchronization of Notion pages with calendar events.
- Easy setup and user-friendly interface.
- Customizable settings to tailor the synchronization process to your needs.

## Installation
To get started with Notion-To-Calendar, follow these steps:
```bash
git clone https://github.com/Branchenprimus/Notion-To-Calendar.git
```

## Requirements
- Node.js installed on your system.
- A Notion account and API key.

## Setup
1. Navigate to the cloned directory:
   ```bash
   cd Notion-To-Calendar
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project and add your Notion API key:
   ```env
   NOTION_API_KEY=your_notion_api_key_here
   NOTION_DB_ID=your_notion_db_id_here
   ```

## Notion Integration Setup
1. Generate an integration token from your Notion account.
2. Share the Notion page or database with your integration.
3. Use the Notion API key (integration token) in the `.env` file as mentioned in the setup.

## Usage
1. To start the application, run:
   ```bash
   npm start
   ```

2. Follow the on-screen instructions to authenticate your Notion account and set up synchronization preferences.

3. Once set up, the application will automatically synchronize your Notion pages with your calendar according to your configured preferences.

## Data Model
### NotionPage Interface
```typescript
interface NotionPage {
  id: string;
  properties: {
    "Task name"?: {
      title: { plain_text: string }[];
    };
    "Status"?: {
      status: { name: string };
    };
    "Due"?: {
      date: {
        start: Date;
        end?: Date; // Optional end date
      };
    };
    "Priority"?: {
      select: { name: string };
    };
    // Add other properties as needed
  };
  // Include other fields from Notion pages as needed
}
```
This interface represents the structure of a page in Notion relevant for synchronization with calendar events. It includes:
- `id`: Unique identifier of the page.
- `properties`: Contains details about the task, such as the name, status, due date, and priority. Each property is optional and can be tailored according to the specific use case.

## Customization
- You can customize the synchronization settings by editing the configuration file located at `src/config.js`.
- Available options include synchronization frequency, specific Notion page selection, and calendar format customization.

## Troubleshooting
If you encounter any issues, refer to the Troubleshooting section in our documentation or open an issue on the GitHub repository.

## Contributing
Contributions to Notion-To-Calendar are welcome! Please read our contributing guidelines for more information.

## License
This project is licensed under the [Your License Name Here] - see the LICENSE file for details.
```
You can further tailor this README to include more specific instructions, examples, and any additional information pertinent to your project.
