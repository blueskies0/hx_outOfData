(function () {
    var e, r;
    e = ["angular", "lang", "angular_translate", "core/services/tele", "core/services/storage", "background/module", "background/services/server", "background/services/proxyManager", "background/services/userDomains", "background/services/userManager", "background/services/tabsTracker", "background/services/performanceTracker", "background/services/conflictDetector", "background/services/errorPageCustomizer", "background/services/badgeManager", "background/services/injectorManager", "background/services/track", "background/services/notificationManager", "background/services/upgradeManager"], r = function (e, r) {
        return e.module("background").config(function ($translateProvider) {
            return r.config($translateProvider)
        }).run(function ($rootScope, tele, storage, server, proxyManager, userDomains, userManager, tabsTracker, performanceTracker, conflictDetector, errorPageCustomizer, badgeManager, injectorManager, track, notificationManager, upgradeManager, ROLES, VER) {
            var e;
            if (server.connect(), tele.scope("domains", {owner: !0, list: !0}), tele.scope("conflicts", {owner: !0}), tele.scope("user", {owner: !0}), tele.scope("averageStability", {owner: !0}), tele.scope("mode", {owner: !0}), tele.scope("freeDomains", {owner: !0}), tele.scope("currentTab", {owner: !0}), tele.scope("blockedDomains", {owner: !0}), tele.scope("expired", {owner: !0}), tele.func({"userManager.updateProfile": userManager.updateProfile, "userManager.logout": userManager.logout, "userManager.checkin": userManager.checkin, "userManager.load": userManager.load, "userDomains.change": userDomains.change, "userDomains.remove": userDomains.remove, "userDomains.add": userDomains.add, "userDomains.match": userDomains.match, "track.event": track.event, "track.pv": track.pv, "track.tagSession": track.tagSession, "track.tagUser": track.tagUser, popupMenuData: function () {
                return{mode: $rootScope.mode, currentTab: $rootScope.currentTab, blockedDomains: $rootScope.blockedDomains, user: $rootScope.user}
            }}), e = VER, storage.get("ver") ? e !== storage.get("ver") && track.event("extension", "update", "" + storage.get("ver") + "->" + e) : track.event("extension", "install", e), storage.set("ver", e), $rootScope.user.role === ROLES.GUEST) {
                if (!(navigator.userAgent.indexOf("UBrowser") > -1))return pageUtils.activateUrl("login.html#/?source=force-login");
                if (!storage.get("uc_install_popped", !1))return pageUtils.activateUrl("login.html#/?source=force-login"), storage.set("uc_install_popped", !0)
            }
        }), e.element(document).ready(function () {
            return e.bootstrap(document, ["background"])
        }), console.log("bootstrapped")
    }, require(["../config"], function () {
        return requireWithRetry(e, r)
    })
}).call(this);