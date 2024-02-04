import { Task, Category } from './items';

/**
 * A decorator function for constructing singletons from any Class
 */
function singletonDecorator(Class, ...args) {
    Class.instance = new Class(...args);
}

/**
 * Un-instantiated singleton providing interfaces to work with localStorage
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
 * A base class for all the functions needed to manage a list
 */
class ListManager {
    constructor(listKey, listItemClass) {
        this.LIST_KEY = listKey;
        this.ITEM_CLASS = listItemClass;

        this.itemsList;
        this.subsribers = [];
    }

    // Methods to retrieve items
    getItems() {
        return this.itemsList;
    }

    getItemIndex(UID) {
        const index = this.itemsList.findIndex(({ id }) => id === UID);

        if (index === null) {
            throw new Error('The selected item was not found in the list');
        }

        return index;
    }

    // Methods to add and remove items
    updateStore() {
        StoreManager.updateStore(this.itemsList, this.LIST_KEY);
    }

    addItem(item) {
        this.itemsList.push(new this.ITEM_CLASS(item));

        this.notifySubs();
        this.updateStore();
    }

    deleteItem(id) {
        if (this.itemsList.length === 0) return;

        const filteredItems = this.itemsList.filter((item) => {
            return item.id !== id;
        });

        this.itemsList = filteredItems;

        this.notifySubs();
        this.updateStore();
    }

    /**
     * Takes in a values object and the id
     * will merge passed in values with existing item values
     */
    updateItemValues(values, id) {
        const itemIndex = this.getItemIndex(id);
        let valuesArr = Object.entries(values);

        valuesArr.forEach(([key, val]) => {
            try {
                this.itemsList[itemIndex].setValue(key, val);
            } catch (err) {
                console.error(err.message);
            }
        });

        this.notifySubs();
        this.updateStore();
    }

    toggleItemValue(propName, id) {
        const itemIndex = this.getItemIndex(id);

        try {
            this.itemsList[itemIndex].toggle(propName);
        } catch (err) {
            console.error(err.message);
        }

        this.notifySubs();
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

    notifySubs() {
        this.subsribers.forEach((subsriber) =>
            subsriber(this.LIST_KEY, this.getItems())
        );
    }

    // Method to call if tasks is undefined to initialise from store
    initList() {
        if (!this.itemsList) {
            const store = StoreManager.loadStore(this.LIST_KEY);

            this.itemsList = store
                ? store.map((item) => new this.ITEM_CLASS(item))
                : [];

            this.notifySubs();
        }

        this.updateStore(); // sync store with itemsList prob redundant
    }
}

// The list managers with methods specific to them
class TaskListManager extends ListManager {}

class CategoryListManager extends ListManager {
    constructor(...args) {
        super(...args);
        this.selected;
    }

    selectItem(id) {
        this.selected = id === this.selected ? '' : id;
        console.log(this.selected);
        // On this change we need to notify either the tasklist renderer
        // or the tasklistmanager that there are changes so that it
        // re-renders with the list filtered to just this category
    }

    getCategoryName(id) {
        const name = this.itemsList[this.getItemIndex(id)].name;
        return name;
    }
}

// Instantiate the TaskListManager as a singleton and export to the app
singletonDecorator(TaskListManager, 'task-list-store', Task);
singletonDecorator(CategoryListManager, 'category-list-store', Category);

export const taskListManager = TaskListManager.instance;
export const categoryListManager = CategoryListManager.instance;
