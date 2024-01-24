import Task from './task';

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
    static updateStore(data, key) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (err) {
            console.error(err.message);
        }
    }
}

/**
 * A singleton class for constructing List Objects
 */
export default class TaskListManager {
    static LIST_KEY = 'task-list-store';
    static ITEM_CLASS = Task;

    static itemsList;

    static subsribers = [];

    // Methods to retrieve items
    static getItems() {
        return this.itemsList;
    }

    static getItemIndex(UID) {
        const index = this.itemsList.findIndex(({ id }) => id === UID);

        if (index === null) {
            throw new Error('The selected item was not found in the list');
        }

        return index;
    }

    // Methods to add and remove items
    static updateStore() {
        StoreManager.updateStore(this.itemsList, this.LIST_KEY);
    }

    static addItem(item) {
        this.itemsList.push(new this.ITEM_CLASS(item));

        this.notifySubs(this.getItems());
        this.updateStore();
    }

    static deleteItem(id) {
        if (this.itemsList.length === 0) return;

        const filteredItems = this.itemsList.filter((item) => {
            return item.id !== id;
        });

        this.itemsList = filteredItems;

        this.notifySubs(this.getItems());
        this.updateStore();
    }

    // Methods to mutate items
    static toggleField(action, id) {
        const itemIndex = this.getItemIndex(id);

        try {
            this.itemsList[itemIndex].toggle(action);
        } catch (err) {
            console.error(err.message);
        }
        this.notifySubs(this.getItems());
        this.updateStore();
    }

    // PubSub for list
    static sub(subsriber) {
        if (typeof subsriber !== 'function') {
            throw new Error(`Type ${typeof subsriber} is not a function`);
        }
        this.subsribers = [...this.subsribers, subsriber];
    }

    static unsub(subsriber) {
        if (typeof subsriber !== 'function') {
            throw new Error(`Type ${typeof subsriber} is not a function`);
        }
        this.subsribers = this.subsribers.filter((sub) => sub !== subsriber);
    }

    static notifySubs(message) {
        this.subsribers.forEach((subsriber) => subsriber(message));
    }

    // Method to call if tasks is undefined to initialise from store
    static initList() {
        if (!this.itemsList) {
            const store = StoreManager.loadStore(this.LIST_KEY);

            this.itemsList = store
                ? store.map((item) => new this.ITEM_CLASS(item))
                : [];

            this.notifySubs(this.getItems());
        }

        this.updateStore(); // sync store with itemsList prob redundant
    }
}
