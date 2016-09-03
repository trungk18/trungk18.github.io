var module = ['angular'];

define(module, function (angular) {
    //Init module
    var app = angular.module('portfolioApp', []);
        
    //Manually bootstrapping
    app.init = function () {
        angular.bootstrap(document, ['portfolioApp']);

        //init random flip
        // cache vars
        var cards = document.querySelectorAll(".card.effect-random");
        var timeMin = 2;
        var timeMax = 10;
        var timeouts = [];

        // loop through cards
        for (var i = 0, len = cards.length; i < len; i++) {
            var card = cards[i];
            var cardID = card.getAttribute("data-id");
            var id = "timeoutID" + cardID;
            var time = randomNum(timeMin, timeMax) * 1000;
            cardsTimeout(id, time, card);
        }

        // timeout listener
        function cardsTimeout(id, time, card) {
            if (id in timeouts) {
                clearTimeout(timeouts[id]);
            }
            timeouts[id] = setTimeout(function () {
                var c = card.classList;
                var newTime = randomNum(timeMin, timeMax) * 1000;
                c.contains("flipped") === true ? c.remove("flipped") : c.add("flipped");
                cardsTimeout(id, newTime, card);
            }, time);
        }

        // random number generator given min and max
        function randomNum(min, max) {
            return Math.random() * (max - min) + min;
        }
    };

    return app;
});