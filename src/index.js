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
categoryListManager.initList();
taskListManager.initList();

// DOM interaction stuff
mountModals();

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
    }
}

const categoryListElement = document.querySelector('#category-list');
categoryListElement.addEventListener('click', handleCategoryListClick);
