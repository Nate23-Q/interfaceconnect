/* eslint-disable */

(function (global) {
    if (!global.Promise) {
        !(function (e, t) {
            'object' == typeof exports && 'undefined' != typeof module
                ? t()
                : 'function' == typeof define && define.amd
                ? define(t)
                : t();
        })(0, function () {
            'use strict';
            function e(e) {
                var t = this.constructor;
                return this.then(
                    function (n) {
                        return t.resolve(e()).then(function () {
                            return n;
                        });
                    },
                    function (n) {
                        return t.resolve(e()).then(function () {
                            return t.reject(n);
                        });
                    },
                );
            }
            function t(e) {
                return new this(function (t, n) {
                    function o(e, n) {
                        if (
                            n &&
                            ('object' == typeof n || 'function' == typeof n)
                        ) {
                            var f = n.then;
                            if ('function' == typeof f)
                                return void f.call(
                                    n,
                                    function (t) {
                                        o(e, t);
                                    },
                                    function (n) {
                                        (r[e] = {
                                            status: 'rejected',
                                            reason: n,
                                        }),
                                            0 == --i && t(r);
                                    },
                                );
                        }
                        (r[e] = { status: 'fulfilled', value: n }),
                            0 == --i && t(r);
                    }
                    if (!e || 'undefined' == typeof e.length)
                        return n(
                            new TypeError(
                                typeof e +
                                    ' ' +
                                    e +
                                    ' is not iterable(cannot read property Symbol(Symbol.iterator))',
                            ),
                        );
                    var r = Array.prototype.slice.call(e);
                    if (0 === r.length) return t([]);
                    for (var i = r.length, f = 0; r.length > f; f++) o(f, r[f]);
                });
            }
            function n(e) {
                return !(!e || 'undefined' == typeof e.length);
            }
            function o() {}
            function r(e) {
                if (!(this instanceof r))
                    throw new TypeError('Promises must be constructed via new');
                if ('function' != typeof e)
                    throw new TypeError('not a function');
                (this._state = 0),
                    (this._handled = !1),
                    (this._value = undefined),
                    (this._deferreds = []),
                    l(e, this);
            }
            function i(e, t) {
                for (; 3 === e._state; ) e = e._value;
                0 !== e._state
                    ? ((e._handled = !0),
                      r._immediateFn(function () {
                          var n = 1 === e._state ? t.onFulfilled : t.onRejected;
                          if (null !== n) {
                              var o;
                              try {
                                  o = n(e._value);
                              } catch (r) {
                                  return void u(t.promise, r);
                              }
                              f(t.promise, o);
                          } else (1 === e._state ? f : u)(t.promise, e._value);
                      }))
                    : e._deferreds.push(t);
            }
            function f(e, t) {
                try {
                    if (t === e)
                        throw new TypeError(
                            'A promise cannot be resolved with itself.',
                        );
                    if (t && ('object' == typeof t || 'function' == typeof t)) {
                        var n = t.then;
                        if (t instanceof r)
                            return (e._state = 3), (e._value = t), void c(e);
                        if ('function' == typeof n)
                            return void l(
                                (function (e, t) {
                                    return function () {
                                        e.apply(t, arguments);
                                    };
                                })(n, t),
                                e,
                            );
                    }
                    (e._state = 1), (e._value = t), c(e);
                } catch (o) {
                    u(e, o);
                }
            }
            function u(e, t) {
                (e._state = 2), (e._value = t), c(e);
            }
            function c(e) {
                2 === e._state &&
                    0 === e._deferreds.length &&
                    r._immediateFn(function () {
                        e._handled || r._unhandledRejectionFn(e._value);
                    });
                for (var t = 0, n = e._deferreds.length; n > t; t++)
                    i(e, e._deferreds[t]);
                e._deferreds = null;
            }
            function l(e, t) {
                var n = !1;
                try {
                    e(
                        function (e) {
                            n || ((n = !0), f(t, e));
                        },
                        function (e) {
                            n || ((n = !0), u(t, e));
                        },
                    );
                } catch (o) {
                    if (n) return;
                    (n = !0), u(t, o);
                }
            }
            var a = setTimeout;
            (r.prototype['catch'] = function (e) {
                return this.then(null, e);
            }),
                (r.prototype.then = function (e, t) {
                    var n = new this.constructor(o);
                    return (
                        i(
                            this,
                            new (function (e, t, n) {
                                (this.onFulfilled =
                                    'function' == typeof e ? e : null),
                                    (this.onRejected =
                                        'function' == typeof t ? t : null),
                                    (this.promise = n);
                            })(e, t, n),
                        ),
                        n
                    );
                }),
                (r.prototype['finally'] = e),
                (r.all = function (e) {
                    return new r(function (t, o) {
                        function r(e, n) {
                            try {
                                if (
                                    n &&
                                    ('object' == typeof n ||
                                        'function' == typeof n)
                                ) {
                                    var u = n.then;
                                    if ('function' == typeof u)
                                        return void u.call(
                                            n,
                                            function (t) {
                                                r(e, t);
                                            },
                                            o,
                                        );
                                }
                                (i[e] = n), 0 == --f && t(i);
                            } catch (c) {
                                o(c);
                            }
                        }
                        if (!n(e))
                            return o(
                                new TypeError('Promise.all accepts an array'),
                            );
                        var i = Array.prototype.slice.call(e);
                        if (0 === i.length) return t([]);
                        for (var f = i.length, u = 0; i.length > u; u++)
                            r(u, i[u]);
                    });
                }),
                (r.allSettled = t),
                (r.resolve = function (e) {
                    return e && 'object' == typeof e && e.constructor === r
                        ? e
                        : new r(function (t) {
                              t(e);
                          });
                }),
                (r.reject = function (e) {
                    return new r(function (t, n) {
                        n(e);
                    });
                }),
                (r.race = function (e) {
                    return new r(function (t, o) {
                        if (!n(e))
                            return o(
                                new TypeError('Promise.race accepts an array'),
                            );
                        for (var i = 0, f = e.length; f > i; i++)
                            r.resolve(e[i]).then(t, o);
                    });
                }),
                (r._immediateFn =
                    ('function' == typeof setImmediate &&
                        function (e) {
                            setImmediate(e);
                        }) ||
                    function (e) {
                        a(e, 0);
                    }),
                (r._unhandledRejectionFn = function (e) {
                    void 0 !== console &&
                        console &&
                        console.warn(
                            'Possible Unhandled Promise Rejection:',
                            e,
                        );
                });
            var s = (function () {
                if ('undefined' != typeof self) return self;
                if ('undefined' != typeof window) return window;
                if ('undefined' != typeof global) return global;
                throw Error('unable to locate global object');
            })();
            'function' != typeof s.Promise
                ? (s.Promise = r)
                : s.Promise.prototype['finally']
                ? s.Promise.allSettled || (s.Promise.allSettled = t)
                : (s.Promise.prototype['finally'] = e);
        });
    }

    var initialized = false;
    var sessionAttributes = {};
    var WEBVIEW_TEST = [
        'WebView',
        '(iPhone|iPod|iPad)(?!.*Safari)',
        'Android.*(wv|.0.0.0)',
        'Linux; U; Android',
    ];
    var WEBVIEW_TEST_REGEX = new RegExp(
        '(' + WEBVIEW_TEST.join('|') + ')',
        'ig',
    );
    var loadedModules = [];

    var getFromObj = function (obj, prop) {
        if (!obj || typeof obj[prop] === 'undefined') {
            return {};
        }

        return obj[prop];
    };

    var addToDBK = function addToDBK(obj, script) {
        var dbk = getFromObj(global, 'dbk');

        global.dbk = Object.assign(dbk || {}, obj || {});
        loadedModules.push(script);
        return global.dbk;
    };

    var DBKAPI = {
        init: function init(sessionAttributesParam) {
            if (initialized) {
                return;
            }

            initialized = true;
            sessionAttributes = sessionAttributesParam;
        },
        loadLibrary: function loadLibrary(script, namespace) {
            return new Promise(function (resolve, reject) {
                if (loadedModules.indexOf(script) !== -1) {
                    resolve(global.dbk);
                    return;
                }

                if (!namespace) {
                    var req = new XMLHttpRequest();
                    var errorHandler = function errorHandler(e) {
                        console.log('error getting script', script, e);
                        reject({
                            status: req.status,
                            statusText: req.statusText,
                        });
                    };

                    var reqListener = function reqListener() {
                        if (req.status !== 200) {
                            errorHandler();
                            return;
                        }

                        var responseText = req.responseText;
                        var contentType = req.getResponseHeader('content-type');

                        var isJS =
                            contentType &&
                            contentType.indexOf('application/javascript') !==
                                -1;
                        if (!isJS) {
                            reject('not a JS file');
                            return;
                        }
                        if (!responseText || !responseText.trim()) {
                            reject('JS file is empty');
                            return;
                        }

                        var fn = new Function(responseText);
                        addToDBK(fn(), script);

                        resolve(global.dbk);
                    };

                    req.addEventListener('load', reqListener);
                    req.addEventListener('error', errorHandler);
                    req.addEventListener('timeout', errorHandler);
                    req.open('GET', script);
                    req.send();
                } else {
                    $LAB.script(script).wait(function () {
                        var moduleObj = global[namespace];
                        addToDBK(moduleObj, script);
                        resolve(global.dbk);
                    });
                }
            });
        },
        loadScript: function loadScript(script, namespace) {
            return new Promise(function (resolve, reject) {
                $LAB.script(script).wait(function () {
                    resolve((namespace && global[namespace]) || global);
                });
            });
        },
        sessionInfo: function sessionInfo() {
            return {
                userGuid: sessionAttributes.userGuid,
                userFullName: sessionAttributes.userFullName,
                isBBUser: sessionAttributes.isBBUser,
                isPrimaryUser: sessionAttributes.isPrimaryUser,
                diId: sessionAttributes.diId,
                csrfToken: sessionAttributes.csrfToken,
                showAccountPreferenceWidgetUI:
                    sessionAttributes?.showAccountPreferenceWidgetUI,
            };
        },
        getThemeAttributes: function getThemeAttributes() {
            var _sessionAttributes = sessionAttributes,
                UIFlexibilityBranding =
                    _sessionAttributes.UIFlexibilityBranding;

            var _ref = UIFlexibilityBranding || {},
                BRANDING_KEYS = _ref.BRANDING_KEYS;

            return BRANDING_KEYS;
        },
        getTheme: function getTheme() {
            var themeConfig = sessionAttributes.experienceThemeConfig || {},
                attributes = themeConfig.attributes;

            var theme = (attributes || []).reduce(function (
                curTheme,
                attribute,
            ) {
                curTheme[attribute.key] = attribute.value;
                return curTheme;
            },
            {});
            return theme;
        },
        setCSRFToken: function (csrfToken) {
            sessionAttributes.csrfToken = csrfToken;
        },
        getLocale: function getLocale() {
            return sessionAttributes.locale || 'en_US';
        },
        getAnalyticsConfig: function getLocale() {
            return sessionAttributes.analyticsConfig;
        },
        getCSRFToken: function getCSRFToken() {
            return sessionAttributes.csrfToken;
        },
        isMobile: function isMobile() {
            // https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
            var userAgent =
                navigator.userAgent || navigator.vendor || global.opera;
            var isMobile =
                /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                    a,
                ) ||
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                    userAgent.substr(0, 4),
                );
            return isMobile;
        },
        isWebview: function isWebview() {
            if (navigator && navigator.userAgent) {
                return !!navigator.userAgent.match(WEBVIEW_TEST_REGEX);
            }

            return false;
        },
    };
    global.dbk = DBKAPI;
})(window);
