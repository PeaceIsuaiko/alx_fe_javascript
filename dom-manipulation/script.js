// Fetch Quotes from Server and Update Local Storage
async function fetchQuotesFromServer() {
  try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");

      if (!response.ok) {
          throw new Error("Failed to fetch quotes from the server");
      }

      const data = await response.json();

      // Convert the fetched data into quote objects
      const fetchedQuotes = data.slice(0, 10).map(item => ({
          text: item.title,
          category: "General"
      }));

      // Retrieve existing quotes from local storage
      let storedQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

      // Merge new quotes with existing ones
      storedQuotes = [...storedQuotes, ...fetchedQuotes];

      // Save updated quotes list to local storage
      localStorage.setItem("quotes", JSON.stringify(storedQuotes));

      console.log("Quotes fetched from server and saved:", storedQuotes);
      displayQuotes(); // Refre
