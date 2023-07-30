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

        // Load the HTML content from the "index.html" file
        val htmlContent = try {
            // Load the HTML content from the "index.html" file
            assets.open("index.html").bufferedReader().use { it.readText() }
        } catch (e: IOException) {
            e.printStackTrace()
            // If loading HTML fails, set some default content
            "<html><body><h1>Error loading HTML</h1></body></html>"
        }

        // Load the JavaScript code from the "script.js" file
        val javaScriptCode = try {
            assets.open("script.js").bufferedReader().use { it.readText() }
        } catch (e: IOException) {
            e.printStackTrace()
            // If loading JavaScript fails, set an empty script
            ""
        }

        // Load the CSS code from the "style.css" file
        val cssCode = try {
            assets.open("style.css").bufferedReader().use { it.readText() }
        } catch (e: IOException) {
            e.printStackTrace()
            // If loading CSS fails, set an empty style
            ""
        }

        // Combine the HTML, CSS, and JavaScript code
val finalHtmlContent = """
<html>
<head>
    <style type="text/css">$cssCode</style>
</head>
<body>
    $htmlContent
    <script>$javaScriptCode</script>
</body>
</html>
""".trimIndent()

// Define the base URL for resolving relative paths (e.g., image source)
        val baseUrl = "file:///android_asset/"

        webView.loadDataWithBaseURL(null, finalHtmlContent, "text/html", "UTF-8", null)
    }
}