'use client';

import React, { useState } from 'react';
import { Type, Edit, Image, Square, Layout, Navigation, Newspaper } from 'lucide-react';
import type { ComponentType, Position } from '@/types';

interface ComponentPaletteProps {
  onAddComponent: (type: ComponentType, position?: Position) => void;
}

interface ComponentDefinition {
  type: ComponentType;
  icon: React.ElementType;
  label: string;
  description: string;
}

export default function ComponentPalette({ onAddComponent }: ComponentPaletteProps) {
  const [draggedType, setDraggedType] = useState<ComponentType | null>(null);

  const components: ComponentDefinition[] = [
    { type: 'header', icon: Newspaper, label: 'Header', description: 'Banner section' },
    { type: 'navbar', icon: Navigation, label: 'Navbar', description: 'Navigation bar' },
    { type: 'container', icon: Layout, label: 'Container', description: 'Group components together' },
    { type: 'heading', icon: Type, label: 'Heading', description: 'Large title text' },
    { type: 'text', icon: Edit, label: 'Text', description: 'Paragraph text' },
    { type: 'image', icon: Image, label: 'Image', description: 'Add an image' },
    { type: 'button', icon: Square, label: 'Button', description: 'Clickable button' },
  ];

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, type: ComponentType) => {
    setDraggedType(type);
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('componentType', type);
    e.dataTransfer.setData('text/plain', type);
    
    // Create a drag image
    const dragImage = e.currentTarget.cloneNode(true) as HTMLElement;
    dragImage.style.opacity = '0.5';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  const handleDragEnd = () => {
    setDraggedType(null);
  };

  return (
    <div className="w-64 bg-gray-100 p-4 border-r overflow-y-auto">
      <h3 className="font-bold text-lg mb-4">Components</h3>
      <div className="space-y-2">
        {components.map(({ type, icon: Icon, label, description }) => (
          <div
            key={type}
            draggable
            onDragStart={(e) => handleDragStart(e, type)}
            onDragEnd={handleDragEnd}
            onClick={() => onAddComponent(type, { x: 20, y: 20 })}
            className={`w-full p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-move ${
              draggedType === type ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <Icon size={20} className="flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="font-medium">{label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-3 bg-blue-50 rounded-lg text-sm text-gray-700">
        <p>Drag components onto the canvas or click to add them.</p>
      </div>
    </div>
  );
}