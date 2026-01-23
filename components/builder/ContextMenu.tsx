'use client';

import React, { useEffect } from 'react';
import { Copy, Scissors, Trash2, Clipboard } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onDelete: () => void;
  onCopy: () => void;
  onCut: () => void;
  onPaste: (() => void) | null;
  onClose: () => void;
}

export default function ContextMenu({
  x,
  y,
  onDelete,
  onCopy,
  onCut,
  onPaste,
  onClose,
}: ContextMenuProps) {
  useEffect(() => {
    const handleClick = () => onClose();
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div
      className="fixed bg-white shadow-lg rounded-lg py-2 z-50 border min-w-[160px]"
      style={{ left: x, top: y }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onCopy}
        className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-sm"
      >
        <Copy size={16} />
        Copy
      </button>
      <button
        onClick={onCut}
        className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-sm"
      >
        <Scissors size={16} />
        Cut
      </button>
      {onPaste && (
        <button
          onClick={onPaste}
          className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-sm"
        >
          <Clipboard size={16} />
          Paste
        </button>
      )}
      <div className="border-t my-1"></div>
      <button
        onClick={onDelete}
        className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-2 text-sm text-red-600"
      >
        <Trash2 size={16} />
        Delete
      </button>
    </div>
  );
}