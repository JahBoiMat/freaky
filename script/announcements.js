// Fetch and display announcements when the page loads
window.addEventListener('DOMContentLoaded', loadAnnouncements);

function loadAnnouncements() {
  fetch('../announcements.json')
    .then(response => response.json())
    .then(data => displayAnnouncements(data))
    .catch(err => console.error('Error loading announcements:', err));
}

function displayAnnouncements(data) {
  const container = document.getElementById('announcements');
  container.innerHTML = '<h2 style="color:white;">Latest Announcements</h2>';
  data.forEach(announcement => {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="announcement">
      <h3 class="text">${announcement.title}</h3>
      <p class="text">${announcement.date}</p>
      <p class="text">${announcement.content}</p>
    </div>
    `;
    container.appendChild(div);
  });
}

document.getElementById('add-announcement').addEventListener('click', () => {
  const title = document.getElementById('title').value;
  const date = document.getElementById('date').value;
  const content = document.getElementById('content').value;

  if (!title || !date || !content) {
    alert('Please fill out all fields!');
    return;
  }

  const newAnnouncement = { title, date, content };

  // Send the new announcement to the server
  fetch('/announcements', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnnouncement),
  })
    .then(() => {
      loadAnnouncements(); // Reload announcements after adding
      document.getElementById('title').value = '';
      document.getElementById('date').value = '';
      document.getElementById('content').value = '';
    })
    .catch(err => console.error('Error adding announcement:', err));
});
