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
            `;

            // Add click event for selection
            card.addEventListener('click', () => {
                card.classList.toggle('selected');
                updateCart();
            });

            // Append the card to the gallery
            gallery.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error loading photo data:', error);
    });

// Update the selection cart
function updateCart() {
    const selectedPhotos = document.querySelectorAll('.photo-card.selected');
    const cartList = document.getElementById('selectedPhotos');
    const checkoutButton = document.getElementById('checkoutButton');

    // Clear the cart list
    cartList.innerHTML = '';

    // Add selected photos to the cart list
    selectedPhotos.forEach(photo => {
        const fileName = photo.dataset.fileName;

        const listItem = document.createElement('li');
        listItem.textContent = fileName;

        cartList.appendChild(listItem);
    });

    // Enable/Disable checkout button
    checkoutButton.disabled = selectedPhotos.length === 0;
}

// Checkout button click event
document.getElementById('checkoutButton').addEventListener('click', () => {
    const selectedPhotos = Array.from(document.querySelectorAll('.photo-card.selected'))
        .map(photo => photo.dataset.fileName);

    alert(`You have selected: ${selectedPhotos.join(', ')}`);
    // Here you can handle the checkout process (e.g., send data to a server)
});
