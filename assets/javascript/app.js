// variables


// counter for wins and losses/timeouts
var wins = 0;
var losses = 0;

// stores win/loss message 
var banner = "error banner";
// question objects
var questionArray = [
    Q1 = {
        question: "Who was the first President of the United States?",
        choiceArr: ['George Washington', 'Abraham Lincoln', 'Bob Beeper', 'Donald Trump'],
        image: "assets/images/washington.jpeg",
        answer: 0,
        correct: function () {
            return this.choiceArr[this.answer]
        },
    },
    Q2 = {
        question: "Who is the Queen of England?",
        choiceArr: ['Jemima III', 'Catherine I', 'Elizabeth II', 'Celeste IV'],
        image: "assets/images/queen.jpg",
        answer: 2,
        correct: function () {
            return this.choiceArr[this.answer]
        },
    },
    Q3 = {
        question: "What is the fourth planet from the sun?",
        choiceArr: ['Earth', 'Venus', 'Jupiter', 'Mars'],
        image: "assets/images/mars.jpg",
        answer: 3,
        correct: function () {
            return this.choiceArr[this.answer]
        },
    },
    Q4 = {
        question: "What is the name of Mario's brother?",
        choiceArr: ['Linus', 'Luigi', 'Louie', 'Lars'],
        image: "assets/images/luigi.jpg",
        answer: 1,
        correct: function () {
            return this.choiceArr[this.answer]
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
    $("#timer").text(timer.count);
    timer.start();

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
    timer.stop(timer.run);

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
    $("#questionSection p").text("You answered " + wins + " questions correctly and " + losses + " questions incorrectly.");
    // remove img & timer, display restart button
    $("img").remove();
    timerSec = $("#timerSection p").detach();
    $("#bottomRow").before("<button id='replayButton' onclick='playAgain()'>Play again?</button>");
}

playAgain = function () {
    $("#bottomRow").append(choiceSec);
    $("#timerSection").append(timerSec);
    questionNumber = 0;
    wins = 0;
    losses = 0;
    $("#replayButton").remove();
    nextQuestion();

}
// timer object
timer = {
    // change to adjust timer length
    count: 30,
    run: null,
    countDown: function () {
        if (timer.count > 0) {
            timer.count--
            $("#timer").text(timer.count);
        } else {
            banner = "TIME UP! The correct answer is " + currentQuestion.correct();
            losses++;
            answerScreen();
        }
    },
    start : function () {
        this.run = setInterval(this.countDown, 1000 * 1);
        // if time is up go to answerScreen
        console.log(this.run);
        return this.run;
    },
    stop : function () {
        clearInterval(this.run);
    },
};
// jQuery
$(document).ready(function () {
    // $('main').children(".row").addClass('hide');
    $("#timerSection").after("<button id='start' class='btn btn-primary'>START</button>");

    $("#start").click(function () {
        // wait 1/2 second
        setTimeout(startButton, 1000 * .5);
    });
    $(".choice").click(function () {
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