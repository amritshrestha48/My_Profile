// 1. Get references to the search bar elements
const searchInput = document.getElementById('search-input'); // Replace 'search-input' with your actual input ID
const searchButton = document.getElementById('search-button'); // Replace 'search-button' with your actual button ID (optional)
const searchResults = document.getElementById('search-results'); // Replace 'search-results' with the ID of the element where you want to display results

// Sample data (replace with your actual data source, e.g., an array of objects)
const data = [
    { title: "Project Title 1", description: "Description of project 1...", link: "project1.html" },
    { title: "Project Title 2", description: "Description of project 2...", link: "project2.html" },
    { title: "Publication 1", description: "Details of publication 1...", link: "publication1.pdf" },
    { title: "Another Project", description: "More project details...", link: "another-project.com" },
    // ... more data
];


// 2. Function to perform the search
function performSearch() {
    const searchTerm = searchInput.value.toLowerCase(); // Get search term and convert to lowercase

    // Clear previous results
    searchResults.innerHTML = '';

    if (searchTerm.trim() === "") {
        return; // Don't perform search if input is empty or just whitespace
    }

    const results = data.filter(item => {
        // Customize the search criteria as needed (e.g., search in title, description, or both)
        return item.title.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm);
    });

    if (results.length === 0) {
        searchResults.innerHTML = "<p>No results found.</p>";
        return;
    }

    // Display the results
    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('search-result-item'); // Add a class for styling

        const title = document.createElement('a'); // Make title a link
        title.href = result.link;
        title.target = "_blank"; // Open link in a new tab (optional)
        title.textContent = result.title;
        title.classList.add('search-result-title'); // Add class for styling

        const description = document.createElement('p');
        description.textContent = result.description;
        description.classList.add('search-result-description'); // Add class for styling


        resultItem.appendChild(title);
        resultItem.appendChild(description);
        searchResults.appendChild(resultItem);
    });
}


// 3. Event listeners
// For button click (if you have a search button)
if (searchButton) {
    searchButton.addEventListener('click', performSearch);
}

// For Enter key press in the search input
searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

// Optional: Initial focus on search input
searchInput.focus();