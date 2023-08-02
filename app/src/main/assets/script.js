// Function to fetch and update the Bitcoin price
function updateBitcoinPrice() {
    const currencySelect = document.getElementById('currency-select');
    const selectedCurrency = currencySelect.value;

    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${selectedCurrency}`)
        .then(response => response.json())
        .then(data => {
            const bitcoinPrice = data['bitcoin'][selectedCurrency];
            // Update the Bitcoin price on the website
            const bitcoinPriceElement = document.getElementById('bitcoin-price');

            // Format the Bitcoin price with a comma after every three digits and no decimals
            const formattedPrice = `${selectedCurrency.toUpperCase()} ` + bitcoinPrice.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

            bitcoinPriceElement.textContent = formattedPrice; // Display the formatted Bitcoin price

            // Calculate currency to sats
            const currencyToSatsElement = document.getElementById('dollars-to-sats');
            const satsConversionFactor = 100000000; // 1 bitcoin = 100 million sats

            // Calculate how many sats you can get for 1 unit of the selected currency based on the fetched Bitcoin price
            const currencyValue = 1;
            const sats = (currencyValue / bitcoinPrice) * satsConversionFactor;

            currencyToSatsElement.textContent = `1 ${selectedCurrency.toUpperCase()} = ${sats.toFixed(0)} sats`; // Display the result
        })
        .catch(error => console.error(error));
}

// Function to refresh the Bitcoin price every 30 seconds
function refreshBitcoinPrice() {
    updateBitcoinPrice(); // Call the function immediately to display the price on page load
    setInterval(updateBitcoinPrice, 5000); // Call the function every 5 seconds (5,000 milliseconds)
}

// Call the function to refresh the Bitcoin price
refreshBitcoinPrice();
