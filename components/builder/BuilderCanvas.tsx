'use client';

import React, { useRef, useCallback, useState, useEffect, use } from 'react';
import { Responsive, Layout, WidthProvider } from 'react-grid-layout/legacy';
import { Layout as LayoutIcon } from 'lucide-react';
import GridItemWrapper from './GridItemWrapper';
import { generateComponentId } from '@/lib/utils/componentHelpers';
import type { ComponentItem, ComponentType, Position, BaseComponentData, PageSettings } from '@/types';
import { getDefaultGridDimensions } from '@/lib/constants';
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
  currentDragType: ComponentType | null;
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
  currentDragType,
}: BuilderCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(items.length + 1);
  const [isDragging, setIsDragging] = useState(false);
  const [numCols, setNumCols] = useState(42);
  const [rowHeight, setRowHeight] = useState(18);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

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

   const droppingItemSize = currentDragType 
    ? getDefaultGridDimensions(currentDragType)
    : { w: 6, h: 4 };

  return (
    <div
      ref={canvasRef}
      className="flex-1 overflow-auto canvas-wrapper"
      style={{ backgroundColor }}
      onClick={handleCanvasClick}
      onDragOver={handleDragOver}
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
        <div className="flex justify-center min-h-full">
          <div
            ref={gridContainerRef}
            className="relative w-full"
            style={{
              maxWidth: isPreview ? `${pageSettings.width}px` : 'none',
            }}
          >
            <ResponsiveGridLayout
              className="layout"
              layouts={{ lg: layoutItems }}
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: numCols, md: numCols, sm: numCols, xs: numCols, xxs: numCols }}
              rowHeight={rowHeight}
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
              droppingItem={{ i: '__dropping-elem__', x: 0, y: 0, w: droppingItemSize.w, h: droppingItemSize.h }}
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