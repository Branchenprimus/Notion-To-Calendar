# Notion-To-Calendar

![image](https://github.com/Branchenprimus/Notion-To-Calendar/assets/44780855/32c5fa33-8b1d-47ea-abd0-65a430518655)


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
- Google Cloud setup (go to: Google Cloud Setup Instructions)

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
1. Generate an [integration](https://www.notion.so/my-integrations) token from your Notion account.
2. Share the Notion page or database with your integration.
3. Use the Notion API key (integration token) in the `.env` file as mentioned in the setup.

## Google Cloud Setup Instructions

### Set Up Your Environment
To complete this [quickstart](https://developers.google.com/calendar/api/quickstart/nodejs), set up your environment.

#### Enable the API
1. **Enable the Google Calendar API in your Google Cloud Project.**
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Navigate to the APIs & Services dashboard and enable the Google Calendar API.

#### Configure the OAuth Consent Screen
1. **Go to the OAuth consent screen in the Google Cloud Console.**
   - Navigate to Menu > APIs & Services > OAuth consent screen.
2. **Select the user type for your app and click 'Create'.**
3. **Complete the app registration form and click 'Save and Continue'.**
   - You can skip adding scopes for now.
4. **Add test users if your user type is External.**
   - Click 'Add Users' under Test users and enter your email address.
   - Click 'Save and Continue'.
5. **Review and finalize the app registration.**

#### Authorize Credentials for a Desktop Application
1. **Create OAuth 2.0 Client IDs in the Google Cloud Console.**
   - Navigate to Menu > APIs & Services > Credentials.
   - Click 'Create Credentials' and select 'OAuth client ID'.
   - Choose 'Desktop app' as the Application type.
   - Enter a name for the credential and click 'Create'.
2. **Download the JSON credentials file.**
   - Save the file as `credentials.json` in your working directory.

### Usage
After setting up your Google Cloud project and OAuth consent screen, you can authenticate as an end user and access user data in your application. Make sure to run this setup locally with access to a browser, as it won't work on remote terminals such as Cloud Shell or over SSH.

For more detailed information, please refer to the official [Google Cloud Documentation](https://cloud.google.com/docs).


## Usage
1. To start the application, run:
   ```bash
   npm start
   ```

2. Follow the on-screen instructions to authenticate your Notion account and set up synchronization preferences.

3. Once set up, the application will automatically synchronize your Notion pages with your calendar according to your configured preferences.

## Troubleshooting
If you encounter any issues, open an issue on the GitHub repository.

## Contributing
Contributions to Notion-To-Calendar are welcome!

## License
This project is licensed under the [Your License Name Here] - see the LICENSE file for details.
