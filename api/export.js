import PDFDocument from "pdfkit";
import { Buffer } from "buffer";

export default async function handler(req, res) {
  try {
    const token = req.query.token;
    if (!token) return res.status(400).send("no token");

    const text = decodeURIComponent(Buffer.from(token, "base64").toString());

    const doc = new PDFDocument();
    const buffers = [];

    doc.on("data", (chunk) => buffers.push(chunk));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=document.pdf"
      );
      res.send(pdfData);
    });

    doc.fontSize(20).text("ОФИЦИАЛЬНЫЙ ДОКУМЕНТ", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(text);

    doc.end();
  } catch (e) {
    console.error("PDF generation error:", e);
    res.status(500).json({ error: e.message });
  }
}
