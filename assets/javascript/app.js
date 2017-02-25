// Game variables

var time = 10;
var questions = [
	{
		q: "Which band sang <em>I Hate Everything About You</em>?",
		a: ["Blink 182", "Seether", "Three Days Grace", "Breaking Benjamin"], // 2
		correct: 2,
		right: "That is correct! So much teen angst.",
		wrong: "Sorry, you must be confused with that other band."
	},
	{
		q: "What was Beyonce's first solo recording?",
		a: ["Crazy In Love", "'03 Bonnie & Clyde", "Irreplaceable", "Baby Boy"], // 1
		correct: 1,
		right: "Way to go! I know, that was a trick question. Clearly you knew what was up, though.",
		wrong: "Wah wah wah, it wasn't technically her song. The question was first solo <em>recording</em>."
	},
	{
		q: "Who won season four of American Idol?",
		a: ["Reuben Studdard", "Fantasia Barrino", "Kelly Clarkson", "Carrie Underwood"], // 3
		correct: 3,
		right: "Congrats on that one. If only you were winning this hard at life.",
		wrong: "Honestly, I ain't even mad you didn't know that one. I bet you got laid in high school, didn't you?"
	},
	{
		q: "Chicken noodle soup with",
		a: ["some stale ass crackers", "a soda on the side", "a heart full of sorrow", "only a fork to eat"], // 2
		correct: 1,
		right: "Ayyy, someone knew how to turn up before it was a thing.",
		wrong: "Really? What do <em>you</em> drink with your chicken noodle soup?!"
	},
	{
		q: "What song did Mariah Carey make her comeback with in 2005?",
		a: ["We Belong Together", "The Emancipation of Mimi", "Shake It Off", "It's Like That"], // 4
		correct: 3,
		right: "You got it right!",
		wrong: "Have you never seen TRL? Come on, man!"
	}
];
var currentQuestion = {};
var usedQuestions = [];
var gameInterval;
var timeInterval;
var $gameButton = $(".start-game").html('<button id="game-button">Start Game</button>');

// User variables

var score = 0;
var wrongAnswers = 0;
var noAnswer = 0;

// Timer to decrease time by one minute

function timer() {
	time -= 1;

	if (time === 0) {
		clearInterval(gameInterval);
		clearInterval(timeInterval);
		noAnswer++;
		var newDiv = $("<div/>").html("Step it up molasses hands. Maybe try actually picking an answer next time.").attr("class", "result-text");
		$("#gameboard").html(newDiv)
		time = 10;
		setTimeout(setGame, 3000);
	} else if (time < 10) {
		$("#time-left").html("00:0" + time);
	} else {
		$("#time-left").html("00:" + time);
	}
}

// Display the question

function setGame() {

	clearInterval(gameInterval);
	clearInterval(timeInterval);

	if (time <= 0) {
		gameInterval = setInterval(setGame, 10000);
	}

	if (questions.length === 0) {
		$("#time-left").empty();
		$("#gameboard").empty();
		$("#results").html("<strong>Final Score:</strong> " + score + "<br><strong>Wrong Answers:</strong> " + wrongAnswers + "<br><strong>Total Fails:</strong> " + noAnswer + '<br><br>Game over. Try again?<br><br>');
		$gameButton.show().appendTo(".container");
		return;
	}
	
	time = 10;
	$("#gameboard").empty();
	$("#time-left").html("00:" + time);

	timeInterval = setInterval(timer, 1000);

	currentQuestion = questions[0];
	$("<div/>").html(currentQuestion.q).attr("class", "question").appendTo("#gameboard");

	for (let i = 0; i < currentQuestion.a.length; i++) {
		$("<div/>").html(currentQuestion.a[i]).attr({"data-num": i, "class": "answer-choice"}).appendTo("#gameboard");
	}
	usedQuestions.push(questions.shift());
}

// Reset the game stats and variables

function resetGame() {
	usedQuestions = [];
	time = 10;
	score = 0;
	wrongAnswers = 0;
	noAnswer = 0;
	$("#results").empty();
	setGame();
}

// Run game

$(document).on("click", "#game-button", function() {
	$gameButton.hide();
	if (questions.length === 0) {
		questions = usedQuestions;
		resetGame();
	} else {
		setGame();
	}
});

// If someone selects an answer, do the thing

$(document).on("click", ".answer-choice", function() {
	clearInterval(gameInterval);
	clearInterval(timeInterval);

	var answerChoice = $(this).data("num");
	var correctID = currentQuestion.correct;
	
	if (answerChoice === correctID) {
		score++;
		var newDiv = $("<div/>").html(currentQuestion.right).attr("class", "result-text");
		$("#gameboard").html(newDiv);
	} else {
		wrongAnswers++;
		var newDiv = $("<div/>").html(currentQuestion.wrong).attr("class", "result-text");
		$("#gameboard").html(newDiv)
	}

	setTimeout(setGame, 3000);
});


// Random psuedocode

/*

Need to call setQuestion within a setInterval function

Include an on click event for if the correct answer is selected that leads to resultText

Include setTimeout function in resultText so it only stays up for 10 secs or so. Maybe call setGame function
in this setTimeout function to start game over again

*/


/* For loop to run through every question and answer

for (var i = 0; i < questions.length - 1; i++) {
		var currentQuestion = $("div").html(questions[i].q);
		$("#gameboard").append(currentQuestion);

		var currentAnswers = questions[i].a;
		console.log(currentAnswers);

		for (let i = 0; i < currentAnswers.length; i++) {
			var answerDiv = $("div").html(currentAnswers[i]).attr("id", currentAnswers.indexOf(i));
			console.log(answerDiv);
			$("#gameboard").append(answerDiv);
		}
	}

*/