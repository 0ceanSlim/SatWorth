package com.example.satsmonitor

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebSettings
import java.io.IOException

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

        // Load the HTML content from the "bitcoin_price_tracker.html" file
        val htmlContent = try {
            assets.open("index.html").bufferedReader().use { it.readText() }
        } catch (e: IOException) {
            e.printStackTrace()
            // If loading HTML fails, set some default content
            "<html><body><h1>Error loading HTML</h1></body></html>"
        }

        // Load the JavaScript code from the "bitcoin_price_tracker.js" file
        val javaScriptCode = try {
            assets.open("script.js").bufferedReader().use { it.readText() }
        } catch (e: IOException) {
            e.printStackTrace()
            // If loading JavaScript fails, set an empty script
            ""
        }

        // Inject the JavaScript code into the HTML content
        val finalHtmlContent = "$htmlContent<script>$javaScriptCode</script>"

        webView.loadDataWithBaseURL(null, finalHtmlContent, "text/html", "UTF-8", null)
    }
}
