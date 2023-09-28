const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const folderPath = path.join(__dirname, 'text_files');

app.use(express.json());

// Endpoint to create a text file with the current timestamp as content
app.post('/createFile', (req, res) => {
  const timestamp = new Date().toISOString();
  const filename = `${timestamp}.txt`;
  const filePath = path.join(folderPath, filename);

  fs.writeFile(filePath, timestamp, (err) => {
    if (err) {
      console.error('Error creating the file:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(201).json({ message: 'File created successfully', filename });
    }
  });
});

// Endpoint to retrieve all text files in the folder
app.get('/getAllFiles', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading files:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).json({ files });
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

