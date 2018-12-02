// variables

// flag is true if game has started
var gameBegun = false;
// flag is true if game has been one/lost/timeout
var questionOver = false;
// counter for wins and losses/timeouts
var wins = 0;
var losses = 0;
var time = 0;
// tracks which question game is on
var questionNumber = 0;
// question objects
var Q1 = {
    question: "Who was the first President of the United States?",
    choices:['George Washington', 'Abraham Lincoln', 'Bob Beeper', 'Donald Trump'],
    image: "assets/images/washington.jpeg",
};
var Q2 = {
    question: "Who is the Queen of England?",
    choices:['Jemima III', 'Catherine I', 'Elizabeth II', 'Celeste IV'],
    image: "assets/images/queen.jpeg",
};
var Q3 = {
    question: "What is the fourth planet from the sun?",
    choices:['Earth', 'Venus', 'Jupiter', 'Mars'],
    image: "assets/images/mars.jpeg",
}
var questionArray = [Q1, Q2, Q3];

// functions
nextQuestion = function(){
    qObj = questionArray[questionNumber];
    console.log(qObj);
}
nextQuestion();

// jQuery
$(document).ready(function () {
    // adds start button (needs to be changed, as of now it shifts the height of the body)
    $("main").prepend("<button id='start'>START</button>");

    $("#start").click(function() {
        $(".container-fluid").removeClass("hide");
        $("button").remove();
    });
});