function renderCategoryItem(category) {
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

    // Add edit button
    const editButton = document.createElement('button');
    editButton.setAttribute('tabindex', -1);

    editButton.setAttribute('data-action', 'edit');
    editButton.classList.add('action-btn');

    editButton.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M2.725 21q-.275 0-.5-.137t-.35-.363q-.125-.225-.137-.488t.137-.512l9.25-16q.15-.25.388-.375T12 3q.25 0 .488.125t.387.375l9.25 16q.15.25.138.513t-.138.487q-.125.225-.35.363t-.5.137zM12 18q.425 0 .713-.288T13 17q0-.425-.288-.712T12 16q-.425 0-.712.288T11 17q0 .425.288.713T12 18m0-3q.425 0 .713-.288T13 14v-3q0-.425-.288-.712T12 10q-.425 0-.712.288T11 11v3q0 .425.288.713T12 15"/></svg>
    `;

    categoryName.appendChild(editButton);

    listItem.appendChild(categoryName);

    return listItem;
}

export default function renderCategoryList(categories) {
    const categoryList = document.getElementById('category-list');

    // Remove current children
    while (categoryList.firstChild) {
        categoryList.removeChild(categoryList.firstChild);
    }

    categories.forEach((category) => {
        categoryList.appendChild(renderCategoryItem(category));
    });
}
