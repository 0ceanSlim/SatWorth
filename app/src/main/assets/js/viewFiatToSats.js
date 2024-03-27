// fiatToSatsConverter.js
export function updateFiatToSatsConversion(selectedCurrency) {
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${selectedCurrency}`)
        .then(response => response.json())
        .then(data => {
            const bitcoinPrice = data['bitcoin'][selectedCurrency];
            const satsConversionFactor = 100000000;
            const currencyValue = 1;
            const sats = (currencyValue / bitcoinPrice) * satsConversionFactor;
            const currencyToSatsElement = document.getElementById('dollars-to-sats');
            currencyToSatsElement.textContent = `1 ${selectedCurrency.toUpperCase()} = ${sats.toFixed(0)} sats`;
        })
        .catch(error => console.error(error));
}
