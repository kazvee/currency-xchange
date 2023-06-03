const axios = require('axios').default;
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(cors());

const PORT = process.env.PORT;

app.get('/currency', (req, res) => {
  const startTime = new Date().getTime(); // Start measuring execution time

  const options = {
    method: 'GET',
    url: `${process.env.ExchangeRate_API_URL}/${process.env.ExchangeRate_API_KEY}/latest/CAD`,
  };

  axios
    .request(options)
    .then(function (response) {
      const endTime = new Date().getTime(); // Stop measuring execution time
      const executionTime = endTime - startTime;

      console.log(`Execution time: ${executionTime} milliseconds ⏱️`);

      console.log(response.data);
      res.json({
        data: response.data,
        executionTime: executionTime,
      });
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}! 😃`);
});
