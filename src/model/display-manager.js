import renderTaskList from '../components/tasklist';
import renderCategoryList from '../components/categorylist';

export default class DisplayManager {
    static #selectedCategory = '';
    static #taskList = [];
    static #categoryList = [];

    // Public method subs to listmanagers, recieves the list content on list
    // changes and routes rendering of UI to the right view renderer
    static updateView(listKey, listData) {
        if (!listKey) return;

        if (listKey === 'task-list-store') {
            this.#taskList = listData;
            renderTaskList(this.#filteredTaskList());
        }

        if (listKey === 'category-list-store') {
            this.#categoryList = listData;
            renderCategoryList(listData);
        }
    }

    // Publis method to toggle category filtering
    static filterCategory(id) {
        this.#selectedCategory = id === this.#selectedCategory ? '' : id;

        renderTaskList(this.#filteredTaskList());
    }

    static #filteredTaskList() {
        if (!this.#selectedCategory) return this.#taskList;

        let tasks = this.#taskList.filter(
            (item) => item.category === this.#selectedCategory
        );
        return tasks;
    }
}
