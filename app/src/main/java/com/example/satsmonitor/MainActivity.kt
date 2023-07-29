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
                font-family: Arial, sans-serif;
                margin: 20px;
            }
            .bitcointodollars {
                background-color: #f5f5f5;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
            h1 {
                color: #333;
            }
            #bitcoin-price {
                font-size: 24px;
                font-weight: bold;
                color: #0066cc;
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <div class="bitcointodollars">
            <h1>Bitcoin Price Tracker.</h1>
            <div id="bitcoin-price"></div>
        <script>
            // Fetch the Bitcoin price from the CoinGecko API
            fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
                .then(response => response.json())
                .then(data => {
                    const bitcoinPrice = data['bitcoin']['usd'];
                    // Update the Bitcoin price on the website
                    const bitcoinPriceElement = document.getElementById('bitcoin-price');
                    bitcoinPriceElement.textContent = '1 Bitcoin = $' + bitcoinPrice.toFixed(2); // Display the Bitcoin price
                })
                .catch(error => console.error(error));
        </script>
        </div>
    </body>
    </html>"""

        webView.loadDataWithBaseURL(null, htmlContent, "text/html", "UTF-8", null)
    }


}
