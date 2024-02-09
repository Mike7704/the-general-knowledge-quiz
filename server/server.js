import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Database from "better-sqlite3";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 9788;
const db = new Database("database.db");

// The Trivia API for fetching questions
const apiURL = "https://the-trivia-api.com/v2/questions";

// Server test
app.get("/", (req, res) => {
  res.send("Server is live");
  res.status(200);
});

// Get a question from the API
// Use paramaters to set category and difficulty
// eg: /question?category=music&difficulty=easy
app.get("/question", async (req, res) => {
  try {
    let category = req.query.category;
    let difficulty = req.query.difficulty;

    // No URL paramaters so set default values
    if (!category || !difficulty) {
      category = "general_knowledge";
      difficulty = "easy,medium";
    }

    // Fetch and return question
    const questionData = await fetchQuestionFromAPI(category, difficulty);
    res.status(200).json(questionData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Fetch a question from The Trivia API
async function fetchQuestionFromAPI(category, difficulty) {
  try {
    // Fetch request search paramaters
    const paramaters = new URLSearchParams({
      limit: 1, // Get one question at a time
      categories: category, // general_knowledge, film_and_tv, music, sport_and_leisure, history, geography
      difficulties: difficulty, // easy, medium, hard
    });

    // Fetch a question with set paramaters from API
    let response = await fetch(`${apiURL}?${paramaters}`);
    //console.log(response);
    let questionData = await response.json();

    /* Test question data output
    console.log(questionData);
    const fetchedQuestion = questionData[0];
    const category = fetchedQuestion.category;
    const text = fetchedQuestion.question.text;
    const correctAnswer = fetchedQuestion.correctAnswer;
    const incorrectAnswers = fetchedQuestion.incorrectAnswers;

    console.log("Category:", category);
    console.log("Question:", text);
    console.log("Correct Answer:", correctAnswer);
    console.log("Incorrect Answers:", incorrectAnswers);
    */

    return questionData[0];
  } catch (error) {
    console.log("No results");
  }
}

// Get a user by username and password (/users?username=username&password=password)
app.get("/users", (req, res) => {
  try {
    const username = req.query.username;
    const password = req.query.password;
    // Check for username and password paramaters
    if (username && password) {
      // Admin can fetch all users
      if (username === "admin" && password === "admin123") {
        let users = db.prepare(`SELECT * FROM users`).all();
        res.status(200).json(users);
        return;
      }
      // Try find username with matching password
      let user = db.prepare(`SELECT * FROM users WHERE username = ? AND password = ?`).all(username, password);
      res.status(200).json(user);
      return;
    }
    res.status(400).json({ error: "Username and password required" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Add a new user to the database
// req.body =
// {
// "username": ""
// "password": ""
// }
app.post("/users", (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    // Check if the username already exists
    const checkUsernameExists = db.prepare(`SELECT * FROM users WHERE username = ?`).get(username);
    if (checkUsernameExists) {
      // Username already exists so return an error
      res.status(400).json({ error: "Username already exists" });
      return;
    }

    // Run SQL statement to insert a new user - ??'s are replaced by values in .run
    const newUser = db
      .prepare(
        `INSERT INTO users (username, password, generalHighScore, filmHighScore, musicHighScore, sportHighScore, historyHighScore, geographyHighScore) VALUES (?,?,?,?,?,?,?,?)`
      )
      .run(username, password, 0, 0, 0, 0, 0, 0); // No high scores yet so set to 0
    res.status(200).json({ response: newUser });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Update user high score for a quiz in the database
app.put("/users/:username/:quiz/:score", (req, res) => {
  try {
    const username = req.params.username;
    const quiz = req.params.quiz;
    const score = req.params.score;

    const updateUserScore = db.prepare(`UPDATE users SET ${quiz} = ? WHERE username = ?`).run(score, username);
    res.status(200).json({ response: updateUserScore });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Delete user from database
app.delete("/users/:username/:password", (req, res) => {
  try {
    const username = req.params.username;
    const password = req.params.password;
    const deletedUser = db.prepare(`DELETE FROM users WHERE username = ? AND password = ?`).run(username, password);
    res.status(200).json({ response: deletedUser });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Server listening on defined port
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
