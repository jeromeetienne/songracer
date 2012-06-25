'use strict';

VideoData.prototype.setRandom = function() {
    var categories = [];
    for (var category in this.ids) { categories[categories.length] = category; }
    this.setRandomByCategory( categories.getRandomItem() );
}

VideoData.prototype.setRandomByCategory = function(category) {
    if (this.ids[category]) {
        var songIndex = Misc.getRandomInt(0, this.ids[category].length - 1);
        var song = this.ids[category][songIndex], i = 0;
        this.id = song[i++];
        this.startsAtSeconds = song[i++];
        this.endsAtSeconds = song[i++];
    }
    else {
        console.log('Oops, unknown category ' + category);
    }
};

function VideoData() {
    this.ids = {
            rock: [ ['x2HYohNWlD4', 14, null], ['x2HYohNWlD4', 14, null] ],
            pop: [ ['tYkwziTrv5o', 20, null], ['tYkwziTrv5o', 20, null], ['tYkwziTrv5o', 20, null], ['BOChwCdLJI8', 20, null] ],
            ballad: [ ['Y34zwBnoYVM', 7, null], ['Y34zwBnoYVM', 7, null] ],
            electro: [ ['x2HYohNWlD4', 14, null], ['x2HYohNWlD4', 14, null] ],
            rnb: [ ['x2HYohNWlD4', 14, null], ['x2HYohNWlD4', 14, null] ],
            vintage: [ ['x2HYohNWlD4', 14, null], ['x2HYohNWlD4', 14, null] ]
            };
    this.id = null;
    this.startsAtSeconds = 0;
    this.endsAtSeconds = null;
}
