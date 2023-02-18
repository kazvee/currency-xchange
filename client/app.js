const tableBody = document.getElementById('table-body');

const getExchangeRateData = () => {
  const baseCurrency = 'CAD';
  const currenciesToCheck = ['CAD', 'USD', 'ISK', 'EUR', 'ILS'];

  return fetch('http://localhost:8000/currency')
    .then((response) => response.json())
    .then((data) => {
      // Check if the conversion_rates object exists in the response
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

      CADcurrentRate = data.conversion_rates['CAD'];
      USDcurrentRate = data.conversion_rates['USD'];
      ISKcurrentRate = data.conversion_rates['ISK'];
      EURcurrentRate = data.conversion_rates['EUR'];
      ILScurrentRate = data.conversion_rates['ILS'];

      return {
        CADcurrentRate,
        USDcurrentRate,
        ISKcurrentRate,
        EURcurrentRate,
        ILScurrentRate,
      };
    })
    .catch((error) => console.error('An error occurred! ☹️', error));
};

getExchangeRateData().then((rates) => {
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
  usdTo.textContent = '🧮';
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
  iskTo.textContent = '💱';
  iskRate.textContent = `ISK ${rates.ISKcurrentRate}`;

  iskRow.append(iskIcon, iskFrom, iskTo, iskRate);

  tableBody.append(iskRow);

  const eurRow = document.createElement('tr');
  const eurIcon = document.createElement('td');
  const eurFrom = document.createElement('td');
  const eurTo = document.createElement('td');
  const eurRate = document.createElement('td');

  eurIcon.textContent = '';
  eurFrom.textContent = 'CAD 1';
  eurTo.textContent = '💸';
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
  ilsTo.textContent = '🟰';
  ilsRate.textContent = `ILS ${rates.ILScurrentRate}`;

  ilsRow.append(ilsIcon, ilsFrom, ilsTo, ilsRate);

  tableBody.append(ilsRow);
});
