import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AspectRatio } from '../aspect-ratio';

describe('AspectRatio component', () => {
  it('renders children within container', () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <img src="https://example.com/test.jpg" alt="Landscape banner" />
      </AspectRatio>
    );

    const img = screen.getByAltText('Landscape banner');
    expect(img).toBeInTheDocument();
  });

  it('sets aspect ratio padding style on wrapper element', () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9}>
        <div>Content</div>
      </AspectRatio>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveAttribute('data-radix-aspect-ratio-wrapper');
    expect(wrapper.style.paddingBottom).toBe('56.25%');
  });

  it('defaults to 1:1 aspect ratio when ratio is not specified', () => {
    const { container } = render(
      <AspectRatio>
        <div>Square content</div>
      </AspectRatio>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveAttribute('data-radix-aspect-ratio-wrapper');
    expect(wrapper.style.paddingBottom).toBe('100%');
  });

  it('merges custom className and forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(
      <AspectRatio ref={ref} ratio={4 / 3} className="custom-aspect-ratio">
        <div>Ref item</div>
      </AspectRatio>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(container.querySelector('.custom-aspect-ratio')).toBeInTheDocument();
  });
});
