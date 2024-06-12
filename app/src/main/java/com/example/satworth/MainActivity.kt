package com.example.satworth

import android.annotation.SuppressLint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebSettings
import java.io.IOException
import android.content.Context
import android.webkit.JavascriptInterface

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Get the WebView reference from the layout
        webView = findViewById(R.id.webView)

        // Enable JavaScript support
        val webSettings: WebSettings = webView.settings
        webSettings.javaScriptEnabled = true

        // Add JavaScript interface
        webView.addJavascriptInterface(WebAppInterface(this), "Android")

        // Clear the WebView cache (optional)
        webView.clearCache(true)

        // Load the HTML content from the "app.html" file
        val htmlContent = try {
            // Load the HTML content from the "app.html" file
            assets.open("index.html").bufferedReader().use { it.readText() }
        } catch (e: IOException) {
            e.printStackTrace()
            // If loading HTML fails, set some default content
            "<html><body><h1>Error loading HTML</h1></body></html>"
        }

        val assetManager = assets
        val scriptFiles = listOf(
            "js/main.js",
        )

        val scriptContents = scriptFiles.map { fileName ->
            try {
                assetManager.open(fileName).bufferedReader().use { it.readText() }
            } catch (e: IOException) {
                e.printStackTrace()
                "/* Error loading script: $fileName */"
            }
        }

        val cssFiles = listOf(
            "style/output.css"
        ) // List of your CSS files

        val cssCode = cssFiles.joinToString("\n") { fileName ->
            try {
                assetManager.open(fileName).bufferedReader().use { it.readText() }
            } catch (e: IOException) {
                e.printStackTrace()
                "/* Error loading $fileName */"
            }
        }

        val javaScriptCode = scriptContents.joinToString("\n")

        // Combine the HTML, CSS, and JavaScript code
        val finalHtmlContent = """
<html>
<head>
    <style type="text/css">$cssCode</style>
</head>
<body>
    $htmlContent
    <script type="module"> $javaScriptCode</script>
</body>
</html>
""".trimIndent()

        // Define the base URL for resolving relative paths (e.g., image source)
        val baseUrl = "file:///android_asset/"

        webView.loadDataWithBaseURL(null, finalHtmlContent, "text/html", "UTF-8", null)
    }
}
class WebAppInterface(private val context: Context) {

    private val sharedPreferences = context.getSharedPreferences("AppPrefs", Context.MODE_PRIVATE)

    @JavascriptInterface
    fun savePreference(key: String, value: String) {
        with(sharedPreferences.edit()) {
            putString(key, value)
            apply()
        }
    }

    @JavascriptInterface
    fun getPreference(key: String): String? {
        return sharedPreferences.getString(key, null)
    }
}