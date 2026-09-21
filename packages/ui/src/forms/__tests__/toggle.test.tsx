import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toggle } from '../toggle';

describe('Toggle component', () => {
  it('renders unpressed by default with aria-pressed="false"', () => {
    render(<Toggle aria-label="Toggle bookmark">Bookmark</Toggle>);
    const button = screen.getByRole('button', { name: 'Toggle bookmark' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button).toHaveAttribute('data-state', 'off');
  });

  it('renders pressed when defaultPressed is true', () => {
    render(<Toggle defaultPressed aria-label="Toggle pin">Pin</Toggle>);
    const button = screen.getByRole('button', { name: 'Toggle pin' });
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveAttribute('data-state', 'on');
  });

  it('toggles state on user click and fires onPressedChange', async () => {
    const handlePressedChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Toggle aria-label="Toggle mute" onPressedChange={handlePressedChange}>
        Mute
      </Toggle>
    );

    const button = screen.getByRole('button', { name: 'Toggle mute' });
    await user.click(button);

    expect(handlePressedChange).toHaveBeenCalledWith(true);
    expect(button).toHaveAttribute('aria-pressed', 'true');

    await user.click(button);
    expect(handlePressedChange).toHaveBeenCalledWith(false);
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('does not toggle when disabled', async () => {
    const handlePressedChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Toggle disabled aria-label="Disabled toggle" onPressedChange={handlePressedChange}>
        Disabled
      </Toggle>
    );

    const button = screen.getByRole('button', { name: 'Disabled toggle' });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(handlePressedChange).not.toHaveBeenCalled();
  });

  it('applies variant and size classes correctly', () => {
    const { container: outlineContainer } = render(
      <Toggle variant="outline" size="sm">
        Outline Sm
      </Toggle>
    );
    const outlineBtn = outlineContainer.firstChild as HTMLElement;
    expect(outlineBtn.className).toContain('border');
    expect(outlineBtn.className).toContain('h-8');

    const { container: lgContainer } = render(<Toggle size="lg">Large</Toggle>);
    const lgBtn = lgContainer.firstChild as HTMLElement;
    expect(lgBtn.className).toContain('h-10');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Toggle ref={ref}>Ref Button</Toggle>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
