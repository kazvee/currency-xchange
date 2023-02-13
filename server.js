const axios = require('axios').default;
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(cors());

const PORT = process.env.PORT;

app.get('/currency', (req, res) => {
  const options = {
    method: 'GET',
    url: process.env.ExchangeRate_API_URL,
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}!`);
});
