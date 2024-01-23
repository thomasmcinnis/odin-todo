import './style.css';

import ListManager from './model/list-manager';
import Task from './model/task';
import renderTaskList from './components/tasks/tasklist';
import { renderDialogForm } from './components/forms/forms';

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

const tasksListElement = document.querySelector('#tasks-list');
tasksListElement.addEventListener('click', handleTaskListClick);

//------------------------------------------------------------------------------
const dialog = document.querySelector('dialog');
const dialogCloseButton = document.querySelector('dialog button');

// Get all the buttons on the page with class 'open-dialog'
const openDialogButtons = document.querySelectorAll('button.open-dialog');

// Add event listener for each, and selectively inject the right form
openDialogButtons.forEach((button) => {
    button.addEventListener('click', () => {
        dialog.showModal();

        const buttonAction = button.dataset.action;
        const dialogForm = document.querySelector('dialog > div');

        while (dialogForm.firstChild) {
            dialogForm.removeChild(dialogForm.firstChild);
        }

        const formContent = renderDialogForm(buttonAction);
        dialogForm.appendChild(formContent);
    });
});

dialogCloseButton.addEventListener('click', () => {
    dialog.close();
});
