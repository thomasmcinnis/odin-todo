import renderTaskList from '../components/tasklist';
import renderCategoryList from '../components/categorylist';
import { renderSelectCategoryList } from '../components/form';

export default class DisplayManager {
    static #selectedCategory = '';
    static #taskList = [];
    static #categoryList = [];

    // Public method subs to listmanagers, receives the list content on list
    // changes and routes rendering of UI to the right view renderer
    static updateView(listKey, listData) {
        if (!listKey) return;

        if (listKey === 'task-list-store') {
            this.#taskList = listData;
            renderTaskList(this.#filteredTaskList(), this.#categoryList);
        }

        if (listKey === 'category-list-store') {
            this.#categoryList = listData;
            renderCategoryList(this.#categoryList, this.#selectedCategory);
            renderSelectCategoryList(this.#categoryList);
        }
    }

    // Publis method to toggle category filtering
    static filterCategory(id) {
        this.#selectedCategory = id === this.#selectedCategory ? '' : id;

        renderTaskList(this.#filteredTaskList());
        renderCategoryList(this.#categoryList, this.#selectedCategory);
    }

    // Private method returns the stored tasklist filtered by selected category
    static #filteredTaskList() {
        if (!this.#selectedCategory) return this.#taskList;

        let tasks = this.#taskList.filter(
            (item) => item.categoryID === this.#selectedCategory
        );
        return tasks;
    }
}
