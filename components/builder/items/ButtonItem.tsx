'use client';

import React from 'react';
import EditableText from '../EditableText';
import type { ButtonData } from '@/types';

interface ButtonItemProps {
  data: ButtonData;
  onUpdate: (data: ButtonData) => void;
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

export default function ButtonItem({ data, onUpdate, isPreview = false }: ButtonItemProps) {
  return (
    <button
      className={`px-6 py-3 rounded-lg w-full h-full font-semibold flex ${verticalAlignClasses[data.verticalAlign || 'middle']} ${fontSizeClasses[data.fontSize] || 'text-base'}`}
      style={{
        backgroundColor: data.bgColor,
        color: data.color,
        fontFamily: data.fontFamily || 'Inter',
      }}
      onClick={(e) => {
        if (isPreview) {
          console.log('Button clicked in preview');
        }
      }}
    >
      <div className={`w-full ${textAlignClasses[data.textAlign || 'center']}`}>
        <EditableText
          tag="span"
          value={data.text}
          onChange={(newText) => onUpdate({ ...data, text: newText })}
          style={{ color: data.color }}
          isPreview={isPreview}
        />
      </div>
    </button>
  );
}