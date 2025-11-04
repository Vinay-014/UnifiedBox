import Link from "next/link";
import { MessageSquare, Users, BarChart3, Settings } from "lucide-react";

export function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Unified Inbox</h1>
      </div>
      <nav className="mt-6">
        <Link href="/dashboard/inbox" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
          <MessageSquare className="mr-3 h-5 w-5" />
          Inbox
        </Link>
        <Link href="/dashboard/contacts" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
          <Users className="mr-3 h-5 w-5" />
          Contacts
        </Link>
        <Link href="/dashboard/analytics" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
          <BarChart3 className="mr-3 h-5 w-5" />
          Analytics
        </Link>
        <Link href="/dashboard/settings" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </Link>
      </nav>
    </div>
  );
}