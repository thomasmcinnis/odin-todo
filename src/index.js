import './style.css';

import ListManager from './model/list-manager';
import Task from './model/task';
import renderTaskList from './components/tasks/tasklist';

const taskList = new ListManager('task-list-store', Task);

taskList.sub(renderTaskList);

taskList.initList();

// initialise event listeners and callback relevant taskList functions

// taskList.addItem({ name: 'this is another task' });
