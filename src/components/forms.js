export function renderDialogForm(action) {
    if (action === 'add-task') {
        const nameField = document.createElement('input');
        nameField.setAttribute('type', 'text');

        return nameField;
    }

    if (action === 'add-category') {
        const radioButton = document.createElement('input');
        radioButton.setAttribute('type', 'radio');

        return radioButton;
    }
}
