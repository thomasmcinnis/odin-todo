import './style.css';

import { taskListManager, categoryListManager } from './model/list-manager';
import renderTaskList from './components/tasklist';
import renderCategoryList from './components/categorylist';
import { mountModals, updateTaskFormCategories } from './components/modals';

// Subscribe view renderers to their respective list manager
taskListManager.sub(renderTaskList);
categoryListManager.sub(renderCategoryList);
categoryListManager.sub(updateTaskFormCategories);

// Initialise lists, retrieving values from storage if they exist
// This will also call subscribed view renderers with updated data
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
    const categoryID = event.target.closest('[data-id').dataset.id;

    // invoke relevant action with ID of item
    if (action === 'select') {
        categoryListManager.selectItem(categoryID);
        // Curently the category list "knows" which category is selected
        // Why? This should be the domain of the view only
        // Create some view state object to track, let the view renderers sub
        // to that instead therefore they can update without needing to cross-
        // contaminate between data managers and view
    }
}

const categoryListElement = document.querySelector('#category-list');
categoryListElement.addEventListener('click', handleCategoryListClick);
