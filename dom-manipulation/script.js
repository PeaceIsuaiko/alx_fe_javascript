document.addEventListener("DOMContentLoaded", () => {
  loadQuotes();
  populateCategories();
  restoreLastFilter();
});

const quotes = JSON.parse(localStorage.getItem("quotes")) || [];

// Function to Add a New Quote
function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value.trim();
  const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (!quoteText || !quoteCategory) {
      alert("Please enter both quote text and category.");
      return;
  }

  const newQuote = { text: quoteText, category: quoteCategory };
  quotes.push(newQuote);
  localStorage.setItem("quotes", JSON.stringify(quotes));

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  populateCategories();
  displayQuotes();
}

// Function to Display Quotes Based on Selected Category
function displayQuotes() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";

  const selectedCategory = document.getElementById("categoryFilter").value;
  const filteredQuotes = selectedCategory === "all" 
      ? quotes 
      : quotes.filter(quote => quote.category === selectedCategory);

  filteredQuotes.forEach((quote, index) => {
      const quoteDiv = document.createElement("div");
      quoteDiv.classList.add("quote");
      quoteDiv.innerHTML = `<p>"${quote.text}"</p><p>- ${quote.category}</p> 
                            <button onclick="removeQuote(${index})">Remove</button>`;
      quoteDisplay.appendChild(quoteDiv);
  });
}

// Function to Remove a Quote
function removeQuote(index) {
  quotes.splice(index, 1);
  localStorage.setItem("quotes", JSON.stringify(quotes));
  displayQuotes();
}

// Function to Populate Categories Dynamically
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  const categories = [...new Set(quotes.map(quote => quote.category))];

  categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
  });
}

// Function to Filter Quotes Based on Selected Category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory);
  displayQuotes();
}

// Restore Last Selected Filter from Local Storage
function restoreLastFilter() {
  const lastFilter = localStorage.getItem("selectedCategory");
  if (lastFilter) {
      document.getElementById("categoryFilter").value = lastFilter;
  }
}

// Function to Show a Random Quote
function showRandomQuote() {
  if (quotes.length === 0) {
      alert("No quotes available. Add some first!");
      return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  document.getElementById("quoteDisplay").innerHTML = `
      <div class="quote">
          <p>"${randomQuote.text}"</p>
          <p>- ${randomQuote.category}</p>
      </div>
  `;
}

// Event Listener for "Show New Quote" Button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Function to Import Quotes from JSON File
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      localStorage.setItem("quotes", JSON.stringify(quotes));
      populateCategories();
      displayQuotes();
      alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

// Function to Export Quotes to JSON File
function exportQuotes() {
  const quotesJSON = JSON.stringify(quotes, null, 2);
  const blob = new Blob([quotesJSON], { type: "application/json" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "quotes.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Load Quotes on Page Load
function loadQuotes() {
  displayQuotes();
}
