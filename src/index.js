/**
 * A class for constructing Task Objects
 */
class Task {
    constructor(formData) {
        if (!formData || !formData.name)
            throw new Error('Task name is required');

        const { id, name, category, dueDate, isUrgent, createdDate } = formData;

        this.id = id === undefined ? self.crypto.randomUUID() : id;
        this.name = name;
        this.category = category;
        this.dueDate = dueDate;
        this.isUrgent = isUrgent === undefined ? false : isUrgent;
        this.createdDate = createdDate === undefined ? new Date() : createdDate;
    }

    toggleIsUrgent() {
        this.isUrgent = !this.isUrgent;
        TaskList.updateStore(); // don't love this ideally Task objects are unaware of updating the data store
    }

    deleteSelf() {
        TaskList.deleteTask(this.id);
    }
}

/**
 * A singleton class providing public interfaces to work with the storage
 */
class ListStorage {
    // Name to give the  store in localStorage
    static #key = 'task-list';

    // Load the local data store
    static loadStore() {
        try {
            return JSON.parse(localStorage.getItem(this.#key));
        } catch (err) {
            console.error(err.message);
        }
    }

    // Update the local data store
    static updateStore() {
        try {
            localStorage.setItem(
                this.#key,
                JSON.stringify(TaskList.getTasks())
            );
        } catch (err) {
            console.error(err.message);
        }
    }
}

/**
 * A singleton class providing public interfaces to work with the task list
 */
class TaskList {
    // Initialise taskList with localStorage
    static #tasks;

    // Private method to call if tasks is undefined to initialise from store
    static #initialiseTasks() {
        const store = ListStorage.loadStore();

        if (!store) {
            this.#tasks = [];
        } else {
            this.#tasks = store.map((item) => new Task(item));
        }
    }

    // Public method to get tasks
    static getTasks() {
        if (!this.#tasks) this.#initialiseTasks();

        return this.#tasks;
    }

    // Public method to add task
    static addTask(task) {
        if (!this.#tasks) this.#initialiseTasks();

        this.#tasks.push(task);

        ListStorage.updateStore();
    }

    // Public method to delete task
    static deleteTask(id) {
        if (!this.#tasks) this.#initialiseTasks();

        if (this.#tasks.length === 0) return;

        const filteredTasks = this.#tasks.filter((task) => {
            return task.id !== id;
        });

        this.#tasks = filteredTasks;

        ListStorage.updateStore();
    }

    // Public method to trigger updating the storage for changes to tasks
    static updateStore() {
        ListStorage.updateStore();
    }
}
