import './style.css';

import { taskListManager } from './model/list-manager';

import renderTaskList from './components/tasklist';
import { mountModals } from './components/modals';

mountModals();

taskListManager.sub(renderTaskList);

taskListManager.initList();

function handleTaskListClick(event) {
    // only handle clicks on elements with an action attribute
    const actionEl = event.target.closest('[data-action]');
    if (!actionEl) return;

    const action = actionEl.dataset.action;
    const taskID = event.target.closest('[data-id').dataset.id;

    // invoke relevant action with UID of task
    console.log(`Will do ${action} on task with ID ${taskID}`);

    if (action === 'delete') {
        taskListManager.deleteItem(taskID);
        return;
    }

    if (action === 'urgent' || action === 'complete') {
        taskListManager.toggleField(action, taskID);
        return;
    }

    if (action === 'edit') {
        // openEditDialog(taskID)
        return;
    }
}

const tasksListElement = document.querySelector('#tasks-list');
tasksListElement.addEventListener('click', handleTaskListClick);
