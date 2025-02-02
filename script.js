// Initial array of quote objects
const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Be yourself; everyone else is already taken.", category: "Motivation" }
];

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const quoteDisplay = document.getElementById("quoteDisplay");
  
  quoteDisplay.innerHTML = `
    <p>"${randomQuote.text}"</p>
    <p><em>Category: ${randomQuote.category}</em></p>
  `;
}

// Function to add a new quote
function addQuote() {
  // Get input values and trim any extra whitespace
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  // Validate inputs
  if (!newQuoteText || !newQuoteCategory) {
    alert("Please enter both a quote and its category.");
    return;
  }

  // Create a new quote object
  const newQuote = {
    text: newQuoteText,
    category: newQuoteCategory
  };

  // Add the new quote to the quotes array
  quotes.push(newQuote);

  // Clear input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  // Optionally, display the newly added quote or a random quote
  showRandomQuote();
}

// Attach event listener to the "Show New Quote" button on page load
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Optionally, display an initial random quote when the page loads
window.addEventListener("load", showRandomQuote);
