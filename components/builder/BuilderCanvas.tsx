'use client';

import React, { useRef, useCallback, useState } from 'react';
import { Responsive, Layout, WidthProvider } from 'react-grid-layout/legacy';
import { Layout as LayoutIcon } from 'lucide-react';
import GridItemWrapper from './GridItemWrapper';
import { createComponent, generateComponentId } from '@/lib/utils/componentHelpers';
import type { ComponentItem, ComponentType, Position, BaseComponentData, PageSettings } from '@/types';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface BuilderCanvasProps {
  items: ComponentItem[];
  isPreview: boolean;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onUpdate: (id: string, newData: BaseComponentData) => void;
  onLayoutChange: (layout: Layout) => void;
  onContextMenu: (e: React.MouseEvent, id: string) => void;
  onAddComponent: (type: ComponentType, position?: Position, customId?: string) => void;
  pageSettings: PageSettings;
}

export default function BuilderCanvas({
  items,
  isPreview,
  selectedId,
  onSelect,
  onUpdate,
  onLayoutChange,
  onContextMenu,
  onAddComponent,
  pageSettings,
}: BuilderCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(items.length + 1);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (layout: Layout, layoutItem: any, event: any) => {
      const componentType = event.dataTransfer?.getData('componentType') as ComponentType;
      if (!componentType) return;

      const newId = generateComponentId('item', nextIdRef.current);
      nextIdRef.current += 1;

      // Use layoutItem position from react-grid-layout
      const position = {
        x: layoutItem.x || 0,
        y: layoutItem.y || 0,
      };

      if (onAddComponent) {
        onAddComponent(componentType, position, newId);
      }
    },
    [onAddComponent]
  );

  const handleLayoutChange = useCallback(
    (layout: Layout) => {
      if (!isDragging) {
        const filteredLayout = (layout as any[]).filter((item: any) => item.i !== '__dropping-elem__');
        onLayoutChange(filteredLayout as Layout);
      }
    },
    [onLayoutChange, isDragging]
  );

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (
      e.target === canvasRef.current ||
      (e.target as HTMLElement).classList.contains('react-grid-layout') ||
      (e.target as HTMLElement).classList.contains('canvas-wrapper')
    ) {
      onSelect(null);
    }
  };

  const layoutItems = items.map((item) => ({
    i: item.i,
    x: item.x,
    y: item.y,
    w: item.w,
    h: item.h,
    minW: item.minW || 1,
    minH: item.minH || 1,
    maxW: item.maxW || 12,
  })) as Layout;

  const backgroundColor = pageSettings.themeMode === 'dark' 
    ? '#1f2937' 
    : pageSettings.backgroundColor;

  return (
    <div
      ref={canvasRef}
      className="flex-1 overflow-auto canvas-wrapper"
      style={{ backgroundColor }}
      onClick={handleCanvasClick}
    >
      {items.length === 0 && !isPreview ? (
        <div className="h-full flex items-center justify-center text-gray-400 pointer-events-none">
          <div className="text-center">
            <LayoutIcon size={64} className="mx-auto mb-4" />
            <p className="text-lg font-medium">Drag components from the left to get started</p>
            <p className="text-sm mt-2">or click a component to add it to the canvas</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center py-4 min-h-full">
          <div
            className="relative w-full"
            style={{
              maxWidth: isPreview ? `${pageSettings.width}px` : 'none',
            }}
          >
            <ResponsiveGridLayout
              className="layout"
              layouts={{ lg: layoutItems }}
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
              rowHeight={30}
              onLayoutChange={handleLayoutChange}
              onDrop={handleDrop}
              onDragStart={() => setIsDragging(true)}
              onDragStop={() => setIsDragging(false)}
              onResizeStart={() => setIsDragging(true)}
              onResizeStop={() => setIsDragging(false)}
              isDroppable={!isPreview}
              isDraggable={!isPreview}
              isResizable={!isPreview}
              compactType={null}
              preventCollision={isDragging}
              margin={[10, 10]}
              containerPadding={[10, 10]}
              useCSSTransforms={true}
              droppingItem={{ i: '__dropping-elem__', w: 6, h: 4 }}
            >
              {items.map((item) => (
                <div
                  key={item.i}
                  className={`${selectedId === item.i && !isPreview ? 'ring-2 ring-blue-500 ring-offset-2' : ''} transition-shadow rounded-lg`}
                  onClick={(e) => {
                    if (!isPreview) {
                      e.stopPropagation();
                      onSelect(item.i);
                    }
                  }}
                  onContextMenu={(e) => {
                    e.stopPropagation();
                    onContextMenu(e, item.i);
                  }}
                >
                  <GridItemWrapper
                    id={item.i}
                    type={item.type}
                    data={item.data}
                    isPreview={isPreview}
                    isSelected={selectedId === item.i}
                    onUpdate={onUpdate}
                  />
                </div>
              ))}
            </ResponsiveGridLayout>
          </div>
        </div>
      )}
    </div>
  );
}