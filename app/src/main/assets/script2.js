// fiatToSatsConverter.js
function updateFiatToSatsConversion(selectedCurrency) {
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${selectedCurrency}`)
        .then(response => response.json())
        .then(data => {
            const bitcoinPrice = data['bitcoin'][selectedCurrency];
            const satsConversionFactor = 100000000; // 1 bitcoin = 100 million sats

            const currencyValue = 1;
            const sats = (currencyValue / bitcoinPrice) * satsConversionFactor;

            const currencyToSatsElement = document.getElementById('dollars-to-sats');
            currencyToSatsElement.textContent = `1 ${selectedCurrency.toUpperCase()} = ${sats.toFixed(0)} sats`; // Display the result
        })
        .catch(error => console.error(error));
}

document.addEventListener('DOMContentLoaded', () => {
    const currencySelect = document.getElementById('currency-select');
    const selectedCurrency = currencySelect.value;

    updateFiatToSatsConversion(selectedCurrency); // Call the function on page load

    currencySelect.addEventListener('change', () => {
        const selectedCurrency = currencySelect.value;
        updateFiatToSatsConversion(selectedCurrency);
    });
});
