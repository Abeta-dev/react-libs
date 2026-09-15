import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PdfViewer } from '../pdf-viewer';

interface MockDocumentProps {
  children?: React.ReactNode;
  file?: string | File;
  onLoadSuccess?: (data: { numPages: number }) => void;
  onLoadError?: (error: Error) => void;
  loading?: React.ReactNode;
}

interface MockPageProps {
  pageNumber?: number;
  scale?: number;
  rotate?: number;
  width?: number;
}

// Safely mock react-pdf components structurally for JSDOM constraints.
vi.mock('react-pdf', () => ({
  pdfjs: { GlobalWorkerOptions: { workerSrc: '' } },
  Document: ({ children, file, onLoadSuccess, onLoadError, loading }: MockDocumentProps) => {
    const onLoadSuccessRef = React.useRef(onLoadSuccess);
    onLoadSuccessRef.current = onLoadSuccess;
    const onLoadErrorRef = React.useRef(onLoadError);
    onLoadErrorRef.current = onLoadError;

    if (file === 'loading.pdf') {
      return <div data-testid="pdf-loading">{loading}</div>;
    }

    if (file === 'boundary-error.pdf') {
      throw new Error('Crash in Document tree');
    }

    if (file === 'error.pdf') {
      React.useEffect(() => {
        const timer = setTimeout(() => {
          onLoadErrorRef.current?.(new Error('Network error: Document unreachable'));
        }, 10);
        return () => clearTimeout(timer);
      }, [file]);

      return null;
    }

    // Simulate async document load once mounted per file.
    React.useEffect(() => {
      const timer = setTimeout(() => {
        onLoadSuccessRef.current?.({ numPages: 5 });
      }, 10);
      return () => clearTimeout(timer);
    }, [file]);

    const fileName = typeof file === 'string' ? file : file?.name;
    return (
      <div data-testid="pdf-document" data-file={fileName}>
        {children}
      </div>
    );
  },
  Page: ({ pageNumber, scale, rotate, width }: MockPageProps) => (
    <div
      data-testid="pdf-page"
      data-page={pageNumber}
      data-scale={scale}
      data-rotate={rotate}
      data-width={width}
    >
      Page {pageNumber} simulated.
    </div>
  ),
}));

