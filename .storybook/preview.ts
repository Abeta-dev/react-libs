import type { Preview } from '@storybook/react-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import './preview.css';
import React from 'react';

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        'Light (Emerald)': '',
        'Dark (Emerald)': 'dark',
        'Light (Orange)': 'theme-orange',
        'Dark (Orange)': 'dark theme-orange',
      },
      defaultTheme: 'Light (Emerald)',
    }),
    (Story, context) => {
      const isFullscreen = context.parameters?.layout === 'fullscreen';
      return React.createElement(
        'div',
        {
          className: isFullscreen
            ? 'w-full min-h-screen bg-background text-foreground transition-colors duration-200'
            : 'min-h-[50vh] w-full p-6 flex items-center justify-center bg-background text-foreground transition-colors duration-200',
        },
        React.createElement(Story, null)
      );
    },
  ],
  parameters: {
    options: {
      storySort: {
        order: [
          'Overview & Docs',
          ['Introduction', 'How to Use Storybook', 'Design Tokens', 'Performance Dashboard'],
          'Introduction',
          'Docs',
          ['Design Tokens', 'Performance Dashboard'],
          'Playground',
          ['Interactive Workbench', 'Vendor Onboarding Flow', 'Procurement Ledger'],
          'Core',
          'Forms',
          'Data Display',
          'Feedback',
          'Overlays',
          'Navigation',
          'Layout',
          'India Primitives',
          'India',
          'Authentication',
          'Auth',
          'UI',
          '*',
        ],
      },
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'error',
    },
  },
};

export default preview;