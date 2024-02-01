import { taskListManager, categoryListManager } from '../model/list-manager';

// Get all the dialogs
const newTaskDialog = document.querySelector('#add-task-modal');
const newCategoryDialog = document.querySelector('#add-category-modal');

const newTaskButton = document.querySelector('#add-task-btn');
newTaskButton.addEventListener('click', () => {
    newTaskDialog.showModal();
});

const newCategoryButton = document.querySelector('#add-category-btn');
newCategoryButton.addEventListener('click', () => {
    newCategoryDialog.showModal();
});

const newTaskForm = newTaskDialog.querySelector('form');
const newCategoryForm = newCategoryDialog.querySelector('form');

export function updateTaskFormCategories(categories) {
    // TODO: sort categories alphabetically
    const selectionList = newTaskForm.querySelector('select');

    // Remove current children
    while (selectionList.firstChild) {
        selectionList.removeChild(selectionList.firstChild);
    }

    categories.forEach((category) => {
        const optionEl = document.createElement('option');
        optionEl.setAttribute('value', category.id);
        optionEl.textContent = category.name;
        selectionList.appendChild(optionEl);
    });
}

export function mountModals() {
    // add event listener for new task form
    newTaskForm.onclose = () => {
        console.log('closed:', newTaskForm.returnValue);
    };

    newTaskForm.oncancel = () => {
        console.log('cancelled: ', newTaskForm.returnValue);
    };

    newTaskForm.onsubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());
        if (value.isUrgent) value.isUrgent = true;

        taskListManager.addItem(value);
    };

    // add event listener for new category form
    newCategoryForm.onclose = () => {
        console.log('closed:', newCategoryForm.returnValue);
    };

    newCategoryForm.oncancel = () => {
        console.log('cancelled: ', newCategoryForm.returnValue);
    };

    newCategoryForm.onsubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());

        categoryListManager.addItem(value);
    };
}
