import type {
  ComponentType,
  BaseComponentData,
  GridConfig,
  FontSizeOption,
  GoogleFont,
  PageSettings,
} from '@/types';

// Component type constants
export const ComponentTypes: Record<string, ComponentType> = {
  HEADING: 'heading',
  TEXT: 'text',
  IMAGE: 'image',
  BUTTON: 'button',
  CONTAINER: 'container',
  NAVBAR: 'navbar',
  HEADER: 'header',
} as const;

// Grid configuration - smaller grid for finer control
export const GRID_CONFIG: GridConfig = {
  rowHeight: 30, // Reduced from 60
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
  margin: [10, 10],
  containerPadding: [0, 0],
};

// Default page settings
export const DEFAULT_PAGE_SETTINGS: PageSettings = {
  backgroundColor: '#ffffff',
  width: 1200,
  themeMode: 'light',
  fontFamily: 'Inter',
};

// Google Fonts options
export const GOOGLE_FONTS: { value: GoogleFont; label: string }[] = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Nunito', label: 'Nunito' },
  { value: 'Playfair Display', label: 'Playfair Display' },
  { value: 'Lora', label: 'Lora' },
];

// Default component data
export const getDefaultComponentData = (type: ComponentType, defaultFont?: GoogleFont): BaseComponentData => {
  const defaults: Record<ComponentType, BaseComponentData> = {
    heading: {
      text: 'Your Heading Here',
      fontSize: '2xl',
      color: '#000000',
      fontFamily: defaultFont || 'Inter',
      textAlign: 'left',
      verticalAlign: 'top',
    },
    text: {
      text: 'Your text content here. Click to edit.',
      fontSize: 'base',
      color: '#000000',
      fontFamily: defaultFont || 'Inter',
      textAlign: 'left',
      verticalAlign: 'top',
    },
    image: {
      src: '',
      alt: 'Image',
    },
    button: {
      text: 'Click Me',
      fontSize: 'base',
      color: '#ffffff',
      bgColor: '#2563eb',
      fontFamily: defaultFont || 'Inter',
      textAlign: 'center',
      verticalAlign: 'middle',
    },
    container: {
      bgColor: '#f9fafb',
      children: [],
    },
    navbar: {
      bgColor: '#1f2937',
      fontFamily: defaultFont || 'Inter',
      logo: '',
      links: [
        { text: 'Home', href: '#home' },
        { text: 'About', href: '#about' },
        { text: 'Services', href: '#services' },
        { text: 'Contact', href: '#contact' },
      ],
    },
    header: {
      text: 'Welcome to My Site',
      fontSize: '2xl',
      color: '#ffffff',
      bgColor: '#2563eb',
      fontFamily: defaultFont || 'Inter',
      textAlign: 'center',
      verticalAlign: 'middle',
    },
  };
  return defaults[type];
};

// Default grid dimensions (adjusted for smaller grid)
export const getDefaultGridDimensions = (type: ComponentType): { w: number; h: number } => {
  const dimensions: Record<ComponentType, { w: number; h: number }> = {
    heading: { w: 12, h: 3 },
    text: { w: 6, h: 4 },
    image: { w: 6, h: 8 },
    button: { w: 4, h: 3 },
    container: { w: 6, h: 8 },
    navbar: { w: 12, h: 4 },
    header: { w: 12, h: 10 },
  };
  return dimensions[type];
};

// Font size options
export const FONT_SIZE_OPTIONS: FontSizeOption[] = [
  { value: 'sm', label: 'Small' },
  { value: 'base', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' },
  { value: '2xl', label: '2X Large' },
];

// Tailwind font size classes
export const FONT_SIZE_CLASSES: Record<
  'heading' | 'text',
  Record<string, string>
> = {
  heading: {
    sm: 'text-xl',
    base: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
    '2xl': 'text-5xl',
  },
  text: {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  },
};