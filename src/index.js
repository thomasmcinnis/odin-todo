import './style.css';

import { taskListManager, categoryListManager } from './model/list-manager';
import {
    mountNewTaskModal,
    mountNewCategoryModal,
} from './model/event-manager';
import DisplayManager from './model/display-manager';

//----- Make the modals interactive
mountNewTaskModal();
mountNewCategoryModal();

//----- Setup click handling for the task list element
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

//----- Setup click handling for the category list element
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

const categoryListElement = document.querySelector('#category-list');
categoryListElement.addEventListener('click', handleCategoryListClick);

//----- Subscribe display manager to respective list managers
taskListManager.sub(DisplayManager.updateView.bind(DisplayManager));
categoryListManager.sub(DisplayManager.updateView.bind(DisplayManager));

//----- Initialise lists, retrieving values from storage
categoryListManager.initList();
taskListManager.initList();

//----- Add demo categories and tasks if none exist
const dummyCategories = [
    {
        name: 'Work',
    },
    {
        name: 'Study',
    },
];

const dummyTasks = [
    {
        name: 'File TPS report',
        dueDate: '2024-01-21',
        isUrgent: true,
    },
    {
        name: 'Learn Javascript',
    },
];

if (
    taskListManager.getItems().length === 0 &&
    categoryListManager.getItems().length === 0
) {
    dummyCategories.forEach((category) =>
        categoryListManager.addItem(category)
    );

    const categories = categoryListManager.getItems();

    dummyTasks.forEach((task, index) => {
        const categoryID = categories[index].id;
        task.categoryID = categoryID;
        taskListManager.addItem(task);
    });
}
