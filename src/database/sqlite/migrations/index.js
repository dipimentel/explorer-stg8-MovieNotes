const createUsers = require("./createUsers");
const createMovieNotes = require("./createMovieNotes");
const createMovieTags = require("./createMovieTags");
const sqliteConnection = require("../../sqlite")

async function migrationsRun() {
    const schema = [
        createUsers,
    ].join("");

    sqliteConnection()
    .then(db => db.exec(schema))
    .catch(err => console.error(err));
}

module.exports = migrationsRun;