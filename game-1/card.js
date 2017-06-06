class Card {
    constructor(layerName) {
        //this.layer = document.getElementById(layerName);
        window["card_" + layerName] = this;

        var height = 100;
        var width = 100;
        
        this.layerName = layerName;

        this.text = "";
        this.visible = false;
        this.found = false;

        var txt = '<div id="card_' + this.layerName + '" style="';
        txt += 'border: 2px solid black; ';
        txt += 'height: ' + height + 'px; width: ' + width + 'px; ';
        txt += 'margin: 5px; ';
        txt += 'text-align: center; display:flex; align-items: center; justify-content: center; ';
        txt += 'user-select: none; ';
        txt += '" ';
        txt += 'onclick="compareCards(card_' + layerName + ')"';
        txt += '><div id="card_' + this.layerName + '_text" style="font-weight: bold; visibility: ' + ((this.visible) ? 'visible' : 'hidden') + ';"></div></div>';
        document.getElementById("kast").innerHTML += txt;
    }

    insertText(text) {
        this.text = text;
    }

    changeVisibility() {
        if (this.found) {
            return;
        }

        if (this.visible) {
            document.getElementById("card_" + this.layerName + "_text").style.visibility = "hidden";
            document.getElementById("card_" + this.layerName + "_text").innerHTML = "";
            this.visible = false;
            document.getElementById("card_" + this.layerName).style.borderColor = "green";
        } else {
            document.getElementById("card_" + this.layerName + "_text").style.visibility = "visible";
            document.getElementById("card_" + this.layerName + "_text").innerHTML = this.text;
            this.visible = true;
            document.getElementById("card_" + this.layerName).style.borderColor = "blue";
        }
    }

    setFound() {
        this.found = true;
        document.getElementById("card_" + this.layerName).style.borderColor = "gray";
        document.getElementById("card_" + this.layerName + "_text").style.color = "gray";
    }
}