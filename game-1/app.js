// global variables
var activeCards = [];
var intervalID = "";
var hiddenCardCount = 0;
var cardTexts = "";
var customGameElements = 3;

function onPageLoad() {
    showLevelSelection();
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

//TODO
function startCustomGame() {
    let custom_game_content = document.createElement("div");
    custom_game_content.style.display = "flex";
    custom_game_content.style.flexDirection = "column";
    custom_game_content.style.alignItems = "center"; //flex-start
    custom_game_content.style.width = "100%";

    let label = document.createElement("label");
    label.textContent = "Sisesta tekstid:";
    custom_game_content.appendChild(label);

    let text = document.createElement("input");
    text.setAttribute("type", "text");
    text.setAttribute("name", "text_" + 1);
    text.setAttribute("placeholder", "Sisesta tekst");
    custom_game_content.appendChild(text);

    let newText = text.cloneNode(true);
    newText.setAttribute("name", "asd");
    custom_game_content.appendChild(newText);

    let addNewText = document.createElement("input");
    addNewText.setAttribute("type", "button");
    addNewText.setAttribute("value", "Lisa uus tekstiväli");
    custom_game_content.appendChild(addNewText);

    custom_game_content.appendChild(document.createElement("br"));

    let saveSelection = document.createElement("input");
    saveSelection.setAttribute("type", "button");
    saveSelection.setAttribute("value", "Salvesta tekstid ja koosta mäng");
    custom_game_content.appendChild(saveSelection);

    document.getElementById("game_content").appendChild(custom_game_content);



    /*<label>Sisesta tekstid:</label><br>
	<input type="text" name="text_1" placeholder="txt1"><br>
	<input type="text" name="text_2" placeholder="txt2"><br>
	<input type="button" value="X">
    document.getElementById("game_content").innerHTML = "";*/
}

//TODO
function createNewCustomGameTextNode() {
    /*let newText = text.cloneNode(true);
    newText.setAttribute("name", "asd");

    document.getElementById("custom_game_content").insertBefore(newText,document.getElementById("custom_game_content"));*/
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
        //if taking too much time (100 seconds), then stop timer
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