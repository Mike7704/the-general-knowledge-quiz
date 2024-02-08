import Database from "better-sqlite3";

// Hook up our database.db to get methods
const db = new Database("database.db");

// Executes SQL query to create a user database that stores high scores from each quiz
db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT,
    generalHighScore INTEGER,
    filmHighScore INTEGER,
    musicHighScore INTEGER,
    sportHighScore INTEGER,
    historyHighScore INTEGER,
    geographyHighScore INTEGER
)`);

// Insert test data to database
db.exec(`
    INSERT into users (username, password, generalHighScore, filmHighScore, musicHighScore, sportHighScore, historyHighScore, geographyHighScore)
    VALUES
    ('admin', 'admin123', 0, 0, 0, 0, 0, 0),
    ('Mike7704', 'Password123', 2, 3, 4, 6, 5, 1),
    ('Harry23', 'abc123', 0, 2, 0, 0, 0, 1),
    ('John888', '12345', 3, 0, 0, 2, 0, 1)
`);
