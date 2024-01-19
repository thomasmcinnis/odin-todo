function renderUrgentBtn(isUrgent) {
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('task-actions');

    const urgentButton = document.createElement('button');
    urgentButton.setAttribute('tabindex', -1);

    if (isUrgent) urgentButton.setAttribute('urgent', 'true');
    urgentButton.classList.add('action-btn');

    urgentButton.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M2.725 21q-.275 0-.5-.137t-.35-.363q-.125-.225-.137-.488t.137-.512l9.25-16q.15-.25.388-.375T12 3q.25 0 .488.125t.387.375l9.25 16q.15.25.138.513t-.138.487q-.125.225-.35.363t-.5.137zM12 18q.425 0 .713-.288T13 17q0-.425-.288-.712T12 16q-.425 0-.712.288T11 17q0 .425.288.713T12 18m0-3q.425 0 .713-.288T13 14v-3q0-.425-.288-.712T12 10q-.425 0-.712.288T11 11v3q0 .425.288.713T12 15"/></svg>
    `;

    actionsDiv.appendChild(urgentButton);

    return actionsDiv;
}

function renderTaskDetails(name, category, date) {
    const taskDetails = document.createElement('div');
    taskDetails.classList.add('task-details');

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

    return taskDetails;
}

function renderCheckBox() {
    // Create the checkbox
    const checkboxWrapper = document.createElement('div');
    checkboxWrapper.setAttribute('aria-label', 'Complete task');

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('tabindex', -1);

    checkboxWrapper.appendChild(checkbox);

    return checkboxWrapper;
}

function renderTaskItem(taskObject, index) {
    const { name, date, category, isUrgent } = taskObject;

    // Create the container
    const listItem = document.createElement('li');
    listItem.setAttribute('data-id', index);
    listItem.setAttribute('tabindex', 0);

    // Add content
    listItem.appendChild(renderCheckBox());
    listItem.appendChild(renderTaskDetails(name, date, category));
    listItem.appendChild(renderUrgentBtn(isUrgent));

    return listItem;
}

export default function renderTaskList(tasks) {
    const tasksList = document.getElementById('tasks-list');

    tasks.forEach((taskObject, index) => {
        tasksList.appendChild(renderTaskItem(taskObject, index));
    });
}
