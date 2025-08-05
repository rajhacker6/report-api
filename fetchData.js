// fetchData.js
const axios = require('axios');
require('dotenv').config();

async function fetchData() {
  try {
    const response = await axios.get(process.env.API_URL);

    // You can log the result or return it
    console.log('Data fetched successfully:');
    console.log(response.data);

    return response.data; // return to use elsewhere
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return null;
  }
}

// To run this file directly
if (require.main === module) {
  fetchData();
}

module.exports = fetchData;
