// currencySelection.js
document.addEventListener('DOMContentLoaded', () => {
    const currencySelect = document.getElementById('currency-select');

    currencySelect.addEventListener('change', () => {
        const selectedCurrency = currencySelect.value;
        updateBitcoinPrice(selectedCurrency); // Update Bitcoin price when currency is changed
        updateFiatToSatsConversion(selectedCurrency); // Update fiat to sats conversion when currency is changed
    });
});
