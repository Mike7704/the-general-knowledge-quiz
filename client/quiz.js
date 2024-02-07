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
  answer1ButtonTag.textContent = question.correctAnswer;
  answer2ButtonTag.textContent = question.incorrectAnswers[0];
  answer3ButtonTag.textContent = question.incorrectAnswers[1];
  answer4ButtonTag.textContent = question.incorrectAnswers[2];

  // Answer buttons

  // Add elements to the display
  questionContainer.appendChild(questionNumH3Tag);
  questionContainer.appendChild(questionH2Tag);
  answersContainer.appendChild(answer1ButtonTag);
  answersContainer.appendChild(answer2ButtonTag);
  answersContainer.appendChild(answer3ButtonTag);
  answersContainer.appendChild(answer4ButtonTag);
}

// Format category text to be displayed to screen
function formatCategoryText(text) {
  return text
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
}

displayQuestion();
