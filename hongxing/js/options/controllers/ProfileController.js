(function () {
    var e, r;
    e = ["angular", "core/services/validate", "core/services/generate", "core/services/tele", "options/module"], r = function (e) {
        var r;
        return r = function ($scope, $rootScope, $http, $timeout, $interval, validate, generate) {
            var e;
            return $scope.VIPLeft = 0, $scope.stabilityLevel = function () {
                return Math.round(5 * $rootScope.averageStability)
            }, $scope.stabilityPercentage = function () {
                var e;
                return e = $rootScope.averageStability, e ? parseInt(1e4 * e) / 100 + "%" : "1%"
            }, $scope.avatarUrl = function () {
                var e, r;
                return e = "http://honx.in/static/img/logo.png", r = $rootScope.user.profile.name, validate.email(r) ? "http://www.gravatar.com/avatar" + ("/" + generate.md5(r) + "?s=50&d=") + ("" + encodeURIComponent(e)) : e
            }, (e = function () {
                return $scope.VIPLeft = $rootScope.isVIP() ? $rootScope.user.profile.until : 0, $rootScope.$watch("user.profile.until", function (e, r) {
                    var n, i, a;
                    return e !== r ? (i = (new Date).getTime() / 1e3, (!r || i > r) && (r = i), $scope.VIPLeft = r, a = 30, n = 0, $interval(function () {
                        return n += 1, $scope.VIPLeft = (r + (e - r) * n / a).toFixed(0)
                    }, 50, a)) : void 0
                })
            })()
        }, e.module("options").controller("ProfileController", r)
    }, define(e, r)
}).call(this);