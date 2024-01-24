import { renderDialogForm } from './forms';

export function mountModals() {
    const dialog = document.querySelector('dialog');
    const dialogCloseButton = document.querySelector('dialog button');

    // Get all the buttons on the page with class 'open-dialog'
    const openDialogButtons = document.querySelectorAll('button.open-dialog');

    // Add event listener for each, and selectively inject the right form
    openDialogButtons.forEach((button) => {
        button.addEventListener('click', () => {
            dialog.showModal();

            const buttonAction = button.dataset.action;
            const dialogForm = document.querySelector('dialog > form');

            while (dialogForm.firstChild) {
                dialogForm.removeChild(dialogForm.firstChild);
            }

            const formContent = renderDialogForm(buttonAction);
            dialogForm.appendChild(formContent);
        });
    });

    dialogCloseButton.addEventListener('click', () => {
        dialog.close();
    });
}
