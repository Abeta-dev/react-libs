import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '../table';

describe('Table component suite', () => {
  it('renders a semantic table with header, body, footer, and caption', () => {
    render(
      <Table>
        <TableCaption>Recent transactions overview</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow data-testid="row-1">
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow data-testid="row-2" data-state="selected">
            <TableCell className="font-medium">INV002</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell className="text-right">$150.00</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right">$400.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Recent transactions overview')).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader')).toHaveLength(3);
    expect(screen.getAllByRole('row')).toHaveLength(4); // header + 2 body + footer
    expect(screen.getByText('INV001')).toBeInTheDocument();
    expect(screen.getByText('Paid')).toBeInTheDocument();
    expect(screen.getByText('$400.00')).toBeInTheDocument();

    const selectedRow = screen.getByTestId('row-2');
    expect(selectedRow).toHaveAttribute('data-state', 'selected');
  });

  it('forwards refs correctly across Table elements', () => {
    const tableRef = React.createRef<HTMLTableElement>();
    const rowRef = React.createRef<HTMLTableRowElement>();

    render(
      <Table ref={tableRef}>
        <TableBody>
          <TableRow ref={rowRef}>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(tableRef.current).toBeInstanceOf(HTMLTableElement);
    expect(rowRef.current).toBeInstanceOf(HTMLTableRowElement);
  });
});
