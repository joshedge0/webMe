'use client'

import { useState } from "react";

interface SaveWebsiteDialogProps {
  onCancel: () => void;
  onSave: (websiteTitle: string) => void;
  websiteTitle: string
  setWebsiteTitle: (websiteTitle: string) => void;
}


export default function SaveWebsiteDialog({ onCancel, onSave, websiteTitle, setWebsiteTitle }: SaveWebsiteDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/30 text-black flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <input 
          className={`w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
          value={websiteTitle}
          onChange={(e) => setWebsiteTitle(e.target.value)}
        />

        <div className="flex flex-row">
          <button 
          onClick={() => onSave(websiteTitle)}
          className="mt-4 w-full text-gray-600 hover:text-gray-800"
        >
          Save
        </button>

          <button 
          onClick={onCancel}
          className="mt-4 w-full text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        </div>
      </div>
    </div>
  )
}