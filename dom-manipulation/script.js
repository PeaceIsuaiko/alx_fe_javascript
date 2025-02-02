// Fetch Quotes from Server
async function fetchQuotesFromServer() {
  try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
      const serverQuotes = await response.json();

      // Convert API response into our quote format
      return serverQuotes.map(q => ({
          text: q.title,
          category: q.body || "Uncategorized"
      }));
  } catch (error) {
      console.error("Error fetching quotes from server:", error);
      return [];
  }
}

// Function to Sync Local Quotes with Server
async function syncWithServer() {
  const serverQuotes = await fetchQuotesFromServer();
  let localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

  // Merge server and local quotes, avoiding duplicates
  const mergedQuotes = [...new Set([...serverQuotes, ...localQuotes])];

  // Save merged quotes
  localStorage.setItem("quotes", JSON.stringify(mergedQuotes));

  // Notify user if new quotes are synced
  if (serverQuotes.length > localQuotes.length) {
      alert("New quotes synced from the server!");
  }

  displayQuotes();
}

// Call `syncWithServer` every 30 seconds
setInterval(syncWithServer, 30000);
