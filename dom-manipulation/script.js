document.addEventListener("DOMContentLoaded", () => {
  loadQuotes();
  populateCategories();
  restoreLastFilter();
  syncWithServer(); // Start server syncing
});

// Function to Fetch Quotes from Server
async function fetchServerQuotes() {
  try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
      const serverQuotes = await response.json();

      // Convert API response into our quote format
      const formattedQuotes = serverQuotes.map(q => ({
          text: q.title,
          category: q.body || "Uncategorized"
      }));

      return formattedQuotes;
  } catch (error) {
      console.error("Error fetching server quotes:", error);
      return [];
  }
}

// Function to Sync Quotes with Server
async function syncWithServer() {
  const serverQuotes = await fetchServerQuotes();
  let localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

  // Conflict Resolution: Merge Server and Local Quotes
  const mergedQuotes = [...new Set([...serverQuotes, ...localQuotes])];

  // Save merged quotes
  localStorage.setItem("quotes", JSON.stringify(mergedQuotes));

  // Show notification (if updates were made)
  if (serverQuotes.length > localQuotes.length) {
      alert("New quotes synced from the server!");
  }

  displayQuotes();
}

// Function to Upload New Quotes to Server (Simulation)
async function uploadQuoteToServer(quote) {
  try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          body: JSON.stringify({
              title: quote.text,
              body: quote.category,
              userId: 1
          }),
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
      });

      if (response.ok) {
          console.log("Quote successfully uploaded to server.");
      }
  } catch (error) {
      console.error("Error uploading quote:", error);
  }
}

// Update `addQuote` Function to Sync with Server
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
  
  // Upload to server (simulation)
  uploadQuoteToServer(newQuote);

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  populateCategories();
  displayQuotes();
}

// Call sync function every 30 seconds (to mimic real-time syncing)
setInterval(syncWithServer, 30000);
