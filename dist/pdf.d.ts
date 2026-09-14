import * as react_jsx_runtime from 'react/jsx-runtime';

interface PdfViewerProps {
    /** The URL or File object of the PDF to render */
    file: string | File;
    /** Optional class for the outer container */
    className?: string;
    /** Maximum width of the rendered PDF page */
    maxWidth?: number;
    /** Initial scale of the PDF */
    scale?: number;
    /** Whether to show a transparent internal download button */
    showDownload?: boolean;
    /** Whether to show a print button */
    showPrint?: boolean;
    /** Callback when loading succeeds */
    onLoadSuccess?: (numPages: number) => void;
    /** Callback when loading fails */
    onLoadError?: (error: Error) => void;
}
declare function PdfViewer({ file, className, maxWidth, scale, showDownload, showPrint, onLoadSuccess, onLoadError, }: PdfViewerProps): react_jsx_runtime.JSX.Element;

export { PdfViewer, type PdfViewerProps };
