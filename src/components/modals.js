import { taskListManager } from '../model/list-manager';

export function mountModals() {
    // Get all the dialogs
    const newTaskDialog = document.querySelector('#add-task-modal');
    // const newCategoryDialog = document.querySelector('#add-category-modal');

    const newTaskButton = document.querySelector('#add-task-btn');
    newTaskButton.addEventListener('click', () => {
        newTaskDialog.showModal();
    });

    // const newCategoryButton = document.querySelector('#add-category-btn');
    // newCategoryButton.addEventListener('click', () => {
    //     newCategoryDialog.showModal();
    // });

    // add event listeners for each dialog
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
        // Honestly FormData api feels like magic
        const value = Object.fromEntries(data.entries());
        taskListManager.addItem(value);
    };
}
