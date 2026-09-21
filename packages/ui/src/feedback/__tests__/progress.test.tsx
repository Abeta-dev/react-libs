import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Progress } from '../progress';

describe('Progress component', () => {
  it('renders with role="progressbar" and correct aria attributes', () => {
    render(<Progress value={45} aria-label="Loading progress" />);
    const progressbar = screen.getByRole('progressbar', { name: 'Loading progress' });
    expect(progressbar).toBeInTheDocument();
    expect(progressbar).toHaveAttribute('aria-valuenow', '45');
  });

  it('renders percentage label when showLabel is true', () => {
    render(<Progress value={75} showLabel />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('does not render percentage label by default', () => {
    render(<Progress value={75} />);
    expect(screen.queryByText('75%')).not.toBeInTheDocument();
  });

  it('applies indicator styling based on value percentage', () => {
    const { container } = render(<Progress value={60} />);
    const indicator = container.querySelector('.h-full') as HTMLElement;
    expect(indicator).toBeInTheDocument();
    expect(indicator.style.transform).toBe('translateX(-40%)');
  });

  it('applies variant styling correctly', () => {
    const { container: successContainer } = render(<Progress value={50} variant="success" />);
    const successRoot = successContainer.querySelector('.bg-emerald-200');
    expect(successRoot).toBeInTheDocument();

    const { container: dangerContainer } = render(<Progress value={50} variant="danger" />);
    const dangerRoot = dangerContainer.querySelector('.bg-red-200');
    expect(dangerRoot).toBeInTheDocument();

    const { container: warningContainer } = render(<Progress value={50} variant="warning" />);
    const warningRoot = warningContainer.querySelector('.bg-amber-200');
    expect(warningRoot).toBeInTheDocument();
  });

  it('applies shimmer animation class when shimmer prop is true', () => {
    const { container } = render(<Progress value={30} shimmer />);
    const indicator = container.querySelector('.progress-shimmer');
    expect(indicator).toBeInTheDocument();
  });

  it('handles 0 or missing value gracefully', () => {
    render(<Progress showLabel />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('forwards ref and custom className correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(<Progress ref={ref} className="custom-progress" value={20} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(container.querySelector('.custom-progress')).toBeInTheDocument();
  });
});
