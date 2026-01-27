"use strict";

function _toConsumableArray(e) {
    return _arrayWithoutHoles(e) || _iterableToArray(e) || _unsupportedIterableToArray(e) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(e, t) {
    if (e) {
        if ("string" == typeof e) return _arrayLikeToArray(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        return "Map" === (n = "Object" === n && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? _arrayLikeToArray(e, t) : void 0
    }
}

function _iterableToArray(e) {
    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
}

function _arrayWithoutHoles(e) {
    if (Array.isArray(e)) return _arrayLikeToArray(e)
}

function _arrayLikeToArray(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
    return a
}

function placeTo(a, o) {
    var e;

    function t() {
        var e = document.querySelector('[data-place-container="'.concat(a, '"]')),
            t = document.querySelector('[data-place-from="'.concat(a, '"]')),
            n = document.querySelector('[data-place-to="'.concat(a, '"]'));
        document.body.clientWidth < o ? t && e && t.append(e) : n && e && n.append(e)
    }

    a && o && (window.addEventListener("resize", function () {
        clearTimeout(e), e = setTimeout(function () {
            t()
        }, 100)
    }, !0), t())
}

function gwTabHide(e) {
    for (var t = 0; t < e.length; t++) $("[data-tab-group=" + e[t] + "]").hide()
}

function gwOpenTab(e) {
    for (var t = 0; t < e.length; t++) $("[data-tab=" + e[t] + "]").show()
}

function gwTabBtnsHandler(e, t) {
    for (var n = 0; n < t.length; n++) $("[data-open-tab-group*=" + t[n] + "]").attr("data-open-tab-active", !1);
    for (n = 0; n < e.length; n++) $("[data-open-tab*=" + e[n] + "]").attr("data-open-tab-active", !0)
}

function throttle(t, n) {
    var a, o, i = !1;
    return function e() {
        if (i) return a = arguments, void (o = this);
        t.apply(this, arguments), i = !0, setTimeout(function () {
            i = !1, a && (e.apply(o, a), a = o = null)
        }, n)
    }
}

function AnimatingNumbersWatch() {
    var e = document.querySelectorAll("[data-animating-numbers]"), o = [];
    e.forEach(function (e, a) {
        var t = new IntersectionObserver(function (e) {
            e.forEach(function (e) {
                var t = e.target, n = t.dataset.animatingNumbers;
                e.isIntersecting && (AnimatingNumbers(t, 0, n, 5e3), o[a].disconnect())
            })
        });
        t.observe(e), o.push(t)
    })
}

function AnimatingNumbers(e, t, n, a) {
    anime({targets: e, duration: a || 1e3, innerHTML: [t, n], round: 1, easing: "easeOutExpo"})
}

function SectionHandler(e, i, r) {
    var s, c, d;

    function l() {
        return Array.prototype.slice.call(document.querySelectorAll("[data-target-section]")).sort(function (e, t) {
            e = e.getBoundingClientRect().top, t = t.getBoundingClientRect().top;
            return t < e ? 1 : e === t ? 0 : -1
        })
    }

    e ? i ? r ? (s = !1, (e = document.querySelector(e)) && (c = e.querySelectorAll("[".concat(i, "]")), d = !1, window.addEventListener("scroll", function (e) {
        var n, t, a, o;
        e.preventDefault(), d || (d = !0, setTimeout(function () {
            d = !1
        }, 100), 0 === (e = l()).length ? console.log("not sections") : (n = window.scrollY, t = e.reduce(function (e, t) {
            return t.getBoundingClientRect().top + n < n + window.innerHeight / 2 ? t : e
        }).dataset.targetSection, a = t, c.forEach(function (e) {
            e.classList.contains(r) && e.classList.remove(r), e.getAttribute(i) === a && e.classList.add(r)
        }), o = t, e.forEach(function (e) {
            e.classList.contains("section_active") && e.getAttribute("data-target-section") !== o && e.classList.remove("section_active"), e.classList.contains("section_active") || e.getAttribute("data-target-section") !== o || (e.classList.add("section_active"), document.dispatchEvent(new CustomEvent("ChangeSection", {detail: {name: o}})))
        })))
    }), __config.sectionSwitcher.init ? (document.querySelector("html").classList.add("section-slider-active"), l().forEach(function (i) {
        i.addEventListener("wheel", function (e) {
            if (!(window.innerWidth < 1200 || window.innerHeight < 700) && __config.sectionSwitcher.init && !(2600 < window.innerWidth && window.innerHeight < 1100 || s)) {
                var t = 0 < e.deltaY ? 1 : -1, n = e.target.closest("[data-section-scroll-ignore]");
                if (n) if (0 < t && n.scrollHeight - n.scrollTop === n.clientHeight) console.log("scroll down"); else {
                    if (!(t < 0 && 0 === n.scrollTop)) return;
                    console.log("upscroll up")
                }
                s = !0, setTimeout(function () {
                    s = !1
                }, 1e3 * __config.sectionSwitcher.speed);
                var n = l(), a = n.findIndex(function (e) {
                    return e == i
                }), o = n[a];
                0 < t ? a < n.length && (o = n[a + 1]) : 0 < a && (o = n[a - 1]), o ? (t = Number(o.getAttribute("data-target-section-offset")) || 0, t *= -16, o.getBoundingClientRect(), gsap.to(window, {
                    duration: __config.sectionSwitcher.speed || .3,
                    scrollTo: {y: o, offsetY: t},
                    ease: __config.sectionSwitcher.easeType
                }), e.preventDefault()) : (n = Number(i.getAttribute("data-target-section-offset")) || 0, n *= -16, gsap.to(window, {
                    duration: __config.sectionSwitcher.speed || .3,
                    scrollTo: {y: i, offsetY: n},
                    ease: __config.sectionSwitcher.easeType
                }))
            }
        })
    }), c.forEach(function (e) {
        e.addEventListener("click", function (e) {
            var t, e = e.target.closest("[".concat(i, "]")).getAttribute(i),
                e = document.querySelector('[data-target-section="'.concat(e, '"]'));
            e && (t = Number(e.getAttribute("data-target-section-offset")) || 0, t *= -16, e.getBoundingClientRect(), gsap.to(window, {
                duration: __config.sectionSwitcher.speed || .3,
                scrollTo: {y: e, offsetY: t},
                ease: __config.sectionSwitcher.easeType
            }))
        })
    })) : (e = document.querySelector(".section-slider-active")) && e.classList.remove("section-slider-active"))) : console.log("no activeClassPoint") : console.log("no dataPointName") : console.log("no container")
}

function Copy() {
}

function preloadAnimtionStars() {
    var e = gsap.utils.selector(".preload__items")(".preload__item");
    (new TimelineLite).staggerFrom(e.reverse(), .3, {
        x: "-1rem",
        opacity: 0,
        ease: Back.easeOut
    }, .2).staggerTo(e, .3, {x: "1rem", opacity: 0, ease: Back.easeOut}, .2).repeat(-1)
}

$(function () {
    $("[data-open-tab]").on("click", function (e) {
        var t = $(this), n = t.attr("data-open-tab-group").split("|"),
            t = (gwTabHide(n), t.attr("data-open-tab").split("|"));
        gwOpenTab(t), gwTabBtnsHandler(t, n), document.dispatchEvent(new Event("gwtab"))
    }), $('[data-open-tab-active="true"]').trigger("click")
}), $(function () {
    $("[data-tab-select]").on("change", function (e) {
        var t = $(this).find("option:selected");
        gwTabHide(t.attr("data-open-tab-group-select").split("|")), gwOpenTab(t.attr("data-open-tab-select").split("|"))
    })
}), document.addEventListener("PreloadBefore", function () {
    placeTo("auth", 1200), placeTo("scl", 1200)
}), document.addEventListener("PreloadEnd", function () {
    gwAnime()
}), document.addEventListener("PreloadBefore", function () {
    window.scrollTo({top: 0, behavior: "auto"}), SectionHandler("[data-points]", "data-point-name", "point_active")
}), Copy(), function () {
    var t = document.querySelector(".preload"), n = !1, a = !1, o = !1;

    function i() {
        document.dispatchEvent(new Event("PreloadEnd")), document.querySelector("body").dispatchEvent(new Event("PreloadEnd")), document.querySelector("body").classList.add("loaded")
    }

    function r() {
        document.dispatchEvent(new Event("PreloadStart")), document.querySelector("body").dispatchEvent(new Event("PreloadStart"))
    }

    document.addEventListener("PreloadEnd", function () {
        t && t.remove()
    }), document.dispatchEvent(new Event("PreloadBefore")), document.querySelector("body").dispatchEvent(new Event("PreloadBefore")), t ? (preloadAnimtionStars(), __config.preload.withOnload ? window.addEventListener("load", function () {
        a = !0
    }) : a = !0, setTimeout(function () {
        o = !0
    }, 1e3 * (__config.preload.minTime || 1)), setTimeout(function () {
        a = o = !0
    }, 1e3 * (__config.preload.maxTime || 1)), function e() {
        if (n) return;
        setTimeout(function () {
            e()
        }, 1e3 * (__config.preload.timeInterval || .5));
        if (!o) return;
        if (!a) return;
        r();
        n = !0;
        t.classList.add("preload_fade");
        setTimeout(i, 1e3 * (__config.preload.delay || .5))
    }()) : (document.addEventListener("DOMContentLoaded", i), document.addEventListener("DOMContentLoaded", r))
}(), gsap.registerPlugin(ScrollTrigger);
var gwAnimeArray = [];

function gwAnime() {
    gsap.utils.toArray("[data-gw-anime]").forEach(function (e) {
        var t = e.getAttribute("data-gw-anime-delay"),
            t = (t && (e.style.animationDelay = t), e.getAttribute("data-gw-anime-duration")),
            n = (t && (e.style.animationDuration = t), e.getAttribute("data-gw-anime")), t = ScrollTrigger.create({
                trigger: e, onEnter: function () {
                    return e.classList.add(n)
                }, onEnterBack: function () {
                    return e.classList.add(n)
                }, onLeave: function () {
                    return e.classList.remove(n)
                }, onLeaveBack: function () {
                    return e.classList.remove(n)
                }
            });
        gwAnimeArray.push(t)
    }), gwAnimeAutoUpdate()
}

function gwAnimeRefresh() {
    gwAnimeArray && 0 < gwAnimeArray.length && gwAnimeArray.forEach(function (e) {
        e.refresh()
    })
}

var gwAnimeRefreshThrottle = throttle(function () {
    gwAnimeRefresh()
}, 500);

function gwAnimeAutoUpdate() {
    setTimeout(function () {
        gwAnimeRefreshThrottle(), gwAnimeAutoUpdate()
    }, 5e3)
}

function fancyCustomOpen(e) {
    $.fancybox.getInstance("close"), window.location.hash = e, $.fancybox.open({
        src: "#" + e,
        type: "inline",
        selectable: !0,
        opts: {
            touch: !1, beforeShow: function (e, t) {
            }, btnTpl: {smallBtn: '<div class="gw-modal-close" data-fancybox-close></div>'}, beforeClose: function () {
                history.pushState("", document.title, window.location.pathname)
            }
        }
    })
}

function fancyCheckHash() {
    var e = window.location.hash.substr(1);
    -1 != e.indexOf("modal-") && fancyCustomOpen(e)
}

function fancyContentOpen(e) {
    $.fancybox.open('\n                <div class="mdl mdl_animated" >\n                    <div class="mdl__close" data-fancybox-close></div>\n                    <div class="mdl__inner">\n                        <div class="mdl__body">\n                            '.concat(e, "\n                        </div>\n                        \x3c!-- END  mdl__body --\x3e\n                    </div>\n                    \x3c!-- END  mdl__inner --\x3e\n                </div>\n                \x3c!-- END  mdl --\x3e\n                "), {
        touch: !1,
        beforeShow: function (e, t) {
        },
        btnTpl: {smallBtn: '<div class="gw-modal-close" data-fancybox-close></div>'}
    })
}

document.addEventListener("PreloadEnd", gwAnime), window.addEventListener("resize", gwAnimeRefreshThrottle), document.addEventListener("atab", gwAnimeRefreshThrottle), document.addEventListener("gwtab", gwAnimeRefreshThrottle), document.addEventListener("gw_sn_update", gwAnimeRefreshThrottle), $.fancybox.defaults.animationDuration = 1e3, $("body").on("click", "[data-open-window]", function (e) {
    e.preventDefault(), fancyCustomOpen($(this).attr("data-open-window"))
}), document.addEventListener("PreloadEnd", fancyCheckHash), document.addEventListener("DOMContentLoaded", function () {
    var e, t = document.querySelector("[data-gw-burger]"), n = document.querySelectorAll("[data-menu-close]"),
        a = document.querySelector("body");
    !t && 0 === t.length || t.addEventListener("click", function () {
        a.classList.toggle("mob-menu-active")
    }), _toConsumableArray(n).forEach(function (e) {
        e.addEventListener("click", function () {
            a.classList.remove("mob-menu-active")
        })
    }), window.addEventListener("scroll", function (e) {
        100 < document.scrollingElement.scrollTop ? (a.classList.add("nav-scroll"), a.classList.remove("nav-static")) : (a.classList.remove("nav-scroll"), a.classList.add("nav-static"))
    }), window.addEventListener("resize", function () {
        clearTimeout(e), e = setTimeout(function () {
            1200 <= document.body.clientWidth && document.body.classList.remove("mob-menu-active")
        }, 100)
    }, !0), $("[data-menu]").on("click", "[data-menu-open-sub-list]", function () {
        var e = $(this);
        console.log(e), console.log(e.hasClass("menu__item_open")), e.hasClass("menu__item_open") ? (e.next("[data-menu-sub-list]").slideUp(), e.removeClass("menu__item_open")) : 1200 <= $(window).width() || (e.next("[data-menu-sub-list]").slideDown(), e.addClass("menu__item_open"))
    })
}), $("[data-news-btn]").on("click", function () {
    var e = $(this), t = e.attr("data-news-btn");
    $("[data-news-btn].nav__bt_active").removeClass("nav__bt_active"), e.addClass("nav__bt_active"), "all" === t ? $("[data-news-post]").show() : ($("[data-news-post]").hide(), $('[data-news-post="'.concat(t, '"]')).show()), null !== newsSlider && newsSlider.update()
});
var newsSlider = null;

function newsInit() {
    var e;
    "undefined" != typeof __config && void 0 !== __config.sliders && void 0 !== __config.sliders.news && __config.sliders.news.init && 0 < $('[data-news-slider-section] [data-slider="news"]').length && (newsSlider = new Swiper('[data-slider="news"]', {
        autoplay: !(void 0 === __config.sliders.news.autoplay || !__config.sliders.news.autoplay || void 0 === __config.sliders.news.autoplayDelay) && {
            disableOnInteraction: !0,
            delay: __config.sliders.news.autoplayDelay || 1e4
        },
        pagination: {
            el: '[data-news-slider-section] [data-slider-dots="news"]',
            type: "bullets",
            clickable: !0,
            bulletClass: "dot",
            bulletActiveClass: "dot_active",
            renderBullet: function (e, t) {
                return '<div class="' + t + '"></div>'
            }
        },
        navigation: {nextEl: '[data-slider-next="news"]', prevEl: '[data-slider-prev="news"]'},
        loop: null != (e = null == (e = __config.sliders.news) ? void 0 : e.loop) && e,
        slidesPerView: 1,
        spaceBetween: 15,
        breakpoints: {
            0: {slidesPerView: 1, spaceBetween: 32},
            720: {slidesPerView: 2, spaceBetween: 32},
            860: {slidesPerView: 3, spaceBetween: 32},
            1240: {slidesPerView: 3, spaceBetween: 32}
        }
    }), void 0 !== __config.sliders.news.autoplay && __config.sliders.news.autoplay && __config.sliders.news.pauseOnHover && $('[data-slider="news"]').hover(function () {
        newsSlider.autoplay.stop()
    }, function () {
        newsSlider.autoplay.start()
    }))
}

function GetWebServers() {
    var e = $("[data-gw-server-online]");
    0 !== e.length && $.each(e, function (e, t) {
        var t = $(t), n = t.attr("data-gw-server-online"), a = t.attr("data-gw-server-online-max"),
            o = 100 < (o = Math.floor(n / a * 100)) ? 100 : o;
        t.find("[data-gw-server-load]").css("right", 100 - o + "%"), t.find("[data-gw-server-percent]").each(function (e, t) {
            AnimatingNumbers(t, 0, o, 7e3)
        }), t.find("[data-gw-server-count]").each(function (e, t) {
            AnimatingNumbers(t, 0, n, 7e3)
        })
    })
}

document.addEventListener("PreloadEnd", newsInit), document.addEventListener("DOMContentLoaded", function (e) {
    $(document).on("click", "[data-spoiler-trigger]", function (e) {
        var t = $(this);
        0 < $(e.target).closest("button").length || ("active" === (e = t.closest("[data-spoiler]")).attr("data-spoiler") ? e.attr("data-spoiler", "") : (e.closest('[data-spoiler-list="accordion"]').find('[data-spoiler="active"]').attr("data-spoiler", ""), e.attr("data-spoiler", "active")), document.dispatchEvent(new Event("trigger-spoiler")))
    })
}), document.addEventListener("PreloadEnd", GetWebServers);
var streamsSlider = null;

function streamsInit() {
    var e;
    "undefined" != typeof __config && void 0 !== __config.sliders && void 0 !== __config.sliders.streams && __config.sliders.streams.init ? (streamsSlider = new Swiper('[data-slider="streams"]', {
        autoplay: !(void 0 === __config.sliders.streams.autoplay || !__config.sliders.streams.autoplay || void 0 === __config.sliders.streams.autoplayDelay) && {
            disableOnInteraction: !0,
            delay: __config.sliders.streams.autoplayDelay || 1e4
        },
        pagination: {
            el: '[data-slider-dots="streams"]',
            type: "bullets",
            clickable: !0,
            bulletClass: "dot",
            bulletActiveClass: "dot_active",
            renderBullet: function (e, t) {
                return '<div class="' + t + '"></div>'
            }
        },
        navigation: {nextEl: '[data-slider-next="streams"]', prevEl: '[data-slider-prev="streams"]'},
        loop: null != (e = null == (e = __config.sliders.streams) ? void 0 : e.loop) && e,
        slidesPerView: 1,
        spaceBetween: 0,
        simulateTouch: !1,
        onlyExternal: !1,
        breakpoints: {0: {slidesPerView: 1}, 720: {slidesPerView: 2}, 940: {slidesPerView: 3}}
    }), void 0 !== __config.sliders.streams.autoplay && __config.sliders.streams.autoplay && __config.sliders.streams.pauseOnHover && $('[data-slider="streams"]').hover(function () {
        streamsSlider.autoplay.stop()
    }, function () {
        streamsSlider.autoplay.start()
    })) : $('[data-slider="streams"]').remove()
}

document.addEventListener("PreloadEnd", streamsInit);