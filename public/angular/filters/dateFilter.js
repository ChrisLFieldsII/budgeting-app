module.exports = function() {
    return function(dateISO) {
        var date = dateISO.toString().slice(0, 10);
        var month = date.slice(5,7);
        var day = date.slice(8,10);
        var year = date.slice(0,4);
        return month + '-' + day + '-' + year;
    };
};