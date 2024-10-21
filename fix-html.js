const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'dist', 'index.html');


// for some reason, vite doesn't build the path properly with the ./ reference.
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading index.html:', err);
        return;
    }

    const updatedData = data
        .replace(/src="\/assets\//g, 'src="./assets/')
        .replace(/href="\/assets\//g, 'href="./assets/');

    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing index.html:', err);
        } else {
            console.log('Updated index.html paths successfully.');
        }
    });
});