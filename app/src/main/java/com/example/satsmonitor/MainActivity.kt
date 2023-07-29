package com.example.satsmonitor

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebSettings

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Get the WebView reference from the layout
        webView = findViewById(R.id.webView)

        // Enable JavaScript support
        val webSettings: WebSettings = webView.settings
        webSettings.javaScriptEnabled = true

        // Clear the WebView cache (optional)
        webView.clearCache(true)

        // Load the HTML content with the embedded script and CSS
        val htmlContent = """<!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <style>
            /* CSS styles for the Bitcoin Price Tracker */
            body {
                margin: 0;
	            padding: 0;
	            background: #252525;
	            color: #ffffff;
	            font-family: monospace, Arial;
	            font-size: 12px;
	            font-feature-settings: normal;
	            overflow-x: hidden;
	            text-align: center;
            }
            .bitcointodollars {
                width: auto;
                margin-left: 20px;
                margin-right: 20px;
                margin-top: 20px;
                background-color: #252525;
                border: 1px solid #ccc;
                border-radius: 8px;
                padding: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
	            color: #ff7500;
            }
            #bitcoin-price {
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                margin: 10px;
            }
        </style>
    </head>
    <body>
        <div class="bitcointodollars">
            <h1>Bitcoin Price Tracker</h1>
            <div id="bitcoin-price"></div>
        <script>
            // Fetch the Bitcoin price from the CoinGecko API
            fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
                .then(response => response.json())
                .then(data => {
                    const bitcoinPrice = data['bitcoin']['usd'];
                    // Update the Bitcoin price on the website
                    const bitcoinPriceElement = document.getElementById('bitcoin-price');
                    bitcoinPriceElement.textContent = '1 BTC = $' + bitcoinPrice.toFixed(2); // Display the Bitcoin price
                })
                .catch(error => console.error(error));
        </script>
        </div>
    </body>
    </html>"""

        webView.loadDataWithBaseURL(null, htmlContent, "text/html", "UTF-8", null)
    }


}
