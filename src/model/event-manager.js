import { taskListManager, categoryListManager } from './list-manager';

export function mountNewTaskModal() {
    const newTaskDialog = document.querySelector('#add-task-modal');
    const newTaskButton = document.querySelector('#add-task-btn');
    const newTaskForm = newTaskDialog.querySelector('form');

    newTaskButton.addEventListener('click', () => {
        newTaskDialog.showModal();
    });

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
}

export function mountNewCategoryModal() {
    const newCategoryDialog = document.querySelector('#add-category-modal');
    const newCategoryButton = document.querySelector('#add-category-btn');
    newCategoryButton.addEventListener('click', () => {
        newCategoryDialog.showModal();
    });
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
