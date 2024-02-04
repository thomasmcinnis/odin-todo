export function renderSelectCategoryList(categories) {
    // TODO: sort categories alphabetically
    const selectionList = document.querySelector('select');

    // Remove current children
    while (selectionList.firstChild) {
        selectionList.removeChild(selectionList.firstChild);
    }

    const emptyOption = document.createElement('option');
    emptyOption.setAttribute('value', '');
    emptyOption.setAttribute('selected', 'selected');
    emptyOption.textContent = 'Select a category';
    selectionList.appendChild(emptyOption);

    categories.forEach((category) => {
        const optionEl = document.createElement('option');
        optionEl.setAttribute('value', category.id);
        optionEl.textContent = category.name;
        selectionList.appendChild(optionEl);
    });
}
