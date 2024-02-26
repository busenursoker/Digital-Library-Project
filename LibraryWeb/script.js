// Get references to the buttons and the panel
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const button4 = document.getElementById("button4");
const panel = document.getElementById("panel");
const panel1 = document.getElementById("panel1");
const panel2 = document.getElementById("panel2");
const panel4 = document.getElementById("panel4");
const backButton = document.querySelectorAll(".backButton");
const removeBooksButton = document.getElementById("button3");
const removeBooksPanel = document.getElementById("panel3");
const removeBooksForm = document.getElementById("removeBookForm");

function togglePanel(panel) {
    panel.classList.toggle("show");
}
// Add click event listeners to the buttons
button1.addEventListener("click", function() {
    console.log("Button 1 clicked");
    togglePanel(panel1);
});

button2.addEventListener("click", function() {
    console.log("Button 2 clicked");
    togglePanel(panel2);
});

button3.addEventListener("click", function() {
    console.log("Button 3 clicked");
    togglePanel(panel3);

});

button4.addEventListener("click", function() {
    console.log("Button 4 clicked");
    togglePanel(panel4);

});

backButton.forEach(function(button) {
    button.addEventListener("click", function() {
        // Find the parent panel and close it
        const panel = this.parentNode;
        togglePanel(panel);
    });
});

removeBooksButton.addEventListener("click", function() {
    togglePanel(removeBooksPanel); // Toggle the display of the remove books panel
});


function addBook() {
    var bookTitle = document.getElementById("btitle").value;
    var bookAuthor = document.getElementById("author").value;
    var releaseYear = document.getElementById("releaseYear").value;
    var numPages = document.getElementById("numPages").value;
    var bookGenre = document.getElementById("genre").value;
    var book = {
        title: bookTitle,
        author: bookAuthor,
        releaseYear: releaseYear,
        numPages: numPages,
        genre: bookGenre
    };

    // Get existing books from local storage or initialize as an empty array
    var existingBooks = JSON.parse(localStorage.getItem("books")) || [];

    // Add the new book to the array
    existingBooks.push(book);

    // Save the updated array back to local storage
    localStorage.setItem("books", JSON.stringify(existingBooks));
    // Inside the addBook function after appending the book to the book list container
    // Create a new book card element
    var newBookCard = document.createElement("div");
    newBookCard.classList.add("book-card");
    // Populate the new book card with book details
    newBookCard.innerHTML = `
        <h3> ${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Genre: ${book.genre}</p>
        <p>Release Year: ${book.releaseYear}</p>
        <p>Number of Pages: ${book.numPages}</p>
`;
    // Append the new book card to the book container in the appropriate panel
    var panel1BookContainer = document.getElementById("bookContainer");
    panel1BookContainer.appendChild(newBookCard);


    alert("Book added to your library.");

    // Clear the input fields in the form
    document.getElementById("btitle").value = "";
    document.getElementById("author").value = "";
    document.getElementById("releaseYear").value = "";
    document.getElementById("numPages").value = "";
    document.getElementById("genre").value = "";
}

document.getElementById("addBookForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    addBook(); 
});

window.addEventListener("load", function() {
    
    var storedBooks = JSON.parse(localStorage.getItem("books"));

    // If there are stored books, render them in panel1
    if (storedBooks) {
        var bookContainer = document.getElementById("bookContainer");
        
        // Clear any existing content in the book container
        bookContainer.innerHTML = "";

        // Loop through each book and create a card for it
        storedBooks.forEach(function(book) {
            var bookCard = document.createElement("div");
            bookCard.classList.add("book-card");

            // Populate the card with book details
            var title = document.createElement("h3");
            title.textContent = book.title;

            var author = document.createElement("p");
            author.textContent = "Author: " + book.author;

            var genre = document.createElement("p");
            genre.textContent = "Genre: " + book.genre;

            var releaseYear = document.createElement("p");
            releaseYear.textContent = "Release Year: " + book.releaseYear;

            var numPages = document.createElement("p");
            numPages.textContent = "Number of Pages: " + book.numPages;

            
            bookCard.appendChild(title);
            bookCard.appendChild(author);
            bookCard.appendChild(releaseYear);
            bookCard.appendChild(numPages);
            bookCard.appendChild(genre);
            bookContainer.appendChild(bookCard);
        });
    }
});
removeBooksButton.addEventListener("click", function() {
    togglePanel(removeBooksPanel); 
});

function removeBook() {
    var bookTitleToRemove = document.getElementById("titleToRemove").value;
    var bookAuthorToRemove = document.getElementById("authorToRemove").value;

    // Get existing books from local storage
    var existingBooks = JSON.parse(localStorage.getItem("books")) || [];

    // Find the index of the book to remove
    var indexToRemove = existingBooks.findIndex(function(book) {
        return book.title === bookTitleToRemove && book.author === bookAuthorToRemove;
    });

    if (indexToRemove !== -1) {

        existingBooks.splice(indexToRemove, 1);

        // Save the updated array back to local storage
        localStorage.setItem("books", JSON.stringify(existingBooks));

        alert("Book removed from your library.");
    } else {
        alert("Book not found in your library.");
    }

    // Clear the input fields in the form
    document.getElementById("titleToRemove").value = "";
    document.getElementById("authorToRemove").value = "";

    // Close the remove books panel
    togglePanel(removeBooksPanel);
}

removeBooksForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    removeBook(); 
});

function searchBook() {
    var searchTitle = document.getElementById("searchTitle").value;
    var storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    var searchResults = document.getElementById("searchResults");

    // Clear previous search results
    searchResults.innerHTML = "";

    // Check each stored book for a match with the search title
    var foundBooks = storedBooks.filter(function(book) {
        return book.title.toLowerCase().includes(searchTitle.toLowerCase());
    });

    // Display search results
    if (foundBooks.length > 0) {
        var resultHTML = "<h3>Search Results:</h3>";
        foundBooks.forEach(function(book) {
            resultHTML += "<p>" + book.title + " by " + book.author + "</p>";
        });
        searchResults.innerHTML = resultHTML;
    } else {
        searchResults.innerHTML = "<p>No matching books found.</p>";
    }
}


document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    searchBook(); 
});
