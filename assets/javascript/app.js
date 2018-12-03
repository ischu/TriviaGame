// variables

// flag is true if game has started
var gameBegun = false;
// flag is true go to answer screen
var questionOver = false;
// counter for wins and losses/timeouts
var wins = 0;
var losses = 0;
var time = 0;
// stores win/loss message 
var banner = "error banner";
// question objects
var questionArray = [
    Q1 = {
        question: "Who was the first President of the United States?",
        choiceArr: ['George Washington', 'Abraham Lincoln', 'Bob Beeper', 'Donald Trump'],
        image: "assets/images/washington.jpeg",
        correct: function() {
            return this.choiceArr[0]
        },
    },
    Q2 = {
        question: "Who is the Queen of England?",
        choiceArr: ['Jemima III', 'Catherine I', 'Elizabeth II', 'Celeste IV'],
        image: "assets/images/queen.jpg",
        correct: function() {
            return this.choiceArr[2]
        },
    },
    Q3 = {
        question: "What is the fourth planet from the sun?",
        choiceArr: ['Earth', 'Venus', 'Jupiter', 'Mars'],
        image: "assets/images/mars.jpg",
        correct: function() {
            return this.choiceArr[3]
        },
    },
    Q4 = {
        question: "What is the name of Mario's brother?",
        choiceArr: ['Linus', 'Luigi', 'Louie', 'Lars'],
        image: "assets/images/luigi.jpg",
        correct: function() {
            return this.choiceArr[1]
        },
    },
];
// tracks which question game is on
var questionNumber = 0;
var currentQuestion=questionArray[questionNumber];
// these variables store unused sections of html
var choiceSec=null;
// functions
nextQuestion = function () {
    // selects the question from the array at index questionNumber
    currentQuestion = questionArray[questionNumber];
    console.log(currentQuestion);
    // changes text in the question section to the question
    $("#question").text(currentQuestion.question);
    // adds choice section if missing
    if (choiceSec){
        // places choice section back
        $("#bottomRow").append(choiceSec);
        // removes img
        $("img").remove();
        // clears choice var
        choiceSec=null;
    }
    // while loop which places choices text in each choice section
    i = 0;
    while (i < 4) {
        $("#choice" + i).text(currentQuestion.choiceArr[i]);
        console.log("#choice" + i, currentQuestion.choiceArr[i]);
        i++;
    }
    // signals it is time to go to answer screen
    questionOver = true;
    console.log("the answer is "+currentQuestion.correct());
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
}

finalScreen = function () {
    // it will be time to go to final screen when questionNumber > questionArray.length
}

// jQuery
$(document).ready(function () {
    // adds start button (needs to be changed, as of now it shifts the height of the body)
    
    // $('main').children(".row").addClass('hide');
    $("#timerSection").after("<button id='start' class='btn btn-primary'>START</button>");

    $("#start").click(function() {
        // wait 1 second
        $("main").removeClass("hideDivs");
        $("#start").remove();
        nextQuestion();
    });
    $(".choice").click(function() {
        console.log(this.innerText);
        if(this.innerText===currentQuestion.correct()){
            console.log("correct!");
            banner = "CORRECT!";
        }
        else{
            console.log("wrong!");
            banner = "WRONG! The correct answer is "+currentQuestion.correct();
        }
        answerScreen();
        // wait 3 seconds
        // nextQuestion();
    });
});