import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  CollapsibleCard,
  CollapsibleCardTrigger,
  CollapsibleCardContent,
} from '../collapsible';

describe('Collapsible component suite', () => {
  it('mounts closed by default and toggles open on trigger click', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle Details</CollapsibleTrigger>
        <CollapsibleContent>Hidden collapsible content</CollapsibleContent>
      </Collapsible>
    );

    const trigger = screen.getByText('Toggle Details');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Hidden collapsible content')).not.toBeInTheDocument();

    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Hidden collapsible content')).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('supports defaultOpen={true} and fires onOpenChange callback', () => {
    const handleOpenChange = vi.fn();

    render(
      <Collapsible defaultOpen onOpenChange={handleOpenChange}>
        <CollapsibleTrigger>Options</CollapsibleTrigger>
        <CollapsibleContent>Pre-expanded content</CollapsibleContent>
      </Collapsible>
    );

    const trigger = screen.getByText('Options');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Pre-expanded content')).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('renders CollapsibleCard with card trigger and content', () => {
    render(
      <CollapsibleCard>
        <CollapsibleCardTrigger>Advanced Settings</CollapsibleCardTrigger>
        <CollapsibleCardContent>Configurable parameters</CollapsibleCardContent>
      </CollapsibleCard>
    );

    const trigger = screen.getByText('Advanced Settings');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Configurable parameters')).toBeInTheDocument();
  });

  it('disables trigger when disabled prop is set on Collapsible', () => {
    render(
      <Collapsible disabled>
        <CollapsibleTrigger>Disabled Collapsible</CollapsibleTrigger>
        <CollapsibleContent>Cannot view this</CollapsibleContent>
      </Collapsible>
    );

    const trigger = screen.getByText('Disabled Collapsible');
    expect(trigger).toBeDisabled();
  });
});
