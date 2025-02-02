// Array to store quotes
let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value.trim();
    const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (!quoteText || !quoteCategory) {
        alert("Please enter both quote and category!");
        return;
    }

    // Create a quote object
    const newQuote = { text: quoteText, category: quoteCategory };

    // Add quote to the array
    quotes.push(newQuote);

    // Save to local storage
    localStorage.setItem("quotes", JSON.stringify(quotes));

    // Clear input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    // Refresh displayed quotes
    displayQuotes();
}

// Function to display stored quotes
function displayQuotes() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = "";

    quotes.forEach((quote, index) => {
        const quoteDiv = document.createElement("div");
        quoteDiv.innerHTML = `<p>"${quote.text}" - <strong>${quote.category}</strong></p>
                              <button onclick="removeQuote(${index})">Remove</button>`;
        quoteDisplay.appendChild(quoteDiv);
    });
}

// Function to remove a quote
function removeQuote(index) {
    quotes.splice(index, 1);
    localStorage.setItem("quotes", JSON.stringify(quotes));
    displayQuotes();
}

// Function to export quotes as JSON
function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Function to import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        localStorage.setItem("quotes", JSON.stringify(quotes));
        displayQuotes();
        alert("Quotes imported successfully!");
    };
    fileReader.readAsText(event.target.files[0]);
}

// Load existing quotes when the page loads
document.addEventListener("DOMContentLoaded", displayQuotes);
