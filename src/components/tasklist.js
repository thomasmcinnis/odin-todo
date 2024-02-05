function renderActionsDiv(isUrgent) {
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('task-actions');

    const urgentButton = document.createElement('button');
    urgentButton.setAttribute('tabindex', -1);

    if (isUrgent) urgentButton.setAttribute('urgent', 'true');
    urgentButton.setAttribute('data-action', 'isUrgent');
    urgentButton.classList.add('action-btn');

    urgentButton.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M2.725 21q-.275 0-.5-.137t-.35-.363q-.125-.225-.137-.488t.137-.512l9.25-16q.15-.25.388-.375T12 3q.25 0 .488.125t.387.375l9.25 16q.15.25.138.513t-.138.487q-.125.225-.35.363t-.5.137zM12 18q.425 0 .713-.288T13 17q0-.425-.288-.712T12 16q-.425 0-.712.288T11 17q0 .425.288.713T12 18m0-3q.425 0 .713-.288T13 14v-3q0-.425-.288-.712T12 10q-.425 0-.712.288T11 11v3q0 .425.288.713T12 15"/></svg>
    `;

    actionsDiv.appendChild(urgentButton);

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('tabindex', -1);
    deleteButton.setAttribute('data-action', 'delete');
    deleteButton.classList.add('action-btn');
    deleteButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M14.12 10.47L12 12.59l-2.13-2.12l-1.41 1.41L10.59 14l-2.12 2.12l1.41 1.41L12 15.41l2.12 2.12l1.41-1.41L13.41 14l2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM8 9h8v10H8z"/></svg>`;

    actionsDiv.appendChild(deleteButton);

    return actionsDiv;
}

function renderTaskDetails(name, dueDate, categoryName) {
    const taskDetails = document.createElement('div');
    taskDetails.classList.add('task-details');
    taskDetails.setAttribute('data-action', 'edit');

    const taskName = document.createElement('p');
    taskName.textContent = name;
    taskName.classList.add('task-name');
    taskDetails.appendChild(taskName);

    if (dueDate) {
        const taskDate = document.createElement('p');
        taskDate.textContent = dueDate;
        taskDate.classList.add('task-due');
        taskDetails.appendChild(taskDate);
    }

    if (categoryName) {
        const taskCategory = document.createElement('p');
        taskCategory.textContent = categoryName;
        taskCategory.classList.add('task-category');
        taskDetails.appendChild(taskCategory);
    }

    return taskDetails;
}

function renderCheckBox(isComplete) {
    // Create the checkbox
    const checkboxWrapper = document.createElement('div');
    checkboxWrapper.setAttribute('aria-label', 'Complete task');

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('tabindex', -1);
    checkbox.setAttribute('data-action', 'isComplete');

    if (isComplete) {
        checkbox.setAttribute('checked', true);
    }

    checkboxWrapper.appendChild(checkbox);

    return checkboxWrapper;
}

function renderTaskItem(taskObject, categoryName) {
    const { id, name, dueDate, categoryID, isUrgent, isComplete } = taskObject;

    // Create the container
    const listItem = document.createElement('li');
    listItem.setAttribute('data-id', id);
    listItem.setAttribute('tabindex', 0);
    if (isComplete) listItem.classList.add('complete');
    if (isUrgent) listItem.classList.add('urgent');

    // Add content
    listItem.appendChild(renderCheckBox(isComplete));
    listItem.appendChild(renderTaskDetails(name, dueDate, categoryName));
    listItem.appendChild(renderActionsDiv(isUrgent));

    return listItem;
}

export default function renderTaskList(tasks, categories) {
    const tasksList = document.getElementById('tasks-list');
    // console.log('rendering task list', tasks);

    // Remove current children
    while (tasksList.firstChild) {
        tasksList.removeChild(tasksList.firstChild);
    }

    // TODO: Sort by date and completion status

    tasks.forEach((taskObject) => {
        const { categoryID } = taskObject;

        let categoryName = '';

        if (categoryID) {
            const category = categories.find((i) => i.id === categoryID);
            categoryName = category.name;
        }
        tasksList.appendChild(renderTaskItem(taskObject, categoryName));
    });
}
