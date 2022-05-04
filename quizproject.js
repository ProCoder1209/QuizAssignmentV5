let currentQuestion = 0;
let score = 0;
let hints = 0; // counter for hints shown
let maxHints = 5; // max hints to show

let questions = [
  {
    question: "1. What Does Islam Mean?",
    a: "Terrorism",
    b: "Submission / Surrender",
    c: "Idk I am stupido",
    d: "To be a Muslim",
    image: "quizimages/q1.jpg",
    hint: "To give up",
    answer: "b",
  },
  {
    question: "2. Do Muslims believe Jesus is god?",
    a: "Yes",
    b: "No",
    c: "No, he is the son of god",
    d: "We don't have a god",
    image: "quizimages/q2.jpg",
    hint: "Prophet",
    answer: "b",
  },
  {
    question: "3. Who wrote the Quran?",
    a: "Prophet Muhammad",
    b: "Angel Gabriel",
    c: "God (Allah)",
    d: "Abu Bakr (Companion Of The Prophet)",
    image: "quizimages/q3.jpg",
    hint: "A Friend",
    answer: "d",
  },
  {
    question: "4. What can muslims not eat/drink?",
    a: "Meat (Unless Religiously Slaughtered / Killed)",
    b: "Alcoholic Substances",
    c: "Insects",
    d: "All of the above",
    image: "quizimages/q4.jpg",
    hint: "Unclean",
    answer: "d",
  },
  {
    question: "5. Does the Quran Have to Be Read in Arabic?",
    a: "Yes",
    b: "No",
    c: "No Answer",
    d: "No Answer",
    image: "quizimages/q3.jpg",
    hint: "Can Only Be Properly Read In 1 Language",
    answer: "a",
  },
  {
    question: "6. Do Muslims read/believe in what the Bible/Torah says?",
    a: "Yes",
    b: "No",
    c: "No Answer",
    d: "No Answer",
    image: "quizimages/q6.jpg",
    hint: "Too many edits = Contradictions, not reliable",
    answer: "b",
  },
  {
    question: "7. True Or False: Who revealed the Quran to humankind?",
    a: "Abu Bakr",
    b: "Ali Ibn Abu Talib",
    c: "Muhammad",
    d: "Angel Gabriel",
    image: "quizimages/q3.jpg",
    hint: "Sent By God",
    answer: "c",
  },
  {
    question: "8. Who was Abu Lahab?",
    a: "A Angel",
    b: "He was a King",
    c: "A Meccan leader",
    d: "A Devil",
    image: "quizimages/q8.jpg",
    hint: "Followers follow = ?",
    answer: "c",
  },
  {
    question: "9. Where Was Islam Founded?",
    a: "Medina",
    b: "Mecca",
    c: "Saudi Arabia",
    d: "Africa",
    image: "quizimages/q9.jpg",
    hint: "Capital Of Saudi Arabia",
    answer: "b",
  },
  {
    question:
      "10. What year did Islam start to appear from the Prophet Muhammad?",
    a: "650",
    b: "620",
    c: "610",
    d: "600",
    image: "quizimages/q10.jpg",
    hint: " 600 > 620",
    answer: "c",
  },
];

window.onload = function () {
  document.getElementById("hintButton").onclick = getHintF;

  loadQuestion();
}; // window.onload

// show hint for current question if maximum not reached
let getHintF = function () {
  console.log("hint has been clicked");

  // if max hints not reached
  if (hints < maxHints) {
    // get hint for current question

    let currentHint = questions[currentQuestion].hint;

    // show in page
    document.getElementById("hint").innerHTML = currentHint;

    // disables button after using on current question
    document.getElementById("hintButton").disabled = true;

    // increment hints shown
    hints++;
  } // if hints
}; // getHintF

// load a new question
function loadQuestion() {
  // close light box for first question
  if (currentQuestion == 0) {
    closeLightBox();
  }

  // load the image
  let img = document.getElementById("image");
  img.src = questions[currentQuestion].image;
  img.style.maxWidth = "70vh";
  img.style.maxHeight = "80vh";

  // load the question and answers
  document.getElementById("question").innerHTML =
    questions[currentQuestion].question;
  document.getElementById("a").innerHTML = "A. " + questions[currentQuestion].a;
  document.getElementById("b").innerHTML = "B. " + questions[currentQuestion].b;
  document.getElementById("c").innerHTML = "C. " + questions[currentQuestion].c;
  document.getElementById("d").innerHTML = "D. " + questions[currentQuestion].d;

  // reset the hint box
  document.getElementById("hint").innerHTML =
    "You have " + (maxHints - hints) + " hints left.";
} // loadQuestion

let timeleft = 60; // 60 second timer

// call the annonymous function every 1000 ms or 1 second
let downloadTimer = setInterval(function () {
  // update display
  document.getElementById("countdown").innerHTML =
    timeleft + " seconds remaining, finish Quiz QUICKLY!";
  timeleft -= 1; // decrement time left

  // if time runs out, end timer
  if (timeleft <= 0) {
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "Finished, Your A Failure";
  }
  if (timeleft <= 0) {
    location.reload();
  }
  if (timeleft <= 20) {
    document.getElementById("countdown").innerHTML =
      timeleft + " seconds remaining, FINISH BEFORE YOU LOSE!";
  }
}, 1000);

function markIt(ans) {
  let message = "";

  if (ans == questions[currentQuestion].answer) {
    // add 1 to score
    score++;

    document.getElementById("message").style.backgroundColor = "green";

    // display score
    document.getElementById("score").innerHTML =
      score + " / " + questions.length;

    message = "Correct!!!! Your score is " + score + " / " + questions.length;
  } else {
    message = "Incorrect :< Your score is " + score + " / " + questions.length;
    document.getElementById("message").style.backgroundColor = "red";
  } // else

  // move to the next question
  currentQuestion++;

  // re-enables hint button on next question (line 131 for original line)
  document.getElementById("hintButton").disabled = false;

  if (currentQuestion >= questions.length) {
    // create a special message
    if (score <= 7) {
      message = "Restart and try again, your horrible.";
    } else {
      message = "Cool you got 7 or over, not too bad.";
    } // else

    // add ability to restart quiz
    message += "<div id='restart' onclick='restartQuiz()'>Restart Quiz</div>";
  } else {
    loadQuestion();
  } // else

  // show the lightbox
  document.getElementById("lightbox").style.display = "block";
  document.getElementById("message").innerHTML = message;
} // markIt

function restartQuiz() {
  location.reload();
} // restartQuiz

function closeLightBox() {
  document.getElementById("lightbox").style.display = "none";
} // closeLightbox

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
