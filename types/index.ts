import type { Layout } from 'react-grid-layout/legacy';

// Component types
export type ComponentType = 'heading' | 'text' | 'image' | 'button' | 'container' | 'navbar' | 'header';

// Font size options
export type FontSize = 'sm' | 'base' | 'lg' | 'xl' | '2xl';

// Google Fonts
export type GoogleFont = 
  | 'Inter'
  | 'Roboto'
  | 'Open Sans'
  | 'Montserrat'
  | 'Nunito'
  | 'Playfair Display'
  | 'Lora';

// Theme mode
export type ThemeMode = 'light' | 'dark';

// Text alignment
export type TextAlign = 'left' | 'center' | 'right';
export type VerticalAlign = 'top' | 'middle' | 'bottom';

// Navbar link
export interface NavbarLink {
  text: string;
  href: string;
}

// Base component data interface
export interface BaseComponentData {
  text?: string;
  fontSize?: FontSize;
  color?: string;
  bgColor?: string;
  src?: string;
  alt?: string;
  fontFamily?: GoogleFont;
  customFontSet?: boolean; // Track if user has manually set a font
  children?: ComponentItem[];
  textAlign?: TextAlign;
  verticalAlign?: VerticalAlign;
  logo?: string;
  links?: NavbarLink[];
  title?: string;
  subtitle?: string;
  href?: string;
}

// Specific component data types
export interface HeadingData {
  text: string;
  fontSize: FontSize;
  color: string;
  fontFamily?: GoogleFont;
  customFontSet?: boolean;
  textAlign?: TextAlign;
  verticalAlign?: VerticalAlign;
}

export interface TextData {
  text: string;
  fontSize: FontSize;
  color: string;
  fontFamily?: GoogleFont;
  customFontSet?: boolean;
  textAlign?: TextAlign;
  verticalAlign?: VerticalAlign;
}

export interface ImageData {
  src: string;
  alt: string;
}

export interface ButtonData {
  text: string;
  fontSize: FontSize;
  color: string;
  bgColor: string;
  fontFamily?: GoogleFont;
  customFontSet?: boolean;
  textAlign?: TextAlign;
  verticalAlign?: VerticalAlign;
}

export interface ContainerData {
  bgColor: string;
  children?: ComponentItem[];
}

export interface NavbarData {
  text: string;
  bgColor: string;
  fontFamily?: GoogleFont;
  fontSize: FontSize;
  customFontSet?: boolean;
  links: NavbarLink[];
  color?: string;
}

export interface HeaderData {
  text: string;
  bgColor: string;
  fontFamily?: GoogleFont;
  fontSize: FontSize;
  customFontSet?: boolean;
  textAlign?: TextAlign;
  verticalAlign?: VerticalAlign;
  color?: string;
}

// Component item in the grid
export interface ComponentItem {
  i: string;
  type: ComponentType;
  data: BaseComponentData;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
}

// Page settings
export interface PageSettings {
  backgroundColor: string;
  width: number; // in pixels, max canvas width
  themeMode: ThemeMode;
  fontFamily?: GoogleFont;
}

// Re-export Layout type from react-grid-layout
export type { Layout } from 'react-grid-layout/legacy';

// Position
export interface Position {
  x: number;
  y: number;
}

// Context menu state
export interface ContextMenuState {
  x: number;
  y: number;
  id: string;
}

// Grid configuration
export interface GridConfig {
  rowHeight: number;
  cols: {
    lg: number;
    md: number;
    sm: number;
    xs: number;
    xxs: number;
  };
  breakpoints: {
    lg: number;
    md: number;
    sm: number;
    xs: number;
    xxs: number;
  };
  margin: [number, number];
  containerPadding: [number, number];
}

// Font size option for select
export interface FontSizeOption {
  value: FontSize;
  label: string;
}

// Layout metadata
export interface LayoutMetadata {
  version: string;
  lastModified: string;
}

// Saved layout data
export interface SavedLayoutData {
  items: ComponentItem[];
  pageSettings: PageSettings;
  metadata: LayoutMetadata;
}