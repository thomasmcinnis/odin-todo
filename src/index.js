import './style.css';

import { taskListManager, categoryListManager } from './model/list-manager';
import {
    mountNewTaskModal,
    mountNewCategoryModal,
    mountTaskList,
    mountCategoryList,
} from './model/event-manager';
import DisplayManager from './model/display-manager';

//----- Make the modals interactive
mountNewTaskModal();
mountNewCategoryModal();

//----- Make the lists interactive
mountTaskList();
mountCategoryList();

//----- Subscribe display manager to respective list managers
taskListManager.sub(DisplayManager.updateView.bind(DisplayManager));
categoryListManager.sub(DisplayManager.updateView.bind(DisplayManager));

//----- Initialise lists, retrieving values from storage, app now ready
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
