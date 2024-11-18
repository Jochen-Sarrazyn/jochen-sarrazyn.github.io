// Create an AJAX request to fetch the cards.txt file
const xhr = new XMLHttpRequest();

// Path to the text file
const filePath = 'cards.txt';

// Set up the request
xhr.open('GET', filePath, true);

// On success, process the response
xhr.onload = function () {
    if (xhr.status === 200) {
        // Split the content of the text file into an array of lines
        const lines = xhr.responseText.split('\n').filter(line => line.trim() !== '');

        // Find all placeholders in the current HTML
        const placeholders = document.querySelectorAll('.from_txt');

        // Fill placeholders with lines from the file
        placeholders.forEach((placeholder, index) => {
            if (index < lines.length) {
                placeholder.textContent = lines[index];
            }
        });

        // If there are more lines in the file than placeholders, dynamically add new cards
        const container = document.querySelector('.container');
        for (let i = placeholders.length; i < lines.length; i++) {
            // Create a new card
            const newCard = document.createElement('div');
            newCard.className = 'card';
            newCard.innerHTML = `<p>Card Content: <span class="from_txt">${lines[i]}</span></p>`;
            
            // Append the new card to the container
            container.appendChild(newCard);
        }
    } else {
        console.error(`Failed to fetch ${filePath}: Status ${xhr.status}`);
    }
};

// Handle errors
xhr.onerror = function () {
    console.error('An error occurred while fetching the file.');
};

// Send the request
xhr.send();
