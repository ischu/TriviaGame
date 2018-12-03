// variables

// flag is true if game has started
var gameBegun = false;
// flag is true go to answer screen
var questionOver = false;
// counter for wins and losses/timeouts
var wins = 0;
var losses = 0;
var time = 0;
// tracks which question game is on
var questionNumber = 0;
var banner = "banner";
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
            return this.choiceArr[2]
        },
    },
];
// these variables store unused sections of html
var choiceSec=null;
var questSec=null;

// functions
nextQuestion = function () {
    // selects the question from the array at index questionNumber
    qObj = questionArray[questionNumber];
    console.log(qObj);
    // changes text in the question section to the question
    $("#question").text(qObj.question);
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
        $("#choice" + i).text(qObj.choiceArr[i]);
        console.log("#choice" + i, qObj.choiceArr[i]);
        i++;
    }
    // signals it is time to go to answer screen
    questionOver = true;
    console.log("the answer is "+qObj.correct());
}

answerScreen = function () {
    qObj = questionArray[questionNumber];
    // changes question text to banner
    $("#question").text(banner);
    // detaches choice section and replaces them with the correct image
    choiceSec = $("#choiceSection").detach();
    $("#bottomRow").append("<img class='img-fluid' src=''/>");
    $("img").attr("src", qObj.image);
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
    $("#questionSection").after("<button id='start'>START</button>");

    $("#start").click(function() {
        // wait 1 second
        $("main").removeClass("hideDivs");
        $("#start").remove();
    });
});