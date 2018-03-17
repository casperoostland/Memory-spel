/*jslint browser:true*/
/*jslint latedef:false*/

var cards = document.getElementsByClassName("card"); // alle kaarten uit de DOM
var pictures = ["hond", "olifant", "aap", "giraffe", "nijlpaard", "panda", "dolfijn", "vlinder"]; // alle dieren - .png
var cardPictures = {}; // bject met de id van de kaart (card2) met een foto als waarde (olifant)
var takenPictures = []; // Array die bijhoud welke fotos al in gebruik zijn op het bord
var lastCardId = null; // laaste omgedraaide kaart
var currentPlayer = 1;
var pointsPlayer1 = 0;
var pointsPlayer2 = 0;




for (var i = 0; i < cards.length; i++) { // loop die een klik functie per kaart toevoegd en een willekeurige foto toewijst per kaart
    var currentCard = cards[i];

    cardPictures[currentCard.id] = getRandomPicture();

    currentCard.addEventListener("click", addClickFunction(currentCard));
}


function getRandomPicture() { // functie die een willekeurige foto uitzoekt die niet vaker dan 2x kan voorkomen
    var randomNumber = getRandomNumberBetween(0, pictures.length - 1);
    var pictureCount = 0;

    for (var i = 0; i < takenPictures.length; i++) {
        if (takenPictures[i] === randomNumber) {
            pictureCount++;
        }
        
    }

    if (pictureCount > 1) {
        return getRandomPicture();
    }
   

    takenPictures.push(randomNumber);
    return pictures[randomNumber];
    console.log("takenPictures.length;");
}

function getRandomNumberBetween(min, max) { //http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range ingezien op 6-04-2017
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addClickFunction(currentCard) { // functie die behandeld wat er gebeurd als je op een kaart klikt
    return function() {
        var id = currentCard.id;

        if (cardPictures[id]) {
            currentCard.src = "images/" + cardPictures[id] + ".png";
            checkCardMatch(id);
        }
    };
}

function checkCardMatch(currentCardId) {
    setTimeout(function() { // zodat de alert niet tevoorschijnkomt voordat de foto is omgedraaid Hulp van Jelle bijles leerling
        if (lastCardId) {
            if (cardPictures[lastCardId] === cardPictures[currentCardId]) {
                increasePoints();

                removeCards(currentCardId);

                checkWin();
                lastCardId = null;
            } else {
                window.alert("jammer speler " + currentPlayer);
                changePlayer();
                closeAllCards();
                lastCardId = null;
            }

        } else {
            lastCardId = currentCardId;
        }
    }, 100);
}

function changePlayer() {
    if (currentPlayer === 1) {
        currentPlayer = 2;
        document.getElementById("currentPlayer").innerHTML = 2;
    } else {
        currentPlayer = 1;
        document.getElementById("currentPlayer").innerHTML = 1;
    }
}

function removeCards(currentCardId) {
    document.getElementById(lastCardId).src = "images/blanko.jpg";
    document.getElementById(currentCardId).src = "images/blanko.jpg";
    delete cardPictures[lastCardId];
    delete cardPictures[currentCardId];
}

function checkWin() {
    if (Object.keys(cardPictures).length === 0) { //http://stackoverflow.com/a/13190981 ingezien op 8-04-2017
        if (pointsPlayer1 > pointsPlayer2) {
            window.alert("Winnaar: Player 1");
        } else if (pointsPlayer1 < pointsPlayer2) {
            window.alert("Winnaar: Player 2");
        } else {
            window.alert("Gelijk spel");
        }
        window.location.replace("index.html");
    }
}

function increasePoints() {
    if (currentPlayer === 1) {
        pointsPlayer1++;
        document.getElementById("pointsPlayer1").innerHTML = pointsPlayer1;
    } else {
        pointsPlayer2++;
        document.getElementById("pointsPlayer2").innerHTML = pointsPlayer2;
    }
}

function closeAllCards() { // draai alle kaarten om en zet de openkaarten + de laatste kaart op null
    Object.keys(cardPictures).forEach(function(key) { //http://stackoverflow.com/questions/921789/how-to-loop-through-plain-javascript-object-with-objects-as-members 8-04-2017
        document.getElementById(key).src = "images/achterkant.png";
    });
}
