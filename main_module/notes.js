const fs = require('fs');
const chalk = require('chalk');

const printNotes = () => {
    return `
    My Name is Andrew.
    Drink more water.
    Get more sleep.
    Eat more efficiently.
    `;
};

const addNotes = (name, content) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => {
        return note.title === name;
    });
    if (duplicateNotes.length === 0) {
        notes.push({ title: name, body: content });
        saveNotes(notes);
        console.log(chalk.green.bold('New note added!'));
    } else console.log('Note Title Taken!');
};

const removeNotes = (name) => {
    const notes = loadNotes();
    const leftNotes = notes.filter((note) => {
        return note.title !== name;
    });
    if (notes.length === leftNotes.length) {
        console.log(chalk.red.bold('No Note Found!'));
    } else {
        saveNotes(leftNotes);
        console.log(chalk.green.bold('Note Removed!'));
    }
};

const readNotes = (name) => {
    const notes = loadNotes();
    const noteToBeRead = notes.find((note) => note.title === name);
    if (noteToBeRead) {
        console.log(chalk.bold.green(noteToBeRead.body));
    } else console.log(chalk.bold.red('No Note Found!'));
};

const listNotes = () => {
    const notes = loadNotes();
    for (let note of notes) {
        const title = chalk.blue.bold(note.title);
        const body = chalk.yellow(note.body);
        console.log(`Title: ${title}\n Body: ${body}`);
    }
};

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
};

const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes.json').toString());
    } catch (err) {
        return [];
    }
};

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes,
    printNotes: printNotes,
};
