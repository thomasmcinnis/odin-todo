import './style.css';

import { taskList, categoryList, Task, Category } from './model';

console.log(taskList.getItems());

function renderTask(index, item) {
    const { name, date, category, isUrgent } = item;

    // Create the container
    const task = document.createElement('div');
    task.setAttribute('data-id', index);
    task.setAttribute('tabindex', '0');
    if (isUrgent) task.setAttribute('urgent', 'true');

    // Create the checkbox
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');

    task.appendChild(checkbox);

    // Create the center content
    const taskDetails = document.createElement('div');

    const taskName = document.createElement('p');
    taskName.textContent = name;
    taskName.classList.add('task-name');
    taskDetails.appendChild(taskName);

    if (date) {
        const taskDate = document.createElement('p');
        taskDate.textContent = date;
        taskDate.classList.add('task-date');
        taskDetails.appendChild(taskDate);
    }

    if (category) {
        const taskCategory = document.createElement('p');
        taskCategory.textContent = category;
        taskCategory.classList.add('task-category');
        taskDetails.appendChild(taskCategory);
    }

    task.appendChild(taskDetails);

    // Create the urgent icon
    const urgentButton = document.createElement('button');
    urgentButton.classList.add('urgent-btn');

    task.appendChild(urgentButton);

    return task;
}

const tasksContainer = document.getElementById('tasks-list');

const tasks = taskList.getItems();

tasks.forEach((item, index) => {
    const task = renderTask(index, item);

    tasksContainer.appendChild(task);
});
