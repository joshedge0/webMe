'use client';

import EditableText from '../EditableText';
import type { HeadingData } from '@/types';

interface HeadingItemProps {
  data: HeadingData;
  onUpdate: (data: HeadingData) => void;
  isPreview?: boolean;
}

const fontSizeClasses: Record<string, string> = {
  sm: 'text-xl',
  base: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-4xl',
  '2xl': 'text-5xl',
};

const textAlignClasses: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const verticalAlignClasses: Record<string, string> = {
  top: 'items-start',
  middle: 'items-center',
  bottom: 'items-end',
};

export default function HeadingItem({ data, onUpdate, isPreview = false }: HeadingItemProps) {
  return (
    <div className={`w-full h-full flex ${verticalAlignClasses[data.verticalAlign || 'top']}`}>
      <EditableText
        tag="h2"
        value={data.text}
        onChange={(newText) => onUpdate({ ...data, text: newText })}
        className={`font-bold w-full ${fontSizeClasses[data.fontSize] || 'text-3xl'} ${textAlignClasses[data.textAlign || 'left']} break-words`}
        style={{ 
          color: data.color,
          fontFamily: data.fontFamily || 'Inter',
        }}
        isPreview={isPreview}
      />
    </div>
  );
}