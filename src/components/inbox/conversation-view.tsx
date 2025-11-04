"use client";

import { useState } from "react";
import { MessageBubble } from "./message-bubble";
import { Composer } from "./composer";
import { mockMessages } from "@/lib/mock-data";

export function ConversationView({ contactId }: { contactId: string }) {
  const [messages, setMessages] = useState(mockMessages);

  const handleSend = (text: string, channel: "SMS" | "WHATSAPP") => {
    const newMsg = {
      id: Date.now().toString(),
      body: text,
      direction: "OUTBOUND" as const,
      channel,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMsg]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>
      <Composer onSend={handleSend} />
    </div>
  );
}