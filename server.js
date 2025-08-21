const { loadMessages, saveMessage } = require('./src/utils/msgOP');
const express = require('express');
const path = require('path');
const readline = require('readline');

const app = express()

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// app
const history = loadMessages();
history.forEach(msg => {
    console.log(`Author: ${msg.author}: ${msg.text}`);
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    if (input.trim()) {
        const msg = {
            author: "SERVER",
            time: new Date().toISOString(),
            text: input
        };

        console.log(`💻 Server: ${input}`);
        saveMessage(msg);
    }
});
