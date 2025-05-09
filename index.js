const readlineSync = require("readline-sync");

let score = 0;

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

function playGame(userAnswer, correctAnswer) {
  if (userAnswer === correctAnswer) {
    console.log("Correct Answer\n");
    score++;
  } else {
    console.log("Incorrect Answer");
    console.log(`Correct Answer is ${correctAnswer}.\n`);
  }
}

function showQuestionAndOptions(database) {
  for (let i = 0, n = database.category.data.length; i < n; i++) {
    let data = database.category.data[i];
    console.log(`Q${i + 1} - ${data.question}\n`);

    for (let key in data.options) {
      console.log(`${key}. ${data.options[key]}`);
    }
    console.log();

    let userAnswer;
    do {
      userAnswer = readlineSync
        .question("Enter your answer (a/b/c/d) - ")
        .toLowerCase();
      if (!Object.keys(data.options).includes(userAnswer)) {
        console.log("Invalid option selected. Please check and try again.\n");
      }
    } while (!Object.keys(data.options).includes(userAnswer));

    playGame(userAnswer, data.correctAnswer);
  }
}

function highScorer(leaderBoard) {
    leaderBoard.data.push({name: userName, score: score});
    leaderBoard.data.sort((a, b) => b.score - a.score);
    let checkHighScore;
    do {
        checkHighScore = readlineSync.question("Do you want to check high score? (Y/N)\n").toLowerCase();
        if (checkHighScore === "y") {
            for (let score of leaderBoard.data) {
                console.log(`Name: ${score.name} Score: ${score.score}\n`);
            }
        } else {
            console.log("Please, enter Y/N to check high score.\n");
        }
    } while (!"y/n".includes(checkHighScore));

    console.log(`Name: ${leaderBoard.data[0].name}\nHigh Score: ${leaderBoard.data[0].score}`);
}

let userName = readlineSync.question("Enter your name: ");

showQuestionAndOptions(database);
console.log(`Your score: ${score}\n`);
highScorer(leaderBoard);

