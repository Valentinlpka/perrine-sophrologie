// components/PDFViewer.tsx
"use client";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const PdfViewer = () => {
    return (
        <div className="w-full h-auto aspect-[210/297]">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
                <div className="w-full h-full">
                    <Viewer
                        fileUrl="/code-deontologie.pdf"
                        defaultScale={1}
                        initialPage={0}
                        renderLoader={() => (
                            <div className="flex justify-center items-center h-full">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                            </div>
                        )}
                        plugins={[]}
                        theme={{
                            theme: 'light',
                        }}
                        renderPage={(props) => (
                            <div className="w-full h-full m-0 p-0">
                                {props.canvasLayer.children}
                            </div>
                        )}
                    />
                </div>
            </Worker>
        </div>
    );
};

export default PdfViewer;