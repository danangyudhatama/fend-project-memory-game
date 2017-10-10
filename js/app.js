




/*
 * Create a list that holds all of your cards
 */
var cards = ["fa-camera-retro","fa-camera-retro","fa-car","fa-car","fa-anchor","fa-anchor","fa-bomb","fa-bomb","fa-diamond","fa-diamond","fa-heart","fa-heart","fa-lightbulb-o","fa-lightbulb-o","fa-plane","fa-plane"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

shuffle(cards);

for (var i = cards.length - 1; i >= 0; i--) {
    $(".deck").append(`<li class="card">
                <i id= `+ i +`   class="fa `+cards[i]+`"></i>
            </li>`);
 };




// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


var move = 1;
var openedCard = [];    //placeholder for card that have been opened
let comparing = false;
let timer = false;
myTimer();

	$("li").on("click",function(){  //listen to card that being clicked
		timer = true;
	    if (comparing === false) {
	    	openedCard.push($(this));
		    $(this).addClass("show");   //the card will be opened and showed
		    $(this).addClass("open");
		    compareCard();  
		}
	});





function incrementMove() {
    $(".moves").html(move);
    move++;
    if (move === 16) {
    	$(".stars li:nth-child(3)").addClass("hide");
    } else if (move === 21) {
    	$(".stars li:nth-child(2)").addClass("hide");
    } else if (move === 26) {
    	$(".stars li:nth-child(1)").addClass("hide");
    }
}

function compareCard() {
	
    if (openedCard.length === 2){   //comparing if the array filled with 2 cards   //after the card open, push the card to the array 
        if (openedCard[0].children().attr("id") !== openedCard[1].children().attr("id")) {
        	comparing = true;
	        incrementMove();
	        setTimeout(function(){
	        	if (openedCard[0].children().attr("class") === openedCard[1].children().attr("class")) {    //if cards are the same then add the class matched to the cards, after that empty the cards holder array
	            	matchedCard();
	            	openedCard =[];
	            	comparing = false;
	            	playerWin();

	        	} 
	        	else {      //else the card will be closed again and empty the cards holder array 
	            	doNotMatchedCard();
	            	openedCard =[];
	            	comparing = false;
	        	}
	    	},1000);
	    } else {
	    	openedCard.splice(1,1);
	    }	
	   	
    }

}

function matchedCard() {
    openedCard[0].addClass("matched");
    openedCard[1].addClass("matched");
    openedCard[0].addClass("cardLocked");
    openedCard[1].addClass("cardLocked");
    openedCard[0].removeClass("card");
    openedCard[1].removeClass("card");
}

function doNotMatchedCard() {
    openedCard[0].removeClass("open show");
    openedCard[1].removeClass("open show");
}


$(".restart").click(function() {
    location.reload();
}) 

function playerWin() {
    if ($(".deck").children().length == $(".deck").children(".matched").length) {
    	timer = false;
        alert("wooo you win the game !!!");
    }

}

function myTimer () {
	let s = 0 ; // time in second
	let display = 0 + " min " + 0 +" sec";
	let min = 0;
	let sec = 0;
	setInterval(function(){
		if (timer === true) {
			s++;
			min = Math.floor(s/60) ;
			sec = s % 60;
			display = "Timer : " +  min + " min " + sec +" sec";
			$(".timer").html(display);

		} else {
			display = "Timer : " + min + " min " + sec +" sec";
			$(".timer").html(display);

		}

		

	},1000);
}