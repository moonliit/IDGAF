import { useState, useEffect } from "react";
import { FileProps, AbstractRange, InternalProps } from "../TrackedState";
import * as pdfjs from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PdfInfo {
  name: string;
  pages: number;
}

export const PdfPreprocessor: React.FC<InternalProps> = ({ file, setFile, abstractRange, setAbstractRange }) => {
  const [pdfInfo, setPdfInfo] = useState<PdfInfo | null>(null);
  const [selectionMode, setSelectionMode] = useState<"all" | "range">(abstractRange.full ? "all" : "range");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result as ArrayBuffer);
      const pdf = await pdfjs.getDocument(typedArray).promise;
      setPdfInfo({
        name: file.name,
        pages: pdf.numPages
      });

      // Reset page range when a new PDF is loaded
      const newRange: AbstractRange = { full: true, start: 1, end: pdf.numPages };
      if (abstractRange.start === 0 && abstractRange.end === 0) {
        setAbstractRange(newRange);
      }
    };
    reader.readAsArrayBuffer(file);
  }, [file]);

  // Validates the page range
  const validatePageRange = (start: number, end: number) => {
    if (!pdfInfo) return;
    if (start < 1 || end > pdfInfo.pages || start > end) {
      setError("Invalid range. Ensure start ≤ end and within page count.");
    } else {
      setError(null);
      setAbstractRange({ start: start, end: end, full: (start === 1 && end === pdfInfo.pages) });
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {pdfInfo ? (
        <>
          <p className="wrapped"><strong>File Name:</strong> {pdfInfo.name}</p>
          <p className="wrapped"><strong>Page Count:</strong> {pdfInfo.pages}</p>

          {/* Selection Mode with Centered and Spaced Items */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            margin: "10px 0"
          }}>
            <label>
              <input
                type="radio"
                name="selection"
                value="all"
                checked={selectionMode === "all"}
                onChange={() => {
                  setAbstractRange({ start: 1, end: pdfInfo.pages, full: true });
                  setSelectionMode("all");
                }}
              />
              All Pages
            </label>

            <label>
              <input
                type="radio"
                name="selection"
                value="range"
                checked={selectionMode === "range"}
                onChange={() => setSelectionMode("range")}
              />
              Page Range
            </label>
          </div>

          {/* Page Range Input */}
          {selectionMode === "range" && (
            <div>
              <input
                type="number"
                min="1"
                max={pdfInfo.pages}
                value={abstractRange.start}
                onChange={(e) => {
                  const newStart = Number(e.target.value);
                  validatePageRange(newStart, abstractRange.end);
                }}
              />
              <span> - </span>
              <input
                type="number"
                min="1"
                max={pdfInfo.pages}
                value={abstractRange.end}
                onChange={(e) => {
                  const newEnd = Number(e.target.value);
                  validatePageRange(abstractRange.start, newEnd);
                }}
              />
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          )}
        </>
      ) : (
        <p>Loading PDF info...</p>
      )}
    </div>
  );
};
