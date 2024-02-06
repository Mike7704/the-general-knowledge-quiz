import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Database from "better-sqlite3";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 9465;
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

// Server listening on defined port
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
