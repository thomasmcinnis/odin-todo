function renderCategoryItem(category, selectedCategory) {
    const { id, name } = category;

    // Create the list item
    const listItem = document.createElement('li');
    listItem.setAttribute('data-id', id);
    listItem.setAttribute('tabindex', 0);

    // Add name button
    const categoryName = document.createElement('button');
    categoryName.setAttribute('tabindex', -1);
    categoryName.setAttribute('data-action', 'select');
    categoryName.textContent = name;
    if (selectedCategory && selectedCategory === id) {
        categoryName.classList.add('selected');
    }

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('tabindex', -1);

    deleteButton.setAttribute('data-action', 'delete');
    deleteButton.classList.add('action-btn');

    deleteButton.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M18 12.998H6a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2"/></svg>
    `;

    categoryName.appendChild(deleteButton);

    listItem.appendChild(categoryName);

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
