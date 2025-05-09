const readlineSync = require("readline-sync");
let kuler = require("kuler");

let score = 0;

/** Creating Database */
const database = {
  category: {
    name: "Javascript",
    data: [
      {
        question: `let a={}, b={};\nconsole.log(a==b);\nconsole.log(a===b);`,
        options: {
          a: "false false",
          b: "false true",
          c: "true false",
          d: "true true",
        },
        correctAnswer: "a",
      },
      {
        question: `Object.assign(target, source)\nCreate which type of copy?`,
        options: {
          a: "Deep Copy",
          b: "Shallow Copy",
          c: "Nested Copy",
          d: "Creates a new reference",
        },
        correctAnswer: "b",
      },
      {
        question: `Is method chaining possible with forEach?`,
        options: {
          a: "Yes",
          b: "No",
        },
        correctAnswer: "b",
      },
    ],
  },
};

/** Creating Leader Board */
const leaderBoard = {
  data: [
    {
      name: "Shambhu",
      score: 1,
    },
    {
      name: "Sweta",
      score: 2,
    },
    {
      name: "Urmila",
      score: 1,
    },
  ],
};

/** Checks whether users answer is correct or incorrect */
function playGame(userAnswer, correctAnswer) {
  if (userAnswer === correctAnswer) {
    console.log(kuler("Correct Answer", "#10B981"));
    score++;
  } else {
    console.log(kuler("Incorrect Answer", "#DC2626"));
    console.log(kuler(`Correct Answer is ${correctAnswer}.`, "#2DD4BF"));
  }
}

/** Reads through given database and gets all the relevent question, options which is required to ask questions from the user */
function showQuestionAndOptions(database) {
  for (let i = 0, n = database.category.data.length; i < n; i++) {
    let data = database.category.data[i];
    console.log(kuler(`Q${i + 1} - ${data.question}\n`, "#06B6D4"));

    for (let key in data.options) {
      console.log(kuler(`${key}. ${data.options[key]}\n`, "#06B6D4"));
    }

    let userAnswer;
    do {
      userAnswer = readlineSync
        .question(kuler("Enter your answer (a/b/c/d) - ", "#FCD34D"))
        .toLowerCase();
      if (!Object.keys(data.options).includes(userAnswer)) {
        console.log(
          kuler(
            "Invalid option selected. Please check and try again.\n",
            "#DC2626"
          )
        );
      }
    } while (!Object.keys(data.options).includes(userAnswer));

    playGame(userAnswer, data.correctAnswer);
  }
}

/** Use leader board data to get the high score, if user agrees to the prompt */
function highScorer(leaderBoard) {
  leaderBoard.data.push({ name: userName, score: score });
  leaderBoard.data.sort((a, b) => b.score - a.score);

  if (score > leaderBoard.data[0].score) {
    console.log(
      kuler(`Congratulation! New High Score\nName: ${leaderBoard.data[0].name}\nHigh Score: ${leaderBoard.data[0].score}`, "#F59E0B")
    );
  };

  let checkHighScore;
  do {
    checkHighScore = readlineSync
      .question(kuler("Do you want to check high score? (Y/N)\n", "#FCD34D"))
      .toLowerCase();
    if (checkHighScore === "y") {
      for (let score of leaderBoard.data) {
        console.log(
          kuler(`Name: ${score.name} Score: ${score.score}\n`, "#D946EF")
        );
      }
    } else {
      console.log(kuler("Please, enter Y/N to check high score.\n", "#DC2626"));
    }
  } while (!"y/n".includes(checkHighScore));
}

/** Stores users name, later stored in leaderboard */
let userName = readlineSync.question(kuler("Enter your name: ", "#FCD34D"));
console.log(kuler(`Hello ${userName}, Welcome to Quizify.`, "#FDE68A"));

// Runs the game
showQuestionAndOptions(database);
console.log(`Your score: ${score}\n`);
highScorer(leaderBoard);
