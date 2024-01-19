import './style.css';

import { taskList, categoryList, Task, Category } from './model';
import renderTaskList from './components/tasks/tasklist';

const tasks = taskList.getItems();

// taskList.addItem({
//     name: 'That was a lie this is the last item',
//     category: 'Shopping',
//     isUrgent: true,
// });

renderTaskList(tasks);
