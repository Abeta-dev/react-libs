import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToggleGroup, ToggleGroupItem } from '../toggle-group';

describe('ToggleGroup component', () => {
  it('renders single-selection group and handles selection', async () => {
    const handleValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <ToggleGroup type="single" defaultValue="left" onValueChange={handleValueChange}>
        <ToggleGroupItem value="left" aria-label="Align left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          Center
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>
    );

    const leftBtn = screen.getByRole('radio', { name: 'Align left' });
    const centerBtn = screen.getByRole('radio', { name: 'Align center' });

    expect(leftBtn).toHaveAttribute('data-state', 'on');
    expect(centerBtn).toHaveAttribute('data-state', 'off');

    await user.click(centerBtn);
    expect(handleValueChange).toHaveBeenCalledWith('center');
  });

  it('renders multiple-selection group and toggles values', async () => {
    const handleValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <ToggleGroup type="multiple" defaultValue={['bold']} onValueChange={handleValueChange}>
        <ToggleGroupItem value="bold" aria-label="Bold text">
          Bold
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic text">
          Italic
        </ToggleGroupItem>
      </ToggleGroup>
    );

    const boldBtn = screen.getByRole('button', { name: 'Bold text' });
    const italicBtn = screen.getByRole('button', { name: 'Italic text' });

    expect(boldBtn).toHaveAttribute('data-state', 'on');
    expect(italicBtn).toHaveAttribute('data-state', 'off');

    await user.click(italicBtn);
    expect(handleValueChange).toHaveBeenCalledWith(['bold', 'italic']);
  });

  it('inherits variant and size from ToggleGroup context', () => {
    render(
      <ToggleGroup type="single" variant="outline" size="sm">
        <ToggleGroupItem value="opt1" data-testid="item-1">
          Opt 1
        </ToggleGroupItem>
      </ToggleGroup>
    );

    const item = screen.getByTestId('item-1');
    expect(item.className).toContain('border');
    expect(item.className).toContain('h-8');
  });

  it('disables item when disabled prop is true', async () => {
    const handleValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <ToggleGroup type="single" onValueChange={handleValueChange}>
        <ToggleGroupItem value="disabled-opt" disabled>
          Disabled Option
        </ToggleGroupItem>
      </ToggleGroup>
    );

    const btn = screen.getByText('Disabled Option');
    expect(btn).toBeDisabled();
    await user.click(btn);
    expect(handleValueChange).not.toHaveBeenCalled();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <ToggleGroup ref={ref} type="single">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
