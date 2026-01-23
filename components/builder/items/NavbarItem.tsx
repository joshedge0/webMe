'use client';

import React, { useState } from 'react';
import { Menu, Plus, Trash2, Upload, X } from 'lucide-react';
import type { NavbarData, NavbarLink } from '@/types';

interface NavbarItemProps {
  data: NavbarData;
  onUpdate: (data: NavbarData) => void;
  isPreview?: boolean;
}

export default function NavbarItem({ data, onUpdate, isPreview = false }: NavbarItemProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showLogoInput, setShowLogoInput] = useState(false);

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

  const handleLogoUpload = (url: string) => {
    onUpdate({ ...data, logo: url });
    setShowLogoInput(false);
  };

  return (
    <nav
      className="w-full h-full flex items-center justify-between px-6 relative"
      style={{
        backgroundColor: data.bgColor,
        fontFamily: data.fontFamily || 'Inter',
      }}
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        {data.logo ? (
          <div className="relative group">
            <img src={data.logo} alt="Logo" className="h-8 object-contain" />
            {!isPreview && (
              <button
                onClick={() => onUpdate({ ...data, logo: '' })}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
            )}
          </div>
        ) : (
          <div className="text-white font-bold text-xl">
            {!isPreview ? (
              showLogoInput ? (
                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="text"
                    placeholder="Logo URL"
                    className="px-2 py-1 text-sm rounded text-black"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleLogoUpload((e.target as HTMLInputElement).value);
                      } else if (e.key === 'Escape') {
                        setShowLogoInput(false);
                      }
                    }}
                    autoFocus
                  />
                  <button
                    onClick={() => setShowLogoInput(false)}
                    className="text-xs bg-gray-600 px-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLogoInput(true)}
                  className="text-sm flex items-center gap-2 hover:opacity-80"
                >
                  <Upload size={16} />
                  Add Logo
                </button>
              )
            ) : (
              'Logo'
            )}
          </div>
        )}
      </div>

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