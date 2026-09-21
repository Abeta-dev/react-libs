import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton } from '../skeleton';

describe('Skeleton component', () => {
  it('renders with aria-hidden="true" for screen readers', () => {
    const { container } = render(<Skeleton data-testid="skeleton-element" />);
    const skeleton = screen.getByTestId('skeleton-element');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute('aria-hidden', 'true');
    expect(container.firstChild).toBe(skeleton);
  });

  it('includes default pulse animation and styling classes', () => {
    render(<Skeleton data-testid="skeleton-element" />);
    const skeleton = screen.getByTestId('skeleton-element');
    expect(skeleton.className).toContain('animate-pulse');
    expect(skeleton.className).toContain('rounded-md');
    expect(skeleton.className).toContain('bg-muted/80');
  });

  it('merges custom className with default classes', () => {
    render(<Skeleton data-testid="skeleton-element" className="h-12 w-12 rounded-full" />);
    const skeleton = screen.getByTestId('skeleton-element');
    expect(skeleton.className).toContain('h-12');
    expect(skeleton.className).toContain('w-12');
    expect(skeleton.className).toContain('rounded-full');
    expect(skeleton.className).toContain('animate-pulse');
  });

  it('forwards standard HTML attributes', () => {
    render(<Skeleton data-testid="skeleton-element" id="test-skeleton" style={{ width: 100 }} />);
    const skeleton = screen.getByTestId('skeleton-element');
    expect(skeleton).toHaveAttribute('id', 'test-skeleton');
    expect(skeleton).toHaveStyle({ width: '100px' });
  });
});
