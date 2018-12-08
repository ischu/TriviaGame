$(document).ready(function () {
    // variables
    game = {
        // counters for wins and losses/timeouts
        wins: 0,
        losses: 0,

        // stores win/loss message 
        banner: "error banner",
        // question objects
        questionArray: [
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
                question: "Where in the nuclear plant does Homer work?",
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
                question: "In the mid 1980's, Simpsons animated shorts appeared on what show?",
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
        ],
        // tracks which question game is on
        questionNumber: 0,
        // these variables store detached sections of html
        choiceSec: null,
        timerSec: null,

        // sets wait time before loading next question/final screen
        screenDelay: 3,

        // function for choosing question
        currentQuestion: function () {
            return this.questionArray[this.questionNumber];
        },
      
        // screen change functions

        nextQuestion: function () {
            console.log(game.currentQuestion());
            // changes text in the question section to the question
            $("#question").text(game.currentQuestion().question);
            // adds choice section if missing 
            if (game.choiceSec) {
                // places choice section back
                $("#bottomRow").append(game.choiceSec);
                // removes img
                $("img").remove();
                // clears choice var
                game.choiceSec = null;
            }
            // while loop which places choices text in each choice section
            i = 0;
            while (i < 4) {
                $("#choice" + i).text(game.currentQuestion().choiceArr[i]);
                i++;
            }
            // starts timer
            $("#timer").text(timer.count);
            timer.start();

            console.log("the answer is " + game.currentQuestion().correct());
        },

        answerScreen: function () {
            // changes question text to banner
            $("#question").text(game.banner);
            // detaches choice section and replaces them with the correct image
            game.choiceSec = $("#choiceSection").detach();
            $("#bottomRow").append("<img class='img-fluid' src=''/>");
            $("img").attr("src", game.currentQuestion().image);
            // increments question number so when nextQuestion runs, the next question will be chosen
            game.questionNumber++;
            // stops timer
            timer.stop(timer.run);

            // checks if last question has been reached
            if (game.questionNumber < game.questionArray.length) {
                // goes to next question after however many seconds
                setTimeout(game.nextQuestion, 1000 * game.screenDelay);
            }
            else {
                // goes to final screen after however many second
                setTimeout(game.finalScreen, 1000 * game.screenDelay);
            };
        },

        finalScreen: function () {
            // display win/loss
            $("#questionSection p").text("You answered " + game.wins + " questions correctly and " + game.losses + " questions incorrectly.");
            // remove img & timer, display restart button
            $("img").remove();
            game.timerSec = $("#timerSection p").detach();
            // onclick='playAgain()'
            $("#bottomRow").before("<button id='replayButton' class='btn'>Play again?</button>");
            $("#replayButton").click(function () {
                console.log("replay");
                game.playAgain();
            });
        },

        startButton: function () {
            $("main").removeClass("hideDivs");
            $("#start").remove();
            game.nextQuestion();
        },

        playAgain: function () {
            $("#bottomRow").append(game.choiceSec);
            $("#timerSection").append(game.timerSec);
            game.questionNumber = 0;
            game.wins = 0;
            game.losses = 0;
            $("#replayButton").remove();
            game.nextQuestion();

        },
    };
    // timer object
    timer = {
        // change to adjust timer length
        count: 20,
        run: null,
        countDown: function () {
            if (timer.count > 0) {
                timer.count--;
                $("#timer").text(timer.count);
            } else {
                game.banner = "TIME UP! The correct answer is " + game.currentQuestion().correct();
                game.losses++;
                game.answerScreen();
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
            this.count = 20;
        },
    };
    // jQuery

    // $('main').children(".row").addClass('hide');
    $("#timerSection").after("<button id='start' class='btn'>START</button>");

    $("#start").click(function () {
        // wait 1/2 second
        setTimeout(game.startButton, 1000 * .5);
    });
    $(".choice").click(function () {
        console.log(this.innerText);
        if (this.innerText === game.currentQuestion().correct()) {
            console.log("correct!");
            game.banner = "Woo-hoo!";
            game.wins++;
        }
        else {
            console.log("wrong!");
            game.banner = "D'oh! The correct answer is " + game.currentQuestion().correct();
            game.losses++;
        }
        game.answerScreen();
    });

});