interface UnifiedEventData {
    id: string;
    taskName: string;
    status: string;
    start: Date;
    end?: Date; // Optional, since end date might not always be available
    priority: string;
    content?: string; // Optional, as content might not always be available
  }
  