/**
 * A class for constructing Task Objects
 *  - Takes an object which must contain `name`
 *  - Optionally includes
 *      - category: id of category in Categories
 *      - dueDate: Date
 *      - isUrgent: Bool
 */
export default class Task {
    constructor(formData) {
        if (!formData || !formData.name)
            throw new Error('Task name is required');

        const {
            id,
            name,
            category,
            dueDate,
            isUrgent,
            isComplete,
            createdDate,
        } = formData;

        this.id = id === undefined ? self.crypto.randomUUID() : id;
        this.name = name;
        this.category = category;
        this.dueDate = dueDate;
        this.isUrgent = isUrgent === undefined ? false : isUrgent;
        this.isComplete = isComplete === undefined ? false : isComplete;
        this.createdDate = createdDate === undefined ? new Date() : createdDate;
    }

    toggle(action) {
        switch (action) {
            case 'urgent':
                this.isUrgent = !this.isUrgent;
                break;
            case 'complete':
                this.isComplete = !this.isComplete;
                break;
            default:
                throw new Error('value does not exist on object');
        }
    }
}
