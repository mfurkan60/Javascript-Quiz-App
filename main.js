function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

// Question prototype
Question.prototype.checkAnswer = function (answer) {
    return this.answer === answer;
}

// Quiz Constructor
function Quiz(questions) {
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0
}

// Quiz Prototype
Quiz.prototype.getQuestion = function () {
    return this.questions[this.questionIndex];
}

// Quiz isFinish
Quiz.prototype.isFinish = function () {
    return this.questions.length === this.questionIndex;
}

// Quiz guess
Quiz.prototype.guess = function (answer) {
    var question = this.getQuestion();

    if (question.checkAnswer(answer)) {
        this.score++;
        console.log(this.score);
    }
    this.questionIndex++;
}


var q1 = new Question("What is the correct way to write a JavaScript array?", ['var colors = ["red", "green", "blue"]', 'var colors = (1:"red", 2:"green", 3:"blue")','var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")','var colors = "red", "green", "blue"'], 'var colors = ["red", "green", "blue"]');

var q2 = new Question("How do you round the number 7.25, to the nearest integer?", ['Math.round(7.25) ', 'Math.rnd(7.25)', "rnd(7.25)", "round(7.25)"], "Math.round(7.25)");

var q3 = new Question("How do you find the number with the highest value of x and y?", ["Math.ceil(x, y)", "ceil(x, y)", "top(x, y)", "Math.max(x, y)"], "Math.max(x, y)");

var q4 = new Question('Inside which HTML element do we put the JavaScript?', ["< script >", "< javascript >", "< scripting >", "< js >"], "< script >");

var q5 = new Question("How do you create a function in JavaScript?", ["function:myFunction()  ","function = myFunction()","function myFunction() ","function_myFunction()"], "function = myFunction()");

var q6 = new Question("How to write an IF statement in JavaScript?",["if (i == 5)","if i = 5 then","if i == 5 then","if i = 5"], "if (i == 5)");

 

var questions = [q1, q2, q3, q4, q5,q6];



// Start Quiz

var quiz = new Quiz(questions);

loadQuestion();
function restart() {
     
    location.reload();
}

function loadQuestion() {
    if (quiz.isFinish()) {
        showScore();
        

    } else {

        var question = quiz.getQuestion();
        var choices = question.choices;

        document.querySelector('#question').textContent = question.text;

        for (var i = 0; i < choices.length; i++) {
            var element = document.querySelector('#choice' + i);
            element.innerHTML = choices[i];
            guess('btn' + i, choices[i]);
        }

        showProgress();
        
    }
}

function guess(id, guess) {
    var btn = document.getElementById(id);
    btn.onclick = function () {
        quiz.guess(guess);
        loadQuestion()
    }
}

function showScore() {
    var html = `<h2>Score</h2><h4>${quiz.score}</h4>`;


    var restart = `<button class="btn btn-primary " id="restart" onclick="restart()">Repeat Test</button>`;
        document.querySelector('.card-body').innerHTML = html + restart;

    
    if (document.querySelector('.restart').onclick()) {
        restart();
    }
}

function showProgress() {
    var totalQuestion = quiz.questions.length;
    var questionNumber = quiz.questionIndex + 1;
    var html = 'Question ' + questionNumber + ' / ' + totalQuestion;

    if (totalQuestion <= questionNumber) {
        document.querySelector('#progress').innerHTML = "Congratulations Quiz is Ended";
    } else {
        document.querySelector('#progress').innerHTML = html;
    }


}
