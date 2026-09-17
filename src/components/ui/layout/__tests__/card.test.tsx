import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardSeparator,
  CardFooter,
  StandardCard,
} from '../card';

describe('Card component suite', () => {
  it('renders compound Card elements with correct hierarchy and text', () => {
    render(
      <Card data-testid="test-card">
        <CardHeader>
          <CardTitle>Invoice Overview</CardTitle>
          <CardDescription>Monthly billing summary</CardDescription>
        </CardHeader>
        <CardSeparator />
        <CardContent>
          <p>Total amount: $1,250</p>
        </CardContent>
        <CardFooter>
          <button type="button">Download PDF</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByTestId('test-card')).toBeInTheDocument();
    expect(screen.getByText('Invoice Overview')).toBeInTheDocument();
    expect(screen.getByText('Monthly billing summary')).toBeInTheDocument();
    expect(screen.getByRole('separator')).toBeInTheDocument();
    expect(screen.getByText('Total amount: $1,250')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Download PDF' })).toBeInTheDocument();
  });

  it('renders StandardCard with title, badge, actions, and footer', () => {
    render(
      <StandardCard
        title="Project Alpha"
        description="Core infrastructure project"
        badge={<span data-testid="status-badge">In Progress</span>}
        headerActions={<button type="button">Settings</button>}
        footer={<span>Created 2 days ago</span>}
        actions={<button type="button">Deploy</button>}
      >
        <p>Deployment details and metrics</p>
      </StandardCard>
    );

    expect(screen.getByText('Project Alpha')).toBeInTheDocument();
    expect(screen.getByText('Core infrastructure project')).toBeInTheDocument();
    expect(screen.getByTestId('status-badge')).toHaveTextContent('In Progress');
    expect(screen.getByRole('button', { name: 'Settings' })).toBeInTheDocument();
    expect(screen.getByText('Deployment details and metrics')).toBeInTheDocument();
    expect(screen.getByText('Created 2 days ago')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Deploy' })).toBeInTheDocument();
  });

  it('forwards ref correctly for Card and StandardCard', () => {
    const cardRef = React.createRef<HTMLDivElement>();
    const standardRef = React.createRef<HTMLDivElement>();

    render(
      <div>
        <Card ref={cardRef}>Basic Card</Card>
        <StandardCard ref={standardRef} title="Standard Ref">
          Body
        </StandardCard>
      </div>
    );

    expect(cardRef.current).toBeInstanceOf(HTMLDivElement);
    expect(standardRef.current).toBeInstanceOf(HTMLDivElement);
  });
});
