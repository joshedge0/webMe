'use client';

import { useState } from 'react';
import EditableText from '../EditableText';
import { Menu, Plus, X } from 'lucide-react';
import type { NavbarData, NavbarLink } from '@/types';

interface NavbarItemProps {
  data: NavbarData;
  onUpdate: (data: NavbarData) => void;
  isPreview?: boolean;
}

const fontSizeClasses: Record<string, string> = {
  sm: 'text-xl',
  base: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-4xl',
  '2xl': 'text-5xl',
};

export default function NavbarItem({ data, onUpdate, isPreview = false }: NavbarItemProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const links = data.links || [
    { text: 'Home', href: '#home' },
    { text: 'About', href: '#about' },
    { text: 'Services', href: '#services' },
    { text: 'Contact', href: '#contact' },
  ];

  const handleAddLink = () => {
    const newLinks = [...links, { text: 'New Link', href: '#' }];
    onUpdate({ ...data, links: newLinks });
  };

  const handleDeleteLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    onUpdate({ ...data, links: newLinks });
  };

  const handleUpdateLink = (index: number, field: 'text' | 'href', value: string) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    onUpdate({ ...data, links: newLinks });
  };


  return (
    <nav
      className="w-full h-full flex items-center justify-between px-6 relative"
      style={{
        backgroundColor: data.bgColor,
        fontFamily: data.fontFamily || 'Inter',
      }}
    >
      {/* Title Section */}
          <header
                className="w-128 h-32 flex items-center"
                style={{
                  backgroundColor: data.bgColor,
                  fontFamily: data.fontFamily || 'Inter',
                }}
              >
                <EditableText
                  tag="h1"
                  value={data.text}
                  onChange={(newText) => onUpdate({ ...data, text: newText })}
                  className={`font-bold w-full ${fontSizeClasses[data.fontSize] || 'text-2xl'} break-words`}
                  style={{ color: data.color || '#ffffff' }}
                  isPreview={isPreview}
                />
              </header>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-6 items-center">
        {links.map((link, idx) => (
          <div key={idx} className="relative group">
            {editingIndex === idx && !isPreview ? (
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <input
                  type="text"
                  value={link.text}
                  onChange={(e) => handleUpdateLink(idx, 'text', e.target.value)}
                  className="px-2 py-1 text-sm rounded text-black w-24"
                  placeholder="Text"
                />
                <input
                  type="text"
                  value={link.href}
                  onChange={(e) => handleUpdateLink(idx, 'href', e.target.value)}
                  className="px-2 py-1 text-sm rounded text-black w-24"
                  placeholder="URL"
                />
                <button
                  onClick={() => setEditingIndex(null)}
                  className="text-xs bg-blue-500 px-2 rounded"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <a
                  href={isPreview ? link.href : undefined}
                  onClick={(e) => {
                    if (!isPreview) {
                      e.preventDefault();
                      setEditingIndex(idx);
                    }
                  }}
                  className="text-white hover:text-gray-300 transition-colors cursor-pointer"
                >
                  {link.text}
                </a>
                {!isPreview && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteLink(idx);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                )}
              </>
            )}
          </div>
        ))}
        {!isPreview && (
          <button
            onClick={handleAddLink}
            className="text-white hover:opacity-80 transition-opacity flex items-center gap-1"
          >
            <Plus size={16} />
            <span className="text-sm">Link</span>
          </button>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <button className="md:hidden text-white">
        <Menu size={24} />
      </button>
    </nav>
    );
}