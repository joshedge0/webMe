'use client';

import React from 'react';
import EditableText from '../EditableText';
import type { HeaderData } from '@/types';

interface HeaderItemProps {
  data: HeaderData;
  onUpdate: (data: HeaderData) => void;
  isPreview?: boolean;
}

export default function HeaderItem({ data, onUpdate, isPreview = false }: HeaderItemProps) {
  return (
    <header
      className="w-full h-full flex flex-col items-center justify-center text-center px-6"
      style={{
        backgroundColor: data.bgColor,
        fontFamily: data.fontFamily || 'Inter',
      }}
    >
      <EditableText
        tag="h1"
        value={data.title || 'Welcome to My Site'}
        onChange={(newText) => onUpdate({ ...data, title: newText })}
        className="text-4xl md:text-5xl font-bold mb-4"
        style={{ color: data.color || '#ffffff' }}
        isPreview={isPreview}
      />
      {data.subtitle && (
        <EditableText
          tag="p"
          value={data.subtitle}
          onChange={(newText) => onUpdate({ ...data, subtitle: newText })}
          className="text-lg md:text-xl"
          style={{ color: data.color || '#ffffff' }}
          isPreview={isPreview}
        />
      )}
    </header>
  );
}