'use client';

import React from 'react';
import EditableText from '../EditableText';
import type { TextData } from '@/types';

interface TextItemProps {
  data: TextData;
  onUpdate: (data: TextData) => void;
  isPreview?: boolean;
}

const fontSizeClasses: Record<string, string> = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
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

export default function TextItem({ data, onUpdate, isPreview = false }: TextItemProps) {
  return (
    <div className={`w-full h-full flex ${verticalAlignClasses[data.verticalAlign || 'top']}`}>
      <EditableText
        tag="p"
        value={data.text}
        onChange={(newText) => onUpdate({ ...data, text: newText })}
        className={`w-full ${fontSizeClasses[data.fontSize] || 'text-base'} ${textAlignClasses[data.textAlign || 'left']} break-words whitespace-pre-wrap`}
        style={{ 
          color: data.color,
          fontFamily: data.fontFamily || 'Inter',
        }}
        isPreview={isPreview}
      />
    </div>
  );
}