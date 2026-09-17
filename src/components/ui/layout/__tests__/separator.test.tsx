import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Separator } from '../separator';

describe('Separator component', () => {
  it('renders horizontal separator by default with decorative role', () => {
    render(<Separator data-testid="sep" />);
    const sep = screen.getByTestId('sep');
    expect(sep).toBeInTheDocument();
    expect(sep).toHaveAttribute('data-orientation', 'horizontal');
    expect(sep.className).toContain('h-[1px]');
    expect(sep.className).toContain('w-full');
    expect(sep).toHaveAttribute('role', 'none');
  });

  it('renders vertical separator when orientation="vertical"', () => {
    render(<Separator data-testid="sep-v" orientation="vertical" />);
    const sep = screen.getByTestId('sep-v');
    expect(sep).toHaveAttribute('data-orientation', 'vertical');
    expect(sep.className).toContain('h-full');
    expect(sep.className).toContain('w-[1px]');
  });

  it('renders with role="separator" and aria-orientation when decorative={false}', () => {
    render(<Separator decorative={false} orientation="vertical" />);
    const sep = screen.getByRole('separator');
    expect(sep).toBeInTheDocument();
    expect(sep).toHaveAttribute('aria-orientation', 'vertical');
    expect(sep).toHaveAttribute('data-orientation', 'vertical');
  });

  it('merges custom className and forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<Separator ref={ref} className="my-custom-separator" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(container.querySelector('.my-custom-separator')).toBeInTheDocument();
  });
});
