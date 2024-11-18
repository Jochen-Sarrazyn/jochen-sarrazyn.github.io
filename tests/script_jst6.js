// Fetch the content from cards.txt
fetch('cards.txt')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch cards.txt');
        }
        return response.text(); // Parse the content as plain text
    })
    .then(data => {
        // Split the text file content into lines
        const lines = data.split('\n').filter(line => line.trim() !== '');

        // Find all elements with the "from_txt" class
        const placeholders = document.querySelectorAll('.from_txt');

        // Fill placeholders with content from the text file
        placeholders.forEach((placeholder, index) => {
            if (index < lines.length) {
                placeholder.textContent = lines[index];
            }
        });

        // If there are more lines than placeholders, dynamically create new elements
        const cardContainer = document.body; // Change this to the parent container if needed
        for (let i = placeholders.length; i < lines.length; i++) {
            const newCard = document.createElement('div');
            newCard.className = 'photo-item';
            newCard.innerHTML = `<img src="Cards/${lines[i]}" alt="${lines[i]}">\n<label><input type="checkbox" class="photo-checkbox" data-price="1" data-photo="${lines[i]}">${lines[i]}</label>\n<input type="number" class="photo-quantity" min="0" value="0" data-price="1" disabled>`;
            cardContainer.appendChild(newCard);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
