(function () {
    var a, n;
    a = ["angular", "angular_translate", "core/module"], n = function (a) {
        return a.module("background", ["core", "pascalprecht.translate"])
    }, define(a, n)
}).call(this);