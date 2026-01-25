'use client';

import React, { useEffect, useRef } from 'react';
import { X, Moon, Sun } from 'lucide-react';
import { GOOGLE_FONTS } from '@/lib/constants';
import type { PageSettings } from '@/types';

interface PageSettingsDialogProps {
  settings: PageSettings;
  onUpdate: (settings: PageSettings) => void;
  onClose: () => void;
}

export default function PageSettingsDialog({ settings, onUpdate, onClose }: PageSettingsDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div
        ref={dialogRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 sticky top-0 bg-white">
          <h2 className="text-xl font-bold">Page Settings</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Theme Mode */}
          <div>
            <label className="block text-sm font-medium mb-3">Theme Mode</label>
            <div className="flex gap-2">
              <button
                onClick={() => onUpdate({ ...settings, themeMode: 'light' })}
                className={`flex-1 p-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${
                  settings.themeMode === 'light'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white border-gray-300 hover:border-gray-400'
                }`}
              >
                <Sun size={18} />
                Light
              </button>
              <button
                onClick={() => onUpdate({ ...settings, themeMode: 'dark' })}
                className={`flex-1 p-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${
                  settings.themeMode === 'dark'
                    ? 'bg-gray-800 text-white border-gray-800'
                    : 'bg-white border-gray-300 hover:border-gray-400'
                }`}
              >
                <Moon size={18} />
                Dark
              </button>
            </div>
          </div>

          {/* Background Color */}
          <div>
            <label className="block text-sm font-medium mb-3">Background Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={settings.backgroundColor}
                onChange={(e) => onUpdate({ ...settings, backgroundColor: e.target.value })}
                className="w-14 h-11 border rounded cursor-pointer"
              />
              <input
                type="text"
                value={settings.backgroundColor}
                onChange={(e) => onUpdate({ ...settings, backgroundColor: e.target.value })}
                className="flex-1 p-2 border rounded"
                placeholder="#ffffff"
              />
            </div>
          </div>

          {/* Default Font */}
          <div>
            <label className="block text-sm font-medium mb-3">Default Font</label>
            <select
              value={settings.fontFamily || 'Inter'}
              onChange={(e) => onUpdate({ ...settings, fontFamily: e.target.value as any })}
              className="w-full p-2 border rounded"
              style={{ fontFamily: settings.fontFamily || 'Inter' }}
            >
              {GOOGLE_FONTS.map((font) => (
                <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                  {font.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-2">
              This will be the default font for new components
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}