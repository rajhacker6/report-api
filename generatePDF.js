// generatePDF.js
const fs = require('fs');
const PDFDocument = require('pdfkit');


function generatePDF(data, filename) {
  const outputDir = './output';
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  const doc = new PDFDocument();
  const filePath = `${outputDir}/${filename}`;

  doc.pipe(fs.createWriteStream(filePath));

  // === PDF Header ===
  doc.fontSize(20).text(' Weekly Report', { underline: true });
  doc.moveDown();
  doc.fontSize(12).text(`Date: ${new Date().toLocaleString()}`);
  doc.moveDown();

  // === PDF Content ===
  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      doc.fontSize(12).text(`${index + 1}. ${JSON.stringify(item, null, 2)}`);
      doc.moveDown();
    });
  } else {
    doc.fontSize(12).text(JSON.stringify(data, null, 2));
  }

  // === End PDF ===
  doc.end();

  console.log(`PDF generated at: ${filePath}`);
  return filePath;
}

// Example usage
// generatePDF([{name: "Test Task", status: "Done"}], 'test-report.pdf');

module.exports = generatePDF;
