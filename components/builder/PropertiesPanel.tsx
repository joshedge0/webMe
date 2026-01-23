'use client';

import React from 'react';
import { AlignLeft, AlignCenter, AlignRight, AlignVerticalJustifyStart, AlignVerticalJustifyCenter, AlignVerticalJustifyEnd } from 'lucide-react';
import { GOOGLE_FONTS } from '@/lib/constants';
import type { ComponentItem, BaseComponentData, PageSettings } from '@/types';

interface PropertiesPanelProps {
  selectedItem: ComponentItem | undefined;
  onUpdate: (newData: BaseComponentData) => void;
  pageSettings: PageSettings;
}

export default function PropertiesPanel({ selectedItem, onUpdate, pageSettings }: PropertiesPanelProps) {
  if (!selectedItem) {
    return (
      <div className="w-64 bg-gray-100 p-4 border-l">
        <h3 className="font-bold text-lg mb-4">Properties</h3>
        <p className="text-gray-500 text-sm">Select a component to edit its properties</p>
      </div>
    );
  }

  const { data, type } = selectedItem;

  const hasTextFormatting = ['heading', 'text', 'button', 'header'].includes(type);
  const hasBackgroundColor = ['button', 'container', 'navbar', 'header'].includes(type);
  const hasFont = ['heading', 'text', 'button', 'navbar', 'header'].includes(type);
  const hasAlignment = ['heading', 'text', 'button', 'header'].includes(type);
  const isImage = type === 'image';
  const isContainer = type === 'container';

  const handleFontChange = (fontFamily: string) => {
    onUpdate({ 
      ...data, 
      fontFamily: fontFamily as any,
      customFontSet: true // Mark that user has manually set a font
    });
  };

  return (
    <div className="w-64 bg-gray-100 p-4 border-l overflow-y-auto">
      <h3 className="font-bold text-lg mb-4">Properties</h3>

      <div className="mb-4 p-3 bg-white rounded-lg">
        <p className="text-xs text-gray-500 uppercase font-medium mb-1">Component Type</p>
        <p className="text-sm font-medium capitalize">{type}</p>
      </div>

      {/* Font Family */}
      {hasFont && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Font Family</label>
          <select
            value={data.fontFamily || pageSettings.fontFamily || 'Inter'}
            onChange={(e) => handleFontChange(e.target.value)}
            className="w-full p-2 border rounded bg-white"
            style={{ fontFamily: data.fontFamily || pageSettings.fontFamily || 'Inter' }}
          >
            {GOOGLE_FONTS.map((font) => (
              <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                {font.label}
              </option>
            ))}
          </select>
          {!data.customFontSet && (
            <p className="text-xs text-gray-500 mt-1">Using page default</p>
          )}
        </div>
      )}

      {/* Text Alignment */}
      {hasAlignment && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Horizontal Align</label>
            <div className="flex gap-2">
              <button
                onClick={() => onUpdate({ ...data, textAlign: 'left' })}
                className={`flex-1 p-2 rounded border flex items-center justify-center ${
                  data.textAlign === 'left' || !data.textAlign
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white border-gray-300'
                }`}
              >
                <AlignLeft size={16} />
              </button>
              <button
                onClick={() => onUpdate({ ...data, textAlign: 'center' })}
                className={`flex-1 p-2 rounded border flex items-center justify-center ${
                  data.textAlign === 'center'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white border-gray-300'
                }`}
              >
                <AlignCenter size={16} />
              </button>
              <button
                onClick={() => onUpdate({ ...data, textAlign: 'right' })}
                className={`flex-1 p-2 rounded border flex items-center justify-center ${
                  data.textAlign === 'right'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white border-gray-300'
                }`}
              >
                <AlignRight size={16} />
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Vertical Align</label>
            <div className="flex gap-2">
              <button
                onClick={() => onUpdate({ ...data, verticalAlign: 'top' })}
                className={`flex-1 p-2 rounded border flex items-center justify-center ${
                  data.verticalAlign === 'top' || !data.verticalAlign
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white border-gray-300'
                }`}
              >
                <AlignVerticalJustifyStart size={16} />
              </button>
              <button
                onClick={() => onUpdate({ ...data, verticalAlign: 'middle' })}
                className={`flex-1 p-2 rounded border flex items-center justify-center ${
                  data.verticalAlign === 'middle'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white border-gray-300'
                }`}
              >
                <AlignVerticalJustifyCenter size={16} />
              </button>
              <button
                onClick={() => onUpdate({ ...data, verticalAlign: 'bottom' })}
                className={`flex-1 p-2 rounded border flex items-center justify-center ${
                  data.verticalAlign === 'bottom'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white border-gray-300'
                }`}
              >
                <AlignVerticalJustifyEnd size={16} />
              </button>
            </div>
          </div>
        </>
      )}

      {hasTextFormatting && !isContainer && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Text Size</label>
            <select
              value={data.fontSize || 'base'}
              onChange={(e) => onUpdate({ ...data, fontSize: e.target.value as any })}
              className="w-full p-2 border rounded bg-white"
            >
              <option value="sm">Small</option>
              <option value="base">Medium</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
              <option value="2xl">2X Large</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Text Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={data.color || '#000000'}
                onChange={(e) => onUpdate({ ...data, color: e.target.value })}
                className="w-12 h-10 border rounded cursor-pointer"
              />
              <input
                type="text"
                value={data.color || '#000000'}
                onChange={(e) => onUpdate({ ...data, color: e.target.value })}
                className="flex-1 p-2 border rounded bg-white text-sm"
                placeholder="#000000"
              />
            </div>
          </div>
        </>
      )}

      {hasBackgroundColor && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Background Color</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={data.bgColor || '#2563eb'}
              onChange={(e) => onUpdate({ ...data, bgColor: e.target.value })}
              className="w-12 h-10 border rounded cursor-pointer"
            />
            <input
              type="text"
              value={data.bgColor || '#2563eb'}
              onChange={(e) => onUpdate({ ...data, bgColor: e.target.value })}
              className="flex-1 p-2 border rounded bg-white text-sm"
              placeholder="#2563eb"
            />
          </div>
        </div>
      )}

      {isImage && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="text"
              value={data.src || ''}
              onChange={(e) => onUpdate({ ...data, src: e.target.value })}
              className="w-full p-2 border rounded bg-white"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Alt Text</label>
            <input
              type="text"
              value={data.alt || ''}
              onChange={(e) => onUpdate({ ...data, alt: e.target.value })}
              className="w-full p-2 border rounded bg-white"
              placeholder="Image description"
            />
          </div>
        </>
      )}

      {isContainer && (
        <div className="p-3 bg-blue-50 rounded-lg text-sm text-gray-700">
          <p className="font-medium mb-1">📦 Container</p>
          <p className="text-xs">
            Drop other components inside this container. It will automatically adjust to fit its contents.
          </p>
        </div>
      )}
    </div>
  );
}