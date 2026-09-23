import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from '../select';

describe('Select component', () => {
  it('renders trigger with placeholder text', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByRole('combobox')).toHaveTextContent('Select a fruit');
  });

  it('renders with defaultValue selected', () => {
    render(
      <Select defaultValue="banana">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByRole('combobox')).toHaveTextContent('Banana');
  });

  it('opens dropdown, displays options, and selects an item', async () => {
    const handleValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Select onValueChange={handleValueChange}>
        <SelectTrigger aria-label="Select fruit">
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectSeparator />
            <SelectItem value="orange">Orange</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByRole('combobox', { name: 'Select fruit' });
    await user.click(trigger);

    expect(await screen.findByText('Fruits')).toBeInTheDocument();
    const option = await screen.findByRole('option', { name: 'Orange' });
    expect(option).toBeInTheDocument();

    await user.click(option);
    expect(handleValueChange).toHaveBeenCalledWith('orange');
  });

  it('respects disabled state on trigger', () => {
    render(
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Disabled select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">One</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('forwards ref to SelectTrigger', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <Select>
        <SelectTrigger ref={ref}>
          <SelectValue placeholder="Ref test" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">One</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
