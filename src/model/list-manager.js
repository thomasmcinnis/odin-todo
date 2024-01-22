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
 * A class for constructing List Objects
 */
export default class ListManager {
    constructor(LIST_KEY, ITEM_CLASS) {
        this.LIST_KEY = LIST_KEY;
        this.ITEM_CLASS = ITEM_CLASS;

        this.itemsList;

        this.subsribers = [];
    }

    // Methods to retrieve items
    getItems() {
        return this.itemsList;
    }

    getItem(UID) {
        const item = this.itemsList.find(({ id }) => id === UID);

        if (!item) {
            throw new Error('The selected item was not found in the list');
        }

        return item;
    }

    // Methods to add and remove items
    updateStore() {
        StoreManager.updateStore(this.itemsList, this.LIST_KEY);
    }

    addItem(item) {
        this.itemsList.push(new this.ITEM_CLASS(item));

        this.notifySubs(this.getItems());
        this.updateStore();
    }

    deleteItem(id) {
        if (this.itemsList.length === 0) return;

        const filteredItems = this.itemsList.filter((item) => {
            return item.id !== id;
        });

        this.itemsList = filteredItems;

        this.notifySubs(this.getItems());
        this.updateStore();
    }

    // PubSub for list
    sub(subsriber) {
        if (typeof subsriber !== 'function') {
            throw new Error(`Type ${typeof subsriber} is not a function`);
        }
        this.subsribers = [...this.subsribers, subsriber];
    }

    unsub(subsriber) {
        if (typeof subsriber !== 'function') {
            throw new Error(`Type ${typeof subsriber} is not a function`);
        }
        this.subsribers = this.subsribers.filter((sub) => sub !== subsriber);
    }

    notifySubs(message) {
        this.subsribers.forEach((subsriber) => subsriber(message));
    }

    // Method to call if tasks is undefined to initialise from store
    initList() {
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
