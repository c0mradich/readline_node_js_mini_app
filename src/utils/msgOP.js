const fs = require('fs');
const path = require('path');

const msgPath = path.join(__dirname, '..', 'db', 'msg.json');

function loadMessages() {
    try {
        const data = fs.readFileSync(msgPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

function saveMessage(msg) {
    const messages = loadMessages();
    const nextId = messages.length > 0 ? messages[messages.length - 1].id + 1 : 0;

    msg.id = nextId;
    messages.push(msg);

    fs.writeFileSync(msgPath, JSON.stringify(messages, null, 2), 'utf8');
    return msg;
}

module.exports = { loadMessages, saveMessage };
