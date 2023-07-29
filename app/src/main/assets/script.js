// Fetch the Bitcoin price from the CoinGecko API
fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
    .then(response => response.json())
    .then(data => {
        const bitcoinPrice = data['bitcoin']['usd'];
        // Update the Bitcoin price on the website
        const bitcoinPriceElement = document.getElementById('bitcoin-price');
        bitcoinPriceElement.textContent = '1 BTC = $' + bitcoinPrice.toFixed(2); // Display the Bitcoin price
    })
    .catch(error => console.error(error));
