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

function handleThemeChange() {
    var selectedTheme = document.getElementById("theme-select").value;
    document.documentElement.setAttribute("data-theme", selectedTheme);
    savePreference("theme", selectedTheme);
  }

function handleCurrencyChange() {
    var selectedCurrency = document.getElementById("currency-select").value;
    savePreference("currency", selectedCurrency);
}

function savePreference(key, value) {
    if (typeof Android !== 'undefined' && Android !== null) {
        Android.savePreference(key, value);
    }
}

  // Event listener for theme select change
document.getElementById("theme-select").addEventListener("change", handleThemeChange);
document.getElementById("currency-select").addEventListener("change", handleCurrencyChange);


//function refreshBitcoinPrice(selectedCurrency) {
//    updateBitcoinPrice(selectedCurrency);
//    setInterval(() => updateBitcoinPrice(selectedCurrency), 300000);
//}

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
        dollarsOutputElement.textContent = '';
    }
}

function updateFiatToSatsConversion(selectedCurrency) {
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

document.addEventListener('DOMContentLoaded', () => {
    const satsInputElement = document.getElementById('sats-input');
    const currencySelect = document.getElementById('currency-select');
    const selectedCurrency = currencySelect.value;
    // Initially fetch Bitcoin price in USD
    updateBitcoinPrice(selectedCurrency);
    updateFiatToSatsConversion(selectedCurrency)

    satsInputElement.addEventListener('input', updateSatsToDollarsConversion);

    currencySelect.addEventListener('change', () => {
        const selectedCurrency = currencySelect.value;
        updateBitcoinPrice(selectedCurrency);
        updateFiatToSatsConversion(selectedCurrency);
        updateSatsToDollarsConversion(selectedCurrency);
        updateFiatToSatsConversion(selectedCurrency)
    });

    const savedTheme = (typeof Android !== 'undefined' && Android !== null) ? Android.getPreference("theme") : null;
    if (savedTheme) {
        document.getElementById("theme-select").value = savedTheme;
        document.documentElement.setAttribute("data-theme", savedTheme);
    }

    const savedCurrency = (typeof Android !== 'undefined' && Android !== null) ? Android.getPreference("currency") : null;
    if (savedCurrency) {
        document.getElementById("currency-select").value = savedCurrency;
        updateBitcoinPrice(savedCurrency);
        updateFiatToSatsConversion(savedCurrency);
        updateSatsToDollarsConversion(savedCurrency);
    }
});


