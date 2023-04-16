const createMovieTags = `
    CREATE TABLE IF NOT EXISTS movie_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    note_id REFERENCES movie_notes(id) ON DELETE CASCADE,
    user_id REFERENCES users(id),
    name VARCHAR
    );
`;

module.exports = createMovieTags;