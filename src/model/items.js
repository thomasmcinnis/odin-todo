class Item {
    constructor(formData) {
        if (!formData.name) throw new Error('Name is required');

        const { id, name } = formData;

        this.id = id === undefined ? self.crypto.randomUUID() : id;
        this.name = name;
    }

    toggle(propName) {
        if (
            !this.hasOwnProperty(propName) ||
            typeof this[propName] !== 'boolean'
        )
            throw new Error(
                `Boolean value of ${propName} does not exist on object`
            );

        this[propName] = !this[propName];
    }

    setValue(propName, newValue) {
        if (!this.hasOwnProperty(propName))
            throw new Error('Property does not exist');

        if (typeof this[propName] !== typeof newValue)
            throw new Error(
                `Passed in value is not of type ${typeof this[propName]}`
            );

        this[propName] = newValue;
    }
}

export class Task extends Item {
    constructor(formData) {
        const { category, dueDate, isUrgent, isComplete, createdDate } =
            formData;

        super(formData);
        this.category = category;
        this.dueDate = dueDate;
        this.isUrgent = isUrgent === undefined ? false : isUrgent;
        this.isComplete = isComplete === undefined ? false : isComplete;
        this.createdDate = createdDate === undefined ? new Date() : createdDate;
    }
}

export class Category extends Item {
    constructor(formData) {
        super(formData);

        // TODO: add color option
    }
}
