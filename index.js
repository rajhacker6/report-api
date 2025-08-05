const fetchData = require('./fetchData');
const generatePDF = require('./generatePDF');
const cron = require('node-cron');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
app.get('/generate-report', async (req, res) => {


async function generateWeeklyReport() {
  console.log('Starting weekly report generation...');


  // Step 1: Fetch data
  const data = await fetchData();
  if (!data || data.length === 0) {
    console.log('No data fetched. Skipping PDF generation.');
    return;
  }

  // Step 2: Generate filename
  const today = new Date().toISOString().split('T')[0]; 
  const fileName = `report-${today}.pdf`;

  // Step 3: Generate PDF
  const filePath = generatePDF(data, fileName);

  // Step 4: Log completion
  console.log(`Report created: ${path.resolve(filePath)}`);

  
}

cron.schedule('0 9 * * 1', () => {
  console.log('Scheduled task triggered!');
  generateWeeklyReport();

});
// Manual run
generateWeeklyReport();
});
