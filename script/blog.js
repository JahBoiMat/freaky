emailjs.init('ZWeS_sMCdOtfWwwGG');

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
    
        emailjs.send('service_wteaoa3', 'template_hnzw8ge', {
            title: title,
            content: content,
            comments: comments,
        }).then(() => {
            alert('Innlegget ble sendt!');
            popupModal.style.display = 'none';
        }).catch(err => {
            alert('Noe gikk galt. Vennligst prøv igjen.');
            console.error(err);
        });
    });
});
