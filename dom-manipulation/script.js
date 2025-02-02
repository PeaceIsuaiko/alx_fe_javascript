// Load quotes from local storage or initialize an empty array
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" }
];

// Display a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    document.getElementById("quoteDisplay").textContent = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[randomIndex];

  // Display the selected quote
  document.getElementById("quoteDisplay").textContent = `"${selectedQuote.text}" - (${selectedQuote.category})`;

  // Save the last viewed quote in session storage
  sessionStorage.setItem("lastQuote", JSON.stringify(selectedQuote));
}

// Add a new quote
function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value.trim();
  const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (!quoteText || !quoteCategory) {
    alert("Please enter both a quote and a category!");
    return;
  }

  // Create a new quote object
  const newQuote = { text: quoteText, category: quoteCategory };
  
  // Add to quotes array and update local storage
  quotes.push(newQuote);
  localStorage.setItem("quotes", JSON.stringify(quotes));

  // Clear input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  // Refresh displayed quote
  showRandomQuote();
}

// Export quotes as a JSON file
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

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);

      // Ensure the imported file contains valid quotes
      if (Array.isArray(importedQuotes) && importedQuotes.every(q => q.text && q.category)) {
        quotes.push(...importedQuotes);
        localStorage.setItem("quotes", JSON.stringify(quotes));
        alert("Quotes imported successfully!");
        showRandomQuote(); // Refresh displayed quote
      } else {
        alert("Invalid JSON format!");
      }
    } catch (error) {
      alert("Error reading file. Please select a valid JSON file.");
    }
  };

  fileReader.readAsText(event.target.files[0]);
}

// Load last viewed quote from session storage
function loadLastViewedQuote() {
  const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
  if (lastQuote) {
    document.getElementById("quoteDisplay").textContent = `"${lastQuote.text}" - (${lastQuote.category})`;
  } else {
    showRandomQuote();
  }
}

// Event Listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("addQuote").addEventListener("click", addQuote);
document.getElementById("exportQuotes").addEventListener("click", exportQuotes);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);

// Load last viewed quote or show a random one
loadLastViewedQuote();
