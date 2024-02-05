function renderCategoryItem(category, selectedCategory) {
    const { id, name } = category;

    // Create the list item
    const listItem = document.createElement('li');
    listItem.setAttribute('data-id', id);
    listItem.setAttribute('tabindex', 0);

    // Add name button
    const categoryName = document.createElement('button');
    categoryName.setAttribute('tabindex', -1);
    categoryName.setAttribute('data-action', 'edit');
    categoryName.textContent = name;

    // Add select button
    const selectButton = document.createElement('button');
    selectButton.setAttribute('tabindex', -1);

    selectButton.setAttribute('data-action', 'select');
    selectButton.classList.add('action-btn');
    selectButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3"/></svg>`;

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('tabindex', -1);

    deleteButton.setAttribute('data-action', 'delete');
    deleteButton.classList.add('action-btn');

    deleteButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M14.12 10.47L12 12.59l-2.13-2.12l-1.41 1.41L10.59 14l-2.12 2.12l1.41 1.41L12 15.41l2.12 2.12l1.41-1.41L13.41 14l2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM8 9h8v10H8z"/></svg>`;

    if (selectedCategory && selectedCategory === id) {
        categoryName.classList.add('selected');
        selectButton.classList.add('selected');
    }

    listItem.appendChild(categoryName);
    listItem.appendChild(selectButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

export default function renderCategoryList(categories, selectedCategory) {
    const categoryListElement = document.getElementById('category-list');

    // Remove current children
    while (categoryListElement.firstChild) {
        categoryListElement.removeChild(categoryListElement.firstChild);
    }

    categories.forEach((category) => {
        categoryListElement.appendChild(
            renderCategoryItem(category, selectedCategory)
        );
    });
}
