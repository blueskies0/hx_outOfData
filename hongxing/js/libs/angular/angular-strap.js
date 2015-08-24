/**
 * angular-strap
 * @version v2.1.4 - 2014-11-26
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes (olivier@mg-crea.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
!function (e, t, n) {
    "use strict";
    angular.module("mgcrea.ngStrap", ["mgcrea.ngStrap.modal", "mgcrea.ngStrap.aside", "mgcrea.ngStrap.alert", "mgcrea.ngStrap.button", "mgcrea.ngStrap.select", "mgcrea.ngStrap.datepicker", "mgcrea.ngStrap.timepicker", "mgcrea.ngStrap.navbar", "mgcrea.ngStrap.tooltip", "mgcrea.ngStrap.popover", "mgcrea.ngStrap.dropdown", "mgcrea.ngStrap.typeahead", "mgcrea.ngStrap.scrollspy", "mgcrea.ngStrap.affix", "mgcrea.ngStrap.tab", "mgcrea.ngStrap.collapse"]), angular.module("mgcrea.ngStrap.affix", ["mgcrea.ngStrap.helpers.dimensions", "mgcrea.ngStrap.helpers.debounce"]).provider("$affix", function () {
        var e = this.defaults = {offsetTop: "auto"};
        this.$get = ["$window", "debounce", "dimensions", function (t, n, a) {
            function o(o, s) {
                function l(e, t, n) {
                    var a = u(), o = c();
                    return v >= a ? "top" : null !== e && a + e <= t.top ? "middle" : null !== y && t.top + n + $ >= o - y ? "bottom" : "middle"
                }

                function u() {
                    return p[0] === t ? t.pageYOffset : p[0].scrollTop
                }

                function c() {
                    return p[0] === t ? t.document.body.scrollHeight : p[0].scrollHeight
                }

                var d = {}, f = angular.extend({}, e, s), p = f.target, m = "affix affix-top affix-bottom", g = !1, $ = 0, h = 0, v = 0, y = 0, w = null, b = null, D = o.parent();
                if (f.offsetParent)if (f.offsetParent.match(/^\d+$/))for (var k = 0; k < 1 * f.offsetParent - 1; k++)D = D.parent(); else D = angular.element(f.offsetParent);
                return d.init = function () {
                    this.$parseOffsets(), h = a.offset(o[0]).top + $, g = !o[0].style.width, p.on("scroll", this.checkPosition), p.on("click", this.checkPositionWithEventLoop), r.on("resize", this.$debouncedOnResize), this.checkPosition(), this.checkPositionWithEventLoop()
                }, d.destroy = function () {
                    p.off("scroll", this.checkPosition), p.off("click", this.checkPositionWithEventLoop), r.off("resize", this.$debouncedOnResize)
                }, d.checkPositionWithEventLoop = function () {
                    setTimeout(d.checkPosition, 1)
                }, d.checkPosition = function () {
                    var e = u(), t = a.offset(o[0]), n = a.height(o[0]), r = l(b, t, n);
                    w !== r && (w = r, o.removeClass(m).addClass("affix" + ("middle" !== r ? "-" + r : "")), "top" === r ? (b = null, o.css("position", f.offsetParent ? "" : "relative"), g && o.css("width", ""), o.css("top", "")) : "bottom" === r ? (b = f.offsetUnpin ? -(1 * f.offsetUnpin) : t.top - e, g && o.css("width", ""), o.css("position", f.offsetParent ? "" : "relative"), o.css("top", f.offsetParent ? "" : i[0].offsetHeight - y - n - h + "px")) : (b = null, g && o.css("width", o[0].offsetWidth + "px"), o.css("position", "fixed"), o.css("top", $ + "px")))
                }, d.$onResize = function () {
                    d.$parseOffsets(), d.checkPosition()
                }, d.$debouncedOnResize = n(d.$onResize, 50), d.$parseOffsets = function () {
                    var e = o.css("position");
                    o.css("position", f.offsetParent ? "" : "relative"), f.offsetTop && ("auto" === f.offsetTop && (f.offsetTop = "+0"), f.offsetTop.match(/^[-+]\d+$/) ? ($ = 1 * -f.offsetTop, v = f.offsetParent ? a.offset(D[0]).top + 1 * f.offsetTop : a.offset(o[0]).top - a.css(o[0], "marginTop", !0) + 1 * f.offsetTop) : v = 1 * f.offsetTop), f.offsetBottom && (y = f.offsetParent && f.offsetBottom.match(/^[-+]\d+$/) ? c() - (a.offset(D[0]).top + a.height(D[0])) + 1 * f.offsetBottom + 1 : 1 * f.offsetBottom), o.css("position", e)
                }, d.init(), d
            }

            var i = angular.element(t.document.body), r = angular.element(t);
            return o
        }]
    }).directive("bsAffix", ["$affix", "$window", function (e, t) {
        return{restrict: "EAC", require: "^?bsAffixTarget", link: function (n, a, o, i) {
            var r = {scope: n, offsetTop: "auto", target: i ? i.$element : angular.element(t)};
            angular.forEach(["offsetTop", "offsetBottom", "offsetParent", "offsetUnpin"], function (e) {
                angular.isDefined(o[e]) && (r[e] = o[e])
            });
            var s = e(a, r);
            n.$on("$destroy", function () {
                s && s.destroy(), r = null, s = null
            })
        }}
    }]).directive("bsAffixTarget", function () {
        return{controller: ["$element", function (e) {
            this.$element = e
        }]}
    }), angular.module("mgcrea.ngStrap.alert", ["mgcrea.ngStrap.modal"]).provider("$alert", function () {
        var e = this.defaults = {animation: "am-fade", prefixClass: "alert", prefixEvent: "alert", placement: null, template: "alert/alert.tpl.html", container: !1, element: null, backdrop: !1, keyboard: !0, show: !0, duration: !1, type: !1, dismissable: !0};
        this.$get = ["$modal", "$timeout", function (t, n) {
            function a(a) {
                var o = {}, i = angular.extend({}, e, a);
                o = t(i), o.$scope.dismissable = !!i.dismissable, i.type && (o.$scope.type = i.type);
                var r = o.show;
                return i.duration && (o.show = function () {
                    r(), n(function () {
                        o.hide()
                    }, 1e3 * i.duration)
                }), o
            }

            return a
        }]
    }).directive("bsAlert", ["$window", "$sce", "$alert", function (e, t, n) {
        e.requestAnimationFrame || e.setTimeout;
        return{restrict: "EAC", scope: !0, link: function (e, a, o) {
            var i = {scope: e, element: a, show: !1};
            angular.forEach(["template", "placement", "keyboard", "html", "container", "animation", "duration", "dismissable"], function (e) {
                angular.isDefined(o[e]) && (i[e] = o[e])
            }), angular.forEach(["title", "content", "type"], function (n) {
                o[n] && o.$observe(n, function (a) {
                    e[n] = t.trustAsHtml(a)
                })
            }), o.bsAlert && e.$watch(o.bsAlert, function (t) {
                angular.isObject(t) ? angular.extend(e, t) : e.content = t
            }, !0);
            var r = n(i);
            a.on(o.trigger || "click", r.toggle), e.$on("$destroy", function () {
                r && r.destroy(), i = null, r = null
            })
        }}
    }]), angular.module("mgcrea.ngStrap.aside", ["mgcrea.ngStrap.modal"]).provider("$aside", function () {
        var e = this.defaults = {animation: "am-fade-and-slide-right", prefixClass: "aside", prefixEvent: "aside", placement: "right", template: "aside/aside.tpl.html", contentTemplate: !1, container: !1, element: null, backdrop: !0, keyboard: !0, html: !1, show: !0};
        this.$get = ["$modal", function (t) {
            function n(n) {
                var a = {}, o = angular.extend({}, e, n);
                return a = t(o)
            }

            return n
        }]
    }).directive("bsAside", ["$window", "$sce", "$aside", function (e, t, n) {
        e.requestAnimationFrame || e.setTimeout;
        return{restrict: "EAC", scope: !0, link: function (e, a, o) {
            var i = {scope: e, element: a, show: !1};
            angular.forEach(["template", "contentTemplate", "placement", "backdrop", "keyboard", "html", "container", "animation"], function (e) {
                angular.isDefined(o[e]) && (i[e] = o[e])
            }), angular.forEach(["title", "content"], function (n) {
                o[n] && o.$observe(n, function (a) {
                    e[n] = t.trustAsHtml(a)
                })
            }), o.bsAside && e.$watch(o.bsAside, function (t) {
                angular.isObject(t) ? angular.extend(e, t) : e.content = t
            }, !0);
            var r = n(i);
            a.on(o.trigger || "click", r.toggle), e.$on("$destroy", function () {
                r && r.destroy(), i = null, r = null
            })
        }}
    }]), angular.module("mgcrea.ngStrap.button", []).provider("$button", function () {
        var e = this.defaults = {activeClass: "active", toggleEvent: "click"};
        this.$get = function () {
            return{defaults: e}
        }
    }).directive("bsCheckboxGroup", function () {
        return{restrict: "A", require: "ngModel", compile: function (e, t) {
            e.attr("data-toggle", "buttons"), e.removeAttr("ng-model");
            var n = e[0].querySelectorAll('input[type="checkbox"]');
            angular.forEach(n, function (e) {
                var n = angular.element(e);
                n.attr("bs-checkbox", ""), n.attr("ng-model", t.ngModel + "." + n.attr("value"))
            })
        }}
    }).directive("bsCheckbox", ["$button", "$$rAF", function (e, t) {
        var n = e.defaults, a = /^(true|false|\d+)$/;
        return{restrict: "A", require: "ngModel", link: function (e, o, i, r) {
            var s = n, l = "INPUT" === o[0].nodeName, u = l ? o.parent() : o, c = angular.isDefined(i.trueValue) ? i.trueValue : !0;
            a.test(i.trueValue) && (c = e.$eval(i.trueValue));
            var d = angular.isDefined(i.falseValue) ? i.falseValue : !1;
            a.test(i.falseValue) && (d = e.$eval(i.falseValue));
            var f = "boolean" != typeof c || "boolean" != typeof d;
            f && (r.$parsers.push(function (e) {
                return e ? c : d
            }), r.$formatters.push(function (e) {
                return angular.equals(e, c)
            }), e.$watch(i.ngModel, function () {
                r.$render()
            })), r.$render = function () {
                var e = angular.equals(r.$modelValue, c);
                t(function () {
                    l && (o[0].checked = e), u.toggleClass(s.activeClass, e)
                })
            }, o.bind(s.toggleEvent, function () {
                e.$apply(function () {
                    l || r.$setViewValue(!u.hasClass("active")), f || r.$render()
                })
            })
        }}
    }]).directive("bsRadioGroup", function () {
        return{restrict: "A", require: "ngModel", compile: function (e, t) {
            e.attr("data-toggle", "buttons"), e.removeAttr("ng-model");
            var n = e[0].querySelectorAll('input[type="radio"]');
            angular.forEach(n, function (e) {
                angular.element(e).attr("bs-radio", ""), angular.element(e).attr("ng-model", t.ngModel)
            })
        }}
    }).directive("bsRadio", ["$button", "$$rAF", function (e, t) {
        var n = e.defaults, a = /^(true|false|\d+)$/;
        return{restrict: "A", require: "ngModel", link: function (e, o, i, r) {
            var s = n, l = "INPUT" === o[0].nodeName, u = l ? o.parent() : o, c = a.test(i.value) ? e.$eval(i.value) : i.value;
            r.$render = function () {
                var e = angular.equals(r.$modelValue, c);
                t(function () {
                    l && (o[0].checked = e), u.toggleClass(s.activeClass, e)
                })
            }, o.bind(s.toggleEvent, function () {
                e.$apply(function () {
                    r.$setViewValue(c), r.$render()
                })
            })
        }}
    }]), angular.module("mgcrea.ngStrap.collapse", []).provider("$collapse", function () {
        var e = this.defaults = {animation: "am-collapse", disallowToggle: !1, activeClass: "in", startCollapsed: !1}, t = this.controller = function (t, n, a) {
            var o = this;
            o.$options = angular.copy(e), angular.forEach(["animation", "disallowToggle", "activeClass", "startCollapsed"], function (e) {
                angular.isDefined(a[e]) && (o.$options[e] = a[e])
            }), o.$toggles = [], o.$targets = [], o.$viewChangeListeners = [], o.$registerToggle = function (e) {
                o.$toggles.push(e)
            }, o.$registerTarget = function (e) {
                o.$targets.push(e)
            }, o.$targets.$active = o.$options.startCollapsed ? -1 : 0, o.$setActive = t.$setActive = function (e) {
                o.$targets.$active = o.$options.disallowToggle ? e : o.$targets.$active === e ? -1 : e, o.$viewChangeListeners.forEach(function (e) {
                    e()
                })
            }
        };
        this.$get = function () {
            var n = {};
            return n.defaults = e, n.controller = t, n
        }
    }).directive("bsCollapse", ["$window", "$animate", "$collapse", function (e, t, n) {
        n.defaults;
        return{require: ["?ngModel", "bsCollapse"], controller: ["$scope", "$element", "$attrs", n.controller], link: function (e, t, n, a) {
            var o = a[0], i = a[1];
            o && (i.$viewChangeListeners.push(function () {
                o.$setViewValue(i.$targets.$active)
            }), o.$formatters.push(function (e) {
                return i.$targets.$active !== 1 * e && i.$setActive(1 * e), e
            }))
        }}
    }]).directive("bsCollapseToggle", function () {
        return{require: ["^?ngModel", "^bsCollapse"], link: function (e, t, n, a) {
            var o = (a[0], a[1]);
            t.attr("data-toggle", "collapse"), o.$registerToggle(t), t.on("click", function () {
                var a = n.bsCollapseToggle || o.$toggles.indexOf(t);
                o.$setActive(1 * a), e.$apply()
            })
        }}
    }).directive("bsCollapseTarget", ["$animate", function (e) {
        return{require: ["^?ngModel", "^bsCollapse"], link: function (t, n, a, o) {
            function i() {
                var t = r.$targets.indexOf(n), a = r.$targets.$active;
                e[t === a ? "addClass" : "removeClass"](n, r.$options.activeClass)
            }

            var r = (o[0], o[1]);
            n.addClass("collapse"), r.$options.animation && n.addClass(r.$options.animation), r.$registerTarget(n), r.$viewChangeListeners.push(function () {
                i()
            }), i()
        }}
    }]), angular.module("mgcrea.ngStrap.datepicker", ["mgcrea.ngStrap.helpers.dateParser", "mgcrea.ngStrap.helpers.dateFormatter", "mgcrea.ngStrap.tooltip"]).provider("$datepicker", function () {
        var e = this.defaults = {animation: "am-fade", prefixClass: "datepicker", placement: "bottom-left", template: "datepicker/datepicker.tpl.html", trigger: "focus", container: !1, keyboard: !0, html: !1, delay: 0, useNative: !1, dateType: "date", dateFormat: "shortDate", modelDateFormat: null, dayFormat: "dd", monthFormat: "MMM", yearFormat: "yyyy", monthTitleFormat: "MMMM yyyy", yearTitleFormat: "yyyy", strictFormat: !1, autoclose: !1, minDate: -1 / 0, maxDate: +1 / 0, startView: 0, minView: 0, startWeek: 0, daysOfWeekDisabled: "", iconLeft: "glyphicon glyphicon-chevron-left", iconRight: "glyphicon glyphicon-chevron-right"};
        this.$get = ["$window", "$document", "$rootScope", "$sce", "$dateFormatter", "datepickerViews", "$tooltip", "$timeout", function (t, n, a, o, i, r, s, l) {
            function u(t, n, a) {
                function o(e) {
                    e.selected = u.$isSelected(e.date)
                }

                function i() {
                    t[0].focus()
                }

                var u = s(t, angular.extend({}, e, a)), f = a.scope, p = u.$options, m = u.$scope;
                p.startView && (p.startView -= p.minView);
                var g = r(u);
                u.$views = g.views;
                var $ = g.viewDate;
                m.$mode = p.startView, m.$iconLeft = p.iconLeft, m.$iconRight = p.iconRight;
                var h = u.$views[m.$mode];
                m.$select = function (e) {
                    u.select(e)
                }, m.$selectPane = function (e) {
                    u.$selectPane(e)
                }, m.$toggleMode = function () {
                    u.setMode((m.$mode + 1) % u.$views.length)
                }, u.update = function (e) {
                    angular.isDate(e) && !isNaN(e.getTime()) && (u.$date = e, h.update.call(h, e)), u.$build(!0)
                }, u.updateDisabledDates = function (e) {
                    p.disabledDateRanges = e;
                    for (var t = 0, n = m.rows.length; n > t; t++)angular.forEach(m.rows[t], u.$setDisabledEl)
                }, u.select = function (e, t) {
                    angular.isDate(n.$dateValue) || (n.$dateValue = new Date(e)), !m.$mode || t ? (n.$setViewValue(angular.copy(e)), n.$render(), p.autoclose && !t && l(function () {
                        u.hide(!0)
                    })) : (angular.extend($, {year: e.getFullYear(), month: e.getMonth(), date: e.getDate()}), u.setMode(m.$mode - 1), u.$build())
                }, u.setMode = function (e) {
                    m.$mode = e, h = u.$views[m.$mode], u.$build()
                }, u.$build = function (e) {
                    e === !0 && h.built || (e !== !1 || h.built) && h.build.call(h)
                }, u.$updateSelected = function () {
                    for (var e = 0, t = m.rows.length; t > e; e++)angular.forEach(m.rows[e], o)
                }, u.$isSelected = function (e) {
                    return h.isSelected(e)
                }, u.$setDisabledEl = function (e) {
                    e.disabled = h.isDisabled(e.date)
                }, u.$selectPane = function (e) {
                    var t = h.steps, n = new Date(Date.UTC($.year + (t.year || 0) * e, $.month + (t.month || 0) * e, 1));
                    angular.extend($, {year: n.getUTCFullYear(), month: n.getUTCMonth(), date: n.getUTCDate()}), u.$build()
                }, u.$onMouseDown = function (e) {
                    if (e.preventDefault(), e.stopPropagation(), d) {
                        var t = angular.element(e.target);
                        "button" !== t[0].nodeName.toLowerCase() && (t = t.parent()), t.triggerHandler("click")
                    }
                }, u.$onKeyDown = function (e) {
                    if (/(38|37|39|40|13)/.test(e.keyCode) && !e.shiftKey && !e.altKey) {
                        if (e.preventDefault(), e.stopPropagation(), 13 === e.keyCode)return m.$mode ? m.$apply(function () {
                            u.setMode(m.$mode - 1)
                        }) : u.hide(!0);
                        h.onKeyDown(e), f.$digest()
                    }
                };
                var v = u.init;
                u.init = function () {
                    return c && p.useNative ? (t.prop("type", "date"), void t.css("-webkit-appearance", "textfield")) : (d && (t.prop("type", "text"), t.attr("readonly", "true"), t.on("click", i)), void v())
                };
                var y = u.destroy;
                u.destroy = function () {
                    c && p.useNative && t.off("click", i), y()
                };
                var w = u.show;
                u.show = function () {
                    w(), l(function () {
                        u.$element.on(d ? "touchstart" : "mousedown", u.$onMouseDown), p.keyboard && t.on("keydown", u.$onKeyDown)
                    }, 0, !1)
                };
                var b = u.hide;
                return u.hide = function (e) {
                    u.$isShown && (u.$element.off(d ? "touchstart" : "mousedown", u.$onMouseDown), p.keyboard && t.off("keydown", u.$onKeyDown), b(e))
                }, u
            }

            var c = (angular.element(t.document.body), /(ip(a|o)d|iphone|android)/gi.test(t.navigator.userAgent)), d = "createTouch"in t.document && c;
            return e.lang || (e.lang = i.getDefaultLocale()), u.defaults = e, u
        }]
    }).directive("bsDatepicker", ["$window", "$parse", "$q", "$dateFormatter", "$dateParser", "$datepicker", function (e, t, n, a, o, i) {
        var r = (i.defaults, /(ip(a|o)d|iphone|android)/gi.test(e.navigator.userAgent));
        return{restrict: "EAC", require: "ngModel", link: function (e, t, n, s) {
            function l(e) {
                return e && e.length ? e : null
            }

            function u(e) {
                if (angular.isDate(e)) {
                    var t = isNaN(f.$options.minDate) || e.getTime() >= f.$options.minDate, n = isNaN(f.$options.maxDate) || e.getTime() <= f.$options.maxDate, a = t && n;
                    s.$setValidity("date", a), s.$setValidity("min", t), s.$setValidity("max", n), a && (s.$dateValue = e)
                }
            }

            function c() {
                return!s.$dateValue || isNaN(s.$dateValue.getTime()) ? "" : m(s.$dateValue, d.dateFormat)
            }

            var d = {scope: e, controller: s};
            angular.forEach(["placement", "container", "delay", "trigger", "keyboard", "html", "animation", "template", "autoclose", "dateType", "dateFormat", "modelDateFormat", "dayFormat", "strictFormat", "startWeek", "startDate", "useNative", "lang", "startView", "minView", "iconLeft", "iconRight", "daysOfWeekDisabled"], function (e) {
                angular.isDefined(n[e]) && (d[e] = n[e])
            }), n.bsShow && e.$watch(n.bsShow, function (e) {
                f && angular.isDefined(e) && (angular.isString(e) && (e = !!e.match(/true|,?(datepicker),?/i)), e === !0 ? f.show() : f.hide())
            });
            var f = i(t, s, d);
            d = f.$options, r && d.useNative && (d.dateFormat = "yyyy-MM-dd");
            var p = d.lang, m = function (e, t) {
                return a.formatDate(e, t, p)
            }, g = o({format: d.dateFormat, lang: p, strict: d.strictFormat});
            angular.forEach(["minDate", "maxDate"], function (e) {
                angular.isDefined(n[e]) && n.$observe(e, function (t) {
                    f.$options[e] = g.getDateForAttribute(e, t), !isNaN(f.$options[e]) && f.$build(!1), u(s.$dateValue)
                })
            }), e.$watch(n.ngModel, function () {
                f.update(s.$dateValue)
            }, !0), angular.isDefined(n.disabledDates) && e.$watch(n.disabledDates, function (e, t) {
                e = l(e), t = l(t), e && f.updateDisabledDates(e)
            }), s.$parsers.unshift(function (e) {
                if (!e)return s.$setValidity("date", !0), null;
                var t = g.parse(e, s.$dateValue);
                return!t || isNaN(t.getTime()) ? void s.$setValidity("date", !1) : (u(t), "string" === d.dateType ? m(t, d.modelDateFormat || d.dateFormat) : "number" === d.dateType ? s.$dateValue.getTime() : "iso" === d.dateType ? s.$dateValue.toISOString() : new Date(s.$dateValue))
            }), s.$formatters.push(function (e) {
                var t;
                return t = angular.isUndefined(e) || null === e ? 0 / 0 : angular.isDate(e) ? e : "string" === d.dateType ? g.parse(e, null, d.modelDateFormat) : new Date(e), s.$dateValue = t, c()
            }), s.$render = function () {
                t.val(c())
            }, e.$on("$destroy", function () {
                f && f.destroy(), d = null, f = null
            })
        }}
    }]).provider("datepickerViews", function () {
        function e(e, t) {
            for (var n = []; e.length > 0;)n.push(e.splice(0, t));
            return n
        }

        function t(e, t) {
            return(e % t + t) % t
        }

        this.defaults = {dayFormat: "dd", daySplit: 7};
        this.$get = ["$dateFormatter", "$dateParser", "$sce", function (n, a, o) {
            return function (i) {
                var r = i.$scope, s = i.$options, l = s.lang, u = function (e, t) {
                    return n.formatDate(e, t, l)
                }, c = a({format: s.dateFormat, lang: l, strict: s.strictFormat}), d = n.weekdaysShort(l), f = d.slice(s.startWeek).concat(d.slice(0, s.startWeek)), p = o.trustAsHtml('<th class="dow text-center">' + f.join('</th><th class="dow text-center">') + "</th>"), m = i.$date || (s.startDate ? c.getDateForAttribute("startDate", s.startDate) : new Date), g = {year: m.getFullYear(), month: m.getMonth(), date: m.getDate()}, $ = (6e4 * m.getTimezoneOffset(), [
                    {format: s.dayFormat, split: 7, steps: {month: 1}, update: function (e, t) {
                        !this.built || t || e.getFullYear() !== g.year || e.getMonth() !== g.month ? (angular.extend(g, {year: i.$date.getFullYear(), month: i.$date.getMonth(), date: i.$date.getDate()}), i.$build()) : e.getDate() !== g.date && (g.date = i.$date.getDate(), i.$updateSelected())
                    }, build: function () {
                        var n = new Date(g.year, g.month, 1), a = n.getTimezoneOffset(), o = new Date(+n - 864e5 * t(n.getDay() - s.startWeek, 7)), l = o.getTimezoneOffset(), d = (new Date).toDateString();
                        l !== a && (o = new Date(+o + 6e4 * (l - a)));
                        for (var f, m = [], $ = 0; 42 > $; $++)f = c.daylightSavingAdjust(new Date(o.getFullYear(), o.getMonth(), o.getDate() + $)), m.push({date: f, isToday: f.toDateString() === d, label: u(f, this.format), selected: i.$date && this.isSelected(f), muted: f.getMonth() !== g.month, disabled: this.isDisabled(f)});
                        r.title = u(n, s.monthTitleFormat), r.showLabels = !0, r.labels = p, r.rows = e(m, this.split), this.built = !0
                    }, isSelected: function (e) {
                        return i.$date && e.getFullYear() === i.$date.getFullYear() && e.getMonth() === i.$date.getMonth() && e.getDate() === i.$date.getDate()
                    }, isDisabled: function (e) {
                        var t = e.getTime();
                        if (t < s.minDate || t > s.maxDate)return!0;
                        if (-1 !== s.daysOfWeekDisabled.indexOf(e.getDay()))return!0;
                        if (s.disabledDateRanges)for (var n = 0; n < s.disabledDateRanges.length; n++)if (t >= s.disabledDateRanges[n].start && t <= s.disabledDateRanges[n].end)return!0;
                        return!1
                    }, onKeyDown: function (e) {
                        if (i.$date) {
                            var t, n = i.$date.getTime();
                            37 === e.keyCode ? t = new Date(n - 864e5) : 38 === e.keyCode ? t = new Date(n - 6048e5) : 39 === e.keyCode ? t = new Date(n + 864e5) : 40 === e.keyCode && (t = new Date(n + 6048e5)), this.isDisabled(t) || i.select(t, !0)
                        }
                    }},
                    {name: "month", format: s.monthFormat, split: 4, steps: {year: 1}, update: function (e) {
                        this.built && e.getFullYear() === g.year ? e.getMonth() !== g.month && (angular.extend(g, {month: i.$date.getMonth(), date: i.$date.getDate()}), i.$updateSelected()) : (angular.extend(g, {year: i.$date.getFullYear(), month: i.$date.getMonth(), date: i.$date.getDate()}), i.$build())
                    }, build: function () {
                        for (var t, n = (new Date(g.year, 0, 1), []), a = 0; 12 > a; a++)t = new Date(g.year, a, 1), n.push({date: t, label: u(t, this.format), selected: i.$isSelected(t), disabled: this.isDisabled(t)});
                        r.title = u(t, s.yearTitleFormat), r.showLabels = !1, r.rows = e(n, this.split), this.built = !0
                    }, isSelected: function (e) {
                        return i.$date && e.getFullYear() === i.$date.getFullYear() && e.getMonth() === i.$date.getMonth()
                    }, isDisabled: function (e) {
                        var t = +new Date(e.getFullYear(), e.getMonth() + 1, 0);
                        return t < s.minDate || e.getTime() > s.maxDate
                    }, onKeyDown: function (e) {
                        if (i.$date) {
                            var t = i.$date.getMonth(), n = new Date(i.$date);
                            37 === e.keyCode ? n.setMonth(t - 1) : 38 === e.keyCode ? n.setMonth(t - 4) : 39 === e.keyCode ? n.setMonth(t + 1) : 40 === e.keyCode && n.setMonth(t + 4), this.isDisabled(n) || i.select(n, !0)
                        }
                    }},
                    {name: "year", format: s.yearFormat, split: 4, steps: {year: 12}, update: function (e, t) {
                        !this.built || t || parseInt(e.getFullYear() / 20, 10) !== parseInt(g.year / 20, 10) ? (angular.extend(g, {year: i.$date.getFullYear(), month: i.$date.getMonth(), date: i.$date.getDate()}), i.$build()) : e.getFullYear() !== g.year && (angular.extend(g, {year: i.$date.getFullYear(), month: i.$date.getMonth(), date: i.$date.getDate()}), i.$updateSelected())
                    }, build: function () {
                        for (var t, n = g.year - g.year % (3 * this.split), a = [], o = 0; 12 > o; o++)t = new Date(n + o, 0, 1), a.push({date: t, label: u(t, this.format), selected: i.$isSelected(t), disabled: this.isDisabled(t)});
                        r.title = a[0].label + "-" + a[a.length - 1].label, r.showLabels = !1, r.rows = e(a, this.split), this.built = !0
                    }, isSelected: function (e) {
                        return i.$date && e.getFullYear() === i.$date.getFullYear()
                    }, isDisabled: function (e) {
                        var t = +new Date(e.getFullYear() + 1, 0, 0);
                        return t < s.minDate || e.getTime() > s.maxDate
                    }, onKeyDown: function (e) {
                        if (i.$date) {
                            var t = i.$date.getFullYear(), n = new Date(i.$date);
                            37 === e.keyCode ? n.setYear(t - 1) : 38 === e.keyCode ? n.setYear(t - 4) : 39 === e.keyCode ? n.setYear(t + 1) : 40 === e.keyCode && n.setYear(t + 4), this.isDisabled(n) || i.select(n, !0)
                        }
                    }}
                ]);
                return{views: s.minView ? Array.prototype.slice.call($, s.minView) : $, viewDate: g}
            }
        }]
    }), angular.module("mgcrea.ngStrap.dropdown", ["mgcrea.ngStrap.tooltip"]).provider("$dropdown", function () {
        var e = this.defaults = {animation: "am-fade", prefixClass: "dropdown", placement: "bottom-left", template: "dropdown/dropdown.tpl.html", trigger: "click", container: !1, keyboard: !0, html: !1, delay: 0};
        this.$get = ["$window", "$rootScope", "$tooltip", "$timeout", function (t, n, a, o) {
            function i(t, i) {
                function l(e) {
                    return e.target !== t[0] ? e.target !== t[0] && u.hide() : void 0
                }

                {
                    var u = {}, c = angular.extend({}, e, i);
                    u.$scope = c.scope && c.scope.$new() || n.$new()
                }
                u = a(t, c);
                var d = t.parent();
                u.$onKeyDown = function (e) {
                    if (/(38|40)/.test(e.keyCode)) {
                        e.preventDefault(), e.stopPropagation();
                        var t = angular.element(u.$element[0].querySelectorAll("li:not(.divider) a"));
                        if (t.length) {
                            var n;
                            angular.forEach(t, function (e, t) {
                                s && s.call(e, ":focus") && (n = t)
                            }), 38 === e.keyCode && n > 0 ? n-- : 40 === e.keyCode && n < t.length - 1 ? n++ : angular.isUndefined(n) && (n = 0), t.eq(n)[0].focus()
                        }
                    }
                };
                var f = u.show;
                u.show = function () {
                    f(), o(function () {
                        c.keyboard && u.$element.on("keydown", u.$onKeyDown), r.on("click", l)
                    }, 0, !1), d.hasClass("dropdown") && d.addClass("open")
                };
                var p = u.hide;
                u.hide = function () {
                    u.$isShown && (c.keyboard && u.$element.off("keydown", u.$onKeyDown), r.off("click", l), d.hasClass("dropdown") && d.removeClass("open"), p())
                };
                var m = u.destroy;
                return u.destroy = function () {
                    r.off("click", l), m()
                }, u
            }

            var r = angular.element(t.document.body), s = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector;
            return i
        }]
    }).directive("bsDropdown", ["$window", "$sce", "$dropdown", function (e, t, n) {
        return{restrict: "EAC", scope: !0, link: function (e, t, a) {
            var o = {scope: e};
            angular.forEach(["placement", "container", "delay", "trigger", "keyboard", "html", "animation", "template"], function (e) {
                angular.isDefined(a[e]) && (o[e] = a[e])
            }), a.bsDropdown && e.$watch(a.bsDropdown, function (t) {
                e.content = t
            }, !0), a.bsShow && e.$watch(a.bsShow, function (e) {
                i && angular.isDefined(e) && (angular.isString(e) && (e = !!e.match(/true|,?(dropdown),?/i)), e === !0 ? i.show() : i.hide())
            });
            var i = n(t, o);
            e.$on("$destroy", function () {
                i && i.destroy(), o = null, i = null
            })
        }}
    }]), angular.module("mgcrea.ngStrap.helpers.dateFormatter", []).service("$dateFormatter", ["$locale", "dateFilter", function (e, t) {
        function n(e) {
            return/(h+)([:\.])?(m+)[ ]?(a?)/i.exec(e).slice(1)
        }

        this.getDefaultLocale = function () {
            return e.id
        }, this.getDatetimeFormat = function (t) {
            return e.DATETIME_FORMATS[t] || t
        }, this.weekdaysShort = function () {
            return e.DATETIME_FORMATS.SHORTDAY
        }, this.hoursFormat = function (e) {
            return n(e)[0]
        }, this.minutesFormat = function (e) {
            return n(e)[2]
        }, this.timeSeparator = function (e) {
            return n(e)[1]
        }, this.showAM = function (e) {
            return!!n(e)[3]
        }, this.formatDate = function (e, n) {
            return t(e, n)
        }
    }]), angular.module("mgcrea.ngStrap.helpers.dateParser", []).provider("$dateParser", ["$localeProvider", function () {
        function e() {
            this.year = 1970, this.month = 0, this.day = 1, this.hours = 0, this.minutes = 0, this.seconds = 0, this.milliseconds = 0
        }

        function t() {
        }

        function n(e) {
            return!isNaN(parseFloat(e)) && isFinite(e)
        }

        function a(e, t) {
            for (var n = e.length, a = t.toString().toLowerCase(), o = 0; n > o; o++)if (e[o].toLowerCase() === a)return o;
            return-1
        }

        e.prototype.setMilliseconds = function (e) {
            this.milliseconds = e
        }, e.prototype.setSeconds = function (e) {
            this.seconds = e
        }, e.prototype.setMinutes = function (e) {
            this.minutes = e
        }, e.prototype.setHours = function (e) {
            this.hours = e
        }, e.prototype.getHours = function () {
            return this.hours
        }, e.prototype.setDate = function (e) {
            this.day = e
        }, e.prototype.setMonth = function (e) {
            this.month = e
        }, e.prototype.setFullYear = function (e) {
            this.year = e
        }, e.prototype.fromDate = function (e) {
            return this.year = e.getFullYear(), this.month = e.getMonth(), this.day = e.getDate(), this.hours = e.getHours(), this.minutes = e.getMinutes(), this.seconds = e.getSeconds(), this.milliseconds = e.getMilliseconds(), this
        }, e.prototype.toDate = function () {
            return new Date(this.year, this.month, this.day, this.hours, this.minutes, this.seconds, this.milliseconds)
        };
        var o = e.prototype, i = this.defaults = {format: "shortDate", strict: !1};
        this.$get = ["$locale", "dateFilter", function (r, s) {
            var l = function (l) {
                function u(e) {
                    var t, n = Object.keys(h), a = [], o = [], i = e;
                    for (t = 0; t < n.length; t++)if (e.split(n[t]).length > 1) {
                        var r = i.search(n[t]);
                        e = e.split(n[t]).join(""), h[n[t]] && (a[r] = h[n[t]])
                    }
                    return angular.forEach(a, function (e) {
                        e && o.push(e)
                    }), o
                }

                function c(e) {
                    return e.replace(/\//g, "[\\/]").replace("/-/g", "[-]").replace(/\./g, "[.]").replace(/\\s/g, "[\\s]")
                }

                function d(e) {
                    var t, n = Object.keys($), a = e;
                    for (t = 0; t < n.length; t++)a = a.split(n[t]).join("${"+t+"}");
                    for (t = 0; t < n.length; t++)a = a.split("${"+t+"}").join("(" + $[n[t]] + ")");
                    return e = c(e), new RegExp("^" + a + "$", ["i"])
                }

                var f, p, m = angular.extend({}, i, l), g = {}, $ = {sss: "[0-9]{3}", ss: "[0-5][0-9]", s: m.strict ? "[1-5]?[0-9]" : "[0-9]|[0-5][0-9]", mm: "[0-5][0-9]", m: m.strict ? "[1-5]?[0-9]" : "[0-9]|[0-5][0-9]", HH: "[01][0-9]|2[0-3]", H: m.strict ? "1?[0-9]|2[0-3]" : "[01]?[0-9]|2[0-3]", hh: "[0][1-9]|[1][012]", h: m.strict ? "[1-9]|1[012]" : "0?[1-9]|1[012]", a: "AM|PM", EEEE: r.DATETIME_FORMATS.DAY.join("|"), EEE: r.DATETIME_FORMATS.SHORTDAY.join("|"), dd: "0[1-9]|[12][0-9]|3[01]", d: m.strict ? "[1-9]|[1-2][0-9]|3[01]" : "0?[1-9]|[1-2][0-9]|3[01]", MMMM: r.DATETIME_FORMATS.MONTH.join("|"), MMM: r.DATETIME_FORMATS.SHORTMONTH.join("|"), MM: "0[1-9]|1[012]", M: m.strict ? "[1-9]|1[012]" : "0?[1-9]|1[012]", yyyy: "[1]{1}[0-9]{3}|[2]{1}[0-9]{3}", yy: "[0-9]{2}", y: m.strict ? "-?(0|[1-9][0-9]{0,3})" : "-?0*[0-9]{1,4}"}, h = {sss: o.setMilliseconds, ss: o.setSeconds, s: o.setSeconds, mm: o.setMinutes, m: o.setMinutes, HH: o.setHours, H: o.setHours, hh: o.setHours, h: o.setHours, EEEE: t, EEE: t, dd: o.setDate, d: o.setDate, a: function (e) {
                    var t = this.getHours() % 12;
                    return this.setHours(e.match(/pm/i) ? t + 12 : t)
                }, MMMM: function (e) {
                    return this.setMonth(a(r.DATETIME_FORMATS.MONTH, e))
                }, MMM: function (e) {
                    return this.setMonth(a(r.DATETIME_FORMATS.SHORTMONTH, e))
                }, MM: function (e) {
                    return this.setMonth(1 * e - 1)
                }, M: function (e) {
                    return this.setMonth(1 * e - 1)
                }, yyyy: o.setFullYear, yy: function (e) {
                    return this.setFullYear(2e3 + 1 * e)
                }, y: o.setFullYear};
                return g.init = function () {
                    g.$format = r.DATETIME_FORMATS[m.format] || m.format, f = d(g.$format), p = u(g.$format)
                }, g.isValid = function (e) {
                    return angular.isDate(e) ? !isNaN(e.getTime()) : f.test(e)
                }, g.parse = function (t, n, a) {
                    a && (a = r.DATETIME_FORMATS[a] || a), angular.isDate(t) && (t = s(t, a || g.$format));
                    var o = a ? d(a) : f, i = a ? u(a) : p, l = o.exec(t);
                    if (!l)return!1;
                    for (var c = (new e).fromDate(n && !isNaN(n.getTime()) ? n : new Date(1970, 0, 1, 0)), m = 0; m < l.length - 1; m++)i[m] && i[m].call(c, l[m + 1]);
                    return c.toDate()
                }, g.getDateForAttribute = function (e, t) {
                    var a;
                    if ("today" === t) {
                        var o = new Date;
                        a = new Date(o.getFullYear(), o.getMonth(), o.getDate() + ("maxDate" === e ? 1 : 0), 0, 0, 0, "minDate" === e ? 0 : -1)
                    } else a = angular.isString(t) && t.match(/^".+"$/) ? new Date(t.substr(1, t.length - 2)) : n(t) ? new Date(parseInt(t, 10)) : angular.isString(t) && 0 === t.length ? "minDate" === e ? -1 / 0 : +1 / 0 : new Date(t);
                    return a
                }, g.getTimeForAttribute = function (e, t) {
                    var a;
                    return a = "now" === t ? (new Date).setFullYear(1970, 0, 1) : angular.isString(t) && t.match(/^".+"$/) ? new Date(t.substr(1, t.length - 2)).setFullYear(1970, 0, 1) : n(t) ? new Date(parseInt(t, 10)).setFullYear(1970, 0, 1) : angular.isString(t) && 0 === t.length ? "minTime" === e ? -1 / 0 : +1 / 0 : g.parse(t, new Date(1970, 0, 1, 0))
                }, g.daylightSavingAdjust = function (e) {
                    return e ? (e.setHours(e.getHours() > 12 ? e.getHours() + 2 : 0), e) : null
                }, g.init(), g
            };
            return l
        }]
    }]), angular.module("mgcrea.ngStrap.helpers.debounce", []).factory("debounce", ["$timeout", function (e) {
        return function (t, n, a) {
            var o = null;
            return function () {
                var i = this, r = arguments, s = a && !o;
                return o && e.cancel(o), o = e(function () {
                    o = null, a || t.apply(i, r)
                }, n, !1), s && t.apply(i, r), o
            }
        }
    }]).factory("throttle", ["$timeout", function (e) {
        return function (t, n, a) {
            var o = null;
            return a || (a = {}), function () {
                var i = this, r = arguments;
                o || (a.leading !== !1 && t.apply(i, r), o = e(function () {
                    o = null, a.trailing !== !1 && t.apply(i, r)
                }, n, !1))
            }
        }
    }]), angular.module("mgcrea.ngStrap.helpers.dimensions", []).factory("dimensions", ["$document", "$window", function () {
        var t = (angular.element, {}), n = t.nodeName = function (e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        };
        t.css = function (t, n, a) {
            var o;
            return o = t.currentStyle ? t.currentStyle[n] : e.getComputedStyle ? e.getComputedStyle(t)[n] : t.style[n], a === !0 ? parseFloat(o) || 0 : o
        }, t.offset = function (t) {
            var n = t.getBoundingClientRect(), a = t.ownerDocument;
            return{width: n.width || t.offsetWidth, height: n.height || t.offsetHeight, top: n.top + (e.pageYOffset || a.documentElement.scrollTop) - (a.documentElement.clientTop || 0), left: n.left + (e.pageXOffset || a.documentElement.scrollLeft) - (a.documentElement.clientLeft || 0)}
        }, t.position = function (e) {
            var o, i, r = {top: 0, left: 0};
            return"fixed" === t.css(e, "position") ? i = e.getBoundingClientRect() : (o = a(e), i = t.offset(e), n(o, "html") || (r = t.offset(o)), r.top += t.css(o, "borderTopWidth", !0), r.left += t.css(o, "borderLeftWidth", !0)), {width: e.offsetWidth, height: e.offsetHeight, top: i.top - r.top - t.css(e, "marginTop", !0), left: i.left - r.left - t.css(e, "marginLeft", !0)}
        };
        var a = function (e) {
            var a = e.ownerDocument, o = e.offsetParent || a;
            if (n(o, "#document"))return a.documentElement;
            for (; o && !n(o, "html") && "static" === t.css(o, "position");)o = o.offsetParent;
            return o || a.documentElement
        };
        return t.height = function (e, n) {
            var a = e.offsetHeight;
            return n ? a += t.css(e, "marginTop", !0) + t.css(e, "marginBottom", !0) : a -= t.css(e, "paddingTop", !0) + t.css(e, "paddingBottom", !0) + t.css(e, "borderTopWidth", !0) + t.css(e, "borderBottomWidth", !0), a
        }, t.width = function (e, n) {
            var a = e.offsetWidth;
            return n ? a += t.css(e, "marginLeft", !0) + t.css(e, "marginRight", !0) : a -= t.css(e, "paddingLeft", !0) + t.css(e, "paddingRight", !0) + t.css(e, "borderLeftWidth", !0) + t.css(e, "borderRightWidth", !0), a
        }, t
    }]), angular.module("mgcrea.ngStrap.helpers.parseOptions", []).provider("$parseOptions", function () {
        var e = this.defaults = {regexp: /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/};
        this.$get = ["$parse", "$q", function (t, n) {
            function a(a, o) {
                function i(e, t) {
                    return e.map(function (e, n) {
                        var a, o, i = {};
                        return i[c] = e, a = u(t, i), o = p(t, i), {label: a, value: o, index: n}
                    })
                }

                var r = {}, s = angular.extend({}, e, o);
                r.$values = [];
                var l, u, c, d, f, p, m;
                return r.init = function () {
                    r.$match = l = a.match(s.regexp), u = t(l[2] || l[1]), c = l[4] || l[6], d = l[5], f = t(l[3] || ""), p = t(l[2] ? l[1] : c), m = t(l[7])
                }, r.valuesFn = function (e, t) {
                    return n.when(m(e, t)).then(function (t) {
                        return r.$values = t ? i(t, e) : {}, r.$values
                    })
                }, r.displayValue = function (e) {
                    var t = {};
                    return t[c] = e, u(t)
                }, r.init(), r
            }

            return a
        }]
    }), angular.version.minor < 3 && angular.version.dot < 14 && angular.module("ng").factory("$$rAF", ["$window", "$timeout", function (e, t) {
        var n = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame, a = e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.mozCancelAnimationFrame || e.webkitCancelRequestAnimationFrame, o = !!n, i = o ? function (e) {
            var t = n(e);
            return function () {
                a(t)
            }
        } : function (e) {
            var n = t(e, 16.66, !1);
            return function () {
                t.cancel(n)
            }
        };
        return i.supported = o, i
    }]), angular.module("mgcrea.ngStrap.modal", ["mgcrea.ngStrap.helpers.dimensions"]).provider("$modal", function () {
        var e = this.defaults = {animation: "am-fade", backdropAnimation: "am-fade", prefixClass: "modal", prefixEvent: "modal", placement: "top", template: "modal/modal.tpl.html", contentTemplate: !1, container: !1, element: null, backdrop: !0, keyboard: !0, html: !1, show: !0};
        this.$get = ["$window", "$rootScope", "$compile", "$q", "$templateCache", "$http", "$animate", "$timeout", "$sce", "dimensions", function (n, a, o, i, r, s, l, u, c) {
            function d(t) {
                function n() {
                    d.$emit(u.prefixEvent + ".show", s)
                }

                function i() {
                    d.$emit(u.prefixEvent + ".hide", s), v.removeClass(u.prefixClass + "-open"), u.animation && v.removeClass(u.prefixClass + "-with-" + u.animation)
                }

                function r(e) {
                    e.target === e.currentTarget && ("static" === u.backdrop ? s.focus() : s.hide())
                }

                var s = {}, u = s.$options = angular.extend({}, e, t);
                s.$promise = m(u.template);
                var d = s.$scope = u.scope && u.scope.$new() || a.$new();
                u.element || u.container || (u.container = "body"), g(["title", "content"], function (e) {
                    u[e] && (d[e] = c.trustAsHtml(u[e]))
                }), d.$hide = function () {
                    d.$$postDigest(function () {
                        s.hide()
                    })
                }, d.$show = function () {
                    d.$$postDigest(function () {
                        s.show()
                    })
                }, d.$toggle = function () {
                    d.$$postDigest(function () {
                        s.toggle()
                    })
                }, u.contentTemplate && (s.$promise = s.$promise.then(function (e) {
                    var n = angular.element(e);
                    return m(u.contentTemplate).then(function (e) {
                        var a = p('[ng-bind="content"]', n[0]).removeAttr("ng-bind").html(e);
                        return t.template || a.next().remove(), n[0].outerHTML
                    })
                }));
                var w, b, D = angular.element('<div class="' + u.prefixClass + '-backdrop"/>');
                return s.$promise.then(function (e) {
                    angular.isObject(e) && (e = e.data), u.html && (e = e.replace(y, 'ng-bind-html="')), e = $.apply(e), w = o(e), s.init()
                }), s.init = function () {
                    u.show && d.$$postDigest(function () {
                        s.show()
                    })
                }, s.destroy = function () {
                    b && (b.remove(), b = null), D && (D.remove(), D = null), d.$destroy()
                }, s.show = function () {
                    if (!d.$isShown && !d.$emit(u.prefixEvent + ".show.before", s).defaultPrevented) {
                        var e, t;
                        angular.isElement(u.container) ? (e = u.container, t = u.container[0].lastChild ? angular.element(u.container[0].lastChild) : null) : u.container ? (e = p(u.container), t = e[0].lastChild ? angular.element(e[0].lastChild) : null) : (e = null, t = u.element), b = s.$element = w(d, function () {
                        }), b.css({display: "block"}).addClass(u.placement), u.animation && (u.backdrop && D.addClass(u.backdropAnimation), b.addClass(u.animation)), u.backdrop && l.enter(D, v, null);
                        var a = l.enter(b, e, t, n);
                        a && a.then && a.then(n), s.$isShown = d.$isShown = !0, f(d);
                        var o = b[0];
                        h(function () {
                            o.focus()
                        }), v.addClass(u.prefixClass + "-open"), u.animation && v.addClass(u.prefixClass + "-with-" + u.animation), u.backdrop && (b.on("click", r), D.on("click", r)), u.keyboard && b.on("keyup", s.$onKeyUp)
                    }
                }, s.hide = function () {
                    if (d.$isShown && !d.$emit(u.prefixEvent + ".hide.before", s).defaultPrevented) {
                        var e = l.leave(b, i);
                        e && e.then && e.then(i), u.backdrop && l.leave(D), s.$isShown = d.$isShown = !1, f(d), u.backdrop && (b.off("click", r), D.off("click", r)), u.keyboard && b.off("keyup", s.$onKeyUp)
                    }
                }, s.toggle = function () {
                    d.$isShown ? s.hide() : s.show()
                }, s.focus = function () {
                    b[0].focus()
                }, s.$onKeyUp = function (e) {
                    27 === e.which && d.$isShown && (s.hide(), e.stopPropagation())
                }, s
            }

            function f(e) {
                e.$$phase || e.$root && e.$root.$$phase || e.$digest()
            }

            function p(e, n) {
                return angular.element((n || t).querySelectorAll(e))
            }

            function m(e) {
                return w[e] ? w[e] : w[e] = i.when(r.get(e) || s.get(e)).then(function (t) {
                    return angular.isObject(t) ? (r.put(e, t.data), t.data) : t
                })
            }

            var g = angular.forEach, $ = String.prototype.trim, h = n.requestAnimationFrame || n.setTimeout, v = angular.element(n.document.body), y = /ng-bind="/gi, w = {};
            return d
        }]
    }).directive("bsModal", ["$window", "$sce", "$modal", function (e, t, n) {
        return{restrict: "EAC", scope: !0, link: function (e, a, o) {
            var i = {scope: e, element: a, show: !1};
            angular.forEach(["template", "contentTemplate", "placement", "backdrop", "keyboard", "html", "container", "animation"], function (e) {
                angular.isDefined(o[e]) && (i[e] = o[e])
            }), angular.forEach(["title", "content"], function (n) {
                o[n] && o.$observe(n, function (a) {
                    e[n] = t.trustAsHtml(a)
                })
            }), o.bsModal && e.$watch(o.bsModal, function (t) {
                angular.isObject(t) ? angular.extend(e, t) : e.content = t
            }, !0);
            var r = n(i);
            a.on(o.trigger || "click", r.toggle), e.$on("$destroy", function () {
                r && r.destroy(), i = null, r = null
            })
        }}
    }]), angular.module("mgcrea.ngStrap.navbar", []).provider("$navbar", function () {
        var e = this.defaults = {activeClass: "active", routeAttr: "data-match-route", strict: !1};
        this.$get = function () {
            return{defaults: e}
        }
    }).directive("bsNavbar", ["$window", "$location", "$navbar", function (e, t, n) {
        var a = n.defaults;
        return{restrict: "A", link: function (e, n, o) {
            var i = angular.copy(a);
            angular.forEach(Object.keys(a), function (e) {
                angular.isDefined(o[e]) && (i[e] = o[e])
            }), e.$watch(function () {
                return t.path()
            }, function (e) {
                var t = n[0].querySelectorAll("li[" + i.routeAttr + "]");
                angular.forEach(t, function (t) {
                    var n = angular.element(t), a = n.attr(i.routeAttr).replace("/", "\\/");
                    i.strict && (a = "^" + a + "$");
                    var o = new RegExp(a, ["i"]);
                    o.test(e) ? n.addClass(i.activeClass) : n.removeClass(i.activeClass)
                })
            })
        }}
    }]), angular.module("mgcrea.ngStrap.popover", ["mgcrea.ngStrap.tooltip"]).provider("$popover", function () {
        var e = this.defaults = {animation: "am-fade", customClass: "", container: !1, target: !1, placement: "right", template: "popover/popover.tpl.html", contentTemplate: !1, trigger: "click", keyboard: !0, html: !1, title: "", content: "", delay: 0, autoClose: !1};
        this.$get = ["$tooltip", function (t) {
            function n(n, a) {
                var o = angular.extend({}, e, a), i = t(n, o);
                return o.content && (i.$scope.content = o.content), i
            }

            return n
        }]
    }).directive("bsPopover", ["$window", "$sce", "$popover", function (e, t, n) {
        var a = e.requestAnimationFrame || e.setTimeout;
        return{restrict: "EAC", scope: !0, link: function (e, o, i) {
            var r = {scope: e};
            angular.forEach(["template", "contentTemplate", "placement", "container", "target", "delay", "trigger", "keyboard", "html", "animation", "customClass", "autoClose"], function (e) {
                angular.isDefined(i[e]) && (r[e] = i[e])
            }), angular.forEach(["title", "content"], function (n) {
                i[n] && i.$observe(n, function (o, i) {
                    e[n] = t.trustAsHtml(o), angular.isDefined(i) && a(function () {
                        s && s.$applyPlacement()
                    })
                })
            }), i.bsPopover && e.$watch(i.bsPopover, function (t, n) {
                angular.isObject(t) ? angular.extend(e, t) : e.content = t, angular.isDefined(n) && a(function () {
                    s && s.$applyPlacement()
                })
            }, !0), i.bsShow && e.$watch(i.bsShow, function (e) {
                s && angular.isDefined(e) && (angular.isString(e) && (e = !!e.match(/true|,?(popover),?/i)), e === !0 ? s.show() : s.hide())
            });
            var s = n(o, r);
            e.$on("$destroy", function () {
                s && s.destroy(), r = null, s = null
            })
        }}
    }]), angular.module("mgcrea.ngStrap.scrollspy", ["mgcrea.ngStrap.helpers.debounce", "mgcrea.ngStrap.helpers.dimensions"]).provider("$scrollspy", function () {
        var e = this.$$spies = {}, n = this.defaults = {debounce: 150, throttle: 100, offset: 100};
        this.$get = ["$window", "$document", "$rootScope", "dimensions", "debounce", "throttle", function (a, o, i, r, s, l) {
            function u(e, t) {
                return e[0].nodeName && e[0].nodeName.toLowerCase() === t.toLowerCase()
            }

            function c(o) {
                var c = angular.extend({}, n, o);
                c.element || (c.element = p);
                var m = u(c.element, "body"), g = m ? d : c.element, $ = m ? "window" : c.id;
                if (e[$])return e[$].$$count++, e[$];
                var h, v, y, w, b, D, k, S, T = {}, C = T.$trackedElements = [], x = [];
                return T.init = function () {
                    this.$$count = 1, w = s(this.checkPosition, c.debounce), b = l(this.checkPosition, c.throttle), g.on("click", this.checkPositionWithEventLoop), d.on("resize", w), g.on("scroll", b), D = s(this.checkOffsets, c.debounce), h = i.$on("$viewContentLoaded", D), v = i.$on("$includeContentLoaded", D), D(), $ && (e[$] = T)
                }, T.destroy = function () {
                    this.$$count--, this.$$count > 0 || (g.off("click", this.checkPositionWithEventLoop), d.off("resize", w), g.off("scroll", w), h(), v(), $ && delete e[$])
                }, T.checkPosition = function () {
                    if (x.length) {
                        if (S = (m ? a.pageYOffset : g.prop("scrollTop")) || 0, k = Math.max(a.innerHeight, f.prop("clientHeight")), S < x[0].offsetTop && y !== x[0].target)return T.$activateElement(x[0]);
                        for (var e = x.length; e--;)if (!angular.isUndefined(x[e].offsetTop) && null !== x[e].offsetTop && y !== x[e].target && !(S < x[e].offsetTop || x[e + 1] && S > x[e + 1].offsetTop))return T.$activateElement(x[e])
                    }
                }, T.checkPositionWithEventLoop = function () {
                    setTimeout(T.checkPosition, 1)
                }, T.$activateElement = function (e) {
                    if (y) {
                        var t = T.$getTrackedElement(y);
                        t && (t.source.removeClass("active"), u(t.source, "li") && u(t.source.parent().parent(), "li") && t.source.parent().parent().removeClass("active"))
                    }
                    y = e.target, e.source.addClass("active"), u(e.source, "li") && u(e.source.parent().parent(), "li") && e.source.parent().parent().addClass("active")
                }, T.$getTrackedElement = function (e) {
                    return C.filter(function (t) {
                        return t.target === e
                    })[0]
                }, T.checkOffsets = function () {
                    angular.forEach(C, function (e) {
                        var n = t.querySelector(e.target);
                        e.offsetTop = n ? r.offset(n).top : null, c.offset && null !== e.offsetTop && (e.offsetTop -= 1 * c.offset)
                    }), x = C.filter(function (e) {
                        return null !== e.offsetTop
                    }).sort(function (e, t) {
                        return e.offsetTop - t.offsetTop
                    }), w()
                }, T.trackElement = function (e, t) {
                    C.push({target: e, source: t})
                }, T.untrackElement = function (e, t) {
                    for (var n, a = C.length; a--;)if (C[a].target === e && C[a].source === t) {
                        n = a;
                        break
                    }
                    C = C.splice(n, 1)
                }, T.activate = function (e) {
                    C[e].addClass("active")
                }, T.init(), T
            }

            var d = angular.element(a), f = angular.element(o.prop("documentElement")), p = angular.element(a.document.body);
            return c
        }]
    }).directive("bsScrollspy", ["$rootScope", "debounce", "dimensions", "$scrollspy", function (e, t, n, a) {
        return{restrict: "EAC", link: function (e, t, n) {
            var o = {scope: e};
            angular.forEach(["offset", "target"], function (e) {
                angular.isDefined(n[e]) && (o[e] = n[e])
            });
            var i = a(o);
            i.trackElement(o.target, t), e.$on("$destroy", function () {
                i && (i.untrackElement(o.target, t), i.destroy()), o = null, i = null
            })
        }}
    }]).directive("bsScrollspyList", ["$rootScope", "debounce", "dimensions", "$scrollspy", function () {
        return{restrict: "A", compile: function (e) {
            var t = e[0].querySelectorAll("li > a[href]");
            angular.forEach(t, function (e) {
                var t = angular.element(e);
                t.parent().attr("bs-scrollspy", "").attr("data-target", t.attr("href"))
            })
        }}
    }]), angular.module("mgcrea.ngStrap.select", ["mgcrea.ngStrap.tooltip", "mgcrea.ngStrap.helpers.parseOptions"]).provider("$select", function () {
        var e = this.defaults = {animation: "am-fade", prefixClass: "select", prefixEvent: "$select", placement: "bottom-left", template: "select/select.tpl.html", trigger: "focus", container: !1, keyboard: !0, html: !1, delay: 0, multiple: !1, allNoneButtons: !1, sort: !0, caretHtml: '&nbsp;<span class="caret"></span>', placeholder: "Choose among the following...", maxLength: 3, maxLengthHtml: "selected", iconCheckmark: "glyphicon glyphicon-ok"};
        this.$get = ["$window", "$document", "$rootScope", "$tooltip", "$timeout", function (t, n, a, o, i) {
            function r(t, n, a) {
                var r = {}, s = angular.extend({}, e, a);
                r = o(t, s);
                var u = r.$scope;
                u.$matches = [], u.$activeIndex = 0, u.$isMultiple = s.multiple, u.$showAllNoneButtons = s.allNoneButtons && s.multiple, u.$iconCheckmark = s.iconCheckmark, u.$activate = function (e) {
                    u.$$postDigest(function () {
                        r.activate(e)
                    })
                }, u.$select = function (e) {
                    u.$$postDigest(function () {
                        r.select(e)
                    })
                }, u.$isVisible = function () {
                    return r.$isVisible()
                }, u.$isActive = function (e) {
                    return r.$isActive(e)
                }, u.$selectAll = function () {
                    for (var e = 0; e < u.$matches.length; e++)u.$isActive(e) || u.$select(e)
                }, u.$selectNone = function () {
                    for (var e = 0; e < u.$matches.length; e++)u.$isActive(e) && u.$select(e)
                }, r.update = function (e) {
                    u.$matches = e, r.$updateActiveIndex()
                }, r.activate = function (e) {
                    return s.multiple ? (u.$activeIndex.sort(), r.$isActive(e) ? u.$activeIndex.splice(u.$activeIndex.indexOf(e), 1) : u.$activeIndex.push(e), s.sort && u.$activeIndex.sort()) : u.$activeIndex = e, u.$activeIndex
                }, r.select = function (e) {
                    var t = u.$matches[e].value;
                    u.$apply(function () {
                        r.activate(e), s.multiple ? n.$setViewValue(u.$activeIndex.map(function (e) {
                            return u.$matches[e].value
                        })) : (n.$setViewValue(t), r.hide())
                    }), u.$emit(s.prefixEvent + ".select", t, e)
                }, r.$updateActiveIndex = function () {
                    n.$modelValue && u.$matches.length ? u.$activeIndex = s.multiple && angular.isArray(n.$modelValue) ? n.$modelValue.map(function (e) {
                        return r.$getIndex(e)
                    }) : r.$getIndex(n.$modelValue) : u.$activeIndex >= u.$matches.length && (u.$activeIndex = s.multiple ? [] : 0)
                }, r.$isVisible = function () {
                    return s.minLength && n ? u.$matches.length && n.$viewValue.length >= s.minLength : u.$matches.length
                }, r.$isActive = function (e) {
                    return s.multiple ? -1 !== u.$activeIndex.indexOf(e) : u.$activeIndex === e
                }, r.$getIndex = function (e) {
                    var t = u.$matches.length, n = t;
                    if (t) {
                        for (n = t; n-- && u.$matches[n].value !== e;);
                        if (!(0 > n))return n
                    }
                }, r.$onMouseDown = function (e) {
                    if (e.preventDefault(), e.stopPropagation(), l) {
                        var t = angular.element(e.target);
                        t.triggerHandler("click")
                    }
                }, r.$onKeyDown = function (e) {
                    if (/(9|13|38|40)/.test(e.keyCode)) {
                        if (e.preventDefault(), e.stopPropagation(), !s.multiple && (13 === e.keyCode || 9 === e.keyCode))return r.select(u.$activeIndex);
                        38 === e.keyCode && u.$activeIndex > 0 ? u.$activeIndex-- : 40 === e.keyCode && u.$activeIndex < u.$matches.length - 1 ? u.$activeIndex++ : angular.isUndefined(u.$activeIndex) && (u.$activeIndex = 0), u.$digest()
                    }
                };
                var c = r.show;
                r.show = function () {
                    c(), s.multiple && r.$element.addClass("select-multiple"), i(function () {
                        r.$element.on(l ? "touchstart" : "mousedown", r.$onMouseDown), s.keyboard && t.on("keydown", r.$onKeyDown)
                    }, 0, !1)
                };
                var d = r.hide;
                return r.hide = function () {
                    r.$element.off(l ? "touchstart" : "mousedown", r.$onMouseDown), s.keyboard && t.off("keydown", r.$onKeyDown), d(!0)
                }, r
            }

            var s = (angular.element(t.document.body), /(ip(a|o)d|iphone|android)/gi.test(t.navigator.userAgent)), l = "createTouch"in t.document && s;
            return r.defaults = e, r
        }]
    }).directive("bsSelect", ["$window", "$parse", "$q", "$select", "$parseOptions", function (e, t, n, a, o) {
        var i = a.defaults;
        return{restrict: "EAC", require: "ngModel", link: function (e, t, n, r) {
            var s = {scope: e, placeholder: i.placeholder};
            if (angular.forEach(["placement", "container", "delay", "trigger", "keyboard", "html", "animation", "template", "placeholder", "multiple", "allNoneButtons", "maxLength", "maxLengthHtml"], function (e) {
                angular.isDefined(n[e]) && (s[e] = n[e])
            }), "select" === t[0].nodeName.toLowerCase()) {
                var l = t;
                l.css("display", "none"), t = angular.element('<button type="button" class="btn btn-default"></button>'), l.after(t)
            }
            var u = o(n.ngOptions), c = a(t, r, s), d = u.$match[7].replace(/\|.+/, "").trim();
            e.$watch(d, function () {
                u.valuesFn(e, r).then(function (e) {
                    c.update(e), r.$render()
                })
            }, !0), e.$watch(n.ngModel, function () {
                c.$updateActiveIndex(), r.$render()
            }, !0), r.$render = function () {
                var e, n;
                s.multiple && angular.isArray(r.$modelValue) ? (e = r.$modelValue.map(function (e) {
                    return n = c.$getIndex(e), angular.isDefined(n) ? c.$scope.$matches[n].label : !1
                }).filter(angular.isDefined), e = e.length > (s.maxLength || i.maxLength) ? e.length + " " + (s.maxLengthHtml || i.maxLengthHtml) : e.join(", ")) : (n = c.$getIndex(r.$modelValue), e = angular.isDefined(n) ? c.$scope.$matches[n].label : !1), t.html((e ? e : s.placeholder) + i.caretHtml)
            }, s.multiple && (r.$isEmpty = function (e) {
                return!e || 0 === e.length
            }), e.$on("$destroy", function () {
                c && c.destroy(), s = null, c = null
            })
        }}
    }]), angular.module("mgcrea.ngStrap.tab", []).provider("$tab", function () {
        var e = this.defaults = {animation: "am-fade", template: "tab/tab.tpl.html", navClass: "nav-tabs", activeClass: "active"}, t = this.controller = function (t, n, a) {
            var o = this;
            o.$options = angular.copy(e), angular.forEach(["animation", "navClass", "activeClass"], function (e) {
                angular.isDefined(a[e]) && (o.$options[e] = a[e])
            }), t.$navClass = o.$options.navClass, t.$activeClass = o.$options.activeClass, o.$panes = t.$panes = [], o.$activePaneChangeListeners = o.$viewChangeListeners = [], o.$push = function (e) {
                o.$panes.push(e)
            }, o.$remove = function (e) {
                var t = o.$panes.indexOf(e), n = o.$panes.$active;
                o.$panes.splice(t, 1), n > t ? n-- : t === n && n === o.$panes.length && n--, o.$setActive(n)
            }, o.$panes.$active = 0, o.$setActive = t.$setActive = function (e) {
                o.$panes.$active = e, o.$activePaneChangeListeners.forEach(function (e) {
                    e()
                })
            }
        };
        this.$get = function () {
            var n = {};
            return n.defaults = e, n.controller = t, n
        }
    }).directive("bsTabs", ["$window", "$animate", "$tab", "$parse", function (e, t, n, a) {
        var o = n.defaults;
        return{require: ["?ngModel", "bsTabs"], transclude: !0, scope: !0, controller: ["$scope", "$element", "$attrs", n.controller], templateUrl: function (e, t) {
            return t.template || o.template
        }, link: function (e, t, n, o) {
            var i = o[0], r = o[1];
            if (i && (console.warn("Usage of ngModel is deprecated, please use bsActivePane instead!"), r.$activePaneChangeListeners.push(function () {
                i.$setViewValue(r.$panes.$active)
            }), i.$formatters.push(function (e) {
                return r.$setActive(1 * e), e
            })), n.bsActivePane) {
                var s = a(n.bsActivePane);
                r.$activePaneChangeListeners.push(function () {
                    s.assign(e, r.$panes.$active)
                }), e.$watch(n.bsActivePane, function (e) {
                    r.$setActive(1 * e)
                }, !0)
            }
        }}
    }]).directive("bsPane", ["$window", "$animate", "$sce", function (e, t, n) {
        return{require: ["^?ngModel", "^bsTabs"], scope: !0, link: function (e, a, o, i) {
            function r() {
                var n = s.$panes.indexOf(e), o = s.$panes.$active;
                t[n === o ? "addClass" : "removeClass"](a, s.$options.activeClass)
            }

            var s = (i[0], i[1]);
            a.addClass("tab-pane"), o.$observe("title", function (t) {
                e.title = n.trustAsHtml(t)
            }), s.$options.animation && a.addClass(s.$options.animation), s.$push(e), e.$on("$destroy", function () {
                s.$remove(e)
            }), s.$activePaneChangeListeners.push(function () {
                r()
            }), r()
        }}
    }]), angular.module("mgcrea.ngStrap.timepicker", ["mgcrea.ngStrap.helpers.dateParser", "mgcrea.ngStrap.helpers.dateFormatter", "mgcrea.ngStrap.tooltip"]).provider("$timepicker", function () {
        var e = this.defaults = {animation: "am-fade", prefixClass: "timepicker", placement: "bottom-left", template: "timepicker/timepicker.tpl.html", trigger: "focus", container: !1, keyboard: !0, html: !1, delay: 0, useNative: !0, timeType: "date", timeFormat: "shortTime", modelTimeFormat: null, autoclose: !1, minTime: -1 / 0, maxTime: +1 / 0, length: 5, hourStep: 1, minuteStep: 5, iconUp: "glyphicon glyphicon-chevron-up", iconDown: "glyphicon glyphicon-chevron-down", arrowBehavior: "pager"};
        this.$get = ["$window", "$document", "$rootScope", "$sce", "$dateFormatter", "$tooltip", "$timeout", function (t, n, a, o, i, r, s) {
            function l(t, n, a) {
                function o(e, n) {
                    if (t[0].createTextRange) {
                        var a = t[0].createTextRange();
                        a.collapse(!0), a.moveStart("character", e), a.moveEnd("character", n), a.select()
                    } else t[0].setSelectionRange ? t[0].setSelectionRange(e, n) : angular.isUndefined(t[0].selectionStart) && (t[0].selectionStart = e, t[0].selectionEnd = n)
                }

                function l() {
                    t[0].focus()
                }

                var d = r(t, angular.extend({}, e, a)), f = a.scope, p = d.$options, m = d.$scope, g = p.lang, $ = function (e, t) {
                    return i.formatDate(e, t, g)
                }, h = 0, v = n.$dateValue || new Date, y = {hour: v.getHours(), meridian: v.getHours() < 12, minute: v.getMinutes(), second: v.getSeconds(), millisecond: v.getMilliseconds()}, w = i.getDatetimeFormat(p.timeFormat, g), b = i.hoursFormat(w), D = i.timeSeparator(w), k = i.minutesFormat(w), S = i.showAM(w);
                m.$iconUp = p.iconUp, m.$iconDown = p.iconDown, m.$select = function (e, t) {
                    d.select(e, t)
                }, m.$moveIndex = function (e, t) {
                    d.$moveIndex(e, t)
                }, m.$switchMeridian = function (e) {
                    d.switchMeridian(e)
                }, d.update = function (e) {
                    angular.isDate(e) && !isNaN(e.getTime()) ? (d.$date = e, angular.extend(y, {hour: e.getHours(), minute: e.getMinutes(), second: e.getSeconds(), millisecond: e.getMilliseconds()}), d.$build()) : d.$isBuilt || d.$build()
                }, d.select = function (e, t, a) {
                    (!n.$dateValue || isNaN(n.$dateValue.getTime())) && (n.$dateValue = new Date(1970, 0, 1)), angular.isDate(e) || (e = new Date(e)), 0 === t ? n.$dateValue.setHours(e.getHours()) : 1 === t && n.$dateValue.setMinutes(e.getMinutes()), n.$setViewValue(angular.copy(n.$dateValue)), n.$render(), p.autoclose && !a && s(function () {
                        d.hide(!0)
                    })
                }, d.switchMeridian = function (e) {
                    if (n.$dateValue && !isNaN(n.$dateValue.getTime())) {
                        var t = (e || n.$dateValue).getHours();
                        n.$dateValue.setHours(12 > t ? t + 12 : t - 12), n.$setViewValue(angular.copy(n.$dateValue)), n.$render()
                    }
                }, d.$build = function () {
                    var e, t, n = m.midIndex = parseInt(p.length / 2, 10), a = [];
                    for (e = 0; e < p.length; e++)t = new Date(1970, 0, 1, y.hour - (n - e) * p.hourStep), a.push({date: t, label: $(t, b), selected: d.$date && d.$isSelected(t, 0), disabled: d.$isDisabled(t, 0)});
                    var o, i = [];
                    for (e = 0; e < p.length; e++)o = new Date(1970, 0, 1, 0, y.minute - (n - e) * p.minuteStep), i.push({date: o, label: $(o, k), selected: d.$date && d.$isSelected(o, 1), disabled: d.$isDisabled(o, 1)});
                    var r = [];
                    for (e = 0; e < p.length; e++)r.push([a[e], i[e]]);
                    m.rows = r, m.showAM = S, m.isAM = (d.$date || a[n].date).getHours() < 12, m.timeSeparator = D, d.$isBuilt = !0
                }, d.$isSelected = function (e, t) {
                    return d.$date ? 0 === t ? e.getHours() === d.$date.getHours() : 1 === t ? e.getMinutes() === d.$date.getMinutes() : void 0 : !1
                }, d.$isDisabled = function (e, t) {
                    var n;
                    return 0 === t ? n = e.getTime() + 6e4 * y.minute : 1 === t && (n = e.getTime() + 36e5 * y.hour), n < 1 * p.minTime || n > 1 * p.maxTime
                }, m.$arrowAction = function (e, t) {
                    "picker" === p.arrowBehavior ? d.$setTimeByStep(e, t) : d.$moveIndex(e, t)
                }, d.$setTimeByStep = function (e, t) {
                    {
                        var n = new Date(d.$date), a = n.getHours(), o = ($(n, b).length, n.getMinutes());
                        $(n, k).length
                    }
                    0 === t ? n.setHours(a - parseInt(p.hourStep, 10) * e) : n.setMinutes(o - parseInt(p.minuteStep, 10) * e), d.select(n, t, !0)
                }, d.$moveIndex = function (e, t) {
                    var n;
                    0 === t ? (n = new Date(1970, 0, 1, y.hour + e * p.length, y.minute), angular.extend(y, {hour: n.getHours()})) : 1 === t && (n = new Date(1970, 0, 1, y.hour, y.minute + e * p.length * p.minuteStep), angular.extend(y, {minute: n.getMinutes()})), d.$build()
                }, d.$onMouseDown = function (e) {
                    if ("input" !== e.target.nodeName.toLowerCase() && e.preventDefault(), e.stopPropagation(), c) {
                        var t = angular.element(e.target);
                        "button" !== t[0].nodeName.toLowerCase() && (t = t.parent()), t.triggerHandler("click")
                    }
                }, d.$onKeyDown = function (e) {
                    if (/(38|37|39|40|13)/.test(e.keyCode) && !e.shiftKey && !e.altKey) {
                        if (e.preventDefault(), e.stopPropagation(), 13 === e.keyCode)return d.hide(!0);
                        var t = new Date(d.$date), n = t.getHours(), a = $(t, b).length, i = t.getMinutes(), r = $(t, k).length, s = /(37|39)/.test(e.keyCode), l = 2 + 1 * S;
                        s && (37 === e.keyCode ? h = 1 > h ? l - 1 : h - 1 : 39 === e.keyCode && (h = l - 1 > h ? h + 1 : 0));
                        var u = [0, a];
                        0 === h ? (38 === e.keyCode ? t.setHours(n - parseInt(p.hourStep, 10)) : 40 === e.keyCode && t.setHours(n + parseInt(p.hourStep, 10)), a = $(t, b).length, u = [0, a]) : 1 === h ? (38 === e.keyCode ? t.setMinutes(i - parseInt(p.minuteStep, 10)) : 40 === e.keyCode && t.setMinutes(i + parseInt(p.minuteStep, 10)), r = $(t, k).length, u = [a + 1, a + 1 + r]) : 2 === h && (s || d.switchMeridian(), u = [a + 1 + r + 1, a + 1 + r + 3]), d.select(t, h, !0), o(u[0], u[1]), f.$digest()
                    }
                };
                var T = d.init;
                d.init = function () {
                    return u && p.useNative ? (t.prop("type", "time"), void t.css("-webkit-appearance", "textfield")) : (c && (t.prop("type", "text"), t.attr("readonly", "true"), t.on("click", l)), void T())
                };
                var C = d.destroy;
                d.destroy = function () {
                    u && p.useNative && t.off("click", l), C()
                };
                var x = d.show;
                d.show = function () {
                    x(), s(function () {
                        d.$element.on(c ? "touchstart" : "mousedown", d.$onMouseDown), p.keyboard && t.on("keydown", d.$onKeyDown)
                    }, 0, !1)
                };
                var M = d.hide;
                return d.hide = function (e) {
                    d.$isShown && (d.$element.off(c ? "touchstart" : "mousedown", d.$onMouseDown), p.keyboard && t.off("keydown", d.$onKeyDown), M(e))
                }, d
            }

            var u = (angular.element(t.document.body), /(ip(a|o)d|iphone|android)/gi.test(t.navigator.userAgent)), c = "createTouch"in t.document && u;
            return e.lang || (e.lang = i.getDefaultLocale()), l.defaults = e, l
        }]
    }).directive("bsTimepicker", ["$window", "$parse", "$q", "$dateFormatter", "$dateParser", "$timepicker", function (e, t, n, a, o, i) {
        {
            var r = i.defaults, s = /(ip(a|o)d|iphone|android)/gi.test(e.navigator.userAgent);
            e.requestAnimationFrame || e.setTimeout
        }
        return{restrict: "EAC", require: "ngModel", link: function (e, t, n, l) {
            function u(e) {
                if (angular.isDate(e)) {
                    var t = isNaN(d.minTime) || new Date(e.getTime()).setFullYear(1970, 0, 1) >= d.minTime, n = isNaN(d.maxTime) || new Date(e.getTime()).setFullYear(1970, 0, 1) <= d.maxTime, a = t && n;
                    l.$setValidity("date", a), l.$setValidity("min", t), l.$setValidity("max", n), a && (l.$dateValue = e)
                }
            }

            function c() {
                return!l.$dateValue || isNaN(l.$dateValue.getTime()) ? "" : m(l.$dateValue, d.timeFormat)
            }

            var d = {scope: e, controller: l};
            angular.forEach(["placement", "container", "delay", "trigger", "keyboard", "html", "animation", "template", "autoclose", "timeType", "timeFormat", "modelTimeFormat", "useNative", "hourStep", "minuteStep", "length", "arrowBehavior", "iconUp", "iconDown"], function (e) {
                angular.isDefined(n[e]) && (d[e] = n[e])
            }), n.bsShow && e.$watch(n.bsShow, function (e) {
                f && angular.isDefined(e) && (angular.isString(e) && (e = !!e.match(/true|,?(timepicker),?/i)), e === !0 ? f.show() : f.hide())
            }), s && (d.useNative || r.useNative) && (d.timeFormat = "HH:mm");
            var f = i(t, l, d);
            d = f.$options;
            var p = d.lang, m = function (e, t) {
                return a.formatDate(e, t, p)
            }, g = o({format: d.timeFormat, lang: p});
            angular.forEach(["minTime", "maxTime"], function (e) {
                angular.isDefined(n[e]) && n.$observe(e, function (t) {
                    f.$options[e] = g.getTimeForAttribute(e, t), !isNaN(f.$options[e]) && f.$build(), u(l.$dateValue)
                })
            }), e.$watch(n.ngModel, function () {
                f.update(l.$dateValue)
            }, !0), l.$parsers.unshift(function (e) {
                if (!e)return l.$setValidity("date", !0), null;
                var t = angular.isDate(e) ? e : g.parse(e, l.$dateValue);
                return!t || isNaN(t.getTime()) ? void l.$setValidity("date", !1) : (u(t), "string" === d.timeType ? m(t, d.modelTimeFormat || d.timeFormat) : "number" === d.timeType ? l.$dateValue.getTime() : "iso" === d.timeType ? l.$dateValue.toISOString() : new Date(l.$dateValue))
            }), l.$formatters.push(function (e) {
                var t;
                return t = angular.isUndefined(e) || null === e ? 0 / 0 : angular.isDate(e) ? e : "string" === d.timeType ? g.parse(e, null, d.modelTimeFormat) : new Date(e), l.$dateValue = t, c()
            }), l.$render = function () {
                t.val(c())
            }, e.$on("$destroy", function () {
                f && f.destroy(), d = null, f = null
            })
        }}
    }]), angular.module("mgcrea.ngStrap.tooltip", ["mgcrea.ngStrap.helpers.dimensions"]).provider("$tooltip", function () {
        var e = this.defaults = {animation: "am-fade", customClass: "", prefixClass: "tooltip", prefixEvent: "tooltip", container: !1, target: !1, placement: "top", template: "tooltip/tooltip.tpl.html", contentTemplate: !1, trigger: "hover focus", keyboard: !1, html: !1, show: !1, title: "", type: "", delay: 0, autoClose: !1, bsEnabled: !0};
        this.$get = ["$window", "$rootScope", "$compile", "$q", "$templateCache", "$http", "$animate", "$sce", "dimensions", "$$rAF", "$timeout", function (n, a, o, i, r, s, l, u, c, d, f) {
            function p(t, n) {
                function i() {
                    V.$emit(F.prefixEvent + ".show", E)
                }

                function r() {
                    return V.$emit(F.prefixEvent + ".hide", E), Y && "focus" === F.trigger ? t[0].blur() : void M()
                }

                function s() {
                    var e = F.trigger.split(" ");
                    angular.forEach(e, function (e) {
                        "click" === e ? t.on("click", E.toggle) : "manual" !== e && (t.on("hover" === e ? "mouseenter" : "focus", E.enter), t.on("hover" === e ? "mouseleave" : "blur", E.leave), "button" === A && "hover" !== e && t.on(v ? "touchstart" : "mousedown", E.$onFocusElementMouseDown))
                    })
                }

                function p() {
                    for (var e = F.trigger.split(" "), n = e.length; n--;) {
                        var a = e[n];
                        "click" === a ? t.off("click", E.toggle) : "manual" !== a && (t.off("hover" === a ? "mouseenter" : "focus", E.enter), t.off("hover" === a ? "mouseleave" : "blur", E.leave), "button" === A && "hover" !== a && t.off(v ? "touchstart" : "mousedown", E.$onFocusElementMouseDown))
                    }
                }

                function b() {
                    "focus" !== F.trigger ? O.on("keyup", E.$onKeyUp) : t.on("keyup", E.$onFocusKeyUp)
                }

                function D() {
                    "focus" !== F.trigger ? O.off("keyup", E.$onKeyUp) : t.off("keyup", E.$onFocusKeyUp)
                }

                function k() {
                    f(function () {
                        O.on("click", T), w.on("click", E.hide), K = !0
                    }, 0, !1)
                }

                function S() {
                    K && (O.off("click", T), w.off("click", E.hide), K = !1)
                }

                function T(e) {
                    e.stopPropagation()
                }

                function C() {
                    return"body" === F.container ? c.offset(F.target[0] || t[0]) : c.position(F.target[0] || t[0])
                }

                function x(e, t, n, a) {
                    var o, i = e.split("-");
                    switch (i[0]) {
                        case"right":
                            o = {top: t.top + t.height / 2 - a / 2, left: t.left + t.width};
                            break;
                        case"bottom":
                            o = {top: t.top + t.height, left: t.left + t.width / 2 - n / 2};
                            break;
                        case"left":
                            o = {top: t.top + t.height / 2 - a / 2, left: t.left - n};
                            break;
                        default:
                            o = {top: t.top - a, left: t.left + t.width / 2 - n / 2}
                    }
                    if (!i[1])return o;
                    if ("top" === i[0] || "bottom" === i[0])switch (i[1]) {
                        case"left":
                            o.left = t.left;
                            break;
                        case"right":
                            o.left = t.left + t.width - n
                    } else if ("left" === i[0] || "right" === i[0])switch (i[1]) {
                        case"top":
                            o.top = t.top - a;
                            break;
                        case"bottom":
                            o.top = t.top + t.height
                    }
                    return o
                }

                function M() {
                    clearTimeout(H), E.$isShown && null !== O && (F.autoClose && S(), F.keyboard && D()), q && (q.$destroy(), q = null), O && (O.remove(), O = E.$element = null)
                }

                var E = {}, A = t[0].nodeName.toLowerCase(), F = E.$options = angular.extend({}, e, n);
                E.$promise = $(F.template);
                var V = E.$scope = F.scope && F.scope.$new() || a.$new();
                if (F.delay && angular.isString(F.delay)) {
                    var P = F.delay.split(",").map(parseFloat);
                    F.delay = P.length > 1 ? {show: P[0], hide: P[1]} : P[0]
                }
                F.title && (V.title = u.trustAsHtml(F.title)), V.$setEnabled = function (e) {
                    V.$$postDigest(function () {
                        E.setEnabled(e)
                    })
                }, V.$hide = function () {
                    V.$$postDigest(function () {
                        E.hide()
                    })
                }, V.$show = function () {
                    V.$$postDigest(function () {
                        E.show()
                    })
                }, V.$toggle = function () {
                    V.$$postDigest(function () {
                        E.toggle()
                    })
                }, E.$isShown = V.$isShown = !1;
                var H, I;
                F.contentTemplate && (E.$promise = E.$promise.then(function (e) {
                    var t = angular.element(e);
                    return $(F.contentTemplate).then(function (e) {
                        var n = g('[ng-bind="content"]', t[0]);
                        return n.length || (n = g('[ng-bind="title"]', t[0])), n.removeAttr("ng-bind").html(e), t[0].outerHTML
                    })
                }));
                var N, O, L, R, q;
                E.$promise.then(function (e) {
                    angular.isObject(e) && (e = e.data), F.html && (e = e.replace(y, 'ng-bind-html="')), e = h.apply(e), L = e, N = o(e), E.init()
                }), E.init = function () {
                    F.delay && angular.isNumber(F.delay) && (F.delay = {show: F.delay, hide: F.delay}), "self" === F.container ? R = t : angular.isElement(F.container) ? R = F.container : F.container && (R = g(F.container)), s(), F.target && (F.target = angular.isElement(F.target) ? F.target : g(F.target)), F.show && V.$$postDigest(function () {
                        "focus" === F.trigger ? t[0].focus() : E.show()
                    })
                }, E.destroy = function () {
                    p(), M(), V.$destroy()
                }, E.enter = function () {
                    return clearTimeout(H), I = "in", F.delay && F.delay.show ? void(H = setTimeout(function () {
                        "in" === I && E.show()
                    }, F.delay.show)) : E.show()
                }, E.show = function () {
                    if (F.bsEnabled) {
                        V.$emit(F.prefixEvent + ".show.before", E);
                        var e, n;
                        F.container ? (e = R, n = R[0].lastChild ? angular.element(R[0].lastChild) : null) : (e = null, n = t), O && M(), q = E.$scope.$new(), O = E.$element = N(q, function () {
                        }), O.css({top: "-9999px", left: "-9999px", display: "block", visibility: "hidden"}).addClass(F.placement), F.animation && O.addClass(F.animation), F.type && O.addClass(F.prefixClass + "-" + F.type), F.customClass && O.addClass(F.customClass);
                        var a = l.enter(O, e, n, i);
                        a && a.then && a.then(i), E.$isShown = V.$isShown = !0, m(V), d(function () {
                            E.$applyPlacement(), O && O.css({visibility: "visible"})
                        }), F.keyboard && ("focus" !== F.trigger && E.focus(), b()), F.autoClose && k()
                    }
                }, E.leave = function () {
                    return clearTimeout(H), I = "out", F.delay && F.delay.hide ? void(H = setTimeout(function () {
                        "out" === I && E.hide()
                    }, F.delay.hide)) : E.hide()
                };
                var Y;
                E.hide = function (e) {
                    if (E.$isShown) {
                        V.$emit(F.prefixEvent + ".hide.before", E), Y = e;
                        var t = l.leave(O, r);
                        t && t.then && t.then(r), E.$isShown = V.$isShown = !1, m(V), F.keyboard && null !== O && D(), F.autoClose && null !== O && S()
                    }
                }, E.toggle = function () {
                    E.$isShown ? E.leave() : E.enter()
                }, E.focus = function () {
                    O[0].focus()
                }, E.setEnabled = function (e) {
                    F.bsEnabled = e
                }, E.$applyPlacement = function () {
                    if (O) {
                        var e = C(), t = O.prop("offsetWidth"), n = O.prop("offsetHeight"), a = x(F.placement, e, t, n);
                        a.top += "px", a.left += "px", O.css(a)
                    }
                }, E.$onKeyUp = function (e) {
                    27 === e.which && E.$isShown && (E.hide(), e.stopPropagation())
                }, E.$onFocusKeyUp = function (e) {
                    27 === e.which && (t[0].blur(), e.stopPropagation())
                }, E.$onFocusElementMouseDown = function (e) {
                    e.preventDefault(), e.stopPropagation(), E.$isShown ? t[0].blur() : t[0].focus()
                };
                var K = !1;
                return E
            }

            function m(e) {
                e.$$phase || e.$root && e.$root.$$phase || e.$digest()
            }

            function g(e, n) {
                return angular.element((n || t).querySelectorAll(e))
            }

            function $(e) {
                return b[e] ? b[e] : b[e] = i.when(r.get(e) || s.get(e)).then(function (t) {
                    return angular.isObject(t) ? (r.put(e, t.data), t.data) : t
                })
            }

            var h = String.prototype.trim, v = "createTouch"in n.document, y = /ng-bind="/gi, w = angular.element(n.document), b = {};
            return p
        }]
    }).directive("bsTooltip", ["$window", "$location", "$sce", "$tooltip", "$$rAF", function (e, t, n, a, o) {
        return{restrict: "EAC", scope: !0, link: function (e, t, i) {
            var r = {scope: e};
            angular.forEach(["template", "contentTemplate", "placement", "container", "target", "delay", "trigger", "keyboard", "html", "animation", "type", "customClass"], function (e) {
                angular.isDefined(i[e]) && (r[e] = i[e])
            }), e.hasOwnProperty("title") || (e.title = ""), i.$observe("title", function (t) {
                if (angular.isDefined(t) || !e.hasOwnProperty("title")) {
                    var a = e.title;
                    e.title = n.trustAsHtml(t), angular.isDefined(a) && o(function () {
                        s && s.$applyPlacement()
                    })
                }
            }), i.bsTooltip && e.$watch(i.bsTooltip, function (t, n) {
                angular.isObject(t) ? angular.extend(e, t) : e.title = t, angular.isDefined(n) && o(function () {
                    s && s.$applyPlacement()
                })
            }, !0), i.bsShow && e.$watch(i.bsShow, function (e) {
                s && angular.isDefined(e) && (angular.isString(e) && (e = !!e.match(/true|,?(tooltip),?/i)), e === !0 ? s.show() : s.hide())
            }), i.bsEnabled && e.$watch(i.bsEnabled, function (e) {
                s && angular.isDefined(e) && (angular.isString(e) && (e = !!e.match(/true|1|,?(tooltip),?/i)), s.setEnabled(e === !1 ? !1 : !0))
            });
            var s = a(t, r);
            e.$on("$destroy", function () {
                s && s.destroy(), r = null, s = null
            })
        }}
    }]), angular.module("mgcrea.ngStrap.typeahead", ["mgcrea.ngStrap.tooltip", "mgcrea.ngStrap.helpers.parseOptions"]).provider("$typeahead", function () {
        var e = this.defaults = {animation: "am-fade", prefixClass: "typeahead", prefixEvent: "$typeahead", placement: "bottom-left", template: "typeahead/typeahead.tpl.html", trigger: "focus", container: !1, keyboard: !0, html: !1, delay: 0, minLength: 1, filter: "filter", limit: 6, comparator: ""};
        this.$get = ["$window", "$rootScope", "$tooltip", "$timeout", function (t, n, a, o) {
            function i(t, n, i) {
                var r = {}, s = angular.extend({}, e, i);
                r = a(t, s);
                var l = i.scope, u = r.$scope;
                u.$resetMatches = function () {
                    u.$matches = [], u.$activeIndex = 0
                }, u.$resetMatches(), u.$activate = function (e) {
                    u.$$postDigest(function () {
                        r.activate(e)
                    })
                }, u.$select = function (e) {
                    u.$$postDigest(function () {
                        r.select(e)
                    })
                }, u.$isVisible = function () {
                    return r.$isVisible()
                }, r.update = function (e) {
                    u.$matches = e, u.$activeIndex >= e.length && (u.$activeIndex = 0)
                }, r.activate = function (e) {
                    u.$activeIndex = e
                }, r.select = function (e) {
                    var t = u.$matches[e].value;
                    n.$setViewValue(t), n.$render(), u.$resetMatches(), l && l.$digest(), u.$emit(s.prefixEvent + ".select", t, e)
                }, r.$isVisible = function () {
                    return s.minLength && n ? u.$matches.length && angular.isString(n.$viewValue) && n.$viewValue.length >= s.minLength : !!u.$matches.length
                }, r.$getIndex = function (e) {
                    var t = u.$matches.length, n = t;
                    if (t) {
                        for (n = t; n-- && u.$matches[n].value !== e;);
                        if (!(0 > n))return n
                    }
                }, r.$onMouseDown = function (e) {
                    e.preventDefault(), e.stopPropagation()
                }, r.$onKeyDown = function (e) {
                    /(38|40|13)/.test(e.keyCode) && (r.$isVisible() && (e.preventDefault(), e.stopPropagation()), 13 === e.keyCode && u.$matches.length ? r.select(u.$activeIndex) : 38 === e.keyCode && u.$activeIndex > 0 ? u.$activeIndex-- : 40 === e.keyCode && u.$activeIndex < u.$matches.length - 1 ? u.$activeIndex++ : angular.isUndefined(u.$activeIndex) && (u.$activeIndex = 0), u.$digest())
                };
                var c = r.show;
                r.show = function () {
                    c(), o(function () {
                        r.$element.on("mousedown", r.$onMouseDown), s.keyboard && t.on("keydown", r.$onKeyDown)
                    }, 0, !1)
                };
                var d = r.hide;
                return r.hide = function () {
                    r.$element.off("mousedown", r.$onMouseDown), s.keyboard && t.off("keydown", r.$onKeyDown), d()
                }, r
            }

            angular.element(t.document.body);
            return i.defaults = e, i
        }]
    }).directive("bsTypeahead", ["$window", "$parse", "$q", "$typeahead", "$parseOptions", function (e, t, a, o, i) {
        var r = o.defaults;
        return{restrict: "EAC", require: "ngModel", link: function (e, t, a, s) {
            var l = {scope: e};
            angular.forEach(["placement", "container", "delay", "trigger", "keyboard", "html", "animation", "template", "filter", "limit", "minLength", "watchOptions", "selectMode", "comparator"], function (e) {
                angular.isDefined(a[e]) && (l[e] = a[e])
            });
            var u = l.filter || r.filter, c = l.limit || r.limit, d = l.comparator || r.comparator, f = a.ngOptions;
            u && (f += " | " + u + ":$viewValue"), d && (f += ":" + d), c && (f += " | limitTo:" + c);
            var p = i(f), m = o(t, s, l);
            if (l.watchOptions) {
                var g = p.$match[7].replace(/\|.+/, "").replace(/\(.*\)/g, "").trim();
                e.$watch(g, function () {
                    p.valuesFn(e, s).then(function (e) {
                        m.update(e), s.$render()
                    })
                }, !0)
            }
            e.$watch(a.ngModel, function (t) {
                e.$modelValue = t, p.valuesFn(e, s).then(function (e) {
                    if (l.selectMode && !e.length && t.length > 0)return void s.$setViewValue(s.$viewValue.substring(0, s.$viewValue.length - 1));
                    e.length > c && (e = e.slice(0, c));
                    var n = m.$isVisible();
                    n && m.update(e), (1 !== e.length || e[0].value !== t) && (!n && m.update(e), s.$render())
                })
            }), s.$formatters.push(function (e) {
                var t = p.displayValue(e);
                return t === n ? "" : t
            }), s.$render = function () {
                if (s.$isEmpty(s.$viewValue))return t.val("");
                var e = m.$getIndex(s.$modelValue), n = angular.isDefined(e) ? m.$scope.$matches[e].label : s.$viewValue;
                n = angular.isObject(n) ? p.displayValue(n) : n, t.val(n ? n.toString().replace(/<(?:.|\n)*?>/gm, "").trim() : "")
            }, e.$on("$destroy", function () {
                m && m.destroy(), l = null, m = null
            })
        }}
    }])
}(window, document);
//# sourceMappingURL=angular-strap.min.js.map