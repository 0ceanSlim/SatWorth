package com.example.satworth

import android.annotation.SuppressLint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebSettings
import java.io.IOException

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private lateinit var currentThemeCSSCode: String

    @SuppressLint("SetJavaScriptEnabled")
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

        // Initialize with the default theme
        currentThemeCSSCode = loadThemeCSS("themes/Dark.css")
        loadWebViewWithTheme(currentThemeCSSCode)
    }

    // Function to load WebView with the specified CSS theme code
    private fun loadWebViewWithTheme(cssCode: String) {
        val assetManager = assets

        // Load the HTML content
        val htmlContent = try {
            assetManager.open("app.html").bufferedReader().use { it.readText() }
        } catch (e: IOException) {
            e.printStackTrace()
            "<html><body><h1>Error loading HTML</h1></body></html>"
        }

        // Load all styles from the 'styles' directory
        val styleFiles = listOf(
            "styles/settings.css",
            "styles/bitcoinPrice.css",
            "styles/exchange.css",
            "styles/fiatToSats.css",
            "styles/satsToFiat.css"
        )

        val styleContents = styleFiles.map { fileName ->
            try {
                assetManager.open(fileName).bufferedReader().use { it.readText() }
            } catch (e: IOException) {
                e.printStackTrace()
                "/* Error loading style: $fileName */"
            }
        }

        // Load the JavaScript code
        val scriptFiles = listOf(
            "scripts/selectTheme.js",
            "scripts/viewBitcoinPrice.js",
            "scripts/viewFiatToSats.js",
            "scripts/selectCurrency.js",
            "scripts/calcSatsToFiat.js"
        )

        val scriptContents = scriptFiles.map { fileName ->
            try {
                assetManager.open(fileName).bufferedReader().use { it.readText() }
            } catch (e: IOException) {
                e.printStackTrace()
                "/* Error loading script: $fileName */"
            }
        }

        val javaScriptCode = scriptContents.joinToString("\n")

        // Combine the HTML, CSS, and JavaScript code
        val finalHtmlContent = """
<html>
<head>
    <style type="text/css">
        ${styleContents.joinToString("\n")}
        $cssCode
    </style>
</head>
<body>
    $htmlContent
    <script>$javaScriptCode</script>
</body>
</html>
""".trimIndent()

        // Define the base URL for resolving relative paths (e.g., image source)
        val baseUrl = "file:///android_asset/"

        // Load the WebView with the HTML content and selected theme
        webView.loadDataWithBaseURL(null, finalHtmlContent, "text/html", "UTF-8", null)

        // Update the current theme CSS code
        currentThemeCSSCode = cssCode
    }

    // Function to load CSS content from a file
    private fun loadThemeCSS(cssFile: String): String {
        val assetManager = assets
        return try {
            assetManager.open(cssFile).bufferedReader().use { it.readText() }
        } catch (e: IOException) {
            e.printStackTrace()
            "/* Error loading $cssFile */"
        }
    }
}
