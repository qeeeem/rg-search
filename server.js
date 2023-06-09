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
        var line = lines[i].replace(/\./g, " "); // Replace "." with blank spaces for comparison
        if (line.includes(input)) {
          matches.push(lines[i]);
        }
      }

      status.innerHTML = "Search complete!";

      // Change cursor back to the default
      document.body.style.cursor = "default";

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

      // Change cursor back to the default
      document.body.style.cursor = "default";
    });
}

// Handle Enter key press event
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission
    search();
  }
});

// Change cursor when hovering over results area
var results = document.getElementById("results");
results.addEventListener("mouseover", function() {
  document.body.style.cursor = "text";
});

results.addEventListener("mouseout", function() {
  document.body.style.cursor = "text";
});

// Sort function for time (oldest to newest)
function sortByTimeAsc(matches) {
  return matches.sort(function(a, b) {
    var timeA = extractTime(a.innerHTML);
    var timeB = extractTime(b.innerHTML);
    return new Date(timeA) - new Date(timeB);
  });
}

// Sort function for time (newest to oldest)
function sortByTimeDesc(matches) {
  return matches.sort(function(a, b) {
    var timeA = extractTime(a.innerHTML);
    var timeB = extractTime(b.innerHTML);
    return new Date(timeB) - new Date(timeA);
  });
}

// Extract time from the result line (assuming format: "YYYY.MM.DD")
function extractTime(line) {
  var regex = /(\d{4}\.\d{2}\.\d{2})/;
  var match = line.match(regex);
  if (match && match.length > 0) {
    return match[0];
  }
  return null;
}

// Handle sort method selection
function handleSortMethod() {
  var sortMethod = document.getElementById("sortMethod").value;
  var results = document.getElementById("results");
  var status = document.getElementById("status");

  // Update status
  status.innerHTML = "Sorting...";

  // Get the result list items
  var matches = Array.from(results.getElementsByTagName("li"));

  // Perform the sorting based on the selected method
  switch (sortMethod) {
    case "default":
      // No sorting, maintain the current order
      break;
    case "timeAsc":
      matches = sortByTimeAsc(matches);
      break;
    case "timeDesc":
      matches = sortByTimeDesc(matches);
      break;
  }

  // Clear and re-render the sorted results
  results.innerHTML = "";
  for (var i = 0; i < matches.length; i++) {
    results.appendChild(matches[i]);
  }

  // Update status
  status.innerHTML = "Sorting complete!";
}
