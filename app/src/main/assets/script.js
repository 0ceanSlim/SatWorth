// bitcoinPriceTracker.js
function updateBitcoinPrice(selectedCurrency) {
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${selectedCurrency}`)
        .then(response => response.json())
        .then(data => {
            const bitcoinPrice = data['bitcoin'][selectedCurrency];
            // Update the Bitcoin price on the website
            const bitcoinPriceElement = document.getElementById('bitcoin-price');

            // Format the Bitcoin price with a comma after every three digits and no decimals
            const formattedPrice = `${selectedCurrency.toUpperCase()} ` + bitcoinPrice.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

            bitcoinPriceElement.textContent = formattedPrice; // Display the formatted Bitcoin price
        })
        .catch(error => console.error(error));
}

function refreshBitcoinPrice() {
    const currencySelect = document.getElementById('currency-select');
    const selectedCurrency = currencySelect.value;

    updateBitcoinPrice(selectedCurrency); // Call the function immediately to display the price on page load
    setInterval(() => updateBitcoinPrice(selectedCurrency), 10000); // Call the function every 30 seconds
}

// Call the function to refresh the Bitcoin price
refreshBitcoinPrice();
