/**
 * A singleton class as interface to tasks in localStorage
 */
class TaskStore {
    // Name to give the  store in localStorage
    static #key = 'task-list';

    // Initialise taskList with localStorage
    static #taskList = [...this.#loadStore()];

    // Load the local data store
    static #loadStore() {
        try {
            const store = JSON.parse(localStorage.getItem(this.#key));
            if (store !== null) {
                return store;
            }
            return [];
        } catch (err) {
            console.error(err.message);
        }
    }

    // Update the local data store
    static #updateStore() {
        try {
            localStorage.setItem(this.#key, JSON.stringify(this.#taskList));
        } catch (err) {
            console.error(err.message);
        }
    }

    // Public method to add task
    static addTask(task) {
        this.#taskList.push(task);

        this.#updateStore();

        console.table(this.#taskList); // Testing only
    }

    // Public method to delete task
    static deleteTask(id) {
        const filteredTasks = this.#taskList.filter((task) => {
            return task.id !== id;
        });

        this.#taskList = filteredTasks;

        this.#updateStore();

        console.table(this.#taskList); // Testing only
    }
}

class Task {
    constructor(formData) {
        if (!formData || !formData.name)
            throw new Error('Task name is required');

        const { name, category, dueDate, isUrgent } = formData;

        this.id = self.crypto.randomUUID();
        this.name = name;
        this.category = category;
        this.dueDate = dueDate;
        this.isUrgent = isUrgent == undefined ? false : isUrgent;
        this.createdDate = new Date();
    }

    toggleIsUrgent() {
        this.isUrgent = !this.isUrgent;
        return this.isUrgent;
    }
}

const task1 = new Task({ name: 'my new task', category: 'shopping' });
const task2 = new Task({ name: 'another task', category: 'work' });
