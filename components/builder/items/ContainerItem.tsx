'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import type { ContainerData } from '@/types';

interface ContainerItemProps {
  data: ContainerData;
  onUpdate: (data: ContainerData) => void;
  isPreview?: boolean;
}

export default function ContainerItem({ data, onUpdate, isPreview = false }: ContainerItemProps) {
  return (
    <div
      className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg p-4 relative"
      style={{ backgroundColor: data.bgColor }}
    >
      {(!data.children || data.children.length === 0) && !isPreview ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <Plus size={32} className="mb-2" />
          <p className="text-sm">Drop components here</p>
          <p className="text-xs mt-1">Container will auto-size to contents</p>
        </div>
      ) : (
        <div className="w-full h-full">
          {/* Child components would be rendered here */}
          {data.children && data.children.length > 0 ? (
            <p className="text-sm text-gray-500">
              {data.children.length} component{data.children.length > 1 ? 's' : ''} inside
            </p>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-300">
              <p className="text-sm">Empty Container</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}