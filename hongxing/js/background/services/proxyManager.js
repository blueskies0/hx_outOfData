(function () {
    var e, r, t = [].indexOf || function (e) {
        for (var r = 0, t = this.length; t > r; r++)if (r in this && this[r] === e)return r;
        return-1
    };
    e = ["underscore", "debug", "angular", "core/services/storage", "core/services/timeUtils", "background/module", "background/services/server", "background/services/userDomains", "background/services/userManager"], r = function (e, r, n) {
        var o, proxyManager;
        return o = r("proxyManager"), proxyManager = function ($rootScope, $http, storage, timeUtils, server, userDomains, userManager, MODES, ROLES, VER, WHITE_LIST_DOMAINS, SERVER) {
            var r, i, s, u, a, p, l, c, h, f, d, m, g, x, v, y, b, w, O;
            return c = timeUtils.time(), w = 0, b = 0, O = 300, p = function () {
                return $rootScope.proxies = y(storage.get("proxies", [])), $rootScope.mode = storage.get("mode", MODES.AUTO), $rootScope.urlRules = {}, $rootScope.freeDomains = [], $rootScope.averageStability = 1, $rootScope.blocked = l(), s(), server.on("fetch_proxies", function () {
                    return a(!0)
                }), server.on("fetch_free_domains", function (r) {
                    return e.isArray(r) && !r.error && ($rootScope.freeDomains = r), !0
                }), $rootScope.$watch("user.role", function () {
                    return s()
                }), $rootScope.$watch("mode", function (e) {
                    return s(), storage.set("mode", e)
                }), $rootScope.$watch("domains", function () {
                    return s()
                }, !0), $rootScope.$watch("freeDomains", function () {
                    return s()
                }, !0), $rootScope.$watch("urlRules", function (e) {
                    return o("[changed] urlRules, %s", JSON.stringify(e)), s()
                }, !0), $rootScope.$watch("user", function () {
                    return w = 0, b = 0
                }), $rootScope.$watch("proxies", d, !0), $rootScope.$on("checkin-success", function () {
                    return a()
                }), chrome.proxy.onProxyError.addListener(m), o("ready")
            }, g = function (e) {
                return{host: e.host, port: e.port}
            }, v = function () {
                return timeUtils.time() < w + O ? void 0 : (w = timeUtils.time(), $http({method: "POST", url: "https://" + SERVER + "/v2/user/proxies", data: {sid: $rootScope.user.profile.sid, did: $rootScope.user.profile.did, pxs: f()}, headers: {"Content-Type": "application/x-www-form-urlencoded"}}).success(function (e) {
                    return e.proxies ? h(e.proxies) : void 0
                }))
            }, a = function (e) {
                return null == e && (e = !1), !e && timeUtils.time() < b + O ? void 0 : (b = timeUtils.time(), $http({method: "GET", url: "https://" + SERVER + "/v2/user/proxies", params: {sid: $rootScope.user.profile.sid, did: $rootScope.user.profile.did}}).success(function (e) {
                    return e.proxies ? h(e.proxies) : void 0
                }))
            }, d = function (i, u) {
                var a, p, h, f, d, m;
                return $rootScope.blocked = l(), $rootScope.averageStability = r(), f = e.map(u, g), x(), h = e.map($rootScope.proxies, g), n.equals(f, h) ? (a = t.call(e.pluck($rootScope.proxies, "stability"), -1) < 0, a && (p = e.min(function () {
                    var e, r, t, n;
                    for (t = $rootScope.proxies, n = [], e = 0, r = t.length; r > e; e++)d = t[e], n.push(Math.abs(d.fail));
                    return n
                }()), m = Math.min(O, 10 + 300 * Math.pow(p / 5, 2)), c + m < timeUtils.time() && (v(), c = timeUtils.time()))) : (o("generate script"), s(), v(), c = timeUtils.time()), storage.set("proxies", n.copy($rootScope.proxies))
            }, m = function (e) {
                var r, t;
                if ("net::ERR_PROXY_CONNECTION_FAILED" !== (t = e.error) && "net::ERR_TUNNEL_CONNECTION_FAILED" !== t)return r = $rootScope.proxies[0], chrome.proxy.settings.get({}, function (t) {
                    return chrome.management.getAll(function (n) {
                        var o, i, s, u, a, p, l;
                        for (i = [], u = 0, a = n.length; a > u; u++)o = n[u], o.enabled && o.id !== chrome.runtime.id && "extension" === o.type && i.push(o.name);
                        return s = null != (p = t.value) && null != (l = p.pacScript) ? l.data.slice(-1e3) : void 0, Raven.captureMessage("" + e.error, {extra: {details: e.details, level: t.levelOfControl, extensions: i, script: s}, tags: {fatal: e.fatal, ver: VER, proxy: null != r ? r.name : void 0}})
                    })
                })
            }, y = function (r) {
                var t, n, o, i, s, u, a, p, l, c, h, f, d;
                for (o = 0, a = r.length; a > o; o++) {
                    for (n = r[o], h = ["name", "group", "scheme", "host"], i = 0, p = h.length; p > i; i++)t = h[i], e.isString(n[t]) || (n[t] = "");
                    for (f = ["port", "fail"], s = 0, l = f.length; l > s; s++)t = f[s], e.isNumber(n[t]) || (n[t] = 0);
                    for (d = ["latency", "speed", "stability"], u = 0, c = d.length; c > u; u++)t = d[u], e.isNumber(n[t]) || (n[t] = -1)
                }
                return r
            }, h = function (r) {
                var t, n, o, i, s, u, a, p, l;
                for (i = y(r), s = 0, a = i.length; a > s; s++)if (o = i[s], n = e.findWhere($rootScope.proxies, {name: o.name}))for (l = ["latency", "fail", "stability", "speed"], u = 0, p = l.length; p > u; u++)t = l[u], o[t] = n[t];
                return $rootScope.proxies = i, setTimeout(function () {
                    return $rootScope.$apply()
                })
            }, r = function () {
                var r;
                return r = e.map(e.pluck($rootScope.proxies, "stability"), function (e) {
                    return-1 === e ? 1 : e
                }), r.length ? e.reduce(r, function (e, r) {
                    return e + r
                }) / r.length : 1
            }, i = function (e) {
                var r, t, n, o, i;
                return i = Math.pow(e.stability, 2), n = e.speed, r = e.latency, o = n > 0 ? n > 500 ? 1 : 1 - Math.pow(1 - n / 500, 2) : .5, t = r > 0 ? 1e3 >= r ? 1 - Math.pow(r / 1e3, 2) / 3 : 3e3 > r ? 2 * Math.pow((3e3 - r) / 2e3, 2) / 3 : 0 : .5, parseFloat(((.6 * o + .4 * t) * i).toFixed(2))
            }, x = function () {
                return $rootScope.proxies = e.sortBy($rootScope.proxies, function (e) {
                    return-i(e)
                })
            }, f = function () {
                var e, r;
                return o("make pxs info, last report time: %s s ago", timeUtils.time() - c), r = $rootScope.proxies, [function () {
                    var t, n, o;
                    for (o = [], t = 0, n = r.length; n > t; t++)e = r[t], o.push(e.name);
                    return o
                }(), function () {
                    var t, n, o;
                    for (o = [], t = 0, n = r.length; n > t; t++)e = r[t], o.push(parseFloat(e.stability.toFixed(2)));
                    return o
                }(), function () {
                    var t, n, o;
                    for (o = [], t = 0, n = r.length; n > t; t++)e = r[t], o.push(e.fail);
                    return o
                }(), function () {
                    var t, n, o;
                    for (o = [], t = 0, n = r.length; n > t; t++)e = r[t], o.push(e.latency);
                    return o
                }(), function () {
                    var t, n, o;
                    for (o = [], t = 0, n = r.length; n > t; t++)e = r[t], o.push(parseFloat(e.speed.toFixed(2)));
                    return o
                }(), function () {
                    var t, n, o;
                    for (o = [], t = 0, n = r.length; n > t; t++)e = r[t], o.push(i(e));
                    return o
                }()]
            }, l = function () {
                return e.all($rootScope.proxies, function (e) {
                    return e.fail >= 3
                }) || 0 === $rootScope.proxies.length
            }, s = e.throttle(function () {
                var e, r;
                return $rootScope.user.role === ROLES.VIP && $rootScope.mode !== MODES.NEVER || (null != (r = $rootScope.freeDomains) ? r.length : void 0) > 0 || "{}" !== JSON.stringify($rootScope.urlRules) ? (e = {mode: "pac_script", pacScript: {data: u(), mandatory: !0}}, chrome.proxy.settings.set({value: e, scope: "regular"}, function () {
                    return function () {
                        return null
                    }
                }(this))) : chrome.proxy.settings.clear({}), o("_generateAndApplyConfig")
            }, 500), u = function () {
                var e, r, t, n, o, i, s, u, a, p, l, c, h, f, d, m, g, x, v, y, b, w, O, D, E;
                for (o = $rootScope.mode, o !== MODES.AUTO && o !== MODES.ALWAYS && (o = MODES.AUTO), l = [], w = ($rootScope.proxies || []).slice(0, 2), d = 0, v = w.length; v > d; d++)s = w[d], l.push("" + s.scheme + " " + s.host + ":" + s.port);
                p = l.join(";"), n = [], n.push(["function Find", "roxyForURL(url, host) {\n"].join("P")), n.push('var D = "DIRECT";'), n.push("var p='" + p + "';\n"), n.push("if (shExpMatch(host, '10.[0-9]+.[0-9]+.[0-9]+')) return D;"), n.push("if (shExpMatch(host, '172.[0-9]+.[0-9]+.[0-9]+')) return D;"), n.push("if (shExpMatch(host, '192.168.[0-9]+.[0-9]+')) return D;"), O = $rootScope.urlRules || {};
                for (f in O)s = O[f], n.push("if (url == '" + f + "') return '" + s.scheme + " " + s.host + ":" + s.port + "';");
                for (n.push("if (url.indexOf('https://www.google.com/complete/search?client=chrome-omni') == 0)"), n.push("	return D;"), n.push("if (url.indexOf('http://clients1.google.com/generate_204') == 0)"), n.push("	return D;"), n.push("if (url.indexOf('http://chart.apis.google.com/') == 0)"), n.push("	return D;"), n.push("if (url.indexOf('http://toolbarqueries.google.com') == 0)"), n.push("	return D;\n"), n.push("var i = url.indexOf('_HXPROXY=');"), n.push("if (i >= 0) return url.substr(i+9).replace('+', ' ');\n"), m = 0, y = WHITE_LIST_DOMAINS.length; y > m; m++)e = WHITE_LIST_DOMAINS[m], n.push("if (dnsDomainIs(host, '" + e + "')) return D;");
                if (n.push("\n"), r = [], r = r.concat(o === MODES.AUTO && (null != $rootScope && null != (D = $rootScope.user) ? D.role : void 0) === ROLES.VIP ? userDomains.names() : $rootScope.freeDomains), o !== MODES.ALWAYS) {
                    for (c = {}, g = 0, b = r.length; b > g; g++)for (e = r[g], i = c, a = e.toLowerCase().split(".").reverse(), t = x = 0, E = a.length - 1; E >= 0 ? E >= x : x >= E; t = E >= 0 ? ++x : --x)if (u = a[t], t === a.length - 1)i[u] = 1; else {
                        if (1 === i[u])break;
                        null == i[u] && (i[u] = {}), i = i[u]
                    }
                    n.push("var node = " + JSON.stringify(c) + ";"), n.push("var hostParts = host.toLowerCase().split('.');"), n.push("for (var i=hostParts.length - 1; i >= 0; i --) {"), n.push("    var part = hostParts[i];"), n.push("    node = node[part];"), n.push("    if (node == undefined || node == 1) break;"), n.push("}"), n.push("if (node == 1)"), n.push("    return p;\n")
                } else n.push("return p;");
                return n.push("return D;"), n.push("}"), h = n.join("\n")
            }, this.updateSpeed = function (e, r) {
                return-1 === e.speed && (e.speed = r), e.speed = parseInt(.75 * e.speed + .25 * r)
            }, this.updateLatency = function (e, r) {
                return-1 === e.latency && (e.latency = r), e.latency = parseInt(.75 * e.latency + .25 * r)
            }, this.updateStability = function (e, r) {
                return-1 === e.stability && (e.stability = r), e.stability = parseFloat((.75 * e.stability + .25 * r).toFixed(3))
            }, this.getProxyByName = function (r) {
                return e.findWhere($rootScope.proxies, {name: r})
            }, p(), window.showProxies = function () {
                var r, t;
                return t = function () {
                    var t, n, o, i;
                    for (o = $rootScope.proxies, i = [], t = 0, n = o.length; n > t; t++)r = o[t], i.push(e.omit(r, "host", "port"));
                    return i
                }(), console.table(t)
            }, this
        }, n.module("background").service("proxyManager", proxyManager)
    }, define(e, r)
}).call(this);