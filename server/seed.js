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
    ('Mike7704', 'Password123', 4, 3, 7, 8, 5, 1)
`);
