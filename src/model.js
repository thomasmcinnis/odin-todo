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
 * A class for constructing Category Objects
 *  - Takes an object which must contain `name`
 */
export class Category {
    constructor(formData) {
        if (!formData || !formData.name)
            throw new Error('Category name is required');

        const { id, name } = formData;

        this.id = id === undefined ? self.crypto.randomUUID() : id;
        this.name = name;
    }

    deleteSelf() {
        categoryList.deleteItem(this.id);
    }

    updateName(newName) {
        this.name = newName;
        categoryList.updateStore();
    }
}

/**
 * A class for constructing Task Objects
 *  - Takes an object which must contain `name`
 *  - Optionally includes
 *      - category: id of category in Categories
 *      - dueDate: Date
 *      - isUrgent: Bool
 */
export class Task {
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
        taskList.updateStore(); // don't love this ideally Task objects are unaware of updating the data store
    }

    deleteSelf() {
        taskList.deleteItem(this.id);
    }
}

/**
 * A class for constructing List Objects
 */
class ListManager {
    constructor(listKey, ItemClass) {
        this.LIST_KEY = listKey;
        this.ItemClass = ItemClass;
        this.items;
    }

    // Method to call if tasks is undefined to initialise from store
    initialise() {
        const store = StoreManager.loadStore(this.LIST_KEY);

        this.items = store ? store.map((item) => new this.ItemClass(item)) : [];
    }

    // Method to get items list
    getItems() {
        if (!this.items) this.initialise();
        return this.items;
    }

    // Method to add item to items list
    addItem(item) {
        if (!this.items) this.initialise();

        this.items.push(new this.ItemClass(item));
        this.updateStore();
    }

    // Method to delete item from items list
    deleteItem(id) {
        if (!this.items) this.initialise();

        if (this.items.length === 0) return;

        const filteredItems = this.items.filter((item) => {
            return item.id !== id;
        });

        this.items = filteredItems;

        this.updateStore();
    }

    // Method to trigger updating the storage from items list
    updateStore() {
        StoreManager.updateStore(this.LIST_KEY, this.getItems());
    }
}

export const taskList = new ListManager('task-list-store', Task);
export const categoryList = new ListManager('category-list-store', Category);
