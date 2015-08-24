/*!
 * angular-translate - v2.4.2 - 2014-10-21
 * http://github.com/angular-translate/angular-translate
 * Copyright (c) 2014 ; Licensed MIT
 */
angular.module("pascalprecht.translate", ["ng"]).run(["$translate", function (a) {
    var b = a.storageKey(), c = a.storage();
    c ? c.get(b) ? a.use(c.get(b)) : angular.isString(a.preferredLanguage()) ? a.use(a.preferredLanguage()) : c.set(b, a.use()) : angular.isString(a.preferredLanguage()) && a.use(a.preferredLanguage())
}]), angular.module("pascalprecht.translate").provider("$translate", ["$STORAGE_KEY", function (a) {
    var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q = {}, r = [], s = a, t = [], u = !1, v = "translate-cloak", w = !1, x = ".", y = "2.4.2", z = function () {
        var a = window.navigator;
        return((angular.isArray(a.languages) ? a.languages[0] : a.language || a.browserLanguage || a.systemLanguage || a.userLanguage) || "").split("-").join("_")
    }, A = function (a, b) {
        for (var c = 0, d = a.length; d > c; c++)if (a[c] === b)return c;
        return-1
    }, B = function () {
        return this.replace(/^\s+|\s+$/g, "")
    }, C = function (a) {
        for (var b = [], d = angular.lowercase(a), e = 0, f = r.length; f > e; e++)b.push(angular.lowercase(r[e]));
        if (A(b, d) > -1)return a;
        if (c) {
            var g;
            for (var h in c) {
                var i = !1, j = Object.prototype.hasOwnProperty.call(c, h) && angular.lowercase(h) === angular.lowercase(a);
                if ("*" === h.slice(-1) && (i = h.slice(0, -1) === a.slice(0, h.length - 1)), (j || i) && (g = c[h], A(b, angular.lowercase(g)) > -1))return g
            }
        }
        var k = a.split("_");
        return k.length > 1 && A(b, angular.lowercase(k[0])) > -1 ? k[0] : a
    }, D = function (a, b) {
        if (!a && !b)return q;
        if (a && !b) {
            if (angular.isString(a))return q[a]
        } else angular.isObject(q[a]) || (q[a] = {}), angular.extend(q[a], E(b));
        return this
    };
    this.translations = D, this.cloakClassName = function (a) {
        return a ? (v = a, this) : v
    };
    var E = function (a, b, c, d) {
        var e, f, g, h;
        b || (b = []), c || (c = {});
        for (e in a)Object.prototype.hasOwnProperty.call(a, e) && (h = a[e], angular.isObject(h) ? E(h, b.concat(e), c, e) : (f = b.length ? "" + b.join(x) + x + e : e, b.length && e === d && (g = "" + b.join(x), c[g] = "@:" + f), c[f] = h));
        return c
    };
    this.addInterpolation = function (a) {
        return t.push(a), this
    }, this.useMessageFormatInterpolation = function () {
        return this.useInterpolation("$translateMessageFormatInterpolation")
    }, this.useInterpolation = function (a) {
        return k = a, this
    }, this.useSanitizeValueStrategy = function (a) {
        return u = a, this
    }, this.preferredLanguage = function (a) {
        return F(a), this
    };
    var F = function (a) {
        return a && (b = a), b
    };
    this.translationNotFoundIndicator = function (a) {
        return this.translationNotFoundIndicatorLeft(a), this.translationNotFoundIndicatorRight(a), this
    }, this.translationNotFoundIndicatorLeft = function (a) {
        return a ? (n = a, this) : n
    }, this.translationNotFoundIndicatorRight = function (a) {
        return a ? (o = a, this) : o
    }, this.fallbackLanguage = function (a) {
        return G(a), this
    };
    var G = function (a) {
        return a ? (angular.isString(a) ? (e = !0, d = [a]) : angular.isArray(a) && (e = !1, d = a), angular.isString(b) && A(d, b) < 0 && d.push(b), this) : e ? d[0] : d
    };
    this.use = function (a) {
        if (a) {
            if (!q[a] && !l)throw new Error("$translateProvider couldn't find translationTable for langKey: '" + a + "'");
            return f = a, this
        }
        return f
    };
    var H = function (a) {
        return a ? void(s = a) : i ? i + s : s
    };
    this.storageKey = H, this.useUrlLoader = function (a, b) {
        return this.useLoader("$translateUrlLoader", angular.extend({url: a}, b))
    }, this.useStaticFilesLoader = function (a) {
        return this.useLoader("$translateStaticFilesLoader", a)
    }, this.useLoader = function (a, b) {
        return l = a, m = b || {}, this
    }, this.useLocalStorage = function () {
        return this.useStorage("$translateLocalStorage")
    }, this.useCookieStorage = function () {
        return this.useStorage("$translateCookieStorage")
    }, this.useStorage = function (a) {
        return h = a, this
    }, this.storagePrefix = function (a) {
        return a ? (i = a, this) : a
    }, this.useMissingTranslationHandlerLog = function () {
        return this.useMissingTranslationHandler("$translateMissingTranslationHandlerLog")
    }, this.useMissingTranslationHandler = function (a) {
        return j = a, this
    }, this.usePostCompiling = function (a) {
        return w = !!a, this
    }, this.determinePreferredLanguage = function (a) {
        var c = a && angular.isFunction(a) ? a() : z();
        return b = r.length ? C(c) : c, this
    }, this.registerAvailableLanguageKeys = function (a, b) {
        return a ? (r = a, b && (c = b), this) : r
    }, this.useLoaderCache = function (a) {
        return a === !1 ? p = void 0 : a === !0 ? p = !0 : "undefined" == typeof a ? p = "$translationCache" : a && (p = a), this
    }, this.$get = ["$log", "$injector", "$rootScope", "$q", function (a, c, i, r) {
        var x, z, I, J = c.get(k || "$translateDefaultInterpolation"), K = !1, L = {}, M = {}, N = function (a, c, e) {
            if (angular.isArray(a)) {
                var g = function (a) {
                    for (var b = {}, d = [], f = function (a) {
                        var d = r.defer(), f = function (c) {
                            b[a] = c, d.resolve([a, c])
                        };
                        return N(a, c, e).then(f, f), d.promise
                    }, g = 0, h = a.length; h > g; g++)d.push(f(a[g]));
                    return r.all(d).then(function () {
                        return b
                    })
                };
                return g(a)
            }
            var i = r.defer();
            a && (a = B.apply(a));
            var j = function () {
                var a = b ? M[b] : M[f];
                if (z = 0, h && !a) {
                    var c = x.get(s);
                    if (a = M[c], d && d.length) {
                        var e = A(d, c);
                        z = 0 === e ? 1 : 0, A(d, b) < 0 && d.push(b)
                    }
                }
                return a
            }();
            return j ? j.then(function () {
                Z(a, c, e).then(i.resolve, i.reject)
            }, i.reject) : Z(a, c, e).then(i.resolve, i.reject), i.promise
        }, O = function (a) {
            return n && (a = [n, a].join(" ")), o && (a = [a, o].join(" ")), a
        }, P = function (a) {
            f = a, i.$emit("$translateChangeSuccess", {language: a}), h && x.set(N.storageKey(), f), J.setLocale(f), angular.forEach(L, function (a, b) {
                L[b].setLocale(f)
            }), i.$emit("$translateChangeEnd", {language: a})
        }, Q = function (a) {
            if (!a)throw"No language key specified for loading.";
            var b = r.defer();
            i.$emit("$translateLoadingStart", {language: a}), K = !0;
            var d = p;
            "string" == typeof d && (d = c.get(d));
            var e = angular.extend({}, m, {key: a, $http: angular.extend({}, {cache: d}, m.$http)});
            return c.get(l)(e).then(function (c) {
                var d = {};
                i.$emit("$translateLoadingSuccess", {language: a}), angular.isArray(c) ? angular.forEach(c, function (a) {
                    angular.extend(d, E(a))
                }) : angular.extend(d, E(c)), K = !1, b.resolve({key: a, table: d}), i.$emit("$translateLoadingEnd", {language: a})
            }, function (a) {
                i.$emit("$translateLoadingError", {language: a}), b.reject(a), i.$emit("$translateLoadingEnd", {language: a})
            }), b.promise
        };
        if (h && (x = c.get(h), !x.get || !x.set))throw new Error("Couldn't use storage '" + h + "', missing get() or set() method!");
        angular.isFunction(J.useSanitizeValueStrategy) && J.useSanitizeValueStrategy(u), t.length && angular.forEach(t, function (a) {
            var d = c.get(a);
            d.setLocale(b || f), angular.isFunction(d.useSanitizeValueStrategy) && d.useSanitizeValueStrategy(u), L[d.getInterpolationIdentifier()] = d
        });
        var R = function (a) {
            var b = r.defer();
            return Object.prototype.hasOwnProperty.call(q, a) ? b.resolve(q[a]) : M[a] ? M[a].then(function (a) {
                D(a.key, a.table), b.resolve(a.table)
            }, b.reject) : b.reject(), b.promise
        }, S = function (a, b, c, d) {
            var e = r.defer();
            return R(a).then(function (g) {
                Object.prototype.hasOwnProperty.call(g, b) ? (d.setLocale(a), e.resolve(d.interpolate(g[b], c)), d.setLocale(f)) : e.reject()
            }, e.reject), e.promise
        }, T = function (a, b, c, d) {
            var e, g = q[a];
            return Object.prototype.hasOwnProperty.call(g, b) && (d.setLocale(a), e = d.interpolate(g[b], c), d.setLocale(f)), e
        }, U = function (a) {
            if (j) {
                var b = c.get(j)(a, f);
                return void 0 !== b ? b : a
            }
            return a
        }, V = function (a, b, c, e) {
            var f = r.defer();
            if (a < d.length) {
                var g = d[a];
                S(g, b, c, e).then(f.resolve, function () {
                    V(a + 1, b, c, e).then(f.resolve)
                })
            } else f.resolve(U(b));
            return f.promise
        }, W = function (a, b, c, e) {
            var f;
            if (a < d.length) {
                var g = d[a];
                f = T(g, b, c, e), f || (f = W(a + 1, b, c, e))
            }
            return f
        }, X = function (a, b, c) {
            return V(I > 0 ? I : z, a, b, c)
        }, Y = function (a, b, c) {
            return W(I > 0 ? I : z, a, b, c)
        }, Z = function (a, b, c) {
            var e = r.defer(), g = f ? q[f] : q, h = c ? L[c] : J;
            if (g && Object.prototype.hasOwnProperty.call(g, a)) {
                var i = g[a];
                "@:" === i.substr(0, 2) ? N(i.substr(2), b, c).then(e.resolve, e.reject) : e.resolve(h.interpolate(i, b))
            } else {
                var k;
                j && !K && (k = U(a)), f && d && d.length ? X(a, b, h).then(function (a) {
                    e.resolve(a)
                }, function (a) {
                    e.reject(O(a))
                }) : j && !K && k ? e.resolve(k) : e.reject(O(a))
            }
            return e.promise
        }, $ = function (a, b, c) {
            var e, g = f ? q[f] : q, h = c ? L[c] : J;
            if (g && Object.prototype.hasOwnProperty.call(g, a)) {
                var i = g[a];
                e = "@:" === i.substr(0, 2) ? $(i.substr(2), b, c) : h.interpolate(i, b)
            } else {
                var k;
                j && !K && (k = U(a)), f && d && d.length ? (z = 0, e = Y(a, b, h)) : e = j && !K && k ? k : O(a)
            }
            return e
        };
        if (N.preferredLanguage = function (a) {
            return a && F(a), b
        }, N.cloakClassName = function () {
            return v
        }, N.fallbackLanguage = function (a) {
            if (void 0 !== a && null !== a) {
                if (G(a), l && d && d.length)for (var b = 0, c = d.length; c > b; b++)M[d[b]] || (M[d[b]] = Q(d[b]));
                N.use(N.use())
            }
            return e ? d[0] : d
        }, N.useFallbackLanguage = function (a) {
            if (void 0 !== a && null !== a)if (a) {
                var b = A(d, a);
                b > -1 && (I = b)
            } else I = 0
        }, N.proposedLanguage = function () {
            return g
        }, N.storage = function () {
            return x
        }, N.use = function (a) {
            if (!a)return f;
            var b = r.defer();
            i.$emit("$translateChangeStart", {language: a});
            var c = C(a);
            return c && (a = c), q[a] || !l || M[a] ? (b.resolve(a), P(a)) : (g = a, M[a] = Q(a).then(function (c) {
                D(c.key, c.table), b.resolve(c.key), P(c.key), g === a && (g = void 0)
            }, function (a) {
                g === a && (g = void 0), i.$emit("$translateChangeError", {language: a}), b.reject(a), i.$emit("$translateChangeEnd", {language: a})
            })), b.promise
        }, N.storageKey = function () {
            return H()
        }, N.isPostCompilingEnabled = function () {
            return w
        }, N.refresh = function (a) {
            function b() {
                e.resolve(), i.$emit("$translateRefreshEnd", {language: a})
            }

            function c() {
                e.reject(), i.$emit("$translateRefreshEnd", {language: a})
            }

            if (!l)throw new Error("Couldn't refresh translation table, no loader registered!");
            var e = r.defer();
            if (i.$emit("$translateRefreshStart", {language: a}), a)q[a] ? Q(a).then(function (c) {
                D(c.key, c.table), a === f && P(f), b()
            }, c) : c(); else {
                var g = [], h = {};
                if (d && d.length)for (var j = 0, k = d.length; k > j; j++)g.push(Q(d[j])), h[d[j]] = !0;
                f && !h[f] && g.push(Q(f)), r.all(g).then(function (a) {
                    angular.forEach(a, function (a) {
                        q[a.key] && delete q[a.key], D(a.key, a.table)
                    }), f && P(f), b()
                })
            }
            return e.promise
        }, N.instant = function (a, c, e) {
            if (null === a || angular.isUndefined(a))return a;
            if (angular.isArray(a)) {
                for (var g = {}, h = 0, i = a.length; i > h; h++)g[a[h]] = N.instant(a[h], c, e);
                return g
            }
            if (angular.isString(a) && a.length < 1)return a;
            a && (a = B.apply(a));
            var k, l = [];
            b && l.push(b), f && l.push(f), d && d.length && (l = l.concat(d));
            for (var m = 0, n = l.length; n > m; m++) {
                var o = l[m];
                if (q[o] && "undefined" != typeof q[o][a] && (k = $(a, c, e)), "undefined" != typeof k)break
            }
            return k || "" === k || (k = J.interpolate(a, c), j && !K && (k = U(a))), k
        }, N.versionInfo = function () {
            return y
        }, N.loaderCache = function () {
            return p
        }, l && (angular.equals(q, {}) && N.use(N.use()), d && d.length))for (var _ = function (a) {
            D(a.key, a.table), i.$emit("$translateChangeEnd", {language: a.key})
        }, ab = 0, bb = d.length; bb > ab; ab++)M[d[ab]] = Q(d[ab]).then(_);
        return N
    }]
}]), angular.module("pascalprecht.translate").factory("$translateDefaultInterpolation", ["$interpolate", function (a) {
    var b, c = {}, d = "default", e = null, f = {escaped: function (a) {
        var b = {};
        for (var c in a)Object.prototype.hasOwnProperty.call(a, c) && (b[c] = angular.element("<div></div>").text(a[c]).html());
        return b
    }}, g = function (a) {
        var b;
        return b = angular.isFunction(f[e]) ? f[e](a) : a
    };
    return c.setLocale = function (a) {
        b = a
    }, c.getInterpolationIdentifier = function () {
        return d
    }, c.useSanitizeValueStrategy = function (a) {
        return e = a, this
    }, c.interpolate = function (b, c) {
        return e && (c = g(c)), a(b)(c || {})
    }, c
}]), angular.module("pascalprecht.translate").constant("$STORAGE_KEY", "NG_TRANSLATE_LANG_KEY"), angular.module("pascalprecht.translate").directive("translate", ["$translate", "$q", "$interpolate", "$compile", "$parse", "$rootScope", function (a, b, c, d, e, f) {
    return{restrict: "AE", scope: !0, compile: function (b, g) {
        var h = g.translateValues ? g.translateValues : void 0, i = g.translateInterpolation ? g.translateInterpolation : void 0, j = b[0].outerHTML.match(/translate-value-+/i), k = "^(.*)(" + c.startSymbol() + ".*" + c.endSymbol() + ")(.*)";
        return function (b, l, m) {
            if (b.interpolateParams = {}, b.preText = "", b.postText = "", m.$observe("translate", function (a) {
                if (angular.equals(a, "") || !angular.isDefined(a)) {
                    var d = l.text().match(k);
                    angular.isArray(d) ? (b.preText = d[1], b.postText = d[3], b.translationId = c(d[2])(b.$parent)) : b.translationId = l.text().replace(/^\s+|\s+$/g, "")
                } else b.translationId = a
            }), m.$observe("translateDefault", function (a) {
                b.defaultText = a
            }), h && m.$observe("translateValues", function (a) {
                a && b.$parent.$watch(function () {
                    angular.extend(b.interpolateParams, e(a)(b.$parent))
                })
            }), j) {
                var n = function (a) {
                    m.$observe(a, function (c) {
                        b.interpolateParams[angular.lowercase(a.substr(14, 1)) + a.substr(15)] = c
                    })
                };
                for (var o in m)Object.prototype.hasOwnProperty.call(m, o) && "translateValue" === o.substr(0, 14) && "translateValues" !== o && n(o)
            }
            var p = function (b, c, e) {
                e || "undefined" == typeof c.defaultText || (b = c.defaultText), l.html(c.preText + b + c.postText);
                var f = a.isPostCompilingEnabled(), h = "undefined" != typeof g.translateCompile, i = h && "false" !== g.translateCompile;
                (f && !h || i) && d(l.contents())(c)
            }, q = function () {
                return h || j ? function () {
                    var c = function () {
                        b.translationId && b.interpolateParams && a(b.translationId, b.interpolateParams, i).then(function (a) {
                            p(a, b, !0)
                        }, function (a) {
                            p(a, b, !1)
                        })
                    };
                    b.$watch("interpolateParams", c, !0), b.$watch("translationId", c)
                } : function () {
                    var c = b.$watch("translationId", function (d) {
                        b.translationId && d && a(d, {}, i).then(function (a) {
                            p(a, b, !0), c()
                        }, function (a) {
                            p(a, b, !1), c()
                        })
                    }, !0)
                }
            }(), r = f.$on("$translateChangeSuccess", q);
            q(), b.$on("$destroy", r)
        }
    }}
}]), angular.module("pascalprecht.translate").directive("translateCloak", ["$rootScope", "$translate", function (a, b) {
    return{compile: function (c) {
        var d = function () {
            c.addClass(b.cloakClassName())
        }, e = function () {
            c.removeClass(b.cloakClassName())
        }, f = a.$on("$translateChangeEnd", function () {
            e(), f(), f = null
        });
        return d(), function (a, c, f) {
            f.translateCloak && f.translateCloak.length && f.$observe("translateCloak", function (a) {
                b(a).then(e, d)
            })
        }
    }}
}]), angular.module("pascalprecht.translate").filter("translate", ["$parse", "$translate", function (a, b) {
    var c = function (c, d, e) {
        return angular.isObject(d) || (d = a(d)(this)), b.instant(c, d, e)
    };
    return c.$stateful = !0, c
}]);