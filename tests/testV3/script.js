// Fetch the photo list from photos.txt
fetch('photos.txt')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load photos.txt');
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

            card.innerHTML = `
                <img src="images/${fileName.trim()}" alt="${description?.trim() || ''}">
                <p>${description?.trim() || 'No description'}</p>
                <input type="number" min="0" value="1" class="quantity-input" placeholder="Quantity">
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
    const checkoutButton = document.getElementById('checkoutButton');

    // Clear the cart list
    cartList.innerHTML = '';

    // Track if there are any items selected
    let hasItems = false;

    // Process each card
    cards.forEach(card => {
        const quantityInput = card.querySelector('.quantity-input');
        const quantity = parseInt(quantityInput.value, 10);
        const fileName = card.dataset.fileName;

        // Add to the cart if quantity > 0
        if (quantity > 0) {
            hasItems = true;

            const listItem = document.createElement('li');
            listItem.textContent = `${fileName} - Quantity: ${quantity}`;
            cartList.appendChild(listItem);
        }
    });

    // Enable/Disable checkout button
    checkoutButton.disabled = !hasItems;
}

// Add event listeners to update the cart dynamically
document.addEventListener('input', (event) => {
    if (event.target.classList.contains('quantity-input')) {
        updateCart();
    }
});

// Checkout button click event
document.getElementById('checkoutButton').addEventListener('click', () => {
    const cards = document.querySelectorAll('.photo-card');
    const selectedItems = [];

    // Collect selected items and quantities
    cards.forEach(card => {
        const quantityInput = card.querySelector('.quantity-input');
        const quantity = parseInt(quantityInput.value, 10);
        const fileName = card.dataset.fileName;

        if (quantity > 0) {
            selectedItems.push({ fileName, quantity });
        }
    });

    // Display the selected items in an alert (or process the data)
    alert(`You have selected:\n${selectedItems.map(item => `${item.fileName} - Quantity: ${item.quantity}`).join('\n')}`);

    // Here you can send the selected items to a server for processing
});
