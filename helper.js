var path = require('path');

// This module is located in node_modules/bor-development-tools/webpack4-config/
var _root     = process.cwd();
var _devTools = path.join(__dirname, '.');

exports.root = function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
};

exports.devTools = function borPath(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_devTools].concat(args));
};
