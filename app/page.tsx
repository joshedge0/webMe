"use client";

import React, { useState, useEffect } from "react";
import type { Layout } from "react-grid-layout/legacy";
import ComponentPalette from "@/components/builder/ComponentPalette";
import BuilderCanvas from "@/components/builder/BuilderCanvas";
import PropertiesPanel from "@/components/builder/PropertiesPanel";
import PageSettingsDialog from "@/components/builder/PageSettingsDialog";
import Toolbar from "@/components/builder/Toolbar";
import ContextMenu from "@/components/builder/ContextMenu";
import { createComponent, cloneComponent } from "@/lib/utils/componentHelpers";
import { DEFAULT_PAGE_SETTINGS } from "@/lib/constants";
import type {
  ComponentItem,
  ComponentType,
  Position,
  BaseComponentData,
  PageSettings,
} from "@/types";

interface ContextMenuState {
  x: number;
  y: number;
  id: string;
}
export default function BuilderPage() {
  const [items, setItems] = useState<ComponentItem[]>([]);
  const [isPreview, setIsPreview] = useState(false);
  const [nextId, setNextId] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [clipboard, setClipboard] = useState<ComponentItem | null>(null);
  const [pageSettings, setPageSettings] = useState<PageSettings>(
    DEFAULT_PAGE_SETTINGS,
  );
  const [showPageSettings, setShowPageSettings] = useState(false);
  const [currentDragType, setCurrentDragType] = useState<ComponentType | null>(
    null,
  );

  const addComponent = (
    type: ComponentType,
    position: Position = { x: 0, y: 0 },
    customId?: string,
  ) => {
    const id = customId || `item-${nextId}`;
    const newItem = createComponent(
      type,
      id,
      position,
      pageSettings.fontFamily,
    );

    setItems([...items, newItem]);
    if (!customId) setNextId(nextId + 1);
    setSelectedId(newItem.i);
  };

  const updateComponent = (id: string, newData: BaseComponentData) => {
    setItems(
      items.map((item) => (item.i === id ? { ...item, data: newData } : item)),
    );
  };

  const updateLayout = (newLayout: Layout) => {
    const layoutArray = Array.from(newLayout);

    setItems(
      items.map((item) => {
        const layoutItem = layoutArray.find((l: any) => l.i === item.i);
        return layoutItem ? { ...item, ...layoutItem } : item;
      }),
    );
  };

  // Update existing items when page font changes (only if they haven't set a custom font)
  useEffect(() => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.data.customFontSet || !pageSettings.fontFamily) {
          return item;
        }
        return {
          ...item,
          data: {
            ...item.data,
            fontFamily: pageSettings.fontFamily,
          },
        };
      }),
    );
  }, [pageSettings.fontFamily]);

  const deleteComponent = (id: string) => {
    setItems(items.filter((item) => item.i !== id));
    if (selectedId === id) setSelectedId(null);
    setContextMenu(null);
  };

  const copyComponent = (id: string) => {
    const item = items.find((i) => i.i === id);
    if (item) setClipboard({ ...item });
    setContextMenu(null);
  };

  const cutComponent = (id: string) => {
    copyComponent(id);
    deleteComponent(id);
  };

  const pasteComponent = () => {
    if (clipboard) {
      const newId = `item-${nextId}`;
      const newItem = cloneComponent(clipboard, newId);
      setItems([...items, newItem]);
      setNextId(nextId + 1);
      setSelectedId(newItem.i);
    }
    setContextMenu(null);
  };

  const handleContextMenu = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, id });
  };

  const handleDragStart = (type: ComponentType) => {
    setCurrentDragType(type);
  };

  const handleDragEnd = () => {
    setCurrentDragType(null);
  };

  const selectedItem = items.find((item) => item.i === selectedId);

  return (
    <div className="h-screen flex flex-col">
      <Toolbar
        isPreview={isPreview}
        onTogglePreview={() => setIsPreview(!isPreview)}
        onToggleSettings={() => setShowPageSettings(true)}
      />

      <div className="flex-1 flex overflow-hidden">
        {!isPreview && (
          <ComponentPalette
            onAddComponent={addComponent}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        )}

        <BuilderCanvas
          items={items}
          isPreview={isPreview}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onUpdate={updateComponent}
          onLayoutChange={updateLayout}
          onContextMenu={handleContextMenu}
          onAddComponent={addComponent}
          pageSettings={pageSettings}
          currentDragType={currentDragType}
        />

        {!isPreview && (
          <PropertiesPanel
            selectedItem={selectedItem}
            onUpdate={(newData) => updateComponent(selectedId!, newData)}
            pageSettings={pageSettings}
          />
        )}
      </div>

      {showPageSettings && (
        <PageSettingsDialog
          settings={pageSettings}
          onUpdate={setPageSettings}
          onClose={() => setShowPageSettings(false)}
        />
      )}

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onDelete={() => deleteComponent(contextMenu.id)}
          onCopy={() => copyComponent(contextMenu.id)}
          onCut={() => cutComponent(contextMenu.id)}
          onPaste={clipboard ? pasteComponent : null}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
}
