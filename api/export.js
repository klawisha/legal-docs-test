import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default async function handler(req, res) {
  try {
    const token = req.query.token;
    if (!token) return res.status(400).send("no token");

    const text = decodeURIComponent(Buffer.from(token, "base64").toString());

    const docDefinition = {
      content: [
        { text: "ОФИЦИАЛЬНЫЙ ДОКУМЕНТ", style: "header" },
        text
      ],
      styles: { header: { fontSize: 16, bold: true } }
    };

    const pdf = pdfMake.createPdf(docDefinition);

    pdf.getBuffer((buffer) => {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=document.pdf"
      );
      res.send(buffer);
    });
  } catch (e) {
    console.error("API export error:", e);
    res.status(500).json({ error: e.message });
  }
}
