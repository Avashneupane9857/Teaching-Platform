import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { usePDFStore } from "../store/pdfStore";
import axios from "axios"; // Import axios
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { backendUrl } from "../config";
import { useParams } from "react-router-dom";

console.log(pdfjs.version);

// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs";

interface PDFViewerProps {
  url: string;
  className?: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({
  url,
  className = "",
}) => {
  const [urls, setUrls] = useState<number>(10);
  const { currentPage, setNumPages, scale, setCustomScale } = usePDFStore();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [pdfData, setPdfData] = React.useState<ArrayBuffer | null>(null);
  const { classId } = useParams();

  React.useEffect(() => {
    const fetchPDF = async () => {
      try {
        // isolated
        const response = await axios.get(
          `${backendUrl}/slides/${classId}/${urls}`,
          {
            responseType: "arraybuffer", // Specify that we expect binary data
            headers: {
              "Content-Type": "application/pdf",
            },
          }
        );

        // Set the PDF data once the response is received
        setPdfData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load PDF");
      } finally {
        setLoading(false);
      }
    };

    fetchPDF();

    const handleResize = () => {
      setCustomScale();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [url, urls]);

  const handlepdfchange = () => {
    setUrls((prevUrls) => prevUrls + 1); // Increment the number by 1
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const onDocumentLoadError = (error: Error) => {
    setError(error.message);
    setLoading(false);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Error loading PDF: {error}</p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      )}
      {pdfData && (
        <Document
          file={pdfData}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          className="flex justify-center"
          loading={
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          }
        >
          <Page
            pageNumber={currentPage}
            scale={scale}
            className="shadow-lg overflow-clip"
            renderTextLayer={true}
            renderAnnotationLayer={true}
            loading={null}
          />
        </Document>
      )}

      <button onClick={handlepdfchange}>Change Page</button>
    </div>
  );
};

const PdfView = () => {
  return (
    <>
      <div className="bg-black rounded-3xl shadow-xl">
        <div className="bg-white rounded-lg">
          <PDFViewer
            url="https://sidd-bucket-digital.blr1.digitaloceanspaces.com/test.pdf"
            className=""
          />
        </div>
      </div>
    </>
  );
};

export default PdfView;
