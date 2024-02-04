import { taskListManager, categoryListManager } from './list-manager';
import DisplayManager from './display-manager';

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

function handleTaskListClick(event) {
    // only handle clicks on elements with an action attribute
    const actionEl = event.target.closest('[data-action]');
    if (!actionEl) return;

    const action = actionEl.dataset.action;
    const taskID = event.target.closest('[data-id').dataset.id;

    // invoke relevant action with UID of task
    switch (action) {
        case 'delete':
            taskListManager.deleteItem(taskID);
            break;
        case 'edit':
            // openEditDialog(taskID);
            break;
        default: // handle all toggle events
            taskListManager.toggleItemValue(action, taskID);
    }
}

export function mountTaskList() {
    const tasksListElement = document.querySelector('#tasks-list');
    tasksListElement.addEventListener('click', handleTaskListClick);
}

function handleCategoryListClick(event) {
    // only handle clicks on elements with an action attribute
    const actionEl = event.target.closest('[data-action]');
    if (!actionEl) return;

    const action = actionEl.dataset.action;
    const categoryID = event.target.closest('[data-id]').dataset.id;

    // invoke relevant action with ID of item
    if (action === 'select') {
        DisplayManager.filterCategory(categoryID);
    }

    if (action === 'delete') {
        const tasksWithCategory = taskListManager
            .getItems()
            .filter((i) => i.categoryID === categoryID);

        tasksWithCategory.forEach((task) =>
            taskListManager.updateItemValues({ categoryID: '' }, task.id)
        );
        categoryListManager.deleteItem(categoryID);
    }
}

export function mountCategoryList() {
    const categoryListElement = document.querySelector('#category-list');
    categoryListElement.addEventListener('click', handleCategoryListClick);
}
