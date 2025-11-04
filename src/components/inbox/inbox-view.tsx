"use client";

import { useState } from "react";
import { ContactThread } from "./contact-thread";
import { mockContacts } from "@/lib/mock-data";

export function InboxView() {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  return (
    <div className="flex h-full">
      <div className="w-96 border-r bg-white">
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="overflow-y-auto">
          {mockContacts.map((contact) => (
            <ContactThread
              key={contact.id}
              contact={contact}
              isSelected={selectedContact === contact.id}
              onClick={() => setSelectedContact(contact.id)}
            />
          ))}
        </div>
      </div>
      <div className="flex-1 bg-gray-50">
        {selectedContact ? <ConversationView contactId={selectedContact} /> : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a contact to start messaging
          </div>
        )}
      </div>
    </div>
  );
}