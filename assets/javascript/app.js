$(document).ready(function () {
    // variables

    // counters for wins and losses/timeouts
    var wins = 0;
    var losses = 0;

    // stores win/loss message 
    var banner = "error banner";
    // question objects
    var questionArray = [
        Q1 = {
            question: "What is Moe the bartender's last name?",
            choiceArr: ['Tarzarian', 'Shabadoop', 'Gumble', 'Syzlak'],
            image: "assets/images/moe.png",
            answer: 3,
            correct: function () {
                return this.choiceArr[this.answer]
            },
        },
        Q2 = {
            question: "Where in the nuclear plant is Homer's office located?",
            choiceArr: ['The Safety Zone', 'Sector 7-G', 'Area 51', 'Region 2-B'],
            image: "assets/images/homer_work.jpg",
            answer: 1,
            correct: function () {
                return this.choiceArr[this.answer]
            },
        },
        Q3 = {
            question: "How old is Lisa Simpson?",
            choiceArr: ['8', '10', '5', '12'],
            image: "assets/images/lisa.jpg",
            answer: 0,
            correct: function () {
                return this.choiceArr[this.answer]
            },
        },
        Q4 = {
            question: "In what year was The Simpsons Movie released?",
            choiceArr: ['1998', '2001', '2005', '2007'],
            image: "assets/images/movie.jpg",
            answer: 3,
            correct: function () {
                return this.choiceArr[this.answer]
            },
        },
        Q5 = {
            question: "What is Police Chief Wiggum's first name?",
            choiceArr: ['Poochie', 'Clancy', 'Edward', 'Charlie'],
            image: "assets/images/Wiggum.png",
            answer: 1,
            correct: function () {
                return this.choiceArr[this.answer]
            },
        },
        Q6 = {
            question: "Before becoming its own show, Simpsons animated shorts appeared on what show?",
            choiceArr: ['The Tracy Ullman Show', 'Saturday Night Live', 'Animated Laffs', 'The Tonight Show'],
            image: "assets/images/ullman.jpg",
            answer: 0,
            correct: function () {
                return this.choiceArr[this.answer]
            },
        },
        Q7 = {
            question: "Who is the founder of the Simpsons' hometown of Springfield?",
            choiceArr: ['C. Montgomery Burns', 'Shelbyville Manhattan', 'Ray Crock', 'Jebediah Springfield'],
            image: "assets/images/jebediah.jpg",
            answer: 3,
            correct: function () {
                return this.choiceArr[this.answer]
            },
        },
        Q8 = {
            question: "Who is the voice of Marge Simpson?",
            choiceArr: ['Julie Kavner', 'Tess McNeille', 'Yeardley Smith', 'Nancy Cartwright'],
            image: "assets/images/kavner.jpg",
            answer: 0,
            correct: function () {
                return this.choiceArr[this.answer]
            },
        },
        Q9 = {
            question: "Who is the creator of the Simpsons?",
            choiceArr: ['Matt Groening', 'Hank Azaria', 'Harry Shearer', 'Michael Jackson'],
            image: "assets/images/groening.jpg",
            answer: 0,
            correct: function () {
                return this.choiceArr[this.answer]
            },
        },
        Q10 = {
            question: "What is the name of the annual Simpsons Halloween Special?",
            choiceArr: ['Simpsoween', 'Simpsons Scary Now', 'Night Gallery', 'Treehouse of Horror'],
            image: "assets/images/horror.jpg",
            answer: 3,
            correct: function () {
                return this.choiceArr[this.answer]
            },
        },
    ];
    // tracks which question game is on
    var questionNumber = 0;
    // these variables store unused sections of html
    var choiceSec = null;
    var timerSec = null;


    currentQuestion = function () {
        CQ = questionArray[questionNumber];
        return CQ;
    }
    // screen change functions
    startButton = function () {
        $("main").removeClass("hideDivs");
        $("#start").remove();
        nextQuestion();
    }

    nextQuestion = function () {
        console.log(currentQuestion());
        // changes text in the question section to the question
        $("#question").text(currentQuestion().question);
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
            $("#choice" + i).text(currentQuestion().choiceArr[i]);
            console.log("#choice" + i, currentQuestion().choiceArr[i]);
            i++;
        }
        // starts timer
        $("#timer").text(timer.count);
        timer.start();

        console.log("the answer is " + currentQuestion().correct());
    }

    answerScreen = function () {
        // changes question text to banner
        $("#question").text(banner);
        // detaches choice section and replaces them with the correct image
        choiceSec = $("#choiceSection").detach();
        $("#bottomRow").append("<img class='img-fluid' src=''/>");
        $("img").attr("src", currentQuestion().image);
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
                answerScreen();
                banner = "TIME UP! The correct answer is " + currentQuestion().correct();
                losses++;
            }
        },
        start: function () {
            this.run = setInterval(this.countDown, 1000 * 1);
            // if time is up go to answerScreen
            console.log(this.run);
            return this.run;
        },
        stop: function () {
            clearInterval(this.run);
            this.count = 30;
        },
    };
    // jQuery

    // $('main').children(".row").addClass('hide');
    $("#timerSection").after("<button id='start'>START</button>");

    $("#start").click(function () {
        // wait 1/2 second
        setTimeout(startButton, 1000 * .5);
    });
    $(".choice").click(function () {
        console.log(this.innerText);
        if (this.innerText === currentQuestion().correct()) {
            console.log("correct!");
            banner = "CORRECT!";
            wins++;
        }
        else {
            console.log("wrong!");
            banner = "WRONG! The correct answer is " + currentQuestion().correct();
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