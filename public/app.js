const tableBody = document.getElementById('table-body');

const getExchangeRateData = () => {
  const baseCurrency = 'CAD';
  const currenciesToCheck = ['CAD', 'USD', 'ISK', 'GBP', 'EUR', 'ILS'];

  const cachedCurrencyData = localStorage.getItem('cachedCurrencyData');
  if (cachedCurrencyData) {
    const data = JSON.parse(cachedCurrencyData);

    console.log('Retrieving data from local storage! 💾', data);

    let CADcurrentRate = 0;
    let USDcurrentRate = 0;
    let ISKcurrentRate = 0;
    let GBPcurrentRate = 0;
    let EURcurrentRate = 0;
    let ILScurrentRate = 0;

    CADcurrentRate = data.conversion_rates['CAD'] || CADcurrentRate;
    USDcurrentRate = data.conversion_rates['USD'] || USDcurrentRate;
    ISKcurrentRate = data.conversion_rates['ISK'] || ISKcurrentRate;
    GBPcurrentRate = data.conversion_rates['GBP'] || GBPcurrentRate;
    EURcurrentRate = data.conversion_rates['EUR'] || EURcurrentRate;
    ILScurrentRate = data.conversion_rates['ILS'] || ILScurrentRate;

    const cachedTimestamp = data.timestamp;
    const currentTimestamp = Date.now();

    const hoursSinceLastUpdate =
      (currentTimestamp - cachedTimestamp) / (1000 * 60 * 60);

    if (hoursSinceLastUpdate < 4) {
      console.log('Using cached data, since it is less than 4 hours old! 🐣');
      return Promise.resolve({
        CADcurrentRate,
        USDcurrentRate,
        ISKcurrentRate,
        GBPcurrentRate,
        EURcurrentRate,
        ILScurrentRate,
      });
    } else {
      console.log(
        'Cached data in local storage is over 4 hours old, getting fresh data via API call! ☎️'
      );
    }
  } else {
    console.log('Data is not available in local storage. ☹️');
  }

  console.log('Data is being fetched from the API! 🫡');

  return fetch('currency-xchange-demo.vercel.app/currency')
    .then((response) => response.json())
    .then((data) => {
      data.timestamp = Date.now();
      localStorage.setItem('cachedCurrencyData', JSON.stringify(data));
      console.log('Data is cached in local storage! 💾');

      let CADcurrentRate = 0;
      let USDcurrentRate = 0;
      let ISKcurrentRate = 0;
      let GBPcurrentRate = 0;
      let EURcurrentRate = 0;
      let ILScurrentRate = 0;

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

        CADcurrentRate = data.conversion_rates['CAD'] || CADcurrentRate;
        USDcurrentRate = data.conversion_rates['USD'] || USDcurrentRate;
        ISKcurrentRate = data.conversion_rates['ISK'] || ISKcurrentRate;
        GBPcurrentRate = data.conversion_rates['GBP'] || GBPcurrentRate;
        EURcurrentRate = data.conversion_rates['EUR'] || EURcurrentRate;
        ILScurrentRate = data.conversion_rates['ILS'] || ILScurrentRate;

        return {
          CADcurrentRate,
          USDcurrentRate,
          ISKcurrentRate,
          GBPcurrentRate,
          EURcurrentRate,
          ILScurrentRate,
        };
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

  const titleRow = document.createElement('tr');
  const titleIcon = document.createElement('td');
  const title1 = document.createElement('td');
  const title2 = document.createElement('td');
  const title3 = document.createElement('td');

  titleRow.append(titleIcon, title1, title2, title3);

  tableBody.append(titleRow);

  const usdRow = document.createElement('tr');
  const usdIcon = document.createElement('td');
  const usdFrom = document.createElement('td');
  const usdTo = document.createElement('td');
  const usdRate = document.createElement('td');

  usdIcon.textContent = '';
  usdFrom.textContent = 'CAD 1';
  usdTo.textContent = emojis[0];
  usdRate.textContent = `USD ${rates.USDcurrentRate}`;

  usdRow.append(usdIcon, usdFrom, usdTo, usdRate);

  tableBody.append(usdRow);

  const iskRow = document.createElement('tr');
  const iskIcon = document.createElement('td');
  const iskFrom = document.createElement('td');
  const iskTo = document.createElement('td');
  const iskRate = document.createElement('td');

  iskIcon.textContent = '';
  iskFrom.textContent = 'CAD 1';
  iskTo.textContent = emojis[1];
  iskRate.textContent = `ISK ${rates.ISKcurrentRate}`;

  iskRow.append(iskIcon, iskFrom, iskTo, iskRate);

  tableBody.append(iskRow);

  const gbpRow = document.createElement('tr');
  const gbpIcon = document.createElement('td');
  const gbpFrom = document.createElement('td');
  const gbpTo = document.createElement('td');
  const gbpRate = document.createElement('td');

  gbpIcon.textContent = '';
  gbpFrom.textContent = 'CAD 1';
  gbpTo.textContent = emojis[2];
  gbpRate.textContent = `GBP ${rates.GBPcurrentRate}`;

  gbpRow.append(gbpIcon, gbpFrom, gbpTo, gbpRate);

  tableBody.append(gbpRow);

  const eurRow = document.createElement('tr');
  const eurIcon = document.createElement('td');
  const eurFrom = document.createElement('td');
  const eurTo = document.createElement('td');
  const eurRate = document.createElement('td');

  eurIcon.textContent = '';
  eurFrom.textContent = 'CAD 1';
  eurTo.textContent = emojis[3];
  eurRate.textContent = `EUR ${rates.EURcurrentRate}`;

  eurRow.append(eurIcon, eurFrom, eurTo, eurRate);

  tableBody.append(eurRow);

  const ilsRow = document.createElement('tr');
  const ilsIcon = document.createElement('td');
  const ilsFrom = document.createElement('td');
  const ilsTo = document.createElement('td');
  const ilsRate = document.createElement('td');

  ilsIcon.textContent = '';
  ilsFrom.textContent = 'CAD 1';
  ilsTo.textContent = emojis[4];
  ilsRate.textContent = `ILS ${rates.ILScurrentRate}`;

  ilsRow.append(ilsIcon, ilsFrom, ilsTo, ilsRate);

  tableBody.append(ilsRow);
});
