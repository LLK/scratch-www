var cookie = require('cookie');
var xhr = require('xhr');

var Jar = {};

Jar.get = function (name, callback) {
    // Get cookie by name
    var obj = cookie.parse(document.cookie) || {};

    // Handle optional callback
    if (typeof callback === 'function') {
        if (typeof obj === 'undefined') return callback('Cookie not found.');
        return callback(null, obj[name]);
    }

    return obj[name];
};

Jar.use = function (name, uri, callback) {
    // Attempt to get cookie
    Jar.get(name, function (err, obj) {
        if (typeof obj !== 'undefined') return callback(null, obj);

        // Make XHR request to cookie setter uri
        xhr({
            uri: uri
        }, function (err) {
            if (err) return callback(err);
            module.get(name, callback);
        });
    });
};

Jar.set = function (name, value) {
    var obj = cookie.serialize(name, value);
    var expires = '; expires=' + new Date(new Date().setYear(new Date().getFullYear() + 1)).toUTCString();
    var path = '; path=/';
    document.cookie = obj + expires + path;
};

module.exports = Jar;
