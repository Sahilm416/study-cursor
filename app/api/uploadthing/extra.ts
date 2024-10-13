import "server-only";
//@ts-ignore
import PDFParser from "pdf2json";

interface PDFPage {
  Texts: {
    R: { T: string }[];
  }[];
}

interface PDFData {
  Pages: PDFPage[];
  Meta: Record<string, unknown>;
}

export async function textExtractor(url: string) {
  console.log(`Fetching PDF from URL: ${url}`);
  const response = await fetch(url);

  if (!response.ok) {
    console.log(`HTTP error! status: ${response.status}`);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  console.log("PDF fetched successfully");
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  console.log("Starting PDF parsing");
  const pdfParser = new PDFParser(null, true);

  const pdfData: PDFData = await new Promise((resolve, reject) => {
    pdfParser.on("pdfParser_dataError", (errData: any) => reject(errData));
    pdfParser.on("pdfParser_dataReady", (pdfData: PDFData) => resolve(pdfData));

    pdfParser.parseBuffer(buffer);
  });

  console.log("PDF parsing completed");

  const text = pdfData.Pages.map((page) => {
    return page.Texts.reduce((pageText, textItem) => {
      const decodedText = decodeURIComponent(textItem.R[0].T);
      if (pageText.endsWith(" ") || decodedText.startsWith(" ")) {
        return pageText + decodedText.trim();
      } else {
        return pageText + " " + decodedText.trim();
      }
    }, "").trim();
  })
    .join("\n")
    .replace(/\n+/g, "\n")
    .trim();

  return {
    text: text.toLocaleLowerCase(),
    numPages: pdfData.Pages.length,
    info: pdfData.Meta,
  };
}

export function createSlices(
  text: string,
  maxLength: number = 3000,
  chunkSize: number = 3000,
  overlap: number = 100
): string[] {
  if (text.length <= maxLength) {
    return [text];
  }

  const slices: string[] = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    slices.push(text.slice(start, end));

    // Move start forward with overlap
    start += chunkSize - overlap;
  }

  return slices;
}
