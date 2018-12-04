// variables

// flag is true if game has started
var gameBegun = false;
// flag is true go to answer screen
var questionOver = false;
//  flag is true if time is up
var timeUp = false;
// counter for wins and losses/timeouts
var wins = 0;
var losses = 0;
var time = 30;
// stores win/loss message 
var banner = "error banner";
// question objects
var questionArray = [
    Q1 = {
        question: "Who was the first President of the United States?",
        choiceArr: ['George Washington', 'Abraham Lincoln', 'Bob Beeper', 'Donald Trump'],
        image: "assets/images/washington.jpeg",
        correct: function () {
            return this.choiceArr[0]
        },
    },
    Q2 = {
        question: "Who is the Queen of England?",
        choiceArr: ['Jemima III', 'Catherine I', 'Elizabeth II', 'Celeste IV'],
        image: "assets/images/queen.jpg",
        correct: function () {
            return this.choiceArr[2]
        },
    },
    Q3 = {
        question: "What is the fourth planet from the sun?",
        choiceArr: ['Earth', 'Venus', 'Jupiter', 'Mars'],
        image: "assets/images/mars.jpg",
        correct: function () {
            return this.choiceArr[3]
        },
    },
    Q4 = {
        question: "What is the name of Mario's brother?",
        choiceArr: ['Linus', 'Luigi', 'Louie', 'Lars'],
        image: "assets/images/luigi.jpg",
        correct: function () {
            return this.choiceArr[1]
        },
    },
];
// tracks which question game is on
var questionNumber = 0;
var currentQuestion = questionArray[questionNumber];
// these variables store unused sections of html
var choiceSec = null;
var timerSec = null;
// var divsContent = null;

// screen change functions
startButton = function () {
    $("main").removeClass("hideDivs");
    $("#start").remove();
    nextQuestion();
}

nextQuestion = function () {
    // question has just begun
    questionOver = false;
    // selects the question from the array at index questionNumber
    currentQuestion = questionArray[questionNumber];
    console.log(currentQuestion);
    // changes text in the question section to the question
    $("#question").text(currentQuestion.question);
    // adds choice section if missing
    if (choiceSec) {
        // places choice section back
        $("#bottomRow").append(choiceSec);
        // removes img
        $("img").remove();
        // clears choice var
        choiceSec = null;
    }
    // while loop which places choices text in each choice section
    i = 0;
    while (i < 4) {
        $("#choice" + i).text(currentQuestion.choiceArr[i]);
        console.log("#choice" + i, currentQuestion.choiceArr[i]);
        i++;
    }
    // starts timer
    time = 10;
    $("#timer").text(time);
    timerStart();

    console.log("the answer is " + currentQuestion.correct());
}

answerScreen = function () {
    currentQuestion = questionArray[questionNumber];
    // changes question text to banner
    $("#question").text(banner);
    // detaches choice section and replaces them with the correct image
    choiceSec = $("#choiceSection").detach();
    $("#bottomRow").append("<img class='img-fluid' src=''/>");
    $("img").attr("src", currentQuestion.image);
    // increments question number so when nextQuestion runs, the next question will be chosen
    questionNumber++;
    // stops timer
    timerStop(timerRun);
    
    // checks if last question has been reached
    if (questionNumber < questionArray.length) {
        // goes to next question after five seconds
        setTimeout(nextQuestion, 1000 * 1);
        console.log(questionNumber, questionArray.length);
    }
    else {
        // goes to final screen after 5 second
        setTimeout(finalScreen, 1000 * 1);
        console.log("ya done");
    };
}

finalScreen = function () {
    // display win/loss
    $("#questionSection p").text("You answered "+wins+" questions correctly and "+losses+" questions incorrectly.");
    // remove img & timer, display restart button
    $("img").remove();
    timerSec = $("#timerSection p").detach();
    $("#bottomRow").before("<button id='replayButton' onclick='playAgain()'>Play again?</button>");
}

playAgain = function (){
    $("#bottomRow").append(choiceSec);
    $("#timerSection").append(timerSec);
    questionNumber=0;
    wins=0;
    losses=0;
    $("#replayButton").remove();
    nextQuestion();

}
// timer functions
countDown = function () {
    if (time > 0) {
        time--
        $("#timer").text(time);
    } else {
        banner = "TIME UP! The correct answer is " + currentQuestion.correct();
        losses++;
        answerScreen();
    }

}
timerStart = function () {
    timerRun = setInterval(countDown, 1000 * 1);
    // if time is up go to answerScreen
    return timerRun;
}
timerStop = function () {
    clearInterval(timerRun);
}
// jQuery
$(document).ready(function () {
    // $('main').children(".row").addClass('hide');
    $("#timerSection").after("<button id='start' class='btn btn-primary'>START</button>");

    $("#start").click(function () {
        // wait 1/2 second
        setTimeout(startButton, 1000 * .5);
    });
    $(".choice").click(function () {
        questionOver = true;
        console.log(this.innerText);
        if (this.innerText === currentQuestion.correct()) {
            console.log("correct!");
            banner = "CORRECT!";
            wins++;
        }
        else {
            console.log("wrong!");
            banner = "WRONG! The correct answer is " + currentQuestion.correct();
            losses++;
        }
        answerScreen();
    });
    // didn't work for some reason so i just put an onclick in the button html
    // $("#replayButton").click(function() {
    //     console.log("replay");
    //     playAgain();
    // });
});