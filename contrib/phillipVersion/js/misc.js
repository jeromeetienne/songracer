function Misc() {
}

Misc.debug = function(s) {
    console.log(s);
};

Misc.getChance = function(chanceInPercent) {
    return chanceInPercent == 0 ? false : Misc.getRandomInt(0, 100) <= chanceInPercent;
};

Misc.getRandomInt = function(min, max) {
    return parseInt( Math.floor( ( (max + 1 - min) * Math.random() ) + min ) );
};

Misc.getRandom = function(min, max) {
    return min + (max - min) * Math.random();
};

Misc.getRandomExceptZero = function(min, max) {
    return Misc.getRandomExcept(min, max, 0);
};

Misc.getRandomExcept = function(min, max, exceptThisValue) {
    var r = null;
    while (r == null || r == exceptThisValue) { r = Misc.getRandom(min, max); }
    return r;
};

Misc.getRandomIntExcept = function(min, max, exceptThisValue) {
    var r = null;
    while (r == null || r == exceptThisValue) { r = Misc.getRandomInt(min, max); }
    return r;
};

Misc.sign = function(n) {
    var r = 0;
    if (n < 0) { r = -1; }
    else if (n > 0) { r = 1; }
    return r;
};

Misc.keepInLimits = function(v, min, max) {
    if (min != null && v < min) { v = min; }
    if (max != null && v > max) { v = max; }
    return v;
};

Misc.distort = function(value, amount) {
    var distorted = value;
    if (amount != 0) {
        if (amount >= 1) { distorted = value * 1 + Misc.getRandomInt(-amount, amount) * 1; }
        else { distorted = value * 1 + Misc.getRandom(-amount, amount) * 1; }
    }
    return distorted;
};

Misc.shuffle = function(o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

Misc.getDistance = function(point1, point2) {
    var xfactor = point2.x - point1.x;
    var yfactor = point2.y - point1.y;
    return Math.sqrt( (xfactor * xfactor) + (yfactor * yfactor) );
};

Misc.getPolygonCenter = function(points) {
    var nPoints = points.length;
    var x = 0, y = 0;
    var f;
    var j = nPoints - 1;
    var p1, p2;

    for (var i = 0; i < nPoints; j = i++) {
        p1 = points[i]; p2 = points[j];
        f = p1.x * p2.y - p2.x * p1.y;
        x += (p1.x + p2.x) * f;
        y += (p1.y + p2.y) * f;
    }

    f = Misc.getPolygonArea(points) * 6;

    return Misc.keepPointWithin( {x: x / f, y: y / f}, points );
};

Misc.getFormattedJson = function(arr, level) {
    var dumped_text = '';
    if (!level) level = 0;

    var level_padding = "";
    for(var j = 1; j < level + 1; j++) level_padding += '  ';

    if ( typeof(arr) == 'object' ) {
        for(var item in arr) {
            var value = arr[item];

            if ( typeof(value) == 'object' ) {
                dumped_text += level_padding + "" + Misc.toXml(item) + " ...\r\n";
                dumped_text += Misc.getFormattedJson(value, level + 1);
            }
            else if ( typeof(value) == 'function' ) {
            }
            else if ( typeof(value) == 'string' ) {
                dumped_text += level_padding + "" + Misc.toXml(item) + " = \"" + Misc.toXml(value) + "\"\r\n";
            }
            else {
                dumped_text += level_padding + "" + Misc.toXml(item) + " = " + value + "\r\n";
            }
        }
    }
    else {
        dumped_text = "===>" + arr + "<===(" + typeof(arr) + ")";
    }
    return dumped_text;
};

Misc.keepPointWithin = function(point, outerPoints) {
    var limit = {x1: null, x2: null, y1: null, y2: null};
    var max = outerPoints.length;
    for (var i = 0; i < max; i++) {
        var p = outerPoints[i];
        if (limit.x1 == null || p.x < limit.x1) { limit.x1 = p.x; }
        if (limit.x2 == null || p.x > limit.x2) { limit.x2 = p.x; }
        if (limit.y1 == null || p.y < limit.y1) { limit.y1 = p.y; }
        if (limit.y2 == null || p.y > limit.y2) { limit.y2 = p.y; }
    }

    var x = point.x, y = point.y;
    if (x < limit.x1) { x = limit.x1; }
    else if (x > limit.x2) { x = limit.x2; }
    if (y < limit.y1) { y = limit.y1; }
    else if (y > limit.y2) { y = limit.y2; }

    return {x: x, y: y};
};

Misc.getPolygonArea = function(points) {
    var area = 0;
    var nPoints = points.length;
    var j = nPoints - 1;
    var p1, p2;

    for (var i = 0; i < nPoints; j = i++) {
        p1 = points[i]; p2 = points[j];
        area += p1.x * p2.y;
        area -= p1.y * p2.x;
    }
    area /= 2;
    return area;
};

Misc.getRandomString = function(stringLength) {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if ( stringLength === undefined ) { stringLength = 64; }
    var randomString = '';
    for (var i=0; i < stringLength; ++i) {
        var rnum = Math.floor( Math.random() * chars.length );
        randomString += chars.substring(rnum, rnum + 1);
    }
    return randomString;
}

Misc.setOpacity = function(id, opacityPercent) {
    var elm = document.getElementById(id);
    if (elm) {
        elm.style.filter = 'alpha(opacity = ' + Math.ceil(opacityPercent) + ')';
        elm.style.MozOpacity = opacityPercent * .01;
        elm.style.opacity = opacityPercent * .01;
    }
};

Misc.setZ = function(id, z) {
    var elm = document.getElementById(id);
    if (elm) { elm.style.zIndex = z; }
};

Misc.setZoom = function(id, zoomInPercent) {
    var elm = document.getElementById(id);
    if (elm) { elm.style.zoom = zoomInPercent + '%'; }
};

Misc.showElm = function(id) {
    var elm = document.getElementById(id);
    if (elm) { elm.style.display = 'block'; }
};

Misc.hideElm = function(id) {
    var elm = document.getElementById(id);
    if (elm) { elm.style.display = 'none'; }
};

Misc.toggleElm = function(id) {
    var elm = document.getElementById(id);
    if (elm) {
        if (elm.style.display != 'block') {
            elm.style.display = 'block';
        }
        else {
            elm.style.display = 'none';
        }
    }
};

Misc.getElmShows = function(id) {
    var elm = document.getElementById(id);
    return elm && elm.style.display == 'block';
};

Misc.isIOs = function() {
    return navigator.userAgent.toLowerCase().indexOf('iphone') != -1 || navigator.userAgent.toLowerCase().indexOf('ipad') != -1;
};

Array.prototype.getRandomItem = function() {
    var i = Misc.getRandomInt(0, this.length - 1);
    return this[i];
};

Array.prototype.contains = function(v) {
    var doesContain = false, max = this.length;
    for (var i = 0; i < max && !doesContain; i++) {
        if (this[i] == v) { doesContain = true; }
    }
    return doesContain;
    // return this.indexOf(v) >= 0;
};

Array.prototype.clone = function() {
    var arr = [];
    var max = this.length;
    for (var i = 0; i < max; i++) {
        arr[i] = this[i];
    }
    return arr;
};

Array.prototype.remove = function(from, to) {
    var rest = this.slice( (to || from) + 1 || this.length );
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};


function Stopwatch() {
    this.timeAtStart = new Date().getTime();
}

Stopwatch.prototype.start = function() {
    this.timeAtStart = new Date().getTime();
};

Stopwatch.prototype.getMs = function() {
    return new Date().getTime() - this.timeAtStart;
};
