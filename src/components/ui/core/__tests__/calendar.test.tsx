import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Calendar } from '../calendar';

describe('Calendar Component', () => {
  it('renders default calendar grid with role="grid"', () => {
    render(<Calendar defaultMonth={new Date(2026, 3, 1)} />);
    const grid = screen.getByRole('grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveAttribute('aria-label', expect.stringContaining('April 2026'));
  });

  it('renders all 7 weekday headers', () => {
    const { container } = render(<Calendar defaultMonth={new Date(2026, 3, 1)} />);
    const headers = container.querySelectorAll('th');
    expect(headers).toHaveLength(7);
    const headerTexts = Array.from(headers).map((h) => h.textContent);
    // Narrow formatters: S, M, T, W, T, F, S
    expect(headerTexts).toEqual(['S', 'M', 'T', 'W', 'T', 'F', 'S']);
  });

  it('navigates to next and previous months when clicking navigation buttons', () => {
    render(<Calendar defaultMonth={new Date(2026, 3, 1)} />);
    // Caption displays April initially
    expect(screen.getByRole('button', { name: /april/i })).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: /go to the next month/i });
    fireEvent.click(nextBtn);
    expect(screen.getByRole('button', { name: /may/i })).toBeInTheDocument();

    const prevBtn = screen.getByRole('button', { name: /go to the previous month/i });
    fireEvent.click(prevBtn);
    expect(screen.getByRole('button', { name: /april/i })).toBeInTheDocument();
  });

  it('triggers onSelect callback when clicking an available date in single mode', () => {
    const handleSelect = vi.fn();
    render(
      <Calendar
        mode="single"
        defaultMonth={new Date(2026, 3, 1)}
        onSelect={handleSelect}
      />
    );

    // Find April 15th button
    const dayButton = screen.getByRole('button', { name: /april 15/i });
    expect(dayButton).toBeInTheDocument();
    fireEvent.click(dayButton);

    expect(handleSelect).toHaveBeenCalledTimes(1);
    const firstCall = handleSelect.mock.calls[0];
    expect(firstCall).toBeDefined();
    if (firstCall) {
      const selectedDate = firstCall[0] as Date;
      expect(selectedDate.getFullYear()).toBe(2026);
      expect(selectedDate.getMonth()).toBe(3); // April is index 3
      expect(selectedDate.getDate()).toBe(15);
    }
  });

  it('highlights controlled selected date', () => {
    const selectedDate = new Date(2026, 3, 20);
    const { container } = render(
      <Calendar
        mode="single"
        defaultMonth={new Date(2026, 3, 1)}
        selected={selectedDate}
      />
    );

    const dayCell = container.querySelector('td[data-day="2026-04-20"]');
    expect(dayCell).toBeInTheDocument();
    expect(dayCell).toHaveAttribute('data-selected', 'true');
    const dayButton = dayCell?.querySelector('button');
    expect(dayButton).toHaveAttribute('aria-label', expect.stringContaining('selected'));
  });

  it('disables dates matching the disabled predicate and prevents selection', () => {
    const handleSelect = vi.fn();
    render(
      <Calendar
        mode="single"
        defaultMonth={new Date(2026, 3, 1)}
        disabled={(date) => date.getDate() === 10}
        onSelect={handleSelect}
      />
    );

    const disabledDayBtn = screen.getByRole('button', { name: /april 10/i });
    expect(disabledDayBtn).toBeDisabled();

    fireEvent.click(disabledDayBtn);
    expect(handleSelect).not.toHaveBeenCalled();
  });

  it('supports range selection mode with start and end dates highlighted', () => {
    const { container } = render(
      <Calendar
        mode="range"
        defaultMonth={new Date(2026, 3, 1)}
        selected={{
          from: new Date(2026, 3, 5),
          to: new Date(2026, 3, 8),
        }}
      />
    );

    const day5 = container.querySelector('td[data-day="2026-04-05"]');
    const day6 = container.querySelector('td[data-day="2026-04-06"]');
    const day7 = container.querySelector('td[data-day="2026-04-07"]');
    const day8 = container.querySelector('td[data-day="2026-04-08"]');

    expect(day5).toHaveAttribute('data-selected', 'true');
    expect(day6).toHaveAttribute('data-selected', 'true');
    expect(day7).toHaveAttribute('data-selected', 'true');
    expect(day8).toHaveAttribute('data-selected', 'true');
  });

  it('supports multiple selection mode with multiple dates highlighted', () => {
    const { container } = render(
      <Calendar
        mode="multiple"
        defaultMonth={new Date(2026, 3, 1)}
        selected={[new Date(2026, 3, 7), new Date(2026, 3, 21)]}
      />
    );

    const day7 = container.querySelector('td[data-day="2026-04-07"]');
    const day21 = container.querySelector('td[data-day="2026-04-21"]');
    const day14 = container.querySelector('td[data-day="2026-04-14"]');

    expect(day7).toHaveAttribute('data-selected', 'true');
    expect(day21).toHaveAttribute('data-selected', 'true');
    expect(day14).not.toHaveAttribute('data-selected');
  });

  it('passes custom className and props through to the root container', () => {
    const { container } = render(
      <Calendar
        className="test-custom-calendar"
        data-testid="calendar-root"
      />
    );

    expect(container.querySelector('.test-custom-calendar')).toBeInTheDocument();
    expect(screen.getByTestId('calendar-root')).toBeInTheDocument();
  });

  it('renders month and year popover buttons in month caption', () => {
    render(<Calendar defaultMonth={new Date(2026, 3, 1)} />);
    const monthButton = screen.getByRole('button', { name: /april/i });
    const yearButton = screen.getByRole('button', { name: /2026/i });

    expect(monthButton).toBeInTheDocument();
    expect(yearButton).toBeInTheDocument();
  });
});
