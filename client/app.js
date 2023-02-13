const tableBody = document.getElementById('table-body');

const getExchangeRateData = () => {
  const baseCurrency = 'CAD';
  const currenciesToCheck = ['CAD', 'USD', 'ISK', 'EUR', 'ILS'];

  fetch('http://localhost:8000/currency')
    .then((response) => response.json())
    .then((data) => {
      // Check if the "conversion_rates" object exists in the response
      if (data.hasOwnProperty('conversion_rates')) {
        // Get the list of currency codes
        const currencyCodes = Object.keys(data.conversion_rates);

        // Loop through the currenciesToCheck array
        currenciesToCheck.forEach((currency) => {
          // Check if the currency is present in the list of currency codes
          if (currencyCodes.includes(currency)) {
            console.log(
              `1 ${baseCurrency} is equal to ${data.conversion_rates[currency]} in ${currency}! 💸`
            );
          } else {
            console.error(
              `${currency} is not found in the list of currency codes! ☹️`
            );
          }
        });
      } else {
        console.error(
          'Did not find conversion_rates object in the response! ☹️'
        );
      }
    })
    .catch((error) => console.error('An error occurred! ☹️', error));
};

getExchangeRateData();
