import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Badge } from '../badge';

describe('Badge component', () => {
  it('renders badge children correctly', () => {
    render(<Badge>New Feature</Badge>);
    expect(screen.getByText('New Feature')).toBeInTheDocument();
  });

  it('applies default variant classes', () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText('Default Badge');
    expect(badge.className).toContain('bg-primary');
    expect(badge.className).toContain('text-primary-foreground');
  });

  it('applies secondary, destructive, and outline variant classes', () => {
    const { rerender } = render(<Badge variant="secondary">Secondary</Badge>);
    let badge = screen.getByText('Secondary');
    expect(badge.className).toContain('bg-secondary');

    rerender(<Badge variant="destructive">Destructive</Badge>);
    badge = screen.getByText('Destructive');
    expect(badge.className).toContain('bg-destructive');

    rerender(<Badge variant="outline">Outline</Badge>);
    badge = screen.getByText('Outline');
    expect(badge.className).toContain('border-badge-outline');
  });

  it('merges custom className with variant classes', () => {
    render(<Badge className="custom-badge-style">Custom</Badge>);
    const badge = screen.getByText('Custom');
    expect(badge.className).toContain('custom-badge-style');
    expect(badge.className).toContain('inline-flex');
  });

  it('handles click events and forwards HTML attributes', () => {
    const handleClick = vi.fn();
    render(
      <Badge onClick={handleClick} data-testid="clickable-badge">
        Clickable
      </Badge>
    );

    const badge = screen.getByTestId('clickable-badge');
    fireEvent.click(badge);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
