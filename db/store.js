// Import necessary modules
const util = require("util");
const fs = require("fs")
const { v4: uuidv4 } = require('uuid'); // Import UUID for unique note IDs

// Promisify fs.readFile and fs.writeFile for async operations
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Define the Store class to handle note operations
class Store {
    // Method to read the contents of the db.json file
    read() {
        return readFileAsync("db/db.json", "utf8")
    }

    // Method to write content to the db.json file
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note, null, 4))
    }

    // Method to get all notes from the file
    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;
            // Try to parse the notes; if it fails, return an empty array
            try {
                parsedNotes = [].concat(JSON.parse(notes))
            } catch (error) {
                parsedNotes = []
            }

            return parsedNotes;
        })
    }
    // Method to add a new note
    addNotes(notes) {
        const { title, text } = notes;

        // If the note doesn't have a title or text, throw an error
        if (!title || !text) {
            throw new Error("Please add text")
        }

        // Create a new note object with a unique ID
        const newNote = { title, text, id: uuidv4() }

        // Get all existing notes, add the new note, then save the updated notes
        return this.getNotes().then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => newNote);
    }
    // Method to remove a note by ID
    removeNotes(id) {
        // Get all notes, filter out the note with the given ID, and save the updated notes
        return this.getNotes().then((notes) => notes.filter((note) => note.id !== id))
            .then((filteredNotes) => this.write(filteredNotes))
    }
}
// Create an instance of the Store class and log all notes (for testing purposes)
const a = new Store().getNotes().then((notes) => console.log(notes))
// Export the Store instance for use in other modules
module.exports = new Store();