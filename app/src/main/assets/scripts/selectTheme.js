// Function to change the theme based on the selected option
function changeTheme() {
    console.log("changeTheme() called"); // Add this line
    var themeSelect = document.getElementById("theme-select");
    var selectedTheme = themeSelect.value;

    // Construct the theme CSS file path based on the selected theme
    var themeCSSFile = "themes/" + selectedTheme + ".css";

    // Set the theme CSS file as the stylesheet link's href
    var styleSheet = document.querySelector('link[href^="themes/"]');
    styleSheet.href = themeCSSFile;
}

// Add an event listener to the theme dropdown to change the theme on selection change
document.getElementById("theme-select").addEventListener("change", changeTheme);

// Initial theme setup when the page loads
console.log("Initial theme setup"); // Add this line
changeTheme(); // This line was missing in your previous code
