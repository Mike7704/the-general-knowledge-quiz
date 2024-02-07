const questionCategory = document.getElementById("question-category");
const questionContainer = document.getElementById("question-container");
const answersContainer = document.getElementById("answers-container");

const baseURL = import.meta.env.VITE_ServerURL;

// Get a question from the server
async function fetchQuestion() {
  const question = await fetch(`${baseURL}/question`);
  // Parse into an array
  return await question.json();
}

// Update the display with a new question
async function displayQuestion() {
  let question = await fetchQuestion();
  //console.log(question);
  questionContainer.innerHTML = ""; // Clear previous question
  answersContainer.innerHTML = ""; // Clear previous answers

  // Create HTML elements
  const questionNumH3Tag = document.createElement("h3");
  const questionH2Tag = document.createElement("h2");
  const answer1ButtonTag = document.createElement("button");
  const answer2ButtonTag = document.createElement("button");
  const answer3ButtonTag = document.createElement("button");
  const answer4ButtonTag = document.createElement("button");
  // Assign text
  questionCategory.textContent = "Category: " + formatCategoryText(question.category);
  questionNumH3Tag.textContent = "Question #1";
  questionH2Tag.textContent = question.question.text;

  // Store each button into an array to iterate through and assign correct and incorrect answers
  const answerButtons = [answer1ButtonTag, answer2ButtonTag, answer3ButtonTag, answer4ButtonTag];
  assignAnswerButtons(answerButtons, question);

  // Add elements to the display
  questionContainer.appendChild(questionNumH3Tag);
  questionContainer.appendChild(questionH2Tag);
  answersContainer.appendChild(answer1ButtonTag);
  answersContainer.appendChild(answer2ButtonTag);
  answersContainer.appendChild(answer3ButtonTag);
  answersContainer.appendChild(answer4ButtonTag);
}

// Randomise order of answer buttons and give click listeners
function assignAnswerButtons(answerButtons, question) {
  // Select a random button index to be the answer
  const correctAnswerButtonIndex = Math.floor(Math.random() * answerButtons.length);
  // Track index of incorrect answers (incorrect answers are stored in an array of 3)
  let incorrectAnswerIndex = 0;
  // Iterate through each button
  answerButtons.forEach((button, index) => {
    if (index == correctAnswerButtonIndex) {
      // This is the correct answer, clicking it will display a new question
      button.textContent = question.correctAnswer;
      button.addEventListener("click", (event) => {
        event.preventDefault();
        displayQuestion();
        console.log("Correct");
      });
    } else {
      // This is an incorrect answer, clicking it will end the quiz
      button.id = "incorrect";
      button.textContent = question.incorrectAnswers[incorrectAnswerIndex];
      incorrectAnswerIndex++; // Increase index so we end up with 3 different incorrect answers
      button.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("Incorrect");
      });
    }
  });
}

// Format category text to be displayed to screen
function formatCategoryText(text) {
  return text
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
}

displayQuestion();
