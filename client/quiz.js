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

  // Randomise order of answer buttons
  // Store each button into an array to iterate through
  const answerButtons = [answer1ButtonTag, answer2ButtonTag, answer3ButtonTag, answer4ButtonTag];
  // Select a random button index to be the answer
  const correctAnswerButtonIndex = Math.floor(Math.random() * answerButtons.length);
  // Track index of incorrect answers (incorrect answers are stored in an array)
  let incorrectAnswerIndex = 0;
  // Iterate through each button
  answerButtons.forEach((button, index) => {
    if (index == correctAnswerButtonIndex) {
      // This is the correct answer
      button.id = "correct";
      button.textContent = question.correctAnswer;
    } else {
      // This is an incorrect answer
      button.id = "incorrect";
      button.textContent = question.incorrectAnswers[incorrectAnswerIndex];
      incorrectAnswerIndex++; // Increase index so we end up with 3 different incorrect answers
    }
  });

  // Answer buttons
  answer1ButtonTag.addEventListener("click",(event)=>{
    event.preventDefault();
    console.log("Answer1")
  })
  answer2ButtonTag.addEventListener("click",(event)=>{
    event.preventDefault();
    console.log("Answer2")
  })
  answer3ButtonTag.addEventListener("click",(event)=>{
    event.preventDefault();
    console.log("Answer3")
  })
  answer4ButtonTag.addEventListener("click",(event)=>{
    event.preventDefault();
    console.log("Answer4")
  })



  
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
