(function () {
    var e, r;
    e = ["angular", "core/services/storage", "core/services/pageUtils", "core/services/tele", "core/services/invitationManager", "options/module"], r = function (e) {
        var r;
        return r = function ($scope, $rootScope, $modal, $location, $timeout, $translate, storage, invitationManager, pageUtils, tele, SERVER, ROLES, VER) {
            return $rootScope.windowTitle = $translate.instant("app") + VER, $rootScope.payUrl = "https://" + SERVER + "/pay/index?name=" + $rootScope.user.profile.name, $scope.currentState = "", $scope.newInvitationCount = 0, $scope.ver = VER, $scope.dropdown = [
                {text: $translate.instant("options.layout.dropdown.change_password"), click: "changePassword()"},
                {text: $translate.instant("options.layout.dropdown.find_password"), click: function () {
                    return pageUtils.openUrl("https://" + SERVER + "/user/password/reset")
                }},
                {text: $translate.instant("options.layout.dropdown.logout"), click: "logout()"}
            ], $rootScope.isVIP = function () {
                return $rootScope.user.role === ROLES.VIP
            }, $rootScope.isDue = function () {
                return!$rootScope.isVIP() && $rootScope.user.profile.until
            }, $scope.logout = function () {
                return tele.run("userManager.logout"), pageUtils.redirectUrl("login.html#/?source=logout")
            }, $scope.changePassword = function () {
                return $rootScope.passwordModal = $modal({template: "partials/options/modals/change_password.html", show: !0})
            }, $scope.source = function () {
                return $location.search().source
            }, ($rootScope.user.profile.anonymous || $rootScope.user.profile.no_password) && $scope.logout(), $scope.$on("$stateChangeSuccess", function (e, r) {
                return $scope.currentState = r.url, tele.run("track.pv", "/chrome-extension/options/" + r.url), console.log($scope.currentState)
            }), invitationManager.queryInvitationList(), $rootScope.$watch("invitationList", function (e) {
                return $scope.newInvitationCount = _.filter(e, function (e) {
                    return e.can_fetch_reward
                }).length
            }, !0), tele.scope("user").then(function () {
                return $rootScope.user.role === ROLES.GUEST ? pageUtils.redirectUrl("login.html") : void 0
            }), $rootScope.$watch("user.role", function (e) {
                return e === ROLES.GUEST ? setTimeout(function () {
                    var e;
                    return(null != $rootScope && null != (e = $rootScope.user) ? e.role : void 0) === ROLES.GUEST ? pageUtils.closeUrl("options.html") : void 0
                }, 1e3) : void 0
            }), tele.scope("expired"), $rootScope.$watch("expired", function (e) {
                return e ? pageUtils.redirectUrl("upgrade.html") : void 0
            }), tele.scope("freeDomains", {list: !0}), tele.run("userManager.updateProfile"), storage.get("afterRegister") ? (storage.remove("afterRegister"), pageUtils.openUrl($rootScope.payUrl)) : void 0
        }, e.module("options").controller("OptionsPageController", r)
    }, define(e, r)
}).call(this);