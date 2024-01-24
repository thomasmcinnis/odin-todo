import './style.css';

import TaskListManager from './model/list-manager';
import Task from './model/task';
import renderTaskList from './components/tasklist';
import { renderDialogForm } from './components/forms';

function mountModals() {
    const dialog = document.querySelector('dialog');
    const dialogCloseButton = document.querySelector('dialog button');

    // Get all the buttons on the page with class 'open-dialog'
    const openDialogButtons = document.querySelectorAll('button.open-dialog');

    // Add event listener for each, and selectively inject the right form
    openDialogButtons.forEach((button) => {
        button.addEventListener('click', () => {
            dialog.showModal();

            const buttonAction = button.dataset.action;
            const dialogForm = document.querySelector('dialog > form');

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
}

mountModals();

TaskListManager.sub(renderTaskList);

TaskListManager.initList();

function handleTaskListClick(event) {
    // only handle clicks on elements with an action attribute
    const actionEl = event.target.closest('[data-action]');
    if (!actionEl) return;

    const action = actionEl.dataset.action;
    const taskID = event.target.closest('[data-id').dataset.id;

    // invoke relevant action with UID of task
    console.log(`Will do ${action} on task with ID ${taskID}`);

    if (action === 'delete') {
        TaskListManager.deleteItem(taskID);
        return;
    }

    if (action === 'urgent' || action === 'complete') {
        TaskListManager.toggleField(action, taskID);
        return;
    }

    if (action === 'edit') {
        // openEditDialog(taskID)
        return;
    }
}

const tasksListElement = document.querySelector('#tasks-list');
tasksListElement.addEventListener('click', handleTaskListClick);
