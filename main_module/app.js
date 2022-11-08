const chalk = require('chalk');
const yargs = require('yargs');

const notes = require('./notes');

yargs.version('1.1.0');

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Note content',
            demandOption: true,
            type: 'string',
        },
    },
    handler(arg) {
        notes.addNotes(arg.title, arg.body);
    },
});

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler(arg) {
        notes.removeNotes(arg.title);
    },
});

yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler(arg) {
        notes.readNotes(arg.title);
    },
});

yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler() {
        notes.listNotes();
    },
});

yargs.parse();
