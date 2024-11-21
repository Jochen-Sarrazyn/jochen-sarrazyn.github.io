// Fetch the photo list from photos.txt
fetch('cards.txt')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load cards.txt');
        }
        return response.text();
    })
    .then(data => {
        const photoLines = data.split('\n').filter(line => line.trim() !== '');
        const gallery = document.querySelector('.gallery');

        // Parse and create photo cards
        photoLines.forEach(line => {
            const [fileName, description] = line.split(',');

            // Create the photo card
            const card = document.createElement('div');
            card.className = 'photo-card';
            card.dataset.fileName = fileName.trim();
            card.dataset.description = description?.trim();

            card.innerHTML = `
                <img src="images/${fileName.trim()}" alt="${description?.trim() || ''}">
                <p>${description?.trim() || 'No description'}</p>
                <input type="number" min="0" value="0" class="quantity-input" placeholder="Quantity">
            `;

            // Append the card to the gallery
            gallery.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error loading photo data:', error);
    });

// Update the selection cart
function updateCart() {
    const cards = document.querySelectorAll('.photo-card');
    const cartList = document.getElementById('selectedPhotos');
    var total_html = document.getElementById('totalCards');
    const checkoutButton = document.getElementById('checkoutButton');
    const hiddenInput = document.getElementById('hiddenInput');
    var total_cards = 0;

    // Clear the cart list
    cartList.innerHTML = '';
    total_html.innerHTML = '';

    // Collect selected items
    const selectedItems = [];

    cards.forEach(card => {
        const quantityInput = card.querySelector('.quantity-input');
        const quantity = parseInt(quantityInput.value, 10);
        const fileName = card.dataset.fileName;
        const description = card.dataset.description;

        // Add to cart and hidden form if quantity > 0
        if (quantity > 0) {
            selectedItems.push({ description, fileName, quantity });

            const listItem = document.createElement('li');
            listItem.textContent = `${description} - Aantal: ${quantity}`;
            cartList.appendChild(listItem);
            total_cards += quantity;        // Add to the total amount of cards
        }
    });

    // Display total amount of cards
    //const total_text = document.createElement('p');
    var cardTotal = document.createTextNode(`Totaal: ${total_cards}`);
    total_html.appendChild(cardTotal);

    // Populate the hidden form input with the selected items as a JSON string
    hiddenInput.value = JSON.stringify(selectedItems);

    // Enable/Disable checkout button
    checkoutButton.disabled = selectedItems.length === 0;
}

// Add event listeners to update the cart dynamically
document.addEventListener('input', (event) => {
    if (event.target.classList.contains('quantity-input')) {
        updateCart();
    }
});
