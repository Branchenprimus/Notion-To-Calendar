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