"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function Composer({ onSend }: { onSend: (text: string, channel: "SMS" | "WHATSAPP") => void }) {
  const [text, setText] = useState("");
  const [channel, setChannel] = useState<"SMS" | "WHATSAPP">("SMS");

  const handleSubmit = () => {
    if (text.trim()) {
      onSend(text, channel);
      setText("");
    }
  };

  return (
    <div className="border-t bg-white p-4">
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => setChannel("SMS")}
          className={`px-3 py-1 rounded ${channel === "SMS" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          SMS
        </button>
        <button
          onClick={() => setChannel("WHATSAPP")}
          className={`px-3 py-1 rounded ${channel === "WHATSAPP" ? "bg-green-500 text-white" : "bg-gray-200"}`}
        >
          WhatsApp
        </button>
      </div>
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={handleSubmit}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}