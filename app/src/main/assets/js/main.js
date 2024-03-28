//import "/style/output.css";

//import { updateFiatToSatsConversion } from "./viewFiatToSats";
//import { updateBitcoinPrice, refreshBitcoinPrice } from "./viewBitcoinPrice";
//import { updateSatsToDollarsConversion } from "./calcSatsToFiat";

function updateBitcoinPrice(selectedCurrency) {
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${selectedCurrency}`)
        .then(response => response.json())
        .then(data => {
            const bitcoinPrice = data['bitcoin'][selectedCurrency];
            const bitcoinPriceElement = document.getElementById('bitcoin-price');
            const formattedPrice = `${selectedCurrency.toUpperCase()} ` + bitcoinPrice.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
            bitcoinPriceElement.textContent = formattedPrice;
        })
        .catch(error => console.error(error));
}

updateBitcoinPrice('usd');

document.addEventListener('DOMContentLoaded', () => {
    const satsInputElement = document.getElementById('sats-input');
    const currencySelect = document.getElementById('currency-select');

    // Initially fetch Bitcoin price in USD
    updateBitcoinPrice('usd');

    satsInputElement.addEventListener('input', updateSatsToDollarsConversion);

    currencySelect.addEventListener('change', () => {
        const selectedCurrency = currencySelect.value;
        updateBitcoinPrice(selectedCurrency);
        updateFiatToSatsConversion(selectedCurrency);
        updateSatsToDollarsConversion(selectedCurrency);
    });

    refreshBitcoinPrice('usd'); // Refresh Bitcoin price in USD

});
