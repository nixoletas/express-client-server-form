const express = require('express');
const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'templates')));

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'templates', 'index.html');

    fs.readFile(filePath, 'utf8', (err, html) => {
        if (err) {
            console.error('Error reading the HTML file:', err);
            return res.status(500).send('Server Error');
        }

        // Minify the HTML before sending it
        const optimizedHtml = minify(html, {
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true,
        });

        res.send(optimizedHtml);
    });
});

app.post('/send-form', (req, res) => {
    const data = req.body;
    console.log('Received form data:', data);

    res.json({ success: true, message: 'Form data received successfully!', data });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
