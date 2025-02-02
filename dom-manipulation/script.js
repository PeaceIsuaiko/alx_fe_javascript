// Function to Post a New Quote to the Server
async function postQuoteToServer(quoteText, category) {
  try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              title: quoteText,
              body: category
          })
      });

      if (!response.ok) {
          throw new Error("Failed to post quote to server");
      }

      const newQuote = await response.json();
      console.log("Quote successfully posted:", newQuote);
      return newQuote;
  } catch (error) {
      console.error("Error posting quote:", error);
      return null;
  }
}

// Modify addQuote function to sync with the server
async function addQuote() {
  let quoteText = document.getElementById("newQuoteText").value.trim();
  let category = document.getElementById("newQuoteCategory").value.trim() || "Uncategorized";

  if (quoteText === "") {
      alert("Please enter a quote.");
      return;
  }

  const newQuote = {
      text: quoteText,
      category: category
  };

  // Save to local storage
  let quotes = JSON.parse(localStorage.getItem("quotes")) || [];
  quotes.push(newQuote);
  localStorage.setItem("quotes", JSON.stringify(quotes));

  // Post to the server
  await postQuoteToServer(quoteText, category);

  // Clear input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  // Refresh displayed quotes
  displayQuotes();
}

// Event Listener for Add Quote Button
document.querySelector("button[onclick='addQuote()']").addEventListener("click", addQuote);
