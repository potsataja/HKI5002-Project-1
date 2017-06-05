class Card {
    constructor(layerName) {
        this.layer = document.getElementById(layerName);
        window["card_" + layerName] = this;

        this.height = 100;
        this.width = 100;
        this.text = "";
        this.layerName = layerName;

        this.visible = false;

        var txt = '<div id="card_' + this.layerName + '" style="';
        txt += 'border: 1px solid green; ';
        txt += 'height: ' + this.height + 'px; width: ' + this.width + 'px; ';
        txt += 'margin: 5px; ';
        txt += 'text-align: center; display:flex; align-items: center; justify-content: center; ';
        txt += 'user-select: none; ';
        txt += '" ';
        txt += 'onclick="card_' + layerName + '.changeText()"';
        txt += '><div id="card_' + this.layerName + '_text" style="visibility: ' + ((this.visible) ? 'visible' : 'hidden') + ';">' + this.text + '</div></div>';
        document.getElementById("kast").innerHTML += txt;
    }

    insertText(text) {
        this.text = text;
        document.getElementById("card_" + this.layerName + "_text").innerHTML = text;
    }

    changeText() {
        if (this.visible) {
            document.getElementById("card_" + this.layerName + "_text").style.visibility = "hidden";
            this.visible = false;
        } else {
            document.getElementById("card_" + this.layerName + "_text").style.visibility = "visible";
            this.visible = true;
        }
    }
}