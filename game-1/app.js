// global variables
var activeCards = [];
var intervalID = "";
var hiddenCardCount = 0;
var cardTexts = "";

function onPageLoad() {
    showLevelSelection();
    //document.getElementById("game_header").style.display = "none";
    //startGame();
}

function showLevelSelection() {
    document.getElementById("game_header").style.display = "none";
    document.getElementById("start_selection").style.display = "block";
    clearGameBoard();
}

function startEasyGame() {
    //var cardTexts = ['A', 'B', 'C', 'D', 'E', 'F'];
    cardTexts = ['EMMA', 'PAUL', 'ÕNNELA', 'ÕNNE', 'MARIS', 'KAIDO'];
    startGame();
}

function startHardGame() {
    cardTexts = ['Austraalia', 'Austria', 'Juku', 'Juhan', 'Ameerika Ühendriigid', 'Tallinna Ülikool', 'Tartu Ülikool', 'Banaan', 'Mari', 'Jüri'];
    startGame();
}

function startCustomGame() {

}

function startGame() {
    document.getElementById("start_selection").style.display = "none";
    document.getElementById("game_header").style.display = "flex";

    clearGameBoard();

    cardTextsAll = cardTexts.concat(cardTexts);
    cardTextsAll.sort(function (a, b) { return 0.5 - Math.random() });

    var cards = [];
    for (cardText in cardTextsAll) {
        //new Card(cardText).insertText(cardTextsAll[cardText])
        var card = new Card(cardText);
        card.insertText(cardTextsAll[cardText]);
        cards.push(card);
        hiddenCardCount++;
    }
}

function clearGameBoard() {
    resetTimer();

    hiddenCardCount = 0;
    activeCards = [];
    document.getElementById("game_content").innerHTML = "";
    //var el = document.getElementById("game_content");
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
        if (sec.toFixed(1) == 100 && intervalID != "") {
            stopTimer();
            document.getElementById("timer").innerHTML = "Kulunud aeg: aeg sai otsa!";
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