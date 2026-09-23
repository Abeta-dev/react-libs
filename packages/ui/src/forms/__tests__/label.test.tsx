import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Label } from '../label';

describe('Label component', () => {
  it('renders label text content correctly', () => {
    render(<Label>Email Address</Label>);
    expect(screen.getByText('Email Address')).toBeInTheDocument();
  });

  it('associates with an input via htmlFor', () => {
    render(
      <div>
        <Label htmlFor="email-input">Email Address</Label>
        <input id="email-input" type="email" />
      </div>
    );
    const label = screen.getByText('Email Address');
    expect(label).toHaveAttribute('for', 'email-input');
  });

  it('focuses the associated input when clicked', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Label htmlFor="username-input">Username</Label>
        <input id="username-input" type="text" />
      </div>
    );

    const input = screen.getByRole('textbox');
    expect(input).not.toHaveFocus();

    await user.click(screen.getByText('Username'));
    expect(input).toHaveFocus();
  });

  it('applies default classes and merges custom className', () => {
    render(<Label className="custom-label-class">Password</Label>);
    const label = screen.getByText('Password');
    expect(label.className).toContain('text-sm');
    expect(label.className).toContain('font-medium');
    expect(label.className).toContain('custom-label-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Ref Label</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });
});
