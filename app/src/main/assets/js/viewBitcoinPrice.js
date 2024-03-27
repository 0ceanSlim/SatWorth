// bitcoinPriceTracker.js
export function updateBitcoinPrice(selectedCurrency) {
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

export function refreshBitcoinPrice(selectedCurrency) {
    updateBitcoinPrice(selectedCurrency);
    setInterval(() => updateBitcoinPrice(selectedCurrency), 300000);
}