(function () {
    var r, e;
    r = ["angular", "background/module", "background/services/EasySocket"], e = function (r, e, EasySocket) {
        return r.module("background").provider("server", EasySocket).config(function (serverProvider, API_URL) {
            return serverProvider.setUrl(API_URL), console.log("config server")
        })
    }, define(r, e)
}).call(this);