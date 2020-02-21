//Restart Button
document.querySelector('.restart').addEventListener('click', function() {
	location.reload()
});
//---------------------------------------------------------------------------------------------------
//Timer Functionality
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;

function setTime() {
	++totalSeconds;
	secondsLabel.innerHTML = pad(totalSeconds % 60);
	minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
};

function pad(val) {
	var valString = val + "";
	if (valString.length < 2) {
		return "0" + valString;
	} else {
		return valString;
	}
};
//---------------------------------------------------------------------------------------------------
//shuffle Function
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

function addShuffled() {
	var cards = ['fa fa-diamond', 'fa fa-paper-plane-o', ' fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-bicycle', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-diamond', 'fa fa-paper-plane-o', ' fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-bicycle', 'fa fa-leaf', 'fa fa-bomb'];
	var newCards = shuffle(cards);
	var nodeList = document.querySelectorAll('.card');
	var i = 0;
	for (var item of nodeList) {
		var openElement = document.createElement('i');
		var card = item.appendChild(openElement);
		card.className = newCards[i];
		i++;
	}
}
addShuffled();
//------------------------------------------------------------------------------------------------------
//display when click
function display(goal) {
	var goal = event.target;
	goal.className = 'card show open';
}
//------------------------------------------------------------------------------------------------------
//Star Rating
function starRating() {
	var stars;
	if (counter < 9) {}
	if (counter == 9) {
		document.querySelector('.fa-star').className = 'fa fa-star-o';
	} else if (counter == 12) {
		document.querySelector('.fa-star').className = 'fa fa-star-o';
	}
	return stars;
};
//--------------------------------------------------------------------------------------------------------
//Matching
function lock(card1, card2) {
	card1.className = 'card match';
	card2.className = 'card match';
}
//Play the game functionlity
function win() {
	var allCards = document.querySelector('.deck').children;
	var card = 0;
	var i = 0;
	for (var i; i < allCards.length; i++) {
		if (allCards[i].className == 'card match') {
			card += 1;
		}
	}
	console.log(card);
	if (card == 16) {
		return true
	}
	return false;
};
var counter = Number(document.querySelector('span').innerHTML);
var game = document.querySelectorAll('.card')
var openList = [];
var startTimer = true;
for (var item of game) {
	item.addEventListener('click', function(event) {
		display();
		if (startTimer == true) {
			var myVar = setInterval(setTime, 1000);
			startTimer = false;
		}
		openList.push(event.target);
		setTimeout(function matching() {
			if (openList.length > 1) {
				counter += 1;
				document.querySelector('span').innerHTML = counter;
				if (openList[0].firstElementChild.className == openList[1].firstElementChild.className) {
					lock(openList[0], openList[1]);
					openList = [];
				} else if (openList[0].firstElementChild.className !== openList[1].firstElementChild.className) {
					openList[0].className = "card";
					openList[1].className = "card";
					openList = [];
				}
				if (win() == true) {
					var mins = document.getElementById("minutes").innerHTML;
					var secnds = document.getElementById("seconds").innerHTML;
					if (confirm('congratulations!\n you won\n Play Again??\n your Time: ' + mins + 'minutes' + '\n' + secnds + ' seconds' + 'Stars= ' + $('.fa-star').length)) {
						location.reload();
					};
				};
				starRating();
			}
		}, 1000)
	})
};