import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Toaster } from '../sonner';

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: vi.fn(() => ({ theme: 'system' })),
}));

import { useTheme } from 'next-themes';

describe('Toaster (Sonner) component', () => {
  it('renders sonner toaster container into DOM', () => {
    render(<Toaster />);
    const section = screen.getByRole('region', { name: /notifications/i });
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-live', 'polite');
  });

  it('renders section and handles toasts', async () => {
    const { toast } = await import('sonner');
    const { container } = render(<Toaster position="top-center" />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();

    // Trigger a toast
    toast('Notification message');
    expect(await screen.findByText('Notification message')).toBeInTheDocument();
  });

  it('passes dark theme from useTheme to Toaster', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      setTheme: vi.fn(),
      themes: ['light', 'dark', 'system'],
      systemTheme: 'dark',
    });
    const { container } = render(<Toaster />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-live', 'polite');
    expect(useTheme).toHaveBeenCalled();
  });

  it('renders with custom props like expand and richColors', () => {
    const { container } = render(<Toaster expand richColors />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });
});
