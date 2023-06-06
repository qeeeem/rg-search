// server.js

function search() {
  var input = document.getElementById("searchInput").value.toLowerCase();
  var status = document.getElementById("status");
  var results = document.getElementById("results");
  
  status.innerHTML = "Searching...";
  results.innerHTML = "";
  
  var file = "everything.txt"; // Set your default file path here
  
  fetch(file)
    .then(response => response.text())
    .then(data => {
      var lines = data.toLowerCase().split("\n");
      
      var matches = [];
      
      // Search for matches
      for (var i = 0; i < lines.length; i++) {
        if (lines[i].includes(input)) {
          matches.push(lines[i]);
        }
      }
      
      status.innerHTML = "Search complete!";
      
      // Display the matches
      if (matches.length > 0) {
        for (var j = 0; j < matches.length; j++) {
          var listItem = document.createElement("li");
          listItem.innerHTML = matches[j];
          results.appendChild(listItem);
        }
      } else {
        results.innerHTML = "No matches found.";
      }
    })
    .catch(error => {
      status.innerHTML = "An error occurred while searching.";
      console.error(error);
    });
}

// Handle Enter key press event
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    search();
  }
});
