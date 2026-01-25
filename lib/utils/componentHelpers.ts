import {
  ComponentTypes,
  getDefaultComponentData,
  getDefaultGridDimensions,
} from '../constants';
import type { ComponentItem, ComponentType, Position, GoogleFont } from '@/types';

/**
 * Create a new component item with default values
 */
export function createComponent(
  type: ComponentType,
  id: string,
  position: Position = { x: 0, y: 0 }, // call calculateOptimalPosition here
  defaultFont?: GoogleFont
): ComponentItem {
  const dimensions = getDefaultGridDimensions(type);
  const data = getDefaultComponentData(type, defaultFont);

  return {
    i: id,
    type,
    data,
    x: position.x,
    y: position.y,
    w: dimensions.w,
    h: dimensions.h,
    minW: type === ComponentTypes.BUTTON ? 2 : 1,
    minH: 1,
    maxW: 12,
  };
}

/**
 * Generate unique component ID
 */
export function generateComponentId(prefix: string = 'item', counter: number): string {
  return `${prefix}-${counter}-${Date.now()}`;
}

/**
 * Clone a component with new ID and position
 */
export function cloneComponent(
  component: ComponentItem,
  newId: string,
  offsetX: number = 1,
  offsetY: number = 1
): ComponentItem {
  return {
    ...component,
    i: newId,
    x: component.x + offsetX,
    y: component.y + offsetY,
  };
}

/**
 * Validate component data
 */
export function validateComponent(component: ComponentItem): boolean {
  if (!component.i || !component.type) {
    console.error('Invalid component: missing id or type', component);
    return false;
  }

  if (!Object.values(ComponentTypes).includes(component.type)) {
    console.error('Invalid component type:', component.type);
    return false;
  }

  return true;
}

/**
 * Export layout as JSON
 */
export function exportLayout(items: ComponentItem[]): string {
  return JSON.stringify(items, null, 2);
}

/**
 * Import layout from JSON
 */
export function importLayout(jsonString: string): ComponentItem[] {
  try {
    const items: ComponentItem[] = JSON.parse(jsonString);
    return items.filter(validateComponent);
  } catch (error) {
    console.error('Error importing layout:', error);
    return [];
  }
}

/**
 * Calculate optimal position for new component
 * NOT USED, IMPLEMENT IF ITEMS NEED TO NOT SPAWN AT 0,0
 */
export function calculateOptimalPosition(
  existingItems: ComponentItem[],
  newComponentDimensions: { w: number; h: number }
): Position {
  if (existingItems.length === 0) {
    return { x: 0, y: 0 };
  }

  // Find the lowest Y position where the component can fit
  const maxY = Math.max(...existingItems.map((item) => item.y + item.h));

  return {
    x: 0,
    y: maxY,
  };
}

/**
 * Check if two components overlap
 */
export function componentsOverlap(
  component1: ComponentItem,
  component2: ComponentItem
): boolean {
  return !(
    component1.x + component1.w <= component2.x ||
    component2.x + component2.w <= component1.x ||
    component1.y + component1.h <= component2.y ||
    component2.y + component2.h <= component1.y
  );
}