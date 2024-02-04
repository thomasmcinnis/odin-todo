import './style.css';

import { taskListManager, categoryListManager } from './model/list-manager';
import DisplayManager from './model/display-manager';

import { mountModals, updateTaskFormCategories } from './components/modals';

// Subscribe display manager to respective list managers
taskListManager.sub(DisplayManager.updateView.bind(DisplayManager));
categoryListManager.sub(DisplayManager.updateView.bind(DisplayManager));

// Initialise lists, retrieving values from storage if they exist
// This will also display manager with updated data
categoryListManager.initList();
taskListManager.initList();

// DOM interaction stuff
// - Add click handling for the main buttons to open their modals
// - Add the modals and their interactivity
// - Add click handling for the task list element
// - Add click handling for the category list element

mountModals();
// TODO: mountModals should have all the forms split out, they shoud take the addItem() functions as callback functions rather than the listManagers being imported into those modules as it is right now. The forms should not know what is being done with their data on submit. Think this is called dependancy injection??

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

const tasksListElement = document.querySelector('#tasks-list');
tasksListElement.addEventListener('click', handleTaskListClick);

function handleCategoryListClick(event) {
    // only handle clicks on elements with an action attribute
    const actionEl = event.target.closest('[data-action]');
    if (!actionEl) return;

    const action = actionEl.dataset.action;
    const categoryListElement = event.target.closest('[data-id]');
    const categoryID = categoryListElement.dataset.id;

    // invoke relevant action with ID of item
    if (action === 'select') {
        DisplayManager.filterCategory(categoryID);
    }
}

const categoryListElement = document.querySelector('#category-list');
categoryListElement.addEventListener('click', handleCategoryListClick);
