export function renderSelectCategoryList(categories) {
    // TODO: sort categories alphabetically
    const selectionList = document.querySelectorAll('select');

    selectionList.forEach((list) => {
        // Remove current children
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }

        const emptyOption = document.createElement('option');
        emptyOption.setAttribute('value', '');
        emptyOption.setAttribute('selected', 'selected');
        emptyOption.textContent = 'Select a category';
        list.appendChild(emptyOption);

        categories.forEach((category) => {
            const optionEl = document.createElement('option');
            optionEl.setAttribute('value', category.id);
            optionEl.textContent = category.name;
            list.appendChild(optionEl);
        });
    });
}
