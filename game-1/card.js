class Card {
    constructor(image_text) {
        this.height = 100;
        this.width = 100;
        this.visible = false;
        this.image_text = image_text;

        this.draw();
    }

    draw() {
        var txt = '<div id="card_' + this.image_text + '" style="';
        txt += 'border: 1px solid green; ';
        txt += 'height: ' + this.height + 'px; width: ' + this.width + 'px; ';
        txt += 'margin: 5px; ';
        txt += 'line-height: ' + this.height + 'px; text-align: center; ';
        txt += 'user-select: none; ';
        txt += '" ';
        //txt += 'onclick="alert(\'' + this.image_text + '\')"';
        txt += '><div id="card_' + this.image_text + '_image_text">' + this.image_text + '</div></div>';

        document.getElementById("kast").innerHTML += txt; //'<div style="border: 1px solid green; height: 150px; width: 100px; margin: 5px;" onclick="alert()"></div>';
        //return '<div style="border: 1px solid green; height: 150px; width: 100px; margin: 5px;" onclick="alert()"></div>';

        //document.getElementById("kast").onclick = this.showImage_Text();
    }

    showImage_Text() {
        alert('aaa');
    }
}