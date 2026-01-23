'use client';

import React, { useState, KeyboardEvent } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (text: string) => void;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  className?: string;
  style?: React.CSSProperties;
  isPreview?: boolean;
}

export default function EditableText({
  value,
  onChange,
  tag = 'p',
  className = '',
  style = {},
  isPreview = false,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);

  const handleBlur = () => {
    setIsEditing(false);
    onChange(text);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      setText(value);
      setIsEditing(false);
    }
  };

  const Tag = tag;

  if (isEditing && !isPreview) {
    return (
      <textarea
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className={`w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        style={style}
        rows={3}
      />
    );
  }

  return (
    <Tag
      onClick={(e) => {
        if (!isPreview) {
          e.stopPropagation();
          setIsEditing(true);
        }
      }}
      className={`${!isPreview ? 'cursor-pointer hover:bg-gray-50' : ''} ${className}`}
      style={style}
    >
      {text || 'Click to edit...'}
    </Tag>
  );
}