/**
 * A class for constructing Category Objects
 */
class Category {
    constructor({ name, id }) {
        if (!name) throw new Error('Category name is required');

        this.name = name;
        this.id === undefined ? self.crypto.randomUUID() : id;
    }

    deleteSelf() {
        CategoryList.deleteItem(this.id);
    }

    updateName(newName) {
        this.name = newName;
        // call the CategoryList updater interface to sync change
    }
}

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
        TaskList.deleteItem(this.id);
    }
}

/**
 * A singleton class providing public interfaces to work with the storage
 */
class StoreManager {
    // Load the local data store
    static loadStore(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (err) {
            console.error(err.message);
        }
    }

    // Update the local data store
    static updateStore(key, func) {
        try {
            localStorage.setItem(key, JSON.stringify(func));
        } catch (err) {
            console.error(err.message);
        }
    }
}

/**
 * A singleton class providing public interfaces to work with the task list
 */
class TaskList {
    static #LIST_KEY = 'task-list-store';
    // Initialise taskList with localStorage
    static #items;

    // Private method to call if tasks is undefined to initialise from store
    static #initialise() {
        const store = StoreManager.loadStore(this.#LIST_KEY);

        if (!store) {
            this.#items = [];
        } else {
            this.#items = store.map((item) => new Task(item));
        }
    }

    // Public method to get tasks
    static getItems() {
        if (!this.#items) this.#initialise();

        return this.#items;
    }

    // Public method to add task
    static addItem(task) {
        if (!this.#items) this.#initialise();

        this.#items.push(task);

        StoreManager.updateStore(this.#LIST_KEY, this.getTasks());
    }

    // Public method to delete task
    static deleteItem(id) {
        if (!this.#items) this.#initialise();

        if (this.#items.length === 0) return;

        const filteredItems = this.#items.filter((item) => {
            return item.id !== id;
        });

        this.#items = filteredItems;

        StoreManager.updateStore(this.#LIST_KEY, this.getItems());
    }

    // Public method to trigger updating the storage for changes to tasks
    static updateStore() {
        StoreManager.updateStore(this.#LIST_KEY, this.getItems());
    }
}

/**
 * A singleton class to manage the list of categories
 */
class CategoryList {
    static #LIST_KEY = 'category-list-store';
    static #items;

    // Private method to call if categories list is undefined to initialise from store
    static #initialise() {
        const store = StoreManager.loadStore(this.#LIST_KEY);

        if (!store) {
            this.#items = [];
        } else {
            this.#items = store.map((item) => new Category(item));
        }
    }

    // Public method to get tasks
    static getItems() {
        if (!this.#items) this.#initialise();

        return this.#items;
    }

    // Public method to add task
    static addItem(task) {
        if (!this.#items) this.#initialise();

        this.#items.push(task);

        StoreManager.updateStore(this.#LIST_KEY, this.getItems());
    }

    // Public method to delete task
    static deleteItem(id) {
        if (!this.#items) this.#initialise();

        if (this.#items.length === 0) return;

        const filteredItems = this.#items.filter((item) => {
            return item.id !== id;
        });

        this.#items = filteredItems;

        StoreManager.updateStore(this.#LIST_KEY, this.getItems());
    }

    // Public method to trigger updating the storage for changes to tasks
    static updateStore() {
        StoreManager.updateStore(this.#LIST_KEY, this.getItems());
    }
}

// CategoryList.addItem(new Category({ name: 'Category Name' }));
console.log(TaskList.getItems());
console.log(CategoryList.getItems());

// CategoryList.getItems()[0].deleteSelf();
