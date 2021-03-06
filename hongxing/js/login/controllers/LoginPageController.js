(function () {
    var e, r;
    e = ["angular", "core/module", "core/services/tele", "core/services/storage", "core/services/validate", "login/module"], r = function (e) {
        var r;
        return r = function ($rootScope, $scope, $location, $translate, tele, storage, validate, LOGIN_EVENT_NAME, SERVER_CERT_INTERVAL) {
            return $rootScope.step = "login", $rootScope.isVirgin = !storage.get("lastLoginName"), $rootScope.validateNameFormat = function (e) {
                var r;
                return r = validate.phone(e) || validate.email(e)
            }, $rootScope.betweenCertInterval = function () {
                var e;
                return SERVER_CERT_INTERVAL[0] < (e = new Date) && e < SERVER_CERT_INTERVAL[1]
            }, $scope.search = function () {
                return $location.search()
            }, $rootScope.isVirgin && ($rootScope.step = "register", tele.run("track.event", LOGIN_EVENT_NAME, "visit")), $rootScope.$watch("step", function (e) {
                return $location.path("/" + e)
            }), tele.run("track.pv", "/chrome-extension/login")
        }, e.module("login").controller("LoginPageController", r)
    }, define(e, r)
}).call(this);