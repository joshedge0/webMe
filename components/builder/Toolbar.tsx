'use client';

import SignInButton from "@/components/SignInButton";
import { Eye, Edit, Settings, Save } from 'lucide-react';
import { useSession } from "next-auth/react"

interface ToolbarProps {
  isPreview: boolean;
  onTogglePreview: () => void;
  onToggleSettings: () => void;
  onToggleSaveWebsite: () => void;
}

export default function Toolbar({
  isPreview,
  onTogglePreview,
  onToggleSettings,
  onToggleSaveWebsite
}: ToolbarProps) {
  const session = useSession()
  return (
    <div className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-4">
        <div className="h-6 w-px bg-gray-600"></div>
        <h1 className="text-xl font-bold">webMe</h1>
      </div>

      <div className="flex items-center gap-6">
        {session?.data && (
        <button
          onClick={onToggleSaveWebsite}
          className="hover:opacity-80 transition-opacity"
          title="Save Website">
          <Save size={20} />
        </button>
        )}
        <button
          onClick={onToggleSettings}
          className="hover:opacity-80 transition-opacity"
          title="Page Settings"
        >
          <Settings size={20} />
        </button>
        <button
          onClick={onTogglePreview}
          className="px-4 py-2 bg-blue-800 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
        >
          {isPreview ? <Edit size={20} /> : <Eye size={20} />}
          {isPreview ? 'Edit Mode' : 'Preview'}
        </button>
        <SignInButton />
      </div>
    </div>
  );
}