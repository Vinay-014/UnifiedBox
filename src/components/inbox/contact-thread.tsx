// src/components/inbox/contact-thread.tsx
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

interface Contact {
  id: string;
  name: string;
  phone: string;
  channel: "SMS" | "WHATSAPP";
  lastMessage: string;
  unreadCount: number;
  timestamp: string;
}

export function ContactThread({ contact, isSelected, onClick }: {
  contact: Contact;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${isSelected ? "bg-blue-50" : ""}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar name={contact.name} />
          <div>
            <div className="font-medium">{contact.name}</div>
            <div className="text-sm text-gray-600 truncate w-48">{contact.lastMessage}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">{contact.timestamp}</div>
          {contact.unreadCount > 0 && (
            <Badge variant="destructive" className="mt-1">
              {contact.unreadCount}
            </Badge>
          )}
          <Badge variant={contact.channel === "WHATSAPP" ? "default" : "secondary"} className="ml-1 text-xs">
            {contact.channel}
          </Badge>
        </div>
      </div>
    </div>
  );
}