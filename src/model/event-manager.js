import { taskListManager, categoryListManager } from './list-manager';
import DisplayManager from './display-manager';

export function mountNewTaskModal() {
    const newTaskDialog = document.querySelector('#add-task-modal');
    const newTaskButton = document.querySelector('#add-task-btn');
    const newTaskForm = newTaskDialog.querySelector('form');
    const reset = newTaskDialog.querySelector("[type='reset']");

    newTaskButton.addEventListener('click', () => {
        newTaskDialog.showModal();
    });

    reset.addEventListener('click', () => {
        newTaskDialog.close();
    });

    newTaskForm.onsubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());
        if (value.isUrgent) value.isUrgent = true;

        taskListManager.addItem(value);
        newTaskDialog.close();
    };
}

export function mountNewCategoryModal() {
    const newCategoryDialog = document.querySelector('#add-category-modal');
    const newCategoryButton = document.querySelector('#add-category-btn');
    const reset = newCategoryDialog.querySelector("[type='reset']");

    newCategoryButton.addEventListener('click', () => {
        newCategoryDialog.showModal();
    });
    const newCategoryForm = newCategoryDialog.querySelector('form');

    reset.addEventListener('click', () => {
        newCategoryDialog.close();
    });

    newCategoryForm.onsubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());

        categoryListManager.addItem(value);
        newCategoryDialog.close();
    };
}

function openEditTaskForm(taskID) {
    const taskIndex = taskListManager.getItemIndex(taskID);
    const { name, categoryID, dueDate } = taskListManager.itemsList[taskIndex];

    const editTaskDialog = document.querySelector('#edit-task-modal');
    const editTaskForm = editTaskDialog.querySelector('form');
    const reset = editTaskDialog.querySelector("[type='reset']");

    reset.addEventListener('click', () => {
        editTaskDialog.close();
    });

    editTaskForm.onsubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());
        if (value.isUrgent) value.isUrgent = true;

        taskListManager.updateItemValues(value, taskID);
        editTaskDialog.close();
    };

    // Add the task values to the form inputs
    const nameInput = editTaskForm.querySelector('input[type=text]');
    nameInput.value = name;
    const categorySelect = editTaskForm.querySelector('select');
    categorySelect.value = categoryID;
    const dateInput = editTaskForm.querySelector('input[type=date]');
    dateInput.value = dueDate;

    editTaskDialog.showModal();
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
            openEditTaskForm(taskID);
            break;
        default: // handle all toggle events
            taskListManager.toggleItemValue(action, taskID);
    }
}

export function mountTaskList() {
    const tasksListElement = document.querySelector('#tasks-list');
    tasksListElement.addEventListener('click', handleTaskListClick);
}

function deleteCategory(categoryID) {
    const tasksWithCategory = taskListManager
        .getItems()
        .filter((i) => i.categoryID === categoryID);

    tasksWithCategory.forEach((task) =>
        taskListManager.updateItemValues({ categoryID: '' }, task.id)
    );
    categoryListManager.deleteItem(categoryID);
}

function openEditCategoryForm(categoryID) {
    const categoryIndex = categoryListManager.getItemIndex(categoryID);
    const { name } = categoryListManager.itemsList[categoryIndex];

    const editCategoryDialog = document.querySelector('#edit-category-modal');
    const editCategory = editCategoryDialog.querySelector('form');
    const reset = editCategoryDialog.querySelector("[type='reset']");

    reset.addEventListener('click', () => {
        editCategoryDialog.close();
    });

    editCategory.onsubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());

        categoryListManager.updateItemValues(value, categoryID);
        editCategoryDialog.close();
    };

    // Add the task values to the form inputs
    const nameInput = editCategory.querySelector('input[type=text]');
    nameInput.value = name;

    editCategoryDialog.showModal();
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
        deleteCategory(categoryID);
    }

    if (action === 'edit') {
        openEditCategoryForm(categoryID);
    }
}

export function mountCategoryList() {
    const categoryListElement = document.querySelector('#category-list');
    categoryListElement.addEventListener('click', handleCategoryListClick);
}
