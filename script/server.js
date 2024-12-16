const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000; // Adjust as needed
const filePath = path.join(__dirname, 'anno.json');

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files (HTML, CSS, JS)

// Get announcements
app.get('anno.json', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Server error');
    }
    res.send(JSON.parse(data));
  });
});

// Add a new announcement
app.post('/announcement', (req, res) => {
  const newAnnouncement = req.body;

  if (!newAnnouncement.title || !newAnnouncement.date || !newAnnouncement.content) {
    return res.status(400).send('All fields are required');
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Server error');
    }

    const announcements = JSON.parse(data);
    announcements.unshift(newAnnouncement); // Add new announcement at the top

    fs.writeFile(filePath, JSON.stringify(announcements, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).send('Server error');
      }
      res.status(201).send('Announcement added');
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});