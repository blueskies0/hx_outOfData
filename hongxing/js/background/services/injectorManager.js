(function () {
    var e, r;
    e = ["angular", "core/services/storage", "background/module"], r = function (e) {
        var injectorManager;
        return injectorManager = function ($rootScope, storage, VER) {
            return chrome.webRequest.onBeforeSendHeaders.addListener(function (e) {
                var r;
                return r = $rootScope.user.profile.sid, e.requestHeaders.push({name: "RA-Ver", value: VER}), e.requestHeaders.push({name: "RA-Sid", value: r}), {requestHeaders: e.requestHeaders}
            }, {urls: ["<all_urls>"]}, ["blocking", "requestHeaders"]), chrome.tabs.onUpdated.addListener(function () {
                return function (e, r, n) {
                    var a;
                    return"loading" !== r.status || 0 !== n.url.indexOf("https://tradeexprod.alipay.com/cooperate/createTradeByBuyer.htm?partner=2088902230054344") && 0 !== n.url.indexOf("https://tradeexprod.alipay.com/cooperate/createTradeByBuyer.htm") ? void 0 : (a = "var f = function () {\n    var radio = document.getElementById('J-tradeType-FP');\n    if (radio) {\n        var hx_title = document.getElementsByClassName(\"order-shield\")[0].children[0].innerText;\n        if(hx_title.indexOf('红杏VIP充值') == 0){\n            document.getElementById('J-tradeType-FP').click();\n        }\n    } else {\n        setTimeout(f, 100);\n    }\n}\nf();", chrome.tabs.executeScript(e, {code: a}))
                }
            }(this)), this
        }, e.module("background").service("injectorManager", injectorManager)
    }, define(e, r)
}).call(this);