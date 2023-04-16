const createMovieNotes = `
    CREATE TABLE IF NOT EXISTS movie_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR NOT NULL,
    description VARCHAR,
    rating INTEGER,
    user_id REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

module.exports = createMovieNotes;