// server.js

var resultsPerPage = 20; // Number of results to display per page
var currentPage = 1; // Current page number
var totalResults = 0; // Total number of results
var totalPages = 0; // Total number of pages
var matches = []; // Array to store search results

function search() {
  var input = document.getElementById("searchInput").value.toLowerCase();
  var status = document.getElementById("status");

  status.innerHTML = "Searching...";

  var file = "everything.txt"; // Set your default file path here

  // Change cursor to a waiting cursor
  document.body.style.cursor = "wait";

  fetch(file)
    .then(response => response.text())
    .then(data => {
      var lines = data.toLowerCase().split("\n");

      matches = [];

      // Search for matches
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i].replace(/\./g, " "); // Replace "." with blank spaces for comparison
        if (line.includes(input)) {
          matches.push(lines[i]);
        }
      }

      totalResults = matches.length;
      totalPages = Math.ceil(totalResults / resultsPerPage);
      
      currentPage = 1; // Reset current page to 1
      
      status.innerHTML = "Search complete!";

      // Change cursor back to the default
      document.body.style.cursor = "default";

      // Display the results based on the current page
      displayResults();

      // Generate pagination buttons
      generatePaginationButtons();
    })
    .catch(error => {
      status.innerHTML = "An error occurred while searching.";
      console.error(error);

      // Change cursor back to the default
      document.body.style.cursor = "default";
    });
}

// Display the results based on the current page
function displayResults() {
  var startIndex = (currentPage - 1) * resultsPerPage;
  var endIndex = startIndex + resultsPerPage;

  var resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (matches.length > 0) {
    for (var i = startIndex; i < endIndex && i < matches.length; i++) {
      var listItem = document.createElement("li");
      listItem.innerHTML = matches[i];
      resultsContainer.appendChild(listItem);
    }
  } else {
    resultsContainer.innerHTML = "No matches found.";
  }
}


// Generate pagination buttons
function generatePaginationButtons() {
    var pageContainer = document.getElementById("pageContainer");
    pageContainer.innerHTML = "";
  
    if (matches.length > 0) {
        // Previous button
        var prevButton = document.createElement("button");
        prevButton.innerHTML = "Previous";
        prevButton.disabled = (currentPage === 1);
        prevButton.addEventListener("click", function () {
            if (currentPage > 1) {
                currentPage--;
                displayResults();
                updatePaginationButtons();
            }
        });
        pageContainer.appendChild(prevButton);

        // Next button
        var nextButton = document.createElement("button");
        nextButton.innerHTML = "Next";
        nextButton.disabled = (currentPage === totalPages);
        nextButton.addEventListener("click", function () {
            if (currentPage < totalPages) {
                currentPage++;
                displayResults();
                updatePaginationButtons();
            }
        });
        pageContainer.appendChild(nextButton);

        // First button
        var firstButton = document.createElement("button");
        firstButton.innerHTML = "First";
        firstButton.disabled = (currentPage === 1);
        firstButton.addEventListener("click", function () {
            if (currentPage !== 1) {
                currentPage = 1;
                displayResults();
                updatePaginationButtons();
            }
        });
        pageContainer.appendChild(firstButton);

        // Last button
        var lastButton = document.createElement("button");
        lastButton.innerHTML = "Last";
        lastButton.disabled = (currentPage === totalPages);
        lastButton.addEventListener("click", function () {
            if (currentPage !== totalPages) {
                currentPage = totalPages;
                displayResults();
                updatePaginationButtons();
            }
        });
        pageContainer.appendChild(lastButton);

        // Page number input field
        var pageNumberInput = document.createElement("input");
        pageNumberInput.type = "number";
        pageNumberInput.min = 1;
        pageNumberInput.max = totalPages;
        pageNumberInput.value = currentPage;
        pageNumberInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                var pageNumber = parseInt(pageNumberInput.value);
                if (pageNumber >= 1 && pageNumber <= totalPages) {
                    currentPage = pageNumber;
                    displayResults();
                    updatePaginationButtons();
                }
            }
        });
        pageContainer.appendChild(pageNumberInput);

            // Show All button
    var showAllButton = document.createElement("button");
    showAllButton.innerHTML = "Show All";
    showAllButton.addEventListener("click", function() {
      currentPage = 1;
      displayResults();
      updatePaginationButtons();
    });
    pageContainer.appendChild(showAllButton);
  }
  // Add current page number and total pages display
  var pageStatus = document.createElement("div");
  pageStatus.innerHTML = currentPage + " / " + totalPages;
  pageContainer.appendChild(pageStatus);
}

// Update the pagination buttons state
function updatePaginationButtons() {
    var prevButton = document.getElementById("prevButton");
    var nextButton = document.getElementById("nextButton");
    var firstButton = document.getElementById("firstButton");
    var lastButton = document.getElementById("lastButton");
    var pageNumberInput = document.getElementById("pageNumberInput");
  
    prevButton.disabled = (currentPage === 1);
    nextButton.disabled = (currentPage === totalPages);
    firstButton.disabled = (currentPage === 1);
    lastButton.disabled = (currentPage === totalPages);
    pageNumberInput.value = currentPage;
  }
  
  // Initial search and result display
  search();
