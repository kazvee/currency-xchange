const tableBody = document.getElementById('table-body');
const footer = document.getElementById('footer');
const startTime = performance.now(); // Start measuring execution time

const getExchangeRateData = () => {
  const baseCurrency = 'CAD';
  const currenciesToCheck = ['CAD', 'USD', 'ISK', 'GBP', 'EUR', 'ILS'];

  const cachedCurrencyData = localStorage.getItem('cachedCurrencyData');
  if (cachedCurrencyData) {
    const data = JSON.parse(cachedCurrencyData);

    console.log('Retrieving data from local storage! 💾', data);

    let rates = {
      CADcurrentRate: 0,
      USDcurrentRate: 0,
      ISKcurrentRate: 0,
      GBPcurrentRate: 0,
      EURcurrentRate: 0,
      ILScurrentRate: 0,
    };

    rates.CADcurrentRate = data.conversion_rates?.CAD || rates.CADcurrentRate;
    rates.USDcurrentRate = data.conversion_rates?.USD || rates.USDcurrentRate;
    rates.ISKcurrentRate = data.conversion_rates?.ISK || rates.ISKcurrentRate;
    rates.GBPcurrentRate = data.conversion_rates?.GBP || rates.GBPcurrentRate;
    rates.EURcurrentRate = data.conversion_rates?.EUR || rates.EURcurrentRate;
    rates.ILScurrentRate = data.conversion_rates?.ILS || rates.ILScurrentRate;

    const cachedTimestamp = data.timestamp;
    const currentTimestamp = Date.now();

    const hoursSinceLastUpdate =
      (currentTimestamp - cachedTimestamp) / (1000 * 60 * 60);

    if (hoursSinceLastUpdate < 4) {
      console.log('Using cached data, since it is less than 4 hours old! 🐣');
      return Promise.resolve(rates);
    } else {
      console.log(
        'Cached data in local storage is over 4 hours old, getting fresh data via API call! ☎️'
      );
    }
  } else {
    console.log('Data is not available in local storage. ☹️');
  }

  console.log('Data is being fetched from the API! 🫡');

  return fetch(`http://localhost:8000/currency`)
    .then((response) => response.json())
    .then((data) => {
      data.timestamp = Date.now();
      localStorage.setItem('cachedCurrencyData', JSON.stringify(data));
      console.log('Data is cached in local storage! 💾');

      let rates = {
        CADcurrentRate: 0,
        USDcurrentRate: 0,
        ISKcurrentRate: 0,
        GBPcurrentRate: 0,
        EURcurrentRate: 0,
        ILScurrentRate: 0,
      };

      if (data.hasOwnProperty('conversion_rates')) {
        const currencyCodes = Object.keys(data.conversion_rates);

        currenciesToCheck.forEach((currency) => {
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

        rates.CADcurrentRate =
          data.conversion_rates?.CAD || rates.CADcurrentRate;
        rates.USDcurrentRate =
          data.conversion_rates?.USD || rates.USDcurrentRate;
        rates.ISKcurrentRate =
          data.conversion_rates?.ISK || rates.ISKcurrentRate;
        rates.GBPcurrentRate =
          data.conversion_rates?.GBP || rates.GBPcurrentRate;
        rates.EURcurrentRate =
          data.conversion_rates?.EUR || rates.EURcurrentRate;
        rates.ILScurrentRate =
          data.conversion_rates?.ILS || rates.ILScurrentRate;

        return rates;
      }
    })
    .catch((error) => console.error('An error occurred! ☹️', error));
};

getExchangeRateData().then((rates) => {
  const emojis = ['💰', '💱', '🧮', '💸', '🟰'];
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  shuffle(emojis);

  const createTableRow = (fromCurrency, toCurrency, rate, emoji) => {
    const row = document.createElement('tr');
    const iconCell = document.createElement('td');
    const fromCell = document.createElement('td');
    const emojiCell = document.createElement('td');
    const rateCell = document.createElement('td');

    iconCell.textContent = '';
    fromCell.textContent = `${fromCurrency} 1`;
    emojiCell.textContent = emoji;
    rateCell.textContent = `${toCurrency} ${rate}`;

    row.appendChild(iconCell);
    row.appendChild(fromCell);
    row.appendChild(emojiCell);
    row.appendChild(rateCell);

    return row;
  };

  const tableRows = [
    createTableRow('CAD', 'USD', rates.USDcurrentRate, emojis[0]),
    createTableRow('CAD', 'ISK', rates.ISKcurrentRate, emojis[1]),
    createTableRow('CAD', 'GBP', rates.GBPcurrentRate, emojis[2]),
    createTableRow('CAD', 'EUR', rates.EURcurrentRate, emojis[3]),
    createTableRow('CAD', 'ILS', rates.ILScurrentRate, emojis[4]),
  ];

  tableRows.forEach((row) => {
    tableBody.appendChild(row);
  });

  const endTime = performance.now(); // Stop measuring execution time
  const executionTime = endTime - startTime;

  footer.textContent = `Execution time: ${executionTime.toFixed(
    2
  )} milliseconds! ⏱️`;
});
