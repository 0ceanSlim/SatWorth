// currencySelection.js
document.addEventListener('DOMContentLoaded', () => {
    const currencySelect = document.getElementById('currency-select');
    const satsInputElement = document.getElementById('sats-input');

    currencySelect.addEventListener('change', () => {
        const selectedCurrency = currencySelect.value;
        updateBitcoinPrice(selectedCurrency);
        updateFiatToSatsConversion(selectedCurrency);
        updateSatsToDollarsConversion(selectedCurrency);
    });
});
