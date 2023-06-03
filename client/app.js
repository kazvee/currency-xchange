const tableBody = document.getElementById('table-body');
const footer = document.getElementById('footer');
const startTime = performance.now(); // Start measuring execution time

const currenciesToCheck = ['USD', 'ISK', 'GBP', 'EUR', 'ILS']; // Define the currenciesToCheck array

const getExchangeRateData = () => {
  const baseCurrency = 'CAD';

  const cachedCurrencyData = localStorage.getItem('cachedCurrencyData');
  if (cachedCurrencyData) {
    const data = JSON.parse(cachedCurrencyData);
    const cachedTimestamp = data.timestamp;
    const currentTimestamp = Date.now();
    const hoursSinceLastUpdate =
      (currentTimestamp - cachedTimestamp) / (1000 * 60 * 60);

    if (hoursSinceLastUpdate < 4) {
      console.log('Using cached data since it is less than 4 hours old! 🐣');
      return Promise.resolve(data.conversion_rates || {});
    } else {
      console.log(
        'Cached data in local storage is over 4 hours old, getting fresh data via API call! ☎️'
      );
    }
  } else {
    console.log('Data is not available in local storage. ☹️');
  }

  console.log('Data is being fetched from the API! 🫡');

  return fetch('http://localhost:8000/currency')
    .then((response) => response.json())
    .then((data) => {
      data.timestamp = Date.now();
      localStorage.setItem('cachedCurrencyData', JSON.stringify(data));
      console.log('Data is cached in local storage! 💾');

      return data.conversion_rates || {};
    })
    .catch((error) => {
      console.error('An error occurred while fetching the data! ☹️', error);
      return {};
    });
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

  const promises = currenciesToCheck.map((currency, index) => {
    const emoji = emojis[index];
    const rate = rates[currency] || 0;
    const row = createTableRow('CAD', currency, rate, emoji);
    tableBody.appendChild(row);
  });

  Promise.all(promises).then(() => {
    const endTime = performance.now(); // Stop measuring execution time
    const executionTime = endTime - startTime;

    footer.textContent = `Execution time: ${executionTime.toFixed(
      2
    )} milliseconds! ⏱️`;
  });
});
