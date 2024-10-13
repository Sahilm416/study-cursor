import { getUser } from "@/actions/auth";
import { NextRequest, NextResponse } from "next/server";
//@ts-ignore
import PDFParser from "pdf2json";
import { textExtractor } from "../uploadthing/extra";

interface PDFPage {
  Texts: {
    R: { T: string }[];
  }[];
}

interface PDFData {
  Pages: PDFPage[];
  Meta: Record<string, unknown>;
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    // const res = await getUser();
    // if (!res.user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // console.log("API route started");
    // const { url } = await req.json();

    // if (!url) {
    //   console.log("URL is missing");
    //   return NextResponse.json({ error: "URL is required" }, { status: 400 });
    // }

    // console.log(`Fetching PDF from URL: ${url}`);
    // const response = await fetch(url);

    // if (!response.ok) {
    //   console.log(`HTTP error! status: ${response.status}`);
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    // console.log("PDF fetched successfully");
    // const arrayBuffer = await response.arrayBuffer();
    // const buffer = Buffer.from(arrayBuffer);

    // console.log("Starting PDF parsing");
    // const pdfParser = new PDFParser(null, true);

    // const pdfData: PDFData = await new Promise((resolve, reject) => {
    //   pdfParser.on("pdfParser_dataError", (errData: any) => reject(errData));
    //   pdfParser.on("pdfParser_dataReady", (pdfData: PDFData) =>
    //     resolve(pdfData)
    //   );

    //   pdfParser.parseBuffer(buffer);
    // });

    // console.log("PDF parsing completed");

    // const text = pdfData.Pages.map((page) => {
    //   return page.Texts.reduce((pageText, textItem) => {
    //     const decodedText = decodeURIComponent(textItem.R[0].T);
    //     if (pageText.endsWith(" ") || decodedText.startsWith(" ")) {
    //       return pageText + decodedText.trim();
    //     } else {
    //       return pageText + " " + decodedText.trim();
    //     }
    //   }, "").trim();
    // })
    //   .join("\n")
    //   .replace(/\n+/g, "\n")
    //   .trim();

    // return NextResponse.json({
    //   text: text.toLocaleLowerCase(),
    //   numPages: pdfData.Pages.length,
    //   info: pdfData.Meta,
    // });

    const data = await textExtractor(url);

    return NextResponse.json({
      text: data.text.toLocaleLowerCase(),
      numPages: data.numPages,
      info: data.info,
    });
  } catch (error) {
    console.error("Error in PDF processing:", error);
    return NextResponse.json(
      { error: "Failed to process PDF", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export const GET = async (req: NextRequest) => {
  return NextResponse.json({
    message: "Use POST method to extract text from PDF",
  });
};