describe('PdfViewer Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders loading state when document is in progress', () => {
    render(<PdfViewer file="loading.pdf" />);
    expect(screen.getByText('Loading Document...')).toBeInTheDocument();
  });

  it('renders document container and page once loaded', async () => {
    render(<PdfViewer file="test.pdf" maxWidth={750} />);
    expect(await screen.findByTestId('pdf-document')).toBeInTheDocument();
    const page = screen.getByTestId('pdf-page');
    expect(page).toHaveAttribute('data-page', '1');
    expect(page).toHaveAttribute('data-width', '750');
  });

  it('updates scale when clicking zoom in, zoom out, and reset zoom buttons', async () => {
    render(<PdfViewer file="test.pdf" scale={1.0} />);
    const page = await screen.findByTestId('pdf-page');
    expect(Number(page.getAttribute('data-scale'))).toBeCloseTo(1.0);

    const zoomInBtn = screen.getByRole('button', { name: /zoom in/i });
    fireEvent.click(zoomInBtn);
    expect(Number(page.getAttribute('data-scale'))).toBeCloseTo(1.2);

    const zoomOutBtn = screen.getByRole('button', { name: /zoom out/i });
    fireEvent.click(zoomOutBtn);
    expect(Number(page.getAttribute('data-scale'))).toBeCloseTo(1.0);

    fireEvent.click(zoomOutBtn);
    expect(Number(page.getAttribute('data-scale'))).toBeCloseTo(0.8);

    const resetZoomBtn = screen.getByRole('button', { name: /reset zoom/i });
    fireEvent.click(resetZoomBtn);
    expect(Number(page.getAttribute('data-scale'))).toBeCloseTo(1.0);
  });

  it('rotates the document by 90 degrees when clicking rotate button', async () => {
    render(<PdfViewer file="test.pdf" />);
    const page = await screen.findByTestId('pdf-page');
    expect(page).toHaveAttribute('data-rotate', '0');

    const rotateBtn = screen.getByRole('button', { name: /rotate/i });
    fireEvent.click(rotateBtn);
    expect(page).toHaveAttribute('data-rotate', '90');

    fireEvent.click(rotateBtn);
    expect(page).toHaveAttribute('data-rotate', '180');

    fireEvent.click(rotateBtn);
    expect(page).toHaveAttribute('data-rotate', '270');

    fireEvent.click(rotateBtn);
    expect(page).toHaveAttribute('data-rotate', '0');
  });

  it('handles download button click with mock URL', async () => {
    let clickedAnchor: HTMLAnchorElement | null = null;
    const clickSpy = vi.fn();
    const origCreateElement = document.createElement.bind(document);

    vi.spyOn(document, 'createElement').mockImplementation((tagName: string, ...args) => {
      const el = origCreateElement(tagName, ...args);
      if (tagName === 'a') {
        clickedAnchor = el as HTMLAnchorElement;
        el.click = clickSpy;
      }
      return el;
    });

    render(<PdfViewer file="https://example.com/documents/sample-invoice.pdf" showDownload />);
    const downloadBtn = await screen.findByRole('button', { name: /download/i });
    fireEvent.click(downloadBtn);

    expect(clickedAnchor).not.toBeNull();
    expect((clickedAnchor as HTMLAnchorElement | null)?.download).toBe('sample-invoice.pdf');
    expect((clickedAnchor as HTMLAnchorElement | null)?.href).toContain('sample-invoice.pdf');
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('handles download button click with File object', async () => {
    let clickedAnchor: HTMLAnchorElement | null = null;
    const clickSpy = vi.fn();
    const origCreateElement = document.createElement.bind(document);

    vi.spyOn(document, 'createElement').mockImplementation((tagName: string, ...args) => {
      const el = origCreateElement(tagName, ...args);
      if (tagName === 'a') {
        clickedAnchor = el as HTMLAnchorElement;
        el.click = clickSpy;
      }
      return el;
    });

    const createObjectURLSpy = vi.fn(() => 'blob:mock-object-url');
    const revokeObjectURLSpy = vi.fn();
    window.URL.createObjectURL = createObjectURLSpy;
    window.URL.revokeObjectURL = revokeObjectURLSpy;

    const mockFile = new File(['content'], 'contract.pdf', { type: 'application/pdf' });
    render(<PdfViewer file={mockFile} showDownload />);

    const downloadBtn = await screen.findByRole('button', { name: /download/i });
    fireEvent.click(downloadBtn);

    expect(createObjectURLSpy).toHaveBeenCalledWith(mockFile);
    expect(clickedAnchor).not.toBeNull();
    expect((clickedAnchor as HTMLAnchorElement | null)?.download).toBe('contract.pdf');
    expect((clickedAnchor as HTMLAnchorElement | null)?.href).toContain('blob:mock-object-url');
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('handles print button click by creating hidden iframe and triggering print', async () => {
    const printSpy = vi.fn();
    const origCreateElement = document.createElement.bind(document);

    vi.spyOn(document, 'createElement').mockImplementation((tagName: string, ...args) => {
      const el = origCreateElement(tagName, ...args);
      if (tagName === 'iframe') {
        Object.defineProperty(el, 'contentWindow', {
          value: { print: printSpy },
          configurable: true,
        });
        queueMicrotask(() => {
          if (typeof el.onload === 'function') {
            el.onload(new Event('load'));
          }
        });
      }
      return el;
    });

    render(<PdfViewer file="https://example.com/print-sample.pdf" showPrint />);
    const printBtn = await screen.findByRole('button', { name: /print/i });
    fireEvent.click(printBtn);

    await waitFor(() => {
      expect(printSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('handles print button click with File object', async () => {
    const printSpy = vi.fn();
    const origCreateElement = document.createElement.bind(document);

    vi.spyOn(document, 'createElement').mockImplementation((tagName: string, ...args) => {
      const el = origCreateElement(tagName, ...args);
      if (tagName === 'iframe') {
        Object.defineProperty(el, 'contentWindow', {
          value: { print: printSpy },
          configurable: true,
        });
        queueMicrotask(() => {
          if (typeof el.onload === 'function') {
            el.onload(new Event('load'));
          }
        });
      }
      return el;
    });

    const createObjectURLSpy = vi.fn(() => 'blob:mock-print-url');
    window.URL.createObjectURL = createObjectURLSpy;

    const mockFile = new File(['content'], 'printable.pdf', { type: 'application/pdf' });
    render(<PdfViewer file={mockFile} showPrint />);
    const printBtn = await screen.findByRole('button', { name: /print/i });
    fireEvent.click(printBtn);

    await waitFor(() => {
      expect(printSpy).toHaveBeenCalledTimes(1);
    });
    expect(createObjectURLSpy).toHaveBeenCalledWith(mockFile);
  });

  it('displays error state when document fails to load and fires onLoadError', async () => {
    const handleError = vi.fn();
    render(<PdfViewer file="error.pdf" onLoadError={handleError} />);

    expect(await screen.findByText('Failed to load PDF')).toBeInTheDocument();
    expect(screen.getByText('Network error: Document unreachable')).toBeInTheDocument();
    expect(handleError).toHaveBeenCalledTimes(1);
    expect(handleError).toHaveBeenCalledWith(expect.any(Error));

    // Ensure control toolbar and pagination are not displayed on error
    expect(screen.queryByRole('button', { name: /zoom in/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument();
  });

  it('catches render errors via ErrorBoundary and displays fallback', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const handleError = vi.fn();
    render(<PdfViewer file="boundary-error.pdf" onLoadError={handleError} />);

    expect(await screen.findByText('Crash in Document tree')).toBeInTheDocument();
    expect(screen.getByText('Failed to load PDF')).toBeInTheDocument();
    expect(handleError).toHaveBeenCalledTimes(1);
    consoleError.mockRestore();
  });

  it('navigates through multi-page documents with pagination controls', async () => {
    render(<PdfViewer file="test.pdf" />);
    await waitFor(() => {
      expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
    });

    const nextBtn = screen.getByRole('button', { name: /next/i });
    const prevBtn = screen.getByRole('button', { name: /previous/i });
    const page = screen.getByTestId('pdf-page');

    expect(prevBtn).toBeDisabled();
    expect(nextBtn).toBeEnabled();
    expect(page).toHaveAttribute('data-page', '1');

    // Go to page 2
    fireEvent.click(nextBtn);
    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
    expect(page).toHaveAttribute('data-page', '2');
    expect(prevBtn).toBeEnabled();

    // Go to previous page (page 1)
    fireEvent.click(prevBtn);
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
    expect(page).toHaveAttribute('data-page', '1');
    expect(prevBtn).toBeDisabled();

    // Navigate to the last page (page 5)
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    expect(screen.getByText('Page 5 of 5')).toBeInTheDocument();
    expect(page).toHaveAttribute('data-page', '5');
    expect(nextBtn).toBeDisabled();
  });

  it('resets page number when file prop changes', async () => {
    const { rerender } = render(<PdfViewer file="doc-1.pdf" />);
    await waitFor(() => {
      expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
    });

    const nextBtn = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextBtn);
    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();

    // Change file prop
    rerender(<PdfViewer file="doc-2.pdf" />);
    await waitFor(() => {
      expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
    });
    expect(screen.getByTestId('pdf-page')).toHaveAttribute('data-page', '1');
  });

  it('rejects unsafe URL schemes like javascript: in handlePrint', async () => {
    render(<PdfViewer file="javascript:alert(1)" showPrint={true} />);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /print/i })).toBeInTheDocument();
    });

    const appendChildSpy = vi.spyOn(document.body, 'appendChild');
    fireEvent.click(screen.getByRole('button', { name: /print/i }));
    // iframe should NOT be appended to body because unsafe scheme is rejected
    expect(appendChildSpy).not.toHaveBeenCalled();
    appendChildSpy.mockRestore();
  });

  it('allows safe URL schemes in handlePrint', async () => {
    render(<PdfViewer file="https://example.com/test.pdf" showPrint={true} />);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /print/i })).toBeInTheDocument();
    });

    const appendChildSpy = vi.spyOn(document.body, 'appendChild');
    fireEvent.click(screen.getByRole('button', { name: /print/i }));
    expect(appendChildSpy).toHaveBeenCalled();
    appendChildSpy.mockRestore();
  });
});
