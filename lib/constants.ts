import type {
  ComponentType,
  BaseComponentData,
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
      text: 'Click to edit...',
      fontSize: 'xl',
      color: '#000000',
      fontFamily: defaultFont || 'Inter',
      textAlign: 'left',
      verticalAlign: 'top',
    },
    text: {
      text: 'Click to edit...',
      fontSize: 'base',
      color: '#000000',
      fontFamily: defaultFont || 'Inter',
      textAlign: 'center',
      verticalAlign: 'middle',
    },
    image: {
      src: '',
      alt: 'Image',
    },
    button: {
      text: 'Button',
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
      ],
    },
    header: {
      text: 'Your Website',
      fontSize: 'xl',
      color: '#ffffff',
      bgColor: '#21345e',
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
    header: { w: 42, h: 4 },
    navbar: { w: 42, h: 4 },
    container: { w: 20, h: 12 },
    heading: { w: 18, h: 4 },
    text: { w: 10, h: 4 },
    image: { w: 9, h: 6 },
    button: { w: 5, h: 2 }
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