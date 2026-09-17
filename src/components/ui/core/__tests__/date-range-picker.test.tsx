import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DatePickerWithRange } from '../date-range-picker';
import { vi } from 'vitest';

describe('DatePickerWithRange component', () => {
  it('renders placeholder when no date is selected', () => {
    render(<DatePickerWithRange placeholder="Choose date range" />);
    expect(screen.getByText('Choose date range')).toBeInTheDocument();
  });

  it('renders formatted date range when date is provided', () => {
    const from = new Date(2025, 4, 10);
    const to = new Date(2025, 4, 20);
    render(<DatePickerWithRange date={{ from, to }} />);
    expect(screen.getByText(/May 10, 2025 - May 20, 2025/i)).toBeInTheDocument();
  });

  it('calls setDate and onSelect when apply button is clicked', () => {
    const handleSetDate = vi.fn();
    const handleSelect = vi.fn();
    const from = new Date(2025, 5, 1);
    const to = new Date(2025, 5, 15);

    render(
      <DatePickerWithRange
        defaultDate={{ from, to }}
        setDate={handleSetDate}
        onSelect={handleSelect}
      />
    );

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const applyBtn = screen.getByRole('button', { name: /apply range/i });
    fireEvent.click(applyBtn);

    expect(handleSetDate).toHaveBeenCalledWith({ from, to });
    expect(handleSelect).toHaveBeenCalledWith({ from, to });
  });

  it('closes popover without changes when cancel is clicked', () => {
    const handleSetDate = vi.fn();
    render(
      <DatePickerWithRange
        placeholder="Select dates"
        setDate={handleSetDate}
      />
    );

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelBtn);

    expect(handleSetDate).not.toHaveBeenCalled();
  });

    it('forwards ref to the outer container div', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<DatePickerWithRange ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('does not wipe selection when defaultDate object identity changes on re-renders', () => {
        const d1 = new Date(2025, 0, 1);
        const d2 = new Date(2025, 0, 10);

        const { rerender } = render(
            <DatePickerWithRange defaultDate={{ from: d1, to: d2 }} />
        );

        expect(screen.getByText(/Jan 01, 2025 - Jan 10, 2025/i)).toBeInTheDocument();

        // Open popover and click Apply to simulate active selection flow
        const trigger = screen.getByRole('button');
        fireEvent.click(trigger);

        const applyBtn = screen.getByRole('button', { name: /apply range/i });
        fireEvent.click(applyBtn);

        // Re-render with new object identity having identical date values
        rerender(
            <DatePickerWithRange defaultDate={{ from: new Date(2025, 0, 1), to: new Date(2025, 0, 10) }} />
        );

        // Label should remain intact and not wiped or corrupted
        expect(screen.getByText(/Jan 01, 2025 - Jan 10, 2025/i)).toBeInTheDocument();
    });
});
