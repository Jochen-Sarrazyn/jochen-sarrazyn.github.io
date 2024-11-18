for (let i = placeholders.length; i < lines.length; i++) {
    const newCard = document.createElement('div');
    newCard.className = 'photo-item';
    newCard.innerHTML = `<img src="Cards/${lines[i]}" alt="${lines[i]}">\n<label><input type="checkbox" class="photo-checkbox" data-price="1" data-photo="${lines[i]}">${lines[i]}</label>\n<input type="number" class="photo-quantity" min="0" value="0" data-price="1" disabled>`;
    cardContainer.appendChild(newCard);
}
