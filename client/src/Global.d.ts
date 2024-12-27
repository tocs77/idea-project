declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.jpg';
declare module '*.png';
declare module '*.bin';

declare module 'pdfjs-dist/build/pdf';
declare module 'pdfjs-dist/build/pdf.worker.entry';

declare global {
  interface Window {
    PdfViewer: unknown;
  }
}
