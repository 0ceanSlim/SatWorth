// satsToDollarsCalc.js
function updateSatsToDollarsConversion() {
    const satsInputElement = document.getElementById('sats-input');
    const dollarsOutputElement = document.getElementById('dollars-output');

    const satsValue = parseFloat(satsInputElement.value);

    if (!isNaN(satsValue)) {
        const currencySelect = document.getElementById('currency-select');
        const selectedCurrency = currencySelect.value;

        fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${selectedCurrency}`)
            .then(response => response.json())
            .then(data => {
                const bitcoinPrice = data['bitcoin'][selectedCurrency];
                const satsConversionFactor = 100000000; // 1 bitcoin = 100 million sats

                const dollarsValue = (satsValue / satsConversionFactor) * bitcoinPrice;

                dollarsOutputElement.textContent = `${dollarsValue.toFixed(2)} ${selectedCurrency.toUpperCase()}`;
            })
            .catch(error => console.error(error));
    } else {
        dollarsOutputElement.textContent = 'Invalid input';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const satsInputElement = document.getElementById('sats-input');

    satsInputElement.addEventListener('input', updateSatsToDollarsConversion);
});
