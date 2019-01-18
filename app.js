var printToPage = $("#text-area");
var timerStart = 10;

var randQAC = [{
  q: "A young Isaac Newton is said to have been hit on the head by which fruit, leading him to come up with the theory of gravity?",
  a: ["Depression", "A Rock", "An Apple", "Nothing"],
  c: "An Apple"
}, {
  q: "Orcinus orca is the scientific name for which animal?",
  a: ["Hyena", "Dolphin", "Crab", "Killer Whale"],
  c: "Killer Whale"
}, {
  q: "What African country was officially known as Zaire between 1971 and 1997?",
  a: ["Nigeria", "South Africa", "Egypt", "The Democratic Republic of the Congo"],
  c: "The Democratic Republic of the Congo"
}, {
  q: "China’s Terracotta Army depicts the soldiers of what emperor?",
  a: ["Qin Shi Huang", "Gaozu of Han", "Wu of Han", "Wu Zetian"],
  c: "Qin Shi Huang"
}, {
  q: "Located in southeast Vietnam, what is the former name of Ho Chi Minh City?",
  a: ["Tokyo", "Bangkok", "Jakarta", "Saigon"],
  c: "Saigon"
}, {
  q: "According to the lyrics of the hit Queen song Killer Queen, perfume came naturally from where?",
  a: ["America", "Belgium", "Paris", "Denmark"],
  c: "Paris"
}, {
  q: "Tasmania is an isolated island state belonging to which country?",
  a: ["Australia", "France", "Germany", "Greenland"],
  c: "Australia"
}, {
  q: "Which American actor performs music under the stage name Childish Gambino?",
  a: ["Will Smith", "Ryan Reynolds", "Donald Glover", "Robert Downey Jr."],
  c: "Donald Glover"
}];

var timer;

var game = {

  randQAC: randQAC,
  questionUp: 0,
  counter: timerStart,
  c: 0,
  inc: 0,

  countdown: function() {
    this.counter--;
    $("#counter-number").text(this.counter);
    if (this.counter === 0) {
      console.log("Yep I think thats time");
      this.timeUp();
    }
  },

  cycleQuestion: function() {
    this.counter = window.timerStart;
    $("#counter-number").text(this.counter);
    this.questionUp++;
    this.renderQuestion.bind(this)();
  },

  timeUp: function() {

    clearInterval(window.timer);

    $("#counter-number").text(this.counter);

    printToPage.html("<h2>Theres a timer, hurry up</h2>");
    printToPage.append("<h3>The right answer was: " + randQAC[this.questionUp].c);

    if (this.questionUp === randQAC.length - 1) {
      setTimeout(this.userStats, 3 * 1000);
    }
    else {
      setTimeout(this.cycleQuestion, 3 * 1000);
    }
  },

  renderQuestion: function() {

    timer = setInterval(this.countdown.bind(this), 1000);

    printToPage.html("<h2>" + randQAC[this.questionUp].q + "</h2>");

    for (var i = 0; i < randQAC[this.questionUp].a.length; i++) {
      printToPage.append("<button class='answer-button' id='button' data-name='" + randQAC[this.questionUp].a[i]
      + "'>" + randQAC[this.questionUp].a[i] + "</button>");
    }
  },

  userStats: function() {

    clearInterval(window.timer);

    printToPage.html("<h2>Thats all the questions I felt like googling for. Here's your stats...</h2>");

    $("#counter-number").text(this.counter);

    printToPage.append("<h3>Right Answers: " + this.c + "</h3>");
    printToPage.append("<h3>Wrong Answers: " + this.inc + "</h3>");
    printToPage.append("<br><button id='play-again'>Wanna Play Again?</button>");
  },

  wrong: function() {

    this.inc++;

    clearInterval(window.timer);

    printToPage.html("<h2>No. Dude, come on these are easy..</h2>");

    if (this.questionUp === randQAC.length - 1) {
      setTimeout(this.userStats.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.cycleQuestion.bind(this), 3 * 1000);
    }
  },

  right: function() {

    clearInterval(window.timer);

    this.c++;

    printToPage.html("<h2>Woop Woop you got it right</h2>");

    if (this.questionUp === randQAC.length - 1) {
      setTimeout(this.userStats.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.cycleQuestion.bind(this), 3 * 1000);
    }
  },

  userAnswer: function(e) {
    clearInterval(window.timer);
    if ($(e.target).attr("data-name") === randQAC[this.questionUp].c) {
      this.right();
    }
    else {
      this.wrong();
    }
  },

  reset: function() {
    this.questionUp = 0;
    this.counter = timerStart;
    this.c = 0;
    this.inc = 0;
    this.renderQuestion();
  }
};

$(document).on("click", "#play-again", game.reset.bind(game));

$(document).on("click", ".answer-button", function(e) {
  game.userAnswer.bind(game, e)();
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Timer: <span id='counter-number'>30</span> Seconds</h2>");
  game.renderQuestion.bind(game)();
});