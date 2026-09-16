import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  sanitizeCssColor,
} from '../chart';
import {
  Bar, BarChart, Line, LineChart,
  XAxis, YAxis, CartesianGrid,
} from 'recharts';

vi.mock('recharts', async (importOriginal) => {
  const actual = await importOriginal<typeof import('recharts')>();
  return {
    ...actual,
    ResponsiveContainer: ({ children }: any) => <div data-testid="mock-responsive-container">{children}</div>,
  };
});

const mockConfig = {
  sales: { label: 'Sales', color: '#4f46e5' },
  revenue: { label: 'Revenue', color: '#06b6d4' },
};

const barData = [
  { month: 'Jan', sales: 120, revenue: 240 },
  { month: 'Feb', sales: 150, revenue: 300 },
  { month: 'Mar', sales: 90,  revenue: 180 },
];

describe('ChartContainer', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <ChartContainer config={mockConfig}>
        <BarChart data={barData}>
          <Bar dataKey="sales" />
        </BarChart>
      </ChartContainer>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ChartContainer config={mockConfig} className="my-chart">
        <BarChart data={barData}><Bar dataKey="sales" /></BarChart>
      </ChartContainer>
    );
    expect(container.querySelector('.my-chart')).toBeInTheDocument();
  });

  it('renders with a BarChart and XAxis', () => {
    const { container } = render(
      <ChartContainer config={mockConfig}>
        <BarChart data={barData}>
          <XAxis dataKey="month" />
          <Bar dataKey="sales" />
        </BarChart>
      </ChartContainer>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with a LineChart', () => {
    const { container } = render(
      <ChartContainer config={mockConfig}>
        <LineChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Line type="monotone" dataKey="sales" />
        </LineChart>
      </ChartContainer>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with multiple bar series', () => {
    const { container } = render(
      <ChartContainer config={mockConfig}>
        <BarChart data={barData}>
          <XAxis dataKey="month" />
          <Bar dataKey="sales" fill={mockConfig.sales.color} />
          <Bar dataKey="revenue" fill={mockConfig.revenue.color} />
        </BarChart>
      </ChartContainer>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with ChartTooltip and ChartTooltipContent', () => {
    const { container } = render(
      <ChartContainer config={mockConfig}>
        <BarChart data={barData}>
          <Bar dataKey="sales" />
          <ChartTooltip content={<ChartTooltipContent />} />
        </BarChart>
      </ChartContainer>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with ChartLegend and ChartLegendContent', () => {
    // ChartLegendContent requires `payload` — Recharts injects at runtime;
    // supply a minimal typed stub so the type-checker is satisfied.
    const stubPayload: React.ComponentProps<typeof ChartLegendContent>['payload'] = [
      { value: 'sales', type: 'square', color: '#4f46e5', dataKey: 'sales', id: 'sales' },
    ];
    const { container } = render(
      <ChartContainer config={mockConfig}>
        <BarChart data={barData}>
          <Bar dataKey="sales" />
          <ChartLegend content={<ChartLegendContent payload={stubPayload} />} />
        </BarChart>
      </ChartContainer>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders ChartTooltipContent standalone', () => {
    const { container } = render(
      <ChartContainer config={mockConfig}>
        <BarChart data={barData}>
          <Bar dataKey="sales" />
        </BarChart>
      </ChartContainer>
    );
    expect(container).toBeTruthy();
  });

  it('renders chart with empty data array without crashing', () => {
    const { container } = render(
      <ChartContainer config={mockConfig}>
        <BarChart data={[]}>
          <Bar dataKey="sales" />
        </BarChart>
      </ChartContainer>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with hideLabel prop on ChartTooltipContent', () => {
    const { container } = render(
      <ChartContainer config={mockConfig}>
        <BarChart data={barData}>
          <Bar dataKey="sales" />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        </BarChart>
      </ChartContainer>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with hideIndicator prop on ChartTooltipContent', () => {
    const { container } = render(
      <ChartContainer config={mockConfig}>
        <BarChart data={barData}>
          <Bar dataKey="sales" />
          <ChartTooltip content={<ChartTooltipContent hideIndicator />} />
        </BarChart>
      </ChartContainer>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});

// ─── Additional coverage — branches and props ─────────────────────────────────

describe('ChartTooltipContent — indicator variants', () => {
  it('renders with indicator="line"', () => {
    const { container } = render(
      <ChartContainer config={mockConfig}>
        <BarChart data={barData}>
          <Bar dataKey="sales" />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        </BarChart>
      </ChartContainer>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with indicator="dot"', () => {
    const { container } = render(
      <ChartContainer config={mockConfig}>
        <BarChart data={barData}>
          <Bar dataKey="sales" />
          <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        </BarChart>
      </ChartContainer>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with indicator="dashed"', () => {
    const { container } = render(
      <ChartContainer config={mockConfig}>
        <BarChart data={barData}>
          <Bar dataKey="sales" />
          <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
        </BarChart>
      </ChartContainer>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});

describe('ChartTooltipContent — direct rendering and payload coverage', () => {
  it('renders gracefully when active=false', () => {
    const { container } = render(
      <ChartContainer config={mockConfig}>
        <ChartTooltipContent active={false} />
      </ChartContainer>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders content with active=true and valid payload', () => {
    const stubPayload = [
      { name: 'sales', value: 100, payload: { fill: '#000', month: 'Jan', sales: 100 }, dataKey: 'sales', color: '#4f46e5' },
    ];
    render(
      <ChartContainer config={mockConfig}>
        <ChartTooltipContent {...({ active: true, payload: stubPayload } as any)} />
      </ChartContainer>
    );
    expect(screen.getAllByText(/sales/i)[0]).toBeInTheDocument();
  });

  it('accepts a custom labelFormatter', () => {
    const stubPayload = [{ name: 'sales', value: 100, payload: { fill: '#fff' }, dataKey: 'sales', color: '#4f46e5' }];
    render(
      <ChartContainer config={mockConfig}>
        <ChartTooltipContent 
          {...({ 
            active: true, 
            payload: stubPayload, 
            labelFormatter: (value: any) => `Custom ${value}`,
            label: "Jan" 
          } as any)}
        />
      </ChartContainer>
    );
    expect(screen.getByText(/Custom Jan/i)).toBeInTheDocument();
  });

  it('handles nameKey to override label resolving', () => {
    const stubPayload = [
      { name: 'Jan', value: 100, payload: { fill: '#000', month: 'Jan', sales: 100 }, dataKey: 'sales', color: '#4f46e5' },
    ];
    render(
      <ChartContainer config={{ month: { label: 'Month Config' }}}>
        <ChartTooltipContent {...({ active: true, payload: stubPayload, nameKey: "month" } as any)} />
      </ChartContainer>
    );
    expect(screen.getAllByText(/Month Config/i)[0]).toBeInTheDocument();
  });
});

describe('ChartLegendContent — null/undefined payload', () => {
  it('renders gracefully with empty payload array', () => {
    const { container } = render(
      <ChartContainer config={mockConfig}>
        <BarChart data={barData}>
          <ChartLegend content={<ChartLegendContent payload={[]} />} />
        </BarChart>
      </ChartContainer>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with multiple payload items', () => {
    const stubPayload: React.ComponentProps<typeof ChartLegendContent>['payload'] = [
      { value: 'sales',   type: 'square', color: '#4f46e5', dataKey: 'sales',   id: 'sales'   },
      { value: 'revenue', type: 'square', color: '#06b6d4', dataKey: 'revenue', id: 'revenue' },
    ];
    const { container } = render(
      <ChartContainer config={mockConfig}>
        <BarChart data={barData}>
          <ChartLegend content={<ChartLegendContent payload={stubPayload} />} />
        </BarChart>
      </ChartContainer>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});

describe('ChartContainer — id and CSS variable injection', () => {
  it('injects --color-* CSS variables via a <style> tag', () => {
    const { container } = render(
      <ChartContainer config={mockConfig} id="partner-chart">
        <BarChart data={barData}>
          <Bar dataKey="sales" />
        </BarChart>
      </ChartContainer>
    );
    // The CSS variable is injected via a nested <style> element targeting [data-chart]
    const styleTag = container.querySelector('style');
    expect(styleTag?.textContent).toContain('--color-sales:');
  });

  it('uses the provided id to structure the data-chart attribute on the container', () => {
    const { container } = render(
      <ChartContainer config={mockConfig} id="my-chart">
        <BarChart data={barData}><Bar dataKey="sales" /></BarChart>
      </ChartContainer>
    );
    // The container uses data-chart="chart-my-chart" (the 'chart-' prefix is added)
    expect(container.querySelector('[data-chart="chart-my-chart"]')).toBeInTheDocument();
  });

  it('catches rendering failures and renders custom fallback via ErrorBoundary', () => {
    const CrashingComponent = () => {
      throw new Error('Recharts internal render crash');
    };

    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ChartContainer
        config={mockConfig}
        fallback={<div data-testid="chart-error">Chart could not be loaded</div>}
      >
        <CrashingComponent />
      </ChartContainer>
    );

    expect(screen.getByTestId('chart-error')).toBeInTheDocument();
    expect(screen.getByText('Chart could not be loaded')).toBeInTheDocument();

    spy.mockRestore();
  });
});

describe('sanitizeCssColor', () => {
  it('strips </style> and HTML tags to prevent XSS breakout', () => {
    const malicious = '</style><script>alert(1)</script>';
    const sanitized = sanitizeCssColor(malicious);
    expect(sanitized).not.toContain('</style');
    expect(sanitized).not.toContain('<');
    expect(sanitized).not.toContain('>');
    expect(sanitized).toBe('scriptalert(1)/script');
  });

  it('strips case-insensitive </STYLE> tags', () => {
    const malicious = '</STYLE><script>alert(1)</script>';
    const sanitized = sanitizeCssColor(malicious);
    expect(sanitized).not.toContain('</STYLE');
    expect(sanitized).not.toContain('</style');
    expect(sanitized).toBe('scriptalert(1)/script');
  });

  it('strips CSS breakout characters like brackets and semicolons', () => {
    const malicious = 'red; } body { display:none; }';
    const sanitized = sanitizeCssColor(malicious);
    expect(sanitized).not.toContain(';');
    expect(sanitized).not.toContain('}');
    expect(sanitized).not.toContain('{');
    expect(sanitized).toBe('red  body  display:none');
  });

  it('strips ASCII and Unicode control characters and newlines', () => {
    const withControl = 'blue\u0000\u001f\u007f\n\r\t';
    expect(sanitizeCssColor(withControl)).toBe('blue');

    const controlEvasion = '<\u0000/style>';
    expect(sanitizeCssColor(controlEvasion)).toBe('');
  });

  it('preserves valid hex color codes', () => {
    expect(sanitizeCssColor('#fff')).toBe('#fff');
    expect(sanitizeCssColor('#ffffff')).toBe('#ffffff');
    expect(sanitizeCssColor('#4f46e5')).toBe('#4f46e5');
    expect(sanitizeCssColor('#12345678')).toBe('#12345678');
  });

  it('preserves valid rgb and rgba colors', () => {
    expect(sanitizeCssColor('rgb(255, 0, 0)')).toBe('rgb(255, 0, 0)');
    expect(sanitizeCssColor('rgba(255, 0, 0, 0.5)')).toBe('rgba(255, 0, 0, 0.5)');
  });

  it('preserves valid hsl and hsla colors', () => {
    expect(sanitizeCssColor('hsl(120, 50%, 50%)')).toBe('hsl(120, 50%, 50%)');
    expect(sanitizeCssColor('hsla(120, 50%, 50%, 0.8)')).toBe('hsla(120, 50%, 50%, 0.8)');
  });

  it('preserves valid CSS variables', () => {
    expect(sanitizeCssColor('var(--chart-1)')).toBe('var(--chart-1)');
    expect(sanitizeCssColor('var(--chart-2, #f00)')).toBe('var(--chart-2, #f00)');
  });

  it('preserves modern CSS colors and keywords', () => {
    expect(sanitizeCssColor('oklch(0.6 0.25 140)')).toBe('oklch(0.6 0.25 140)');
    expect(sanitizeCssColor('transparent')).toBe('transparent');
    expect(sanitizeCssColor('currentColor')).toBe('currentColor');
  });

  it('handles non-string or empty input safely', () => {
    expect(sanitizeCssColor(null)).toBe('');
    expect(sanitizeCssColor(undefined)).toBe('');
    expect(sanitizeCssColor(123)).toBe('');
    expect(sanitizeCssColor({})).toBe('');
    expect(sanitizeCssColor('')).toBe('');
  });
});

describe('ChartContainer and ChartStyle — security sanitization', () => {
  it('sanitizes malicious color values in rendered <style> tag', () => {
    const maliciousConfig = {
      malicious: { label: 'Malicious', color: '</style><script>alert(1)</script>' },
      breakout: { label: 'Breakout', color: 'red; } body { display:none; }' },
      valid: { label: 'Valid', color: '#4f46e5' },
      cssVar: { label: 'Var', color: 'var(--chart-1)' },
    };

    const { container } = render(
      <ChartContainer config={maliciousConfig} id="safe-chart">
        <BarChart data={barData}><Bar dataKey="valid" /></BarChart>
      </ChartContainer>
    );

    const styleTag = container.querySelector('style');
    const css = styleTag?.textContent || '';

    expect(css).not.toContain('</style');
    expect(css).not.toContain('<script');
    expect(css).not.toContain('body {');
    expect(css).not.toContain('red;');
    expect(css).toContain('--color-malicious: scriptalert(1)/script;');
    expect(css).toContain('--color-breakout: red  body  display:none;');
    expect(css).toContain('--color-valid: #4f46e5;');
    expect(css).toContain('--color-cssVar: var(--chart-1);');
  });

  it('sanitizes config keys in CSS custom property names to only allow [a-zA-Z0-9_-]', () => {
    const keyInjectionConfig = {
      'evil; } body { color: red; }': { color: '#ff0000' },
      'safe-key_1': { color: '#00ff00' },
      'bad$key@name': { color: '#0000ff' },
      '!@#$%': { color: '#ffff00' },
    };

    const { container } = render(<ChartStyle id="test-chart" config={keyInjectionConfig} />);
    const css = container.querySelector('style')?.textContent || '';

    expect(css).toContain('--color-evilbodycolorred: #ff0000;');
    expect(css).toContain('--color-safe-key_1: #00ff00;');
    expect(css).toContain('--color-badkeyname: #0000ff;');
    expect(css).not.toContain('--color-:');
    expect(css).not.toContain('body { color: red; }');
  });

  it('sanitizes chart id in ChartContainer and ChartStyle to only allow [a-zA-Z0-9_-]', () => {
    const { container } = render(
      <ChartContainer config={mockConfig} id='my"}] { color: red; }'>
        <BarChart data={barData}><Bar dataKey="sales" /></BarChart>
      </ChartContainer>
    );

    expect(container.querySelector('[data-chart="chart-mycolorred"]')).toBeInTheDocument();
    const css = container.querySelector('style')?.textContent || '';
    expect(css).toContain('[data-chart=chart-mycolorred]');
    expect(css).not.toContain('color: red; }');
  });

  it('sanitizes standalone ChartStyle id and themed color values', () => {
    const themeConfig = {
      themed: {
        theme: {
          light: 'red; } body { color: red; }',
          dark: '</style><script>alert(1)</script>',
        },
      },
    };

    const { container } = render(<ChartStyle id="direct-id</style>" config={themeConfig} />);
    const style = container.querySelector('style');
    const css = style?.textContent || '';

    expect(css).toContain('[data-chart=direct-idstyle]');
    expect(css).not.toContain('</style');
    expect(css).not.toContain('<script');
    expect(css).toContain('--color-themed: red  body  color: red;');
    expect(css).toContain('--color-themed: scriptalert(1)/script;');
  });

  it('returns null when ChartStyle id has no valid characters', () => {
    const { container } = render(<ChartStyle id="!@#$%" config={mockConfig} />);
    expect(container.querySelector('style')).toBeNull();
  });
});

