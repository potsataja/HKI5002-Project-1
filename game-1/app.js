function onPageLoad() {
    //console.log("start");

    var cards = ['AA','X','Juku','Banaan', 'Ameerika Ühendriigid', 'Tallinna Ülikool', 'Tartu Ülikool'];
    cards = cards.concat(cards);
    cards.sort(function(a, b){return 0.5 - Math.random()});

    for(card in cards) {
        new Card(card).insertText(cards[card]);
    }
}