import './style.css';

import ListManager from './model/list-manager';
import Task from './model/task';
import renderTaskList from './components/tasks/tasklist';

const taskList = new ListManager('task-list-store', Task);

taskList.sub(renderTaskList);

taskList.initList();

// taskList.addItem({
//     name: 'What about me',
//     isUrgent: true,
//     category: 'Shopping',
// });

function handleTaskListClick(event) {
    // only handle clicks on elements with an action attribute
    const actionEl = event.target.closest('[data-action]');
    if (!actionEl) return;

    const action = actionEl.dataset.action;
    const taskID = event.target.closest('[data-id').dataset.id;

    // invoke relevant action with UID of task
    console.log(`Will do ${action} on task with ID ${taskID}`);

    if (action === 'delete') {
        taskList.deleteItem(taskID);
        return;
    }

    if (action === 'urgent' || action === 'complete') {
        taskList.toggleField(action, taskID);
        return;
    }

    if (action === 'edit') {
        // openEditDialog(taskID)
        return;
    }
}

const tasksListElement = document.getElementById('tasks-list');
tasksListElement.addEventListener('click', handleTaskListClick);
