interface UnifiedEventData {
    id: string;
    taskName: string;
    status: string;
    start?: Date;
    end?: Date;
    priority: string;
    content?: string;
  }