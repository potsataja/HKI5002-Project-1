// global variables
var activeCards = [];
var intervalID = "";
var hiddenCardCount = 0;

function onPageLoad() {
    startGame();
}


function startGame() {
    clearGameBoard();

    var cardTexts = ['AA', 'X', 'Juku', 'Banaan', 'Ameerika Ühendriigid', 'Tallinna Ülikool', 'Tartu Ülikool', 'YY'];
    //var cardTexts = ['EMMA', 'PAUL', 'ÕNNELA', 'ÕNNE', 'MARIS', 'KAIDO'];

    cardTexts = cardTexts.concat(cardTexts);
    cardTexts.sort(function (a, b) { return 0.5 - Math.random() });

    var cards = [];
    for (cardText in cardTexts) {
        //new Card(cardText).insertText(cardTexts[cardText])
        var card = new Card(cardText);
        card.insertText(cardTexts[cardText]);
        cards.push(card);
        hiddenCardCount++;
    }
}

function clearGameBoard() {
    resetTimer();

    activeCards = [];
    document.getElementById("kast").innerHTML = "";
    //var el = document.getElementById("kast");
    //while (el.firstChild) el.removeChild(el.firstChild);  //https://jsperf.com/innerhtml-vs-removechild/418
}

function compareCards(card) {
    if (intervalID == "") {
        startTimer();
    }

    if (card.found || card.visible) {
        return;
    }

    card.changeVisibility();

    if (activeCards.length == 0) {
        activeCards.push(card);
    } else if (activeCards.length == 1) {
        activeCards.push(card);

        if (activeCards[0].text == activeCards[1].text) {
            activeCards[0].setFound();
            activeCards[1].setFound();

            hiddenCardCount -= 2;

            checkComplete();
        }
    } else if (activeCards.length == 2) {
        activeCards[0].changeVisibility();
        activeCards[1].changeVisibility();

        activeCards = [];
        activeCards.push(card);
    }
}

function checkComplete() {
    if (hiddenCardCount == 0) {
        stopTimer();
    }
}

function startTimer() {
    var sec = 0.1;
    intervalID = setInterval(function () {
        var txt = "Kulunud aeg: ";
        document.getElementById("timer").innerHTML = txt + (sec).toFixed(1) + " s";
        sec += 0.1;
        //if taking too much time, then stop timer
        if(sec.toFixed(1) == 100) {
            stopTimer();
        }
    }, 100);
}
function resetTimer() {
    clearInterval(intervalID);
    intervalID = "";
    document.getElementById("timer").innerHTML = "Kulunud aeg: 0.0 s";
}
function stopTimer() {
    clearInterval(intervalID);
    intervalID = "";
}