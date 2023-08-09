fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
.then(response => response.json())
.then(data => {
  const bitcoinPrice = data['bitcoin']['usd'];
  const satoshisToDollars = (satoshis) => {
    const bitcoinAmount = satoshis / 100000000;
    const dollarsAmount = bitcoinAmount * bitcoinPrice;
    return dollarsAmount.toFixed(2);
  };
  const satoshisInputElement = document.getElementById('sats-input');
  const dollarsOutputElement = document.getElementById('dollars-output');
  // Listen for changes to the satoshis input and update the dollars output
  satoshisInputElement.addEventListener('input', (event) => {
    const satoshis = event.target.value;
    const dollars = satoshisToDollars(satoshis);
    dollarsOutputElement.textContent = `$${dollars}`;
  });
})
.catch(error => console.error(error));