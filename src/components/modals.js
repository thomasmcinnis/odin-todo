import { taskListManager, categoryListManager } from '../model/list-manager';

export function mountModals() {
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

    // add event listener for new task form
    const newTaskForm = newTaskDialog.querySelector('form');

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
    const newCategoryForm = newCategoryDialog.querySelector('form');

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
