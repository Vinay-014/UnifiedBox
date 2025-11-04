export const mockContacts = [
  {
    id: "1",
    name: "John Doe",
    phone: "+1234567890",
    channel: "SMS" as const,
    lastMessage: "Hey, when are we meeting?",
    unreadCount: 2,
    timestamp: "2:30 PM",
  },
  {
    id: "2",
    name: "Jane Smith",
    phone: "+1987654321",
    channel: "WHATSAPP" as const,
    lastMessage: "Thanks for the update!",
    unreadCount: 0,
    timestamp: "1:15 PM",
  },
];

export const mockMessages = [
  {
    id: "1",
    body: "Hi there!",
    direction: "INBOUND" as const,
    channel: "SMS" as const,
    timestamp: "2025-11-03T10:00:00Z",
  },
  {
    id: "2",
    body: "Hello! How can I help?",
    direction: "OUTBOUND" as const,
    channel: "SMS" as const,
    timestamp: "2025-11-03T10:05:00Z",
  },
];