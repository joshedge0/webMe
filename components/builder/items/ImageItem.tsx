'use client';

import React from 'react';
import { Image } from 'lucide-react';
import type { ImageData } from '@/types';

interface ImageItemProps {
  data: ImageData;
  onUpdate: (data: ImageData) => void;
  isPreview?: boolean;
}

export default function ImageItem({ data, onUpdate, isPreview = false }: ImageItemProps) {
  return (
    <div className="relative w-full h-full bg-gray-200 rounded flex items-center justify-center">
      {data.src ? (
        <img
          src={data.src}
          alt={data.alt || 'Image'}
          className="w-full h-full object-cover rounded"
        />
      ) : (
        <div className="text-center p-4" onClick={(e) => e.stopPropagation()}>
          <Image className="mx-auto mb-2 text-gray-400" size={32} />
          {!isPreview ? (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Enter image URL"
                className="w-full p-2 border rounded text-sm"
                value={data.src || ''}
                onChange={(e) => onUpdate({ ...data, src: e.target.value })}
                onClick={(e) => e.stopPropagation()}
              />
              <p className="text-xs text-gray-500">Or set URL in properties panel →</p>
            </div>
          ) : (
            <p className="text-sm text-gray-400">No image</p>
          )}
        </div>
      )}
    </div>
  );
}