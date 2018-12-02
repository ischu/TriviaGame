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
// question objects
var Q1 = {
    question: "Who was the first President of the United States?",
    choiceArr:['George Washington', 'Abraham Lincoln', 'Bob Beeper', 'Donald Trump'],
    image: "assets/images/washington.jpeg",
};
var Q2 = {
    question: "Who is the Queen of England?",
    choiceArr:['Jemima III', 'Catherine I', 'Elizabeth II', 'Celeste IV'],
    image: "assets/images/queen.jpeg",
};
var Q3 = {
    question: "What is the fourth planet from the sun?",
    choiceArr:['Earth', 'Venus', 'Jupiter', 'Mars'],
    image: "assets/images/mars.jpeg",
};
var questionArray = [Q1, Q2, Q3];

// functions
nextQuestion = function() {
    // selects the question from the array at index questionNumber
    qObj = questionArray[questionNumber];
    console.log(qObj);
    // changes text in the question section to the question
    $("#question").text(qObj.question);
    // while loop which places choices text in each choice section
    i=0;
    while(i<4){
        $("#choice"+i).text(qObj.choiceArr[i]);
        console.log("#choice"+i, qObj.choiceArr[i]);
        i++;
    }
    // increments question number so next time function is run, the next question will be chosen
    questionNumber++;
    // signals it is time to go to answer screen
    questionOver=true;
}
console.log(questionArray.length, questionNumber);
// it will be time to go to final screen when questionNumber > questionArray.length

// jQuery
$(document).ready(function () {
    // adds start button (needs to be changed, as of now it shifts the height of the body)
    // $("main").prepend("<button id='start'>START</button>");

    // $("#start").click(function() {
    //     $(".container-fluid").removeClass("hide");
    //     $("button").remove();
    // });
});