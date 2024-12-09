document.addEventListener('DOMContentLoaded', () => {
    const writeBtn = document.getElementById('write-btn');
    const popupModal = document.getElementById('popup-modal');
    const cancelBtn = document.getElementById('cancel-btn');
    const sendBtn = document.getElementById('send-btn');

    // Open popup
    writeBtn.addEventListener('click', () => {
        popupModal.style.display = 'flex';
    });

    // Close popup
    cancelBtn.addEventListener('click', () => {
        popupModal.style.display = 'none';
    });

    // Handle form submission
    sendBtn.addEventListener('click', () => {
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const comments = document.getElementById('comments').value;

        if (!title || !content || !comments) {
            alert('Vennligst fyll ut alle feltene før du sender.');
            return;
        }

        // Log the input values (you'll replace this with the email sending logic)
        console.log('Overskrift:', title);
        console.log('Innhold:', content);
        console.log('Kommentarer:', comments);

        alert('Innlegget ble sendt! (Denne funksjonen er under utvikling.)');
        popupModal.style.display = 'none';
    });
});
