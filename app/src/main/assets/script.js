// Fetch the Bitcoin price from the CoinGecko API
fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
    .then(response => response.json())
    .then(data => {
        const bitcoinPrice = data['bitcoin']['usd'];
        // Update the Bitcoin price on the website
        const bitcoinPriceElement = document.getElementById('bitcoin-price');

        // Format the Bitcoin price with a comma after every three digits and no decimals
        const formattedPrice = '$' + bitcoinPrice.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

        bitcoinPriceElement.textContent = formattedPrice; // Display the formatted Bitcoin price

        // Calculate dollars to sats
        const dollarsToSatsElement = document.getElementById('dollars-to-sats');
        const satsConversionFactor = 100000000; // 1 bitcoin = 100 million sats

        // Calculate how many sats you can get for 1 dollar based on the fetched Bitcoin price
        const dollars = 1;
        const sats = (1 / bitcoinPrice) * satsConversionFactor;

        dollarsToSatsElement.textContent = `$1.00 = ${sats.toFixed(0)} sats`; // Display the result
    })
    .catch(error => console.error(error));