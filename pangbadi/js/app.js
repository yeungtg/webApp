/*! LiveApp - v1.0.0 - 
 * 2015-01-30
 * http://www.liveapp.cn
 * Copyright (c) 2015 云来网络 */
define("lib/iscroll/iscroll", [], function(a, b, c) {
	!
	function(a, b, d) {
		function e(a, c) {
			this.wrapper = "string" == typeof a ? b.querySelector(a) : a, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
				resizeScrollbars: !0,
				mouseWheelSpeed: 20,
				snapThreshold: .12,
				startX: 0,
				startY: 0,
				scrollY: !0,
				directionLockThreshold: 10,
				momentum: !0,
				bounce: !0,
				bounceTime: 600,
				bounceEasing: "",
				preventDefault: !0,
				preventDefaultException: {
					tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
				},
				HWCompositing: !0,
				useTransition: !0,
				useTransform: !0
			};
			for (var d in c) this.options[d] = c[d];
			this.translateZ = this.options.HWCompositing && i.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = i.hasTransition && this.options.useTransition, this.options.useTransform = i.hasTransform && this.options.useTransform, this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = "vertical" == this.options.eventPassthrough ? !1 : this.options.scrollY, this.options.scrollX = "horizontal" == this.options.eventPassthrough ? !1 : this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? i.ease[this.options.bounceEasing] || i.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, this.options.tap === !0 && (this.options.tap = "tap"), "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1), this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable()
		}
		function f(a, c, d) {
			var e = b.createElement("div"),
				f = b.createElement("div");
			return d === !0 && (e.style.cssText = "position:absolute;z-index:9999", f.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), f.className = "iScrollIndicator", "h" == a ? (d === !0 && (e.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", f.style.height = "100%"), e.className = "iScrollHorizontalScrollbar") : (d === !0 && (e.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", f.style.width = "100%"), e.className = "iScrollVerticalScrollbar"), e.style.cssText += ";overflow:hidden", c || (e.style.pointerEvents = "none"), e.appendChild(f), e
		}
		function g(c, d) {
			this.wrapper = "string" == typeof d.el ? b.querySelector(d.el) : d.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = c, this.options = {
				listenX: !0,
				listenY: !0,
				interactive: !1,
				resize: !0,
				defaultScrollbars: !1,
				shrink: !1,
				fade: !1,
				speedRatioX: 0,
				speedRatioY: 0
			};
			for (var e in d) this.options[e] = d[e];
			this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.interactive && (this.options.disableTouch || (i.addEvent(this.indicator, "touchstart", this), i.addEvent(a, "touchend", this)), this.options.disablePointer || (i.addEvent(this.indicator, "MSPointerDown", this), i.addEvent(a, "MSPointerUp", this)), this.options.disableMouse || (i.addEvent(this.indicator, "mousedown", this), i.addEvent(a, "mouseup", this))), this.options.fade && (this.wrapperStyle[i.style.transform] = this.scroller.translateZ, this.wrapperStyle[i.style.transitionDuration] = i.isBadAndroid ? "0.001s" : "0ms", this.wrapperStyle.opacity = "0")
		}
		var h = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame ||
		function(b) {
			a.setTimeout(b, 1e3 / 60)
		}, i = function() {
			function c(a) {
				return g === !1 ? !1 : "" === g ? a : g + a.charAt(0).toUpperCase() + a.substr(1)
			}
			var e = {},
				f = b.createElement("div").style,
				g = function() {
					for (var a, b = ["t", "webkitT", "MozT", "msT", "OT"], c = 0, d = b.length; d > c; c++) if (a = b[c] + "ransform", a in f) return b[c].substr(0, b[c].length - 1);
					return !1
				}();
			e.getTime = Date.now ||
			function() {
				return (new Date).getTime()
			}, e.extend = function(a, b) {
				for (var c in b) a[c] = b[c]
			}, e.addEvent = function(a, b, c, d) {
				a.addEventListener(b, c, !! d)
			}, e.removeEvent = function(a, b, c, d) {
				a.removeEventListener(b, c, !! d)
			}, e.momentum = function(a, b, c, e, f, g) {
				var h, i, j = a - b,
					k = d.abs(j) / c;
				return g = void 0 === g ? 6e-4 : g, h = a + k * k / (2 * g) * (0 > j ? -1 : 1), i = k / g, e > h ? (h = f ? e - f / 2.5 * (k / 8) : e, j = d.abs(h - a), i = j / k) : h > 0 && (h = f ? f / 2.5 * (k / 8) : 0, j = d.abs(a) + h, i = j / k), {
					destination: d.round(h),
					duration: i
				}
			};
			var h = c("transform");
			return e.extend(e, {
				hasTransform: h !== !1,
				hasPerspective: c("perspective") in f,
				hasTouch: "ontouchstart" in a,
				hasPointer: navigator.msPointerEnabled,
				hasTransition: c("transition") in f
			}), e.isBadAndroid = /Android /.test(a.navigator.appVersion) && !/Chrome\/\d/.test(a.navigator.appVersion), e.extend(e.style = {}, {
				transform: h,
				transitionTimingFunction: c("transitionTimingFunction"),
				transitionDuration: c("transitionDuration"),
				transitionDelay: c("transitionDelay"),
				transformOrigin: c("transformOrigin")
			}), e.hasClass = function(a, b) {
				var c = new RegExp("(^|\\s)" + b + "(\\s|$)");
				return c.test(a.className)
			}, e.addClass = function(a, b) {
				if (!e.hasClass(a, b)) {
					var c = a.className.split(" ");
					c.push(b), a.className = c.join(" ")
				}
			}, e.removeClass = function(a, b) {
				if (e.hasClass(a, b)) {
					var c = new RegExp("(^|\\s)" + b + "(\\s|$)", "g");
					a.className = a.className.replace(c, " ")
				}
			}, e.offset = function(a) {
				for (var b = -a.offsetLeft, c = -a.offsetTop; a = a.offsetParent;) b -= a.offsetLeft, c -= a.offsetTop;
				return {
					left: b,
					top: c
				}
			}, e.preventDefaultException = function(a, b) {
				for (var c in b) if (b[c].test(a[c])) return !0;
				return !1
			}, e.extend(e.eventType = {}, {
				touchstart: 1,
				touchmove: 1,
				touchend: 1,
				mousedown: 2,
				mousemove: 2,
				mouseup: 2,
				MSPointerDown: 3,
				MSPointerMove: 3,
				MSPointerUp: 3
			}), e.extend(e.ease = {}, {
				quadratic: {
					style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
					fn: function(a) {
						return a * (2 - a)
					}
				},
				circular: {
					style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
					fn: function(a) {
						return d.sqrt(1 - --a * a)
					}
				},
				back: {
					style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
					fn: function(a) {
						var b = 4;
						return (a -= 1) * a * ((b + 1) * a + b) + 1
					}
				},
				bounce: {
					style: "",
					fn: function(a) {
						return (a /= 1) < 1 / 2.75 ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
					}
				},
				elastic: {
					style: "",
					fn: function(a) {
						var b = .22,
							c = .4;
						return 0 === a ? 0 : 1 == a ? 1 : c * d.pow(2, -10 * a) * d.sin(2 * (a - b / 4) * d.PI / b) + 1
					}
				}
			}), e.tap = function(a, c) {
				var d = b.createEvent("Event");
				d.initEvent(c, !0, !0), d.pageX = a.pageX, d.pageY = a.pageY, a.target.dispatchEvent(d)
			}, e.click = function(a) {
				var c, d = a.target;
				/(SELECT|INPUT|TEXTAREA)/i.test(d.tagName) || (c = b.createEvent("MouseEvents"), c.initMouseEvent("click", !0, !0, a.view, 1, d.screenX, d.screenY, d.clientX, d.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, 0, null), c._constructed = !0, d.dispatchEvent(c))
			}, e
		}();
		e.prototype = {
			version: "5.1.1",
			_init: function() {
				this._initEvents(), (this.options.scrollbars || this.options.indicators) && this._initIndicators(), this.options.mouseWheel && this._initWheel(), this.options.snap && this._initSnap(), this.options.keyBindings && this._initKeys()
			},
			destroy: function() {
				this._initEvents(!0), this._execEvent("destroy")
			},
			_transitionEnd: function(a) {
				a.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
			},
			_start: function(a) {
				if (!(1 != i.eventType[a.type] && 0 !== a.button || !this.enabled || this.initiated && i.eventType[a.type] !== this.initiated)) {
					!this.options.preventDefault || i.isBadAndroid || i.preventDefaultException(a.target, this.options.preventDefaultException) || a.preventDefault();
					var b, c = a.touches ? a.touches[0] : a;
					this.initiated = i.eventType[a.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = i.getTime(), this.options.useTransition && this.isInTransition ? (this.isInTransition = !1, b = this.getComputedPosition(), this._translate(d.round(b.x), d.round(b.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = c.pageX, this.pointY = c.pageY, this._execEvent("beforeScrollStart")
				}
			},
			_move: function(a) {
				if (this.enabled && i.eventType[a.type] === this.initiated) {
					this.options.preventDefault && a.preventDefault();
					var b, c, e, f, g = a.touches ? a.touches[0] : a,
						h = g.pageX - this.pointX,
						j = g.pageY - this.pointY,
						k = i.getTime();
					if (this.pointX = g.pageX, this.pointY = g.pageY, this.distX += h, this.distY += j, e = d.abs(this.distX), f = d.abs(this.distY), !(k - this.endTime > 300 && 10 > e && 10 > f)) {
						if (this.directionLocked || this.options.freeScroll || (this.directionLocked = e > f + this.options.directionLockThreshold ? "h" : f >= e + this.options.directionLockThreshold ? "v" : "n"), "h" == this.directionLocked) {
							if ("vertical" == this.options.eventPassthrough) a.preventDefault();
							else if ("horizontal" == this.options.eventPassthrough) return void(this.initiated = !1);
							j = 0
						} else if ("v" == this.directionLocked) {
							if ("horizontal" == this.options.eventPassthrough) a.preventDefault();
							else if ("vertical" == this.options.eventPassthrough) return void(this.initiated = !1);
							h = 0
						}
						h = this.hasHorizontalScroll ? h : 0, j = this.hasVerticalScroll ? j : 0, b = this.x + h, c = this.y + j, (b > 0 || b < this.maxScrollX) && (b = this.options.bounce ? this.x + h / 3 : b > 0 ? 0 : this.maxScrollX), (c > 0 || c < this.maxScrollY) && (c = this.options.bounce ? this.y + j / 3 : c > 0 ? 0 : this.maxScrollY), this.directionX = h > 0 ? -1 : 0 > h ? 1 : 0, this.directionY = j > 0 ? -1 : 0 > j ? 1 : 0, this.moved || this._execEvent("scrollStart"), this.moved = !0, this._translate(b, c), k - this.startTime > 300 && (this.startTime = k, this.startX = this.x, this.startY = this.y)
					}
				}
			},
			_end: function(a) {
				if (this.enabled && i.eventType[a.type] === this.initiated) {
					this.options.preventDefault && !i.preventDefaultException(a.target, this.options.preventDefaultException) && a.preventDefault();
					var b, c, e = (a.changedTouches ? a.changedTouches[0] : a, i.getTime() - this.startTime),
						f = d.round(this.x),
						g = d.round(this.y),
						h = d.abs(f - this.startX),
						j = d.abs(g - this.startY),
						k = 0,
						l = "";
					if (this.isInTransition = 0, this.initiated = 0, this.endTime = i.getTime(), !this.resetPosition(this.options.bounceTime)) {
						if (this.scrollTo(f, g), !this.moved) return this.options.tap && i.tap(a, this.options.tap), this.options.click && i.click(a), void this._execEvent("scrollCancel");
						if (this._events.flick && 200 > e && 100 > h && 100 > j) return void this._execEvent("flick");
						if (this.options.momentum && 300 > e && (b = this.hasHorizontalScroll ? i.momentum(this.x, this.startX, e, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
							destination: f,
							duration: 0
						}, c = this.hasVerticalScroll ? i.momentum(this.y, this.startY, e, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
							destination: g,
							duration: 0
						}, f = b.destination, g = c.destination, k = d.max(b.duration, c.duration), this.isInTransition = 1), this.options.snap) {
							var m = this._nearestSnap(f, g);
							this.currentPage = m, k = this.options.snapSpeed || d.max(d.max(d.min(d.abs(f - m.x), 1e3), d.min(d.abs(g - m.y), 1e3)), 300), f = m.x, g = m.y, this.directionX = 0, this.directionY = 0, l = this.options.bounceEasing
						}
						return f != this.x || g != this.y ? ((f > 0 || f < this.maxScrollX || g > 0 || g < this.maxScrollY) && (l = i.ease.quadratic), void this.scrollTo(f, g, k, l)) : void this._execEvent("scrollEnd")
					}
				}
			},
			_resize: function() {
				var a = this;
				clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
					a.refresh()
				}, this.options.resizePolling)
			},
			resetPosition: function(a) {
				var b = this.x,
					c = this.y;
				return a = a || 0, !this.hasHorizontalScroll || this.x > 0 ? b = 0 : this.x < this.maxScrollX && (b = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? c = 0 : this.y < this.maxScrollY && (c = this.maxScrollY), b == this.x && c == this.y ? !1 : (this.scrollTo(b, c, a, this.options.bounceEasing), !0)
			},
			disable: function() {
				this.enabled = !1
			},
			enable: function() {
				this.enabled = !0
			},
			refresh: function() {
				this.wrapper.offsetHeight;
				this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = i.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
			},
			on: function(a, b) {
				this._events[a] || (this._events[a] = []), this._events[a].push(b)
			},
			off: function(a, b) {
				if (this._events[a]) {
					var c = this._events[a].indexOf(b);
					c > -1 && this._events[a].splice(c, 1)
				}
			},
			_execEvent: function(a) {
				if (this._events[a]) {
					var b = 0,
						c = this._events[a].length;
					if (c) for (; c > b; b++) this._events[a][b].apply(this, [].slice.call(arguments, 1))
				}
			},
			scrollBy: function(a, b, c, d) {
				a = this.x + a, b = this.y + b, c = c || 0, this.scrollTo(a, b, c, d)
			},
			scrollTo: function(a, b, c, d) {
				d = d || i.ease.circular, this.isInTransition = this.options.useTransition && c > 0, !c || this.options.useTransition && d.style ? (this._transitionTimingFunction(d.style), this._transitionTime(c), this._translate(a, b)) : this._animate(a, b, c, d.fn)
			},
			scrollToElement: function(a, b, c, e, f) {
				if (a = a.nodeType ? a : this.scroller.querySelector(a)) {
					var g = i.offset(a);
					g.left -= this.wrapperOffset.left, g.top -= this.wrapperOffset.top, c === !0 && (c = d.round(a.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), e === !0 && (e = d.round(a.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), g.left -= c || 0, g.top -= e || 0, g.left = g.left > 0 ? 0 : g.left < this.maxScrollX ? this.maxScrollX : g.left, g.top = g.top > 0 ? 0 : g.top < this.maxScrollY ? this.maxScrollY : g.top, b = void 0 === b || null === b || "auto" === b ? d.max(d.abs(this.x - g.left), d.abs(this.y - g.top)) : b, this.scrollTo(g.left, g.top, b, f)
				}
			},
			_transitionTime: function(a) {
				if (a = a || 0, this.scrollerStyle[i.style.transitionDuration] = a + "ms", !a && i.isBadAndroid && (this.scrollerStyle[i.style.transitionDuration] = "0.001s"), this.indicators) for (var b = this.indicators.length; b--;) this.indicators[b].transitionTime(a)
			},
			_transitionTimingFunction: function(a) {
				if (this.scrollerStyle[i.style.transitionTimingFunction] = a, this.indicators) for (var b = this.indicators.length; b--;) this.indicators[b].transitionTimingFunction(a)
			},
			_translate: function(a, b) {
				if (this.options.useTransform ? this.scrollerStyle[i.style.transform] = "translate(" + a + "px," + b + "px)" + this.translateZ : (a = d.round(a), b = d.round(b), this.scrollerStyle.left = a + "px", this.scrollerStyle.top = b + "px"), this.x = a, this.y = b, this.indicators) for (var c = this.indicators.length; c--;) this.indicators[c].updatePosition()
			},
			_initEvents: function(b) {
				var c = b ? i.removeEvent : i.addEvent,
					d = this.options.bindToWrapper ? this.wrapper : a;
				c(a, "orientationchange", this), c(a, "resize", this), this.options.click && c(this.wrapper, "click", this, !0), this.options.disableMouse || (c(this.wrapper, "mousedown", this), c(d, "mousemove", this), c(d, "mousecancel", this), c(d, "mouseup", this)), i.hasPointer && !this.options.disablePointer && (c(this.wrapper, "MSPointerDown", this), c(d, "MSPointerMove", this), c(d, "MSPointerCancel", this), c(d, "MSPointerUp", this)), i.hasTouch && !this.options.disableTouch && (c(this.wrapper, "touchstart", this), c(d, "touchmove", this), c(d, "touchcancel", this), c(d, "touchend", this)), c(this.scroller, "transitionend", this), c(this.scroller, "webkitTransitionEnd", this), c(this.scroller, "oTransitionEnd", this), c(this.scroller, "MSTransitionEnd", this)
			},
			getComputedPosition: function() {
				var b, c, d = a.getComputedStyle(this.scroller, null);
				return this.options.useTransform ? (d = d[i.style.transform].split(")")[0].split(", "), b = +(d[12] || d[4]), c = +(d[13] || d[5])) : (b = +d.left.replace(/[^-\d.]/g, ""), c = +d.top.replace(/[^-\d.]/g, "")), {
					x: b,
					y: c
				}
			},
			_initIndicators: function() {
				function a(a) {
					for (var b = h.indicators.length; b--;) a.call(h.indicators[b])
				}
				var b, c = this.options.interactiveScrollbars,
					d = "string" != typeof this.options.scrollbars,
					e = [],
					h = this;
				this.indicators = [], this.options.scrollbars && (this.options.scrollY && (b = {
					el: f("v", c, this.options.scrollbars),
					interactive: c,
					defaultScrollbars: !0,
					customStyle: d,
					resize: this.options.resizeScrollbars,
					shrink: this.options.shrinkScrollbars,
					fade: this.options.fadeScrollbars,
					listenX: !1
				}, this.wrapper.appendChild(b.el), e.push(b)), this.options.scrollX && (b = {
					el: f("h", c, this.options.scrollbars),
					interactive: c,
					defaultScrollbars: !0,
					customStyle: d,
					resize: this.options.resizeScrollbars,
					shrink: this.options.shrinkScrollbars,
					fade: this.options.fadeScrollbars,
					listenY: !1
				}, this.wrapper.appendChild(b.el), e.push(b))), this.options.indicators && (e = e.concat(this.options.indicators));
				for (var i = e.length; i--;) this.indicators.push(new g(this, e[i]));
				this.options.fadeScrollbars && (this.on("scrollEnd", function() {
					a(function() {
						this.fade()
					})
				}), this.on("scrollCancel", function() {
					a(function() {
						this.fade()
					})
				}), this.on("scrollStart", function() {
					a(function() {
						this.fade(1)
					})
				}), this.on("beforeScrollStart", function() {
					a(function() {
						this.fade(1, !0)
					})
				})), this.on("refresh", function() {
					a(function() {
						this.refresh()
					})
				}), this.on("destroy", function() {
					a(function() {
						this.destroy()
					}), delete this.indicators
				})
			},
			_initWheel: function() {
				i.addEvent(this.wrapper, "wheel", this), i.addEvent(this.wrapper, "mousewheel", this), i.addEvent(this.wrapper, "DOMMouseScroll", this), this.on("destroy", function() {
					i.removeEvent(this.wrapper, "wheel", this), i.removeEvent(this.wrapper, "mousewheel", this), i.removeEvent(this.wrapper, "DOMMouseScroll", this)
				})
			},
			_wheel: function(a) {
				if (this.enabled) {
					a.preventDefault(), a.stopPropagation();
					var b, c, e, f, g = this;
					if (void 0 === this.wheelTimeout && g._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
						g._execEvent("scrollEnd"), g.wheelTimeout = void 0
					}, 400), "deltaX" in a) b = -a.deltaX, c = -a.deltaY;
					else if ("wheelDeltaX" in a) b = a.wheelDeltaX / 120 * this.options.mouseWheelSpeed, c = a.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
					else if ("wheelDelta" in a) b = c = a.wheelDelta / 120 * this.options.mouseWheelSpeed;
					else {
						if (!("detail" in a)) return;
						b = c = -a.detail / 3 * this.options.mouseWheelSpeed
					}
					if (b *= this.options.invertWheelDirection, c *= this.options.invertWheelDirection, this.hasVerticalScroll || (b = c, c = 0), this.options.snap) return e = this.currentPage.pageX, f = this.currentPage.pageY, b > 0 ? e-- : 0 > b && e++, c > 0 ? f-- : 0 > c && f++, void this.goToPage(e, f);
					e = this.x + d.round(this.hasHorizontalScroll ? b : 0), f = this.y + d.round(this.hasVerticalScroll ? c : 0), e > 0 ? e = 0 : e < this.maxScrollX && (e = this.maxScrollX), f > 0 ? f = 0 : f < this.maxScrollY && (f = this.maxScrollY), this.scrollTo(e, f, 0)
				}
			},
			_initSnap: function() {
				this.currentPage = {}, "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)), this.on("refresh", function() {
					var a, b, c, e, f, g, h = 0,
						i = 0,
						j = 0,
						k = this.options.snapStepX || this.wrapperWidth,
						l = this.options.snapStepY || this.wrapperHeight;
					if (this.pages = [], this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
						if (this.options.snap === !0) for (c = d.round(k / 2), e = d.round(l / 2); j > -this.scrollerWidth;) {
							for (this.pages[h] = [], a = 0, f = 0; f > -this.scrollerHeight;) this.pages[h][a] = {
								x: d.max(j, this.maxScrollX),
								y: d.max(f, this.maxScrollY),
								width: k,
								height: l,
								cx: j - c,
								cy: f - e
							}, f -= l, a++;
							j -= k, h++
						} else for (g = this.options.snap, a = g.length, b = -1; a > h; h++)(0 === h || g[h].offsetLeft <= g[h - 1].offsetLeft) && (i = 0, b++), this.pages[i] || (this.pages[i] = []), j = d.max(-g[h].offsetLeft, this.maxScrollX), f = d.max(-g[h].offsetTop, this.maxScrollY), c = j - d.round(g[h].offsetWidth / 2), e = f - d.round(g[h].offsetHeight / 2), this.pages[i][b] = {
							x: j,
							y: f,
							width: g[h].offsetWidth,
							height: g[h].offsetHeight,
							cx: c,
							cy: e
						}, j > this.maxScrollX && i++;
						this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0), this.options.snapThreshold % 1 === 0 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = d.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = d.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
					}
				}), this.on("flick", function() {
					var a = this.options.snapSpeed || d.max(d.max(d.min(d.abs(this.x - this.startX), 1e3), d.min(d.abs(this.y - this.startY), 1e3)), 300);
					this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, a)
				})
			},
			_nearestSnap: function(a, b) {
				if (!this.pages.length) return {
					x: 0,
					y: 0,
					pageX: 0,
					pageY: 0
				};
				var c = 0,
					e = this.pages.length,
					f = 0;
				if (d.abs(a - this.absStartX) < this.snapThresholdX && d.abs(b - this.absStartY) < this.snapThresholdY) return this.currentPage;
				for (a > 0 ? a = 0 : a < this.maxScrollX && (a = this.maxScrollX), b > 0 ? b = 0 : b < this.maxScrollY && (b = this.maxScrollY); e > c; c++) if (a >= this.pages[c][0].cx) {
					a = this.pages[c][0].x;
					break
				}
				for (e = this.pages[c].length; e > f; f++) if (b >= this.pages[0][f].cy) {
					b = this.pages[0][f].y;
					break
				}
				return c == this.currentPage.pageX && (c += this.directionX, 0 > c ? c = 0 : c >= this.pages.length && (c = this.pages.length - 1), a = this.pages[c][0].x), f == this.currentPage.pageY && (f += this.directionY, 0 > f ? f = 0 : f >= this.pages[0].length && (f = this.pages[0].length - 1), b = this.pages[0][f].y), {
					x: a,
					y: b,
					pageX: c,
					pageY: f
				}
			},
			goToPage: function(a, b, c, e) {
				e = e || this.options.bounceEasing, a >= this.pages.length ? a = this.pages.length - 1 : 0 > a && (a = 0), b >= this.pages[a].length ? b = this.pages[a].length - 1 : 0 > b && (b = 0);
				var f = this.pages[a][b].x,
					g = this.pages[a][b].y;
				c = void 0 === c ? this.options.snapSpeed || d.max(d.max(d.min(d.abs(f - this.x), 1e3), d.min(d.abs(g - this.y), 1e3)), 300) : c, this.currentPage = {
					x: f,
					y: g,
					pageX: a,
					pageY: b
				}, this.scrollTo(f, g, c, e)
			},
			next: function(a, b) {
				var c = this.currentPage.pageX,
					d = this.currentPage.pageY;
				c++, c >= this.pages.length && this.hasVerticalScroll && (c = 0, d++), this.goToPage(c, d, a, b)
			},
			prev: function(a, b) {
				var c = this.currentPage.pageX,
					d = this.currentPage.pageY;
				c--, 0 > c && this.hasVerticalScroll && (c = 0, d--), this.goToPage(c, d, a, b)
			},
			_initKeys: function() {
				var b, c = {
					pageUp: 33,
					pageDown: 34,
					end: 35,
					home: 36,
					left: 37,
					up: 38,
					right: 39,
					down: 40
				};
				if ("object" == typeof this.options.keyBindings) for (b in this.options.keyBindings)"string" == typeof this.options.keyBindings[b] && (this.options.keyBindings[b] = this.options.keyBindings[b].toUpperCase().charCodeAt(0));
				else this.options.keyBindings = {};
				for (b in c) this.options.keyBindings[b] = this.options.keyBindings[b] || c[b];
				i.addEvent(a, "keydown", this), this.on("destroy", function() {
					i.removeEvent(a, "keydown", this)
				})
			},
			_key: function(a) {
				if (this.enabled) {
					var b, c = this.options.snap,
						e = c ? this.currentPage.pageX : this.x,
						f = c ? this.currentPage.pageY : this.y,
						g = i.getTime(),
						h = this.keyTime || 0,
						j = .25;
					switch (this.options.useTransition && this.isInTransition && (b = this.getComputedPosition(), this._translate(d.round(b.x), d.round(b.y)), this.isInTransition = !1), this.keyAcceleration = 200 > g - h ? d.min(this.keyAcceleration + j, 50) : 0, a.keyCode) {
					case this.options.keyBindings.pageUp:
						this.hasHorizontalScroll && !this.hasVerticalScroll ? e += c ? 1 : this.wrapperWidth : f += c ? 1 : this.wrapperHeight;
						break;
					case this.options.keyBindings.pageDown:
						this.hasHorizontalScroll && !this.hasVerticalScroll ? e -= c ? 1 : this.wrapperWidth : f -= c ? 1 : this.wrapperHeight;
						break;
					case this.options.keyBindings.end:
						e = c ? this.pages.length - 1 : this.maxScrollX, f = c ? this.pages[0].length - 1 : this.maxScrollY;
						break;
					case this.options.keyBindings.home:
						e = 0, f = 0;
						break;
					case this.options.keyBindings.left:
						e += c ? -1 : 5 + this.keyAcceleration >> 0;
						break;
					case this.options.keyBindings.up:
						f += c ? 1 : 5 + this.keyAcceleration >> 0;
						break;
					case this.options.keyBindings.right:
						e -= c ? -1 : 5 + this.keyAcceleration >> 0;
						break;
					case this.options.keyBindings.down:
						f -= c ? 1 : 5 + this.keyAcceleration >> 0;
						break;
					default:
						return
					}
					if (c) return void this.goToPage(e, f);
					e > 0 ? (e = 0, this.keyAcceleration = 0) : e < this.maxScrollX && (e = this.maxScrollX, this.keyAcceleration = 0), f > 0 ? (f = 0, this.keyAcceleration = 0) : f < this.maxScrollY && (f = this.maxScrollY, this.keyAcceleration = 0), this.scrollTo(e, f, 0), this.keyTime = g
				}
			},
			_animate: function(a, b, c, d) {
				function e() {
					var m, n, o, p = i.getTime();
					return p >= l ? (f.isAnimating = !1, f._translate(a, b), void(f.resetPosition(f.options.bounceTime) || f._execEvent("scrollEnd"))) : (p = (p - k) / c, o = d(p), m = (a - g) * o + g, n = (b - j) * o + j, f._translate(m, n), void(f.isAnimating && h(e)))
				}
				var f = this,
					g = this.x,
					j = this.y,
					k = i.getTime(),
					l = k + c;
				this.isAnimating = !0, e()
			},
			handleEvent: function(a) {
				switch (a.type) {
				case "touchstart":
				case "MSPointerDown":
				case "mousedown":
					this._start(a);
					break;
				case "touchmove":
				case "MSPointerMove":
				case "mousemove":
					this._move(a);
					break;
				case "touchend":
				case "MSPointerUp":
				case "mouseup":
				case "touchcancel":
				case "MSPointerCancel":
				case "mousecancel":
					this._end(a);
					break;
				case "orientationchange":
				case "resize":
					this._resize();
					break;
				case "transitionend":
				case "webkitTransitionEnd":
				case "oTransitionEnd":
				case "MSTransitionEnd":
					this._transitionEnd(a);
					break;
				case "wheel":
				case "DOMMouseScroll":
				case "mousewheel":
					this._wheel(a);
					break;
				case "keydown":
					this._key(a);
					break;
				case "click":
					a._constructed || (a.preventDefault(), a.stopPropagation())
				}
			}
		}, g.prototype = {
			handleEvent: function(a) {
				switch (a.type) {
				case "touchstart":
				case "MSPointerDown":
				case "mousedown":
					this._start(a);
					break;
				case "touchmove":
				case "MSPointerMove":
				case "mousemove":
					this._move(a);
					break;
				case "touchend":
				case "MSPointerUp":
				case "mouseup":
				case "touchcancel":
				case "MSPointerCancel":
				case "mousecancel":
					this._end(a)
				}
			},
			destroy: function() {
				this.options.interactive && (i.removeEvent(this.indicator, "touchstart", this), i.removeEvent(this.indicator, "MSPointerDown", this), i.removeEvent(this.indicator, "mousedown", this), i.removeEvent(a, "touchmove", this), i.removeEvent(a, "MSPointerMove", this), i.removeEvent(a, "mousemove", this), i.removeEvent(a, "touchend", this), i.removeEvent(a, "MSPointerUp", this), i.removeEvent(a, "mouseup", this)), this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
			},
			_start: function(b) {
				var c = b.touches ? b.touches[0] : b;
				b.preventDefault(), b.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = c.pageX, this.lastPointY = c.pageY, this.startTime = i.getTime(), this.options.disableTouch || i.addEvent(a, "touchmove", this), this.options.disablePointer || i.addEvent(a, "MSPointerMove", this), this.options.disableMouse || i.addEvent(a, "mousemove", this), this.scroller._execEvent("beforeScrollStart")
			},
			_move: function(a) {
				{
					var b, c, d, e, f = a.touches ? a.touches[0] : a;
					i.getTime()
				}
				this.moved || this.scroller._execEvent("scrollStart"), this.moved = !0, b = f.pageX - this.lastPointX, this.lastPointX = f.pageX, c = f.pageY - this.lastPointY, this.lastPointY = f.pageY, d = this.x + b, e = this.y + c, this._pos(d, e), a.preventDefault(), a.stopPropagation()
			},
			_end: function(b) {
				if (this.initiated) {
					if (this.initiated = !1, b.preventDefault(), b.stopPropagation(), i.removeEvent(a, "touchmove", this), i.removeEvent(a, "MSPointerMove", this), i.removeEvent(a, "mousemove", this), this.scroller.options.snap) {
						var c = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
							e = this.options.snapSpeed || d.max(d.max(d.min(d.abs(this.scroller.x - c.x), 1e3), d.min(d.abs(this.scroller.y - c.y), 1e3)), 300);
						(this.scroller.x != c.x || this.scroller.y != c.y) && (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = c, this.scroller.scrollTo(c.x, c.y, e, this.scroller.options.bounceEasing))
					}
					this.moved && this.scroller._execEvent("scrollEnd")
				}
			},
			transitionTime: function(a) {
				a = a || 0, this.indicatorStyle[i.style.transitionDuration] = a + "ms", !a && i.isBadAndroid && (this.indicatorStyle[i.style.transitionDuration] = "0.001s")
			},
			transitionTimingFunction: function(a) {
				this.indicatorStyle[i.style.transitionTimingFunction] = a
			},
			refresh: function() {
				this.transitionTime(), this.indicatorStyle.display = this.options.listenX && !this.options.listenY ? this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.scroller.hasVerticalScroll ? "block" : "none" : this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (i.addClass(this.wrapper, "iScrollBothScrollbars"), i.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (i.removeClass(this.wrapper, "iScrollBothScrollbars"), i.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px"));
				this.wrapper.offsetHeight;
				this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = d.max(d.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = -this.indicatorWidth + 8, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = d.max(d.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = -this.indicatorHeight + 8, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
			},
			updatePosition: function() {
				var a = this.options.listenX && d.round(this.sizeRatioX * this.scroller.x) || 0,
					b = this.options.listenY && d.round(this.sizeRatioY * this.scroller.y) || 0;
				this.options.ignoreBoundaries || (a < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = d.max(this.indicatorWidth + a, 8), this.indicatorStyle.width = this.width + "px"), a = this.minBoundaryX) : a > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = d.max(this.indicatorWidth - (a - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", a = this.maxPosX + this.indicatorWidth - this.width) : a = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), b < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = d.max(this.indicatorHeight + 3 * b, 8), this.indicatorStyle.height = this.height + "px"), b = this.minBoundaryY) : b > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = d.max(this.indicatorHeight - 3 * (b - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", b = this.maxPosY + this.indicatorHeight - this.height) : b = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")), this.x = a, this.y = b, this.scroller.options.useTransform ? this.indicatorStyle[i.style.transform] = "translate(" + a + "px," + b + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = a + "px", this.indicatorStyle.top = b + "px")
			},
			_pos: function(a, b) {
				0 > a ? a = 0 : a > this.maxPosX && (a = this.maxPosX), 0 > b ? b = 0 : b > this.maxPosY && (b = this.maxPosY), a = this.options.listenX ? d.round(a / this.sizeRatioX) : this.scroller.x, b = this.options.listenY ? d.round(b / this.sizeRatioY) : this.scroller.y, this.scroller.scrollTo(a, b)
			},
			fade: function(a, b) {
				if (!b || this.visible) {
					clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
					var c = a ? 250 : 500,
						d = a ? 0 : 300;
					a = a ? "1" : "0", this.wrapperStyle[i.style.transitionDuration] = c + "ms", this.fadeTimeout = setTimeout(function(a) {
						this.wrapperStyle.opacity = a, this.visible = +a
					}.bind(this, a), d)
				}
			}
		}, e.utils = i, "undefined" != typeof c && c.exports ? c.exports = e : a.IScroll = e
	}(window, document, Math)
}), define("lib/youku/jsapi", [], function(require, exports, module) {
	var consoleBak = console;
	!
	function() {
		function w(a) {
			var b = document.createElement("script");
			b.type = "text/javascript", b.src = a, document.getElementsByTagName("head")[0].appendChild(b)
		}
		function na(a) {
			if (!a) return "";
			var b, c, d, e, f, a = a.toString(),
				g = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];
			for (e = a.length, d = 0, f = ""; e > d;) {
				do b = g[255 & a.charCodeAt(d++)];
				while (e > d && -1 == b);
				if (-1 == b) break;
				do c = g[255 & a.charCodeAt(d++)];
				while (e > d && -1 == c);
				if (-1 == c) break;
				f += String.fromCharCode(b << 2 | (48 & c) >> 4);
				do {
					if (b = 255 & a.charCodeAt(d++), 61 == b) return f;
					b = g[b]
				} while (e > d && -1 == b);
				if (-1 == b) break;
				f += String.fromCharCode((15 & c) << 4 | (60 & b) >> 2);
				do {
					if (c = 255 & a.charCodeAt(d++), 61 == c) return f;
					c = g[c]
				} while (e > d && -1 == c);
				if (-1 == c) break;
				f += String.fromCharCode((3 & b) << 6 | c)
			}
			return f
		}
		function E(a, b) {
			for (var c, d = [], e = 0, f = "", g = 0; 256 > g; g++) d[g] = g;
			for (g = 0; 256 > g; g++) e = (e + d[g] + a.charCodeAt(g % a.length)) % 256, c = d[g], d[g] = d[e], d[e] = c;
			for (var h = e = g = 0; h < b.length; h++) g = (g + 1) % 256, e = (e + d[g]) % 256, c = d[g], d[g] = d[e], d[e] = c, f += String.fromCharCode(b.charCodeAt(h) ^ d[(d[g] + d[e]) % 256]);
			return f
		}
		function F(a, b) {
			for (var c = [], d = 0; d < a.length; d++) {
				for (var e = 0, e = "a" <= a[d] && "z" >= a[d] ? a[d].charCodeAt(0) - 97 : a[d] - 0 + 26, f = 0; 36 > f; f++) if (b[f] == e) {
					e = f;
					break
				}
				c[d] = e > 25 ? e - 26 : String.fromCharCode(e + 97)
			}
			return c.join("")
		}
		function oa(a) {
			function b(a, b) {
				return a << b | a >>> 32 - b
			}
			function c(a) {
				var b, c, d = "";
				for (b = 7; b >= 0; b--) c = a >>> 4 * b & 15, d += c.toString(16);
				return d
			}
			var d, e, f, g, h, i, j, k = Array(80),
				l = 1732584193,
				m = 4023233417,
				n = 2562383102,
				o = 271733878,
				p = 3285377520,
				a = function(a) {
					for (var a = a.replace(/\r\n/g, "\n"), b = "", c = 0; c < a.length; c++) {
						var d = a.charCodeAt(c);
						128 > d ? b += String.fromCharCode(d) : (d > 127 && 2048 > d ? b += String.fromCharCode(d >> 6 | 192) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128)), b += String.fromCharCode(63 & d | 128))
					}
					return b
				}(a);
			f = a.length;
			var q = [];
			for (d = 0; f - 3 > d; d += 4) e = a.charCodeAt(d) << 24 | a.charCodeAt(d + 1) << 16 | a.charCodeAt(d + 2) << 8 | a.charCodeAt(d + 3), q.push(e);
			switch (f % 4) {
			case 0:
				d = 2147483648;
				break;
			case 1:
				d = a.charCodeAt(f - 1) << 24 | 8388608;
				break;
			case 2:
				d = a.charCodeAt(f - 2) << 24 | a.charCodeAt(f - 1) << 16 | 32768;
				break;
			case 3:
				d = a.charCodeAt(f - 3) << 24 | a.charCodeAt(f - 2) << 16 | a.charCodeAt(f - 1) << 8 | 128
			}
			for (q.push(d); 14 != q.length % 16;) q.push(0);
			for (q.push(f >>> 29), q.push(f << 3 & 4294967295), a = 0; a < q.length; a += 16) {
				for (d = 0; 16 > d; d++) k[d] = q[a + d];
				for (d = 16; 79 >= d; d++) k[d] = b(k[d - 3] ^ k[d - 8] ^ k[d - 14] ^ k[d - 16], 1);
				for (e = l, f = m, g = n, h = o, i = p, d = 0; 19 >= d; d++) j = b(e, 5) + (f & g | ~f & h) + i + k[d] + 1518500249 & 4294967295, i = h, h = g, g = b(f, 30), f = e, e = j;
				for (d = 20; 39 >= d; d++) j = b(e, 5) + (f ^ g ^ h) + i + k[d] + 1859775393 & 4294967295, i = h, h = g, g = b(f, 30), f = e, e = j;
				for (d = 40; 59 >= d; d++) j = b(e, 5) + (f & g | f & h | g & h) + i + k[d] + 2400959708 & 4294967295, i = h, h = g, g = b(f, 30), f = e, e = j;
				for (d = 60; 79 >= d; d++) j = b(e, 5) + (f ^ g ^ h) + i + k[d] + 3395469782 & 4294967295, i = h, h = g, g = b(f, 30), f = e, e = j;
				l = l + e & 4294967295, m = m + f & 4294967295, n = n + g & 4294967295, o = o + h & 4294967295, p = p + i & 4294967295
			}
			return j = c(l) + c(m) + c(n) + c(o) + c(p), j.toLowerCase()
		}
		function x(a, b) {
			if ("js" == b) {
				var c = document.createElement("script");
				c.setAttribute("type", "text/javascript"), c.setAttribute("src", a)
			} else "css" == b && (c = document.createElement("link"), c.setAttribute("rel", "stylesheet"), c.setAttribute("type", "text/css"), c.setAttribute("href", a));
			"undefined" != typeof c && document.getElementsByTagName("head")[0].appendChild(c)
		}
		function P() {
			return e.isAndroid ? e.isAndroid4 ? "adr4" : "adr" : e.isIPHONE ? "iph" : e.isIPAD ? "ipa" : e.isIPOD ? "ipo" : "oth"
		}
		function y(a) {
			return e.isIPAD && 0 <= window.location.href.indexOf("v.youku.com") ? "x-player" : 200 >= a ? "x-player x-player-200" : 300 >= a ? "x-player x-player-200-300" : 660 >= a ? "x-player x-player-300-660" : 800 >= a ? "x-player x-player-660-800" : "x-player"
		}
		VER = "2013/12/2713:55:33", VER = "2013/12/2718:35:37", VER = "2013/12/3010:49:36", VER = "2014/02/1312:25:32", VER = "2014/02/1312:27:24", VER = "2014/02/1312:28:35", VER = "2014/02/1312:30:41", VER = "2014/02/1313:35:42", VER = "2014/02/1313:41:37", VER = "2014/02/1314:14:53", VER = "2014/02/1314:18:16", VER = "2014/02/1314:19:48", VER = "2014/02/1314:20:41", VER = "2014/02/1314:21:24", VER = "2014/02/1314:24:50", VER = "2014/02/1314:26:35", VER = "2014/02/1314:28:06", VER = "2014/02/1314:30:12", VER = "2014/02/1314:32:07", VER = "2014/02/1314:35:51", VER = "2014/02/1315:39:09", VER = "2014/02/1315:51:01", VER = "2014/02/1315:51:45", VER = "2014/02/1316:22:55", VER = "2014/02/1316:27:27", VER = "2014/02/1316:35:10", VER = "2014/02/1316:35:59", VER = "2014/02/1316:44:35", VER = "2014/02/1317:35:15", VER = "2014/02/1317:36:28", VER = "2014/02/1317:38:34", VER = "2014/02/1317:43:29", VER = "2014/02/1317:44:40", VER = "2014/02/1317:46:49", VER = "2014/02/1318:18:42", VER = "2014/02/1318:33:09", VER = "2014/02/1318:39:55", VER = "2014/02/1318:42:23", VER = "2014/02/1318:44:02", VER = "2014/02/14 9:43:04", VER = "2014/02/1410:00:37", VER = "2014/02/1410:10:07", VER = "2014/02/1410:18:01", VER = "2014/02/1415:30:49", VER = "2014/02/1415:33:12", VER = "2014/02/1415:40:27", VER = "2014/02/1415:42:25", VER = "2014/02/1415:45:31", VER = "2014/02/1416:24:23", VER = "2014/02/1416:25:33", VER = "2014/02/1416:30:01", VER = "2014/02/1416:31:28", VER = "2014/02/1416:32:55", VER = "2014/02/1416:37:01", VER = "2014/02/1416:37:35", VER = "2014/02/1416:38:49", VER = "2014/02/1416:39:41", VER = "2014/02/1417:16:21", VER = "2014/02/1417:21:10", VER = "2014/02/1417:25:42", VER = "2014/02/1417:26:56", VER = "2014/02/2010:16:51", VER = "2014/02/2010:28:18", VER = "2014/03/0710:33:23", VER = "2014/03/0710:45:32", VER = "2014/03/0710:50:10", VER = "2014/03/0711:21:36", VER = "2014/03/0711:22:05", VER = "2014/03/0711:24:22", VER = "2014/03/0714:39:06", VER = "2014/03/0714:42:45", VER = "2014/03/0715:12:07", VER = "2014/03/0715:16:31", VER = "2014/03/0715:17:40", VER = "2014/03/0715:24:32", VER = "2014/03/1813:59:22", VER = "2014/03/1813:59:59", VER = "2014/03/1814:27:38", VER = "2014/03/1814:28:44", VER = "2014/03/1814:37:05", VER = "2014/03/1814:45:56", VER = "2014/03/1814:51:40", VER = "2014/03/1814:58:33", VER = "2014/03/1814:59:10", VER = "2014/03/20 9:44:18", VER = "2014/03/2811:34:40", VER = "2014/04/0115:19:54", DEBUG__ = 0, 0 != DEBUG__ && window.console || (window.console = {}, window.console.log = function() {}), debug = {
			log: function(a) {
				null != document.getElementById("debug") && (document.getElementById("debug").innerHTML += a + " | ")
			}
		};
		var b = {},
			B = {},
			e = {
				playerType: "",
				uniplayerUrl: "http://passport-log.youku.com/logsys/logstorage/append?project=uniplayer&log=",
				MPIECEURL: "http://passport-log.youku.com/logsys/logstorage/append?project=mpiece&log=",
				userCache: {
					a1: "4",
					a2: "1"
				},
				playerState: {
					PLAYER_STATE_INIT: "PLAYER_STATE_INIT",
					PLAYER_STATE_READY: "PLAYER_STATE_READY",
					PLAYER_STATE_AD: "PLAYER_STATE_AD",
					PLAYER_STATE_PLAYING: "PLAYER_STATE_PLAYING",
					PLAYER_STATE_END: "PLAYER_STATE_END",
					PLAYER_STATE_ERROR: "PLAYER_STATE_ERROR"
				},
				playerCurrentState: "PLAYER_STATE_INIT",
				Log: function(a, b) {
					var c = document.createElement("img");
					b && c.addEventListener("error", b, !1), c.src = a + "&r_=" + Math.floor(1e4 * Math.random()), c.id = "youku-uniplayer-stat"
				},
				isNeedAdrTrick: function() {
					return e.isAndroid && !e.adrPlayTrick && !e.isHTC && e.isNeedFrontAd && !e.isVIVO
				},
				adrInvalidPauseCheck: function(a) {
					var b = a.currentTime,
						c = 0,
						d = !1;
					e.adrPlayTrick = !0, a.pause(), a.play(), setInterval(function() {
						a.currentTime != b || d ? d = !0 : (c++, a.play(), 0 == c % 10 && (a.load(), a.play()))
					}, 1e3)
				},
				uniReport: function(a) {
					a.partner = b.initConfig.client_id, a.os = escape(e.os), a.mios = e.isMobileIOS, a.adrd4 = e.isAndroid4, a.mobile = e.isMobile, a.adrpad = e.isAndroidPad, 0 == a.mobile && (a.ua = escape(navigator.userAgent.replace(/[\/\+\*@\(\)\,]/g, ""))), a.version = VER.replace(/[-: ]/g, ""), e.Log(e.uniplayerUrl + p(a))
				},
				Load: function(a, b) {
					if ("js" == b) {
						var c = document.createElement("script");
						c.setAttribute("type", "text/javascript"), c.setAttribute("src", a)
					} else "css" == b && (c = document.createElement("link"), c.setAttribute("rel", "stylesheet"), c.setAttribute("type", "text/css"), c.setAttribute("href", a));
					"undefined" != typeof c && document.getElementsByTagName("head")[0].appendChild(c)
				},
				showError: function(a, c) {
					var d = b.get("#x-player");
					d.innerHTML = c ? c : "该视频格式特殊，请在PC上观看", d.style.textAlign = "center", d.style.color = "white", d.style.lineHeight = d.offsetHeight + "px", b.playerEvents && b.playerEvents.onPlayError && b.playerEvents.onPlayError(c ? c : "该视频格式特殊，请在PC上观看")
				}
			};
		!
		function() {
			var a = document.createElement("video"),
				b = {
					MP4: "video/mp4",
					OGG: "video/ogg",
					WEBM: "video/webm"
				},
				c = {
					isWin: "Win",
					isMac: "Mac",
					isSafari: "Safari",
					isChrome: "Chrome",
					isIPAD: "iPad",
					isIPAD7: "iPad; CPU OS 7",
					isIPHONE: "iPhone",
					isIPOD: "iPod",
					isLEPAD: "lepad_hls",
					isMIUI: "MI-ONE",
					isAndroid: "Android",
					isAndroid4: "Android 4.",
					isAndroid41: "Android 4.1",
					isSonyDTV: "SonyDTV",
					isBlackBerry: "BlackBerry",
					isMQQBrowser: "MQQBrowser",
					isMobile: "Mobile",
					isSamSung: "SAMSUNG",
					isHTC: "HTC",
					isVIVO: "vivo"
				};
			if (e.supportHTML5Video = !1, e.isIOS = !1, e.os = "", a.canPlayType) {
				e.supportHTML5Video = !0;
				for (var d in b) e["canPlay" + d] = a.canPlayType(b[d]) ? !0 : !1
			}
			for (var f in c) - 1 !== navigator.userAgent.indexOf(c[f]) ? (e[f] = !0, e.os += c[f] + " ") : e[f] = !1, -1 !== navigator.userAgent.indexOf("Android") && (a = navigator.userAgent.indexOf("Android"), a = navigator.userAgent.substr(a, 10), a > c.isAndroid4 && (e.isAndroid4 = !0, e.os += a + " "));
			e.isMobileIOS = e.isIPAD || e.isIPHONE || e.isIPOD, e.isIOS = e.isMobileIOS || e.isMac, e.isSupportH5M3U8 = e.isMobileIOS || e.isMac && e.isSafari && !e.isChrome || e.isLEPAD || e.isSonyDTV, e.isSupportH5MP4 = (e.isChrome || e.isIE10 || e.isAndroid41 || e.isAndroid4) && e.canPlayMP4, f = c = 0;
			try {
				if (document.all) {
					var g = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
					g && (c = 1, VSwf = g.GetVariable("$version"), parseInt(VSwf.split(" ")[1].split(",")[0]))
				} else if (navigator.plugins && 0 < navigator.plugins.length && (g = navigator.plugins["Shockwave Flash"])) for (var c = 1, h = g.description.split(" "), g = 0; g < h.length; ++g) isNaN(parseInt(h[g])) || parseInt(h[g])
			} catch (i) {
				f = c = 1
			}
			e.isSupportFlash = c && !f, e.isMQQBrowser && (e.isSupportFlash = !1), e.isPhone = e.isIPHONE || e.isIPOD || e.isAndroid && e.isMobile, e.isAndroidPad = e.isAndroid && !e.isMobile, e.isPad = e.isIPAD || e.isAndroidPad, e.isMobile = e.isIPAD || e.isIPHONE || e.isIPOD || e.isLEPAD || e.isMIUI || e.isAndroid4 || e.isSonyDTV
		}();
		var I = function(a) {
				debug.log("canplay mp4 = " + e.canPlayMP4), b.initConfig = a, this._vid = a.vid, this._target = a.target, this._partnerId = a.partnerId, a.client_id && (this._partnerId = a.client_id), this._vid && this._target && this._partnerId ? (this._events = a.events, b.playerEvents = a.events, e._target = this._target, this._paid = 0, null != a.paid && (this._paid = a.paid), this._id = a.id, null == this._id && (this._id = "youku-player"), e.playerId = this._id, this._width = a.width, this._height = a.height, this._expand = a.expand, null == a.width || null == a.height ? null == a.expand && (this._expand = 0) : null == a.expand && (this._expand = 1), this._prefer = a.prefer ? a.prefer.toLowerCase() : "flash", this._starttime = a.starttime, this._password = a.password, this._poster = a.poster, this._autoplay = eval(a.autoplay), this._canWide = a.canWide, this._showRelated = a.show_related, this._winType = a.wintype, this._playlistconfig = a.playlistconfig, this._isMobile = e.isMobile, this._isMobileIOS = e.isMobileIOS, this._playerType = "", b.mk = {}, b.mk.a3 = "b4et", b.mk.a4 = "boa4") : alert("[Fail]The params of {vid,target,client_id} are necessary !")
			};
		I.prototype = {
			isSupportH5MP4: function() {
				return e.isSupportH5MP4
			},
			isSupportH5M3U8: function() {
				return e.isSupportH5M3U8
			},
			isSupportFlash: function() {
				return e.isSupportFlash
			},
			playerType: function() {
				return "" != this._playerType ? this._playerType : (this._playerType = "h5" == this._prefer ? this.isSupportH5M3U8() ? "h5m3u8" : this.isSupportH5MP4() ? "h5mp4" : this.isSupportFlash() ? "flash" : "error" : "flash" == this._prefer ? this.isSupportFlash() ? "flash" : this.isSupportH5M3U8() ? "h5m3u8" : this.isSupportH5MP4() ? "h5mp4" : "error" : "error", window.console && console.log && console.log("playerType = " + this._playerType), this._playerType)
			},
			select: function() {
				if (debug.log("playerType = " + this.playerType()), this.isThirdParty()) {
					var a = this;
					this.processThirdParty(function() {
						a.selectHandler()
					})
				} else this.selectHandler()
			},
			selectHandler: function() {
				if ("h5m3u8" == this.playerType() ? (this.selectH5M3U8(), l.appendItem("phase", "type_h5m3u8")) : "h5mp4" == this.playerType() ? (this.selectH5MP4(), l.appendItem("phase", "type_h5mp4")) : "flash" == this.playerType() ? (this.selectFlash(), l.appendItem("phase", "type_flash")) : (this.selectDirectUrl(), l.appendItem("phase", "type_directurl")), this._events && this._events.onPlayerReady) {
					var a = this._events.onPlayerReady;
					if ("h5" == e.playerType) var b = setInterval(function() {
						if ($$$(e.playerId)) {
							e.playerCurrentState = e.playerState.PLAYER_STATE_READY, debug.log(e.playerCurrentState), clearInterval(b);
							try {
								l.appendItem("phase", "playerready"), a()
							} catch (c) {}
						}
					}, 500);
					else "flash" == e.playerType && (b = setInterval(function() {
						if (1 == B.swfLoaded) {
							e.playerCurrentState = e.playerState.PLAYER_STATE_READY, debug.log(e.playerCurrentState), clearInterval(b);
							try {
								l.appendItem("phase", "playerready"), a()
							} catch (c) {}
						}
					}, 500))
				}
			},
			selectH5MP4: function() {
				e.uniReport({
					mp4: 1
				}), e.playerType = "h5";
				var a = this._h5player = new YoukuHTML5Player({
					id: this._id,
					vid: this._vid,
					partnerId: this._partnerId,
					parentBox: this._target,
					events: this._events,
					width: this._width,
					height: this._height,
					poster: this._poster,
					autoplay: this._autoplay,
					isMobile: this._isMobile,
					isMobileIOS: this._isMobileIOS,
					content: "mp4",
					wintype: this._winType,
					expand: this._expand,
					partner_config: this.partner_config,
					canWide: this._canWide ? this._canWide : 0
				});
				e.GetMP4OK = function(c, d) {
					l.appendItem("phase", "vinfo_mp4"), a.startPlay(c, d), b.initConfig.events.onMediaSrcOK && b.initConfig.events.onMediaSrcOK(m, d._videoSegsDic[m][0].src)
				}, k.playlistconfig = this._playlistconfig, k.start(this._vid, this._password, "mp4")
			},
			selectH5M3U8: function() {
				e.uniReport({
					m3u8: 1
				}), e.playerType = "h5";
				var a = {
					id: this._id,
					vid: this._vid,
					partnerId: this._partnerId,
					parentBox: this._target,
					events: this._events,
					width: this._width,
					height: this._height,
					poster: this._poster,
					autoplay: this._autoplay,
					isMobile: this._isMobile,
					isMobileIOS: this._isMobileIOS,
					content: "m3u8",
					wintype: this._winType,
					expand: this._expand,
					partner_config: this.partner_config,
					canWide: this._canWide ? this._canWide : 0
				};
				(e.isIPHONE || e.isIPOD) && (a.playType = "directsrc");
				var b = new YoukuHTML5Player(a);
				this._h5player = b, e.GetM3U8OK = function(a, c) {
					l.appendItem("phase", "vinfo_m3u8"), console.log("videoinfo src = " + c.src), b.startPlay(a, c)
				}, k.playlistconfig = this._playlistconfig, k.start(this._vid, this._password, "m3u8")
			},
			processThirdParty: function(a) {
				var c = new Q({
					client_id: b.initConfig.client_id,
					video_id: b.initConfig.vid,
					embsig: b.initConfig.embsig,
					refer: escape(window.location.href)
				}),
					d = this;
				c.addEventListener(PartnerConstant.OPEN_API_OK, function(b) {
					debug.log("thirdparty res ok"), d.partner_config = b.data, a()
				}), c.addEventListener(PartnerConstant.OPEN_API_ERROR, function() {
					debug.log("thirdparty res error"), a()
				}), c.addEventListener(PartnerConstant.OPEN_API_TIME_OUT, function() {
					debug.log("thirdparty res timeout"), a()
				})
			},
			selectH5VTag: function() {
				e.playerType = "h5";
				var a = "http://v.youku.com/player/getM3U8/vid/" + this._vid + "/type/mp4/ts/" + parseInt((new Date).getTime() / 1e3),
					a = a + (this._password ? "/password/" + this._password : ""),
					a = '<video src="' + (a + "/v.m3u8") + '" controls width=' + this._width + " height=" + this._height + " id=" + this._id + " autohide=false " + (this._poster ? "poster=" + this._poster : "") + " " + (1 == this._autoplay ? "autoplay=true" : "") + "></video>";
				$$$(this._target).innerHTML = a
			},
			isThirdParty: function() {
				var a = b.initConfig.client_id;
				return null != a && 16 == (a + "").length
			},
			selectFlash: function() {
				e.uniReport({
					flash: 1
				}), e.playerType = "flash";
				var a = {
					imglogo: this._poster || "",
					paid: this._paid,
					partnerId: b.initConfig.client_id
				};
				null != b.initConfig.firsttime && (a.firsttime = b.initConfig.firsttime), null != this._autoplay && (a.isAutoPlay = this._autoplay), null != b.initConfig.embsig && (a.embsig = b.initConfig.embsig), null != this._showRelated && (a.isShowRelatedVideo = this._showRelated), null != b.initConfig.password && (a.passwordstr = b.initConfig.password), null != b.initConfig.styleid && (a.styleid = b.initConfig.styleid), null != b.initConfig.vext && (a.vext = b.initConfig.vext);
				for (var c in b.initConfig.adconfig) a[c] = b.initConfig.adconfig[c];
				for (c in b.initConfig.flashconfig) a[c] = b.initConfig.flashconfig[c];
				c = "", this.isThirdParty() && (c = "/partnerid/" + this._partnerId), a.delayload && (c = "");
				var d = "";
				null != this._winType && "" != this._winType && (d = "/winType/" + this._winType), c = "http://player.youku.com/player.php/sid/" + this._vid + c + d + "/v.swf", b.initConfig.flashsrc && (c = b.initConfig.flashsrc), a = n(a), $$$(this._target).innerHTML = "<object type=application/x-shockwave-flash data= " + c + " width=100% height=100% id=" + this._id + "><param name=allowFullScreen value=true><param name=allowScriptAccess value=always><param name=movie value=" + c + "><param name=flashvars value=" + a + ">" + (b.initConfig.flashext || "") + "</object>", this._expand && ($$$(this._target).style.width = this._width + "px", $$$(this._target).style.height = this._height + "px")
			},
			selectDirectUrl: function(a) {
				a = a || "mp4", debug.log("select directsrc"), e.uniReport({
					direct: 1
				}), e.playerType = "directsrc";
				var b = new DirectPlayer({
					id: this._id,
					vid: this._vid,
					partnerId: this._partnerId,
					parentBox: this._target,
					events: this._events,
					width: this._width,
					height: this._height,
					poster: this._poster,
					autoplay: this._autoplay,
					isMobile: this._isMobile,
					isMobileIOS: this._isMobileIOS,
					content: a,
					playType: "directsrc",
					wintype: this._winType,
					expand: this._expand,
					canWide: this._canWide ? this._canWide : 0
				});
				this._h5player = b, k.playlistconfig = this._playlistconfig, k.start(this._vid, this._password, a, function(a, c) {
					b.startPlay(a, c)
				})
			},
			selectError_: function(a, b) {
				e.uniReport({
					error: 1
				}), (this._width || this._height) && ($$$(this._target).style.width = this._width + "px", $$$(this._target).style.height = this._height + "px"), e.playerType = "error", e.showError(this._target, a, b)
			}
		}, B.Player = function(a, b) {
			b.target = a, this.select = new I(b), this.select.select(), this._player = ""
		}, B.Player.prototype = {
			player: function() {
				return "" != this._player ? this._player : this._player = "h5" == e.playerType ? new R(this.select._h5player) : "flash" == e.playerType ? new S : "error"
			},
			resize: function(a, b) {
				this.player().resize(a, b)
			},
			currentTime: function() {
				return this.player().currentTime()
			},
			totalTime: function() {
				return this.player().totalTime()
			},
			playVideo: function() {
				this.player().playVideo()
			},
			pauseVideo: function() {
				this.player().pauseVideo()
			},
			seekTo: function(a) {
				this.player().seekTo(a)
			},
			hideControls: function() {
				this.player().hideControls()
			},
			showControls: function() {
				this.player().showControls()
			},
			playVideoById: function(a) {
				this.player().playVideoById(a)
			},
			switchFullScreen: function() {
				try {
					this.player().switchFullScreen()
				} catch (a) {}
			}
		};
		var S = function() {
				this._player = document.getElementById(e.playerId)
			};
		S.prototype = {
			resize: function(a, b) {
				this._player.style.width = a + "px", this._player.style.height = b + "px"
			},
			currentTime: function() {
				var a = this._player.getPlayerState().split("|");
				return 3 <= a.length ? a[2] : -1
			},
			totalTime: function() {
				var a = this._player.getPlayerState().split("|");
				return 4 <= a.length ? a[3] : -1
			},
			playVideo: function() {
				this._player.pauseVideo(!1)
			},
			pauseVideo: function() {
				this._player.pauseVideo(!0)
			},
			seekTo: function(a) {
				this._player.nsseek(a)
			},
			playVideoById: function(a) {
				this._player.playVideoByID(a)
			},
			hideControls: function() {
				this._player.showControlBar(!1)
			},
			showControls: function() {
				this._player.showControlBar(!0)
			}
		}, PartnerConstant = {
			OPEN_API_URL: "https://openapi.youku.com/v2/players/custom.json",
			OPEN_API_OK: "openapiokyouku",
			OPEN_API_TIME_OUT: "openapitimeoutyouku",
			OPEN_API_ERROR: "openapierror"
		};
		var Q = function(a) {
				this._handler = {}, window.partnerinfo = this, a.callback = "partnerinfo.parse", a = n(a), w(PartnerConstant.OPEN_API_URL + "?" + a);
				var b = this;
				setTimeout(function() {
					b._hasResp || b.dispatch({
						type: PartnerConstant.OPEN_API_TIME_OUT
					})
				}, 2e3)
			};
		Q.prototype = {
			addEventListener: function(a, b) {
				this._handler[a] = b
			},
			removeEventListener: function(a) {
				this._handler[a] = null
			},
			dispatch: function(a) {
				a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
			},
			parse: function(a) {
				this._hasResp = !0, this.dispatch(null != a.error || 1 != a.status ? {
					type: PartnerConstant.OPEN_API_ERROR
				} : {
					type: PartnerConstant.OPEN_API_OK,
					data: a
				})
			}
		};
		var k = {},
			z = {},
			C = [];
		k.mp4srcs = [], k.start = function(a, b, c, d) {
			if (this._callback = d, null == this._callback) switch (this._type) {
			case "m3u8":
				this._callback = e.GetM3U8OK;
				break;
			case "mp4":
				this._callback = e.GetMP4OK;
				break;
			default:
				this._callback = e.GetM3U8OK
			}
			null != z[a] && null != z[a][c] ? (console.log("Cache Hit vid = " + a), this._callback(z[a][c].v, z[a][c].videoInfo)) : (this._vid = a, this._password = b, this._type = c, this._videoInfo = null, this._url = "", this.mp4srcs = [], this.request())
		}, k.cache = function() {
			z[k._vid] = {}, z[k._vid][k._type] = {
				v: this._v,
				videoInfo: this._videoInfo
			}
		}, k.getPlayListUrl = function() {
			var a, b = "http://v.youku.com/player/getPlayList/VideoIDS/" + this._vid,
				b = b + "/Pf/4/ctype/12/ev/1";
			for (a in this.playlistconfig) b += "/" + a + "/" + this.playlistconfig[a];
			return b + "?"
		}, k.error = function(a) {
			a || (a = 0), e.uniReport({
				error: a,
				vid: b.initConfig.vid
			}), e.showError(b.config.parentBox, "该视频暂时不能播放,请下载APP或在PC上观看", 320)
		}, k.reportPlayListUep = function() {
			var a = (new Date).getTime() - this._plreqStartTime;
			C.push({
				type: "getplaylist",
				time: a
			})
		}, k.response = function(a) {
			this.playlistError || (this.playlistOK = !0, this.reportPlayListUep(), (b.v = a) && a.data && a.data[0] && !0 !== a.data[0].rtmp && !0 !== a.data[0].drm ? this.init(a) : this.error(1, a, a.data, a.data[0]))
		}, k.request = function() {
			this._url = this.getPlayListUrl(), this._password && (this._url += "password=" + escape(this._password), this._url += "&"), this._password && b.initConfig.client_id && b.config.partner_config && 1 == b.config.partner_config.status && 1 == b.config.partner_config.passless && (this._url += "client_id=" + b.initConfig.client_id, this._url += "&"), this._url += "__callback=BuildVideoInfo.response", this._plreqStartTime = (new Date).getTime(), w(this._url);
			var a = this;
			setTimeout(function() {
				a.playlistOK || (a.playlistError = !0, b.playerEvents && b.playerEvents.onPlayError && b.playerEvents.onPlayError("视频信息出错，请刷新重试"), b.get("#x-player").innerHTML = "视频信息出错，请刷新重试", b.get("#x-player").style.color = "white", b.get("#x-player").style.textAlign = "center", b.get("#x-player").style.lineHeight = b.get("#x-player").offsetHeight + "px")
			}, 15e3)
		}, k.m3u8src = function(a) {
			return b.password = this._password, b.m3u8src_v2(this._vid, a)
		}, k.total = function(a) {
			for (var b in a.segs) {
				for (var c = 0, d = 0, e = 0; e < a.segs[b].length; e++) var f = a.segs[b][e],
					c = c + parseInt(f.seconds),
					d = d + parseInt(f.size);
				return {
					totalTime: c,
					totalBytes: d
				}
			}
		}, k.cleanSrc = function() {
			for (var a = this._videoInfo._videoSegsDic[m], b = 0; b < a.length; b++) a[b].fyksrc = a[b].src, a[b].src = k.mp4srcs[b]
		}, k.processError = function(a) {
			return debug.log("playlist errorcode = " + a.error_code), -12 == a.error_code || -13 == a.error_code ? (a.segs = {
				"3gphd": [{
					no: "0",
					size: "0",
					seconds: "0",
					k: "",
					k2: ""
				}]
			}, a.streamfileids = {
				"3gphd": "0*0"
			}, !1) : (null == this._callback ? "m3u8" == this._type ? e.GetM3U8OK(this._v, {}) : e.GetMP4OK(this._v, {}) : this._callback(this._v, {}), !0)
		}, k.init = function(a) {
			this._v = a;
			var a = a.data[0],
				c = E(F(b.mk.a3 + "o0b" + e.userCache.a1, [19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26]).toString(), na(a.ep));
			if (e.userCache.sid = c.split("_")[0], e.userCache.token = c.split("_")[1], null == a.error_code || !this.processError(a)) if (c = k.total(a), this._videoInfo = new T(a, this._type), this._videoInfo.totalTime = c ? c.totalTime : a.seconds, "m3u8" == this._type) b.defaultVideoType = "mp4", null != l.getItem("defaultVideoType") && (b.defaultVideoType = l.getItem("defaultVideoType")), -1 == a.streamtypes.indexOf(b.defaultVideoType) && (b.defaultVideoType = "mp4", -1 == a.streamtypes.indexOf("mp4") && (b.defaultVideoType = "flv")), debug.log("default = " + b.defaultVideoType), this._videoInfo.src = k.m3u8src(b.defaultVideoType), this.cache(), null == this._callback ? e.GetM3U8OK(this._v, this._videoInfo) : this._callback(this._v, this._videoInfo);
			else if ("mp4" == this._type) {
				c = ["3gphd", "mp4", "flv"], m = null;
				for (var d = 0; d < c.length; d++) if (this._videoInfo._videoSegsDic[c[d]] && !("3gphd" == c[d] && 7200 < parseInt(a.seconds))) {
					m = c[d];
					break
				}
				debug.log("mp4 type=" + m), m ? ("flv" == m && (e.Log(e.uniplayerUrl + p({
					error: "flvonly",
					vid: b.initConfig.vid
				})), b.config.playType = "directsrc"), this.fetchDirectSrc(this._videoInfo._videoSegsDic[m]), this._tid = setInterval("checkSrc()", 500)) : this.error(2)
			}
		}, k.getFileUrl = function(a) {
			var b = [];
			if (a) for (var c = 0; c < a.length; c++) b.push(a[c].src);
			return b
		}, k.fetchDirectSrc = function(a) {
			if (this._fyks = urls = this.getFileUrl(a), this._v && this._v.data[0].trial) {
				for (var a = 0, b = this._v.data[0].segs, a = 0; a < b.mp4.length && -1 !== b.mp4[a].k; a++);
				urls.length = a
			}
			for (a = 0; a < urls.length; a++) k.mp4srcs.push(urls[a])
		}, DirectSrcOK = function(a) {
			null == a || "object" != typeof a || 0 == a.length || k.mp4srcs.push(a[0].server)
		};
		var T = function(a, b) {
				this._sid = e.userCache.sid, this._seed = a.seed, this._fileType = b;
				var c = new U(this._seed);
				this._streamFileIds = a.streamfileids, this._videoSegsDic = {};
				for (b in a.segs) {
					for (var d = [], f = 0, g = 0; g < a.segs[b].length; g++) {
						var h = a.segs[b][g],
							i = {};
						i.no = h.no, i.size = h.size, i.seconds = h.seconds, h.k && (i.key = h.k), i.fileId = this.getFileId(a.streamfileids, b, parseInt(g), c), i.type = b, i.src = this.getVideoSrc(h.no, a, b, i.fileId), d[f++] = i
					}
					this._videoSegsDic[b] = d
				}
			},
			U = function(a) {
				this._randomSeed = a, this.cg_hun()
			};
		U.prototype = {
			cg_hun: function() {
				this._cgStr = "";
				for (var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/\\:._-1234567890", b = a.length, c = 0; b > c; c++) {
					var d = parseInt(this.ran() * a.length);
					this._cgStr += a.charAt(d), a = a.split(a.charAt(d)).join("")
				}
			},
			cg_fun: function(a) {
				for (var a = a.split("*"), b = "", c = 0; c < a.length - 1; c++) b += this._cgStr.charAt(a[c]);
				return b
			},
			ran: function() {
				return this._randomSeed = (211 * this._randomSeed + 30031) % 65536, this._randomSeed / 65536
			}
		}, T.prototype = {
			getFileId: function(a, b, c, d) {
				for (var e in a) if (e == b) {
					streamFid = a[e];
					break
				}
				return "" == streamFid ? "" : (b = d.cg_fun(streamFid), a = b.slice(0, 8), c = c.toString(16), 1 == c.length && (c = "0" + c), c = c.toUpperCase(), b = b.slice(10, b.length), a + c + b)
			},
			getVideoSrc: function(a, c, d, f, g, h) {
				if (!c.videoid || !d) return "";
				var i = {
					flv: 0,
					flvhd: 0,
					mp4: 1,
					hd2: 2,
					"3gphd": 1,
					"3gp": 0
				}[d],
					j = {
						flv: "flv",
						mp4: "mp4",
						hd2: "flv",
						"3gphd": "mp4",
						"3gp": "flv"
					}[d],
					k = a.toString(16);
				1 == k.length && (k = "0" + k);
				var l = c.segs[d][a].seconds,
					a = c.segs[d][a].k;
				return ("" == a || -1 == a) && (a = c.key2 + c.key1), d = "", c.show && (d = c.show.show_paid ? "&ypremium=1" : "&ymovie=1"), c = "/player/getFlvPath/sid/" + e.userCache.sid + "_" + k + "/st/" + j + "/fileid/" + f + "?K=" + a + "&hd=" + i + "&myp=0&ts=" + l + "&ypp=0" + d, f = encodeURIComponent(D(E(F(b.mk.a4 + "poz" + e.userCache.a2, [19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26]).toString(), e.userCache.sid + "_" + f + "_" + e.userCache.token))), c = c + ("&ep=" + f) + "&ctype=12&ev=1&token=" + e.userCache.token, c += "&oip=" + b.v.data[0].ip, "http://k.youku.com" + (c + ((g ? "/password/" + g : "") + (h ? h : "")))
			}
		};
		var R = function(a) {
				this._player = document.getElementById("youku-html5player-video"), null == this._player && (this._player = document.getElementById("youku-html5player-video-0")), this._oplayer = a
			};
		R.prototype = {
			resize: function(a, b) {
				this._oplayer.resize(a, b)
			},
			currentTime: function() {
				return this._player.currentTime
			},
			totalTime: function() {
				return this._player.duration
			},
			playVideo: function() {
				this._oplayer.play()
			},
			pauseVideo: function() {
				this._player.pause()
			},
			seekTo: function(a) {
				try {
					this._player.currentTime = a
				} catch (b) {}
			},
			playVideoById: function(a, c) {
				debug.log("YKH5Player playVideoByid");
				var d = this._oplayer;
				b.config.autoplay = !0, b.config.vid = a, k.start(a, c, b.config.content, function(a, b) {
					d.startPlay(a, b)
				})
			},
			hideControls: function() {
				this._player.removeAttribute("controls")
			},
			showControls: function() {
				this._player.setAttribute("controls", !0)
			},
			switchFullScreen: function() {
				this._oplayer.controls.fullscreenPanel.switchFullScreen({})
			}
		}, function() {
			this.FX = function(b, c, d, e, f, g) {
				this.el = a.get(b), this.attributes = c, this.duration = d || .7, this.transition = e && e in FX.transitions ? e : "easeInOut", this.callback = f ||
				function() {}, this.ctx = g || window, this.units = {}, this.frame = {}, this.endAttr = {}, this.startAttr = {}
			}, this.FX.transitions = {
				linear: function(a, b, c, d) {
					return c * a / d + b
				},
				easeIn: function(a, b, c, d) {
					return -c * Math.cos(a / d * (Math.PI / 2)) + c + b
				},
				easeOut: function(a, b, c, d) {
					return c * Math.sin(a / d * (Math.PI / 2)) + b
				},
				easeInOut: function(a, b, c, d) {
					return -c / 2 * (Math.cos(Math.PI * a / d) - 1) + b
				}
			}, this.FX.prototype = {
				start: function() {
					var a = this;
					this.getAttributes(), this.duration *= 1e3, this.time = (new Date).getTime(), this.animating = !0, this.timer = setInterval(function() {
						var b = (new Date).getTime();
						b < a.time + a.duration ? (a.elapsed = b - a.time, a.setCurrentFrame()) : (a.frame = a.endAttr, a.complete()), a.setAttributes()
					}, 10)
				},
				ease: function(a, b) {
					return FX.transitions[this.transition](this.elapsed, a, b - a, this.duration)
				},
				complete: function() {
					clearInterval(this.timer), this.timer = null, this.animating = !1, this.callback.call(this.ctx)
				},
				setCurrentFrame: function() {
					for (attr in this.startAttr) if (this.startAttr[attr] instanceof Array) {
						this.frame[attr] = [];
						for (var a = 0; a < this.startAttr[attr].length; a++) this.frame[attr][a] = this.ease(this.startAttr[attr][a], this.endAttr[attr][a])
					} else this.frame[attr] = this.ease(this.startAttr[attr], this.endAttr[attr])
				},
				getAttributes: function() {
					for (var b in this.attributes) switch (b) {
					case "color":
					case "borderColor":
					case "border-color":
					case "backgroundColor":
					case "background-color":
						this.startAttr[b] = c(this.attributes[b].from || a.getStyle(this.el, b)), this.endAttr[b] = c(this.attributes[b].to);
						break;
					case "scrollTop":
					case "scrollLeft":
						var d = this.el == document.body ? document.documentElement || document.body : this.el;
						this.startAttr[b] = this.attributes[b].from || d[b], this.endAttr[b] = this.attributes[b].to;
						break;
					default:
						var e = this.attributes[b].to,
							f = this.attributes[b].units || "px";
						this.attributes[b].from ? d = this.attributes[b].from : (d = parseFloat(a.getStyle(this.el, b)) || 0, "px" != f && document.defaultView && (a.setStyle(this.el, b, (e || 1) + f), d *= (e || 1) / parseFloat(a.getStyle(this.el, b)), a.setStyle(this.el, b, d + f))), this.units[b] = f, this.endAttr[b] = e, this.startAttr[b] = d
					}
				},
				setAttributes: function() {
					for (var b in this.frame) switch (b) {
					case "opacity":
						a.setStyle(this.el, b, this.frame[b]);
						break;
					case "scrollLeft":
					case "scrollTop":
						(this.el == document.body ? document.documentElement || document.body : this.el)[b] = this.frame[b];
						break;
					case "color":
					case "borderColor":
					case "border-color":
					case "backgroundColor":
					case "background-color":
						a.setStyle(this.el, b, "rgb(" + Math.floor(this.frame[b][0]) + "," + Math.floor(this.frame[b][1]) + "," + Math.floor(this.frame[b][2]) + ")");
						break;
					default:
						a.setStyle(this.el, b, this.frame[b] + this.units[b])
					}
				}
			};
			var a = {
				get: function(a) {
					return "string" == typeof a ? document.getElementById(a) : a
				},
				getStyle: function(a, c) {
					var c = b(c),
						d = document.defaultView;
					return d && d.getComputedStyle ? d.getComputedStyle(a, "")[c] || null : "opacity" == c ? (d = a.filters("alpha").opacity, isNaN(d) ? 1 : d ? d / 100 : 0) : a.currentStyle[c] || null
				},
				setStyle: function(a, c, d) {
					"opacity" == c ? (a.style.filter = "alpha(opacity=" + 100 * d + ")", a.style.opacity = d) : (c = b(c), a.style[c] = d)
				}
			},
				b = function() {
					var a = {};
					return function(b) {
						if (a[b]) return a[b];
						var c = b.split("-"),
							d = c[0];
						if (1 < c.length) for (var e = 1, f = c.length; f > e; e++) d += c[e].charAt(0).toUpperCase() + c[e].substring(1);
						return a[b] = d
					}
				}(),
				c = function() {
					var a = /^#?(\w{2})(\w{2})(\w{2})$/,
						b = /^#?(\w{1})(\w{1})(\w{1})$/,
						c = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
					return function(d) {
						var e = d.match(a);
						return e && 4 == e.length ? [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)] : (e = d.match(c)) && 4 == e.length ? [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3], 10)] : (e = d.match(b)) && 4 == e.length ? [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)] : void 0
					}
				}()
		}(), FX.transitions.quadIn = function(a, b, c, d) {
			return c * (a /= d) * a + b
		}, FX.transitions.quadOut = function(a, b, c, d) {
			return -c * (a /= d) * (a - 2) + b
		}, FX.transitions.quadInOut = function(a, b, c, d) {
			return 1 > (a /= d / 2) ? c / 2 * a * a + b : -c / 2 * (--a * (a - 2) - 1) + b
		}, FX.transitions.cubicIn = function(a, b, c, d) {
			return c * (a /= d) * a * a + b
		}, FX.transitions.cubicOut = function(a, b, c, d) {
			return c * ((a = a / d - 1) * a * a + 1) + b
		}, FX.transitions.cubicInOut = function(a, b, c, d) {
			return 1 > (a /= d / 2) ? c / 2 * a * a * a + b : c / 2 * ((a -= 2) * a * a + 2) + b
		}, FX.transitions.quartIn = function(a, b, c, d) {
			return c * (a /= d) * a * a * a + b
		}, FX.transitions.quartOut = function(a, b, c, d) {
			return -c * ((a = a / d - 1) * a * a * a - 1) + b
		}, FX.transitions.quartInOut = function(a, b, c, d) {
			return 1 > (a /= d / 2) ? c / 2 * a * a * a * a + b : -c / 2 * ((a -= 2) * a * a * a - 2) + b
		}, FX.transitions.quintIn = function(a, b, c, d) {
			return c * (a /= d) * a * a * a * a + b
		}, FX.transitions.quintOut = function(a, b, c, d) {
			return c * ((a = a / d - 1) * a * a * a * a + 1) + b
		}, FX.transitions.quintInOut = function(a, b, c, d) {
			return 1 > (a /= d / 2) ? c / 2 * a * a * a * a * a + b : c / 2 * ((a -= 2) * a * a * a * a + 2) + b
		}, FX.transitions.expoIn = function(a, b, c, d) {
			return 0 == a ? b : c * Math.pow(2, 10 * (a / d - 1)) + b - .001 * c
		}, FX.transitions.expoOut = function(a, b, c, d) {
			return a == d ? b + c : 1.001 * c * (-Math.pow(2, -10 * a / d) + 1) + b
		}, FX.transitions.expoInOut = function(a, b, c, d) {
			return 0 == a ? b : a == d ? b + c : 1 > (a /= d / 2) ? c / 2 * Math.pow(2, 10 * (a - 1)) + b - 5e-4 * c : 1.0005 * (c / 2) * (-Math.pow(2, -10 * --a) + 2) + b
		}, FX.transitions.circIn = function(a, b, c, d) {
			return -c * (Math.sqrt(1 - (a /= d) * a) - 1) + b
		}, FX.transitions.circOut = function(a, b, c, d) {
			return c * Math.sqrt(1 - (a = a / d - 1) * a) + b
		}, FX.transitions.circInOut = function(a, b, c, d) {
			return 1 > (a /= d / 2) ? -c / 2 * (Math.sqrt(1 - a * a) - 1) + b : c / 2 * (Math.sqrt(1 - (a -= 2) * a) + 1) + b
		}, FX.transitions.backIn = function(a, b, c, d, e) {
			return e = e || 1.70158, c * (a /= d) * a * ((e + 1) * a - e) + b
		}, FX.transitions.backOut = function(a, b, c, d, e) {
			return e = e || 1.70158, c * ((a = a / d - 1) * a * ((e + 1) * a + e) + 1) + b
		}, FX.transitions.backBoth = function(a, b, c, d, e) {
			return e = e || 1.70158, 1 > (a /= d / 2) ? c / 2 * a * a * (((e *= 1.525) + 1) * a - e) + b : c / 2 * ((a -= 2) * a * (((e *= 1.525) + 1) * a + e) + 2) + b
		}, FX.transitions.elasticIn = function(a, b, c, d, e, f) {
			return 0 == a ? b : 1 == (a /= d) ? b + c : (f || (f = .3 * d), !e || e < Math.abs(c) ? (e = c, c = f / 4) : c = f / (2 * Math.PI) * Math.asin(c / e), -(e * Math.pow(2, 10 * (a -= 1)) * Math.sin(2 * (a * d - c) * Math.PI / f)) + b)
		}, FX.transitions.elasticOut = function(a, b, c, d, e, f) {
			if (0 == a) return b;
			if (1 == (a /= d)) return b + c;
			if (f || (f = .3 * d), !e || e < Math.abs(c)) var e = c,
				g = f / 4;
			else g = f / (2 * Math.PI) * Math.asin(c / e);
			return e * Math.pow(2, -10 * a) * Math.sin(2 * (a * d - g) * Math.PI / f) + c + b
		}, FX.transitions.elasticBoth = function(a, b, c, d, e, f) {
			if (0 == a) return b;
			if (2 == (a /= d / 2)) return b + c;
			if (f || (f = .3 * d * 1.5), !e || e < Math.abs(c)) var e = c,
				g = f / 4;
			else g = f / (2 * Math.PI) * Math.asin(c / e);
			return 1 > a ? -.5 * e * Math.pow(2, 10 * (a -= 1)) * Math.sin(2 * (a * d - g) * Math.PI / f) + b : .5 * e * Math.pow(2, -10 * (a -= 1)) * Math.sin(2 * (a * d - g) * Math.PI / f) + c + b
		}, FX.transitions.backIn = function(a, b, c, d, e) {
			return "undefined" == typeof e && (e = 1.70158), c * (a /= d) * a * ((e + 1) * a - e) + b
		}, FX.transitions.backOut = function(a, b, c, d, e) {
			return "undefined" == typeof e && (e = 1.70158), c * ((a = a / d - 1) * a * ((e + 1) * a + e) + 1) + b
		}, FX.transitions.backBoth = function(a, b, c, d, e) {
			return "undefined" == typeof e && (e = 1.70158), 1 > (a /= d / 2) ? c / 2 * a * a * (((e *= 1.525) + 1) * a - e) + b : c / 2 * ((a -= 2) * a * (((e *= 1.525) + 1) * a + e) + 2) + b
		}, FX.transitions.bounceIn = function(a, b, c, d) {
			return c - FX.transitions.bounceOut(d - a, 0, c, d) + b
		}, FX.transitions.bounceOut = function(a, b, c, d) {
			return (a /= d) < 1 / 2.75 ? 7.5625 * c * a * a + b : 2 / 2.75 > a ? c * (7.5625 * (a -= 1.5 / 2.75) * a + .75) + b : 2.5 / 2.75 > a ? c * (7.5625 * (a -= 2.25 / 2.75) * a + .9375) + b : c * (7.5625 * (a -= 2.625 / 2.75) * a + .984375) + b
		}, FX.transitions.bounceBoth = function(a, b, c, d) {
			return d / 2 > a ? .5 * FX.transitions.bounceIn(2 * a, 0, c, d) + b : .5 * FX.transitions.bounceOut(2 * a - d, 0, c, d) + .5 * c + b
		}, $$$ = function(a) {
			return document.getElementById(a)
		};
		var pa = function(a) {
				return a = parseInt(a), Math.min(Math.max(a, 0), b.videoInfo.totalTime)
			},
			p = function(a) {
				var b, c = [];
				for (b in a) c.push(b + ":" + a[b]);
				return "{" + c.join(",") + "}"
			},
			n = function(a) {
				var b, c = [];
				for (b in a) c.push(b + "=" + a[b]);
				return c.join("&")
			},
			D = function(a) {
				if (!a) return "";
				var b, c, d, e, f, g, a = a.toString();
				for (d = a.length, c = 0, b = ""; d > c;) {
					if (e = 255 & a.charCodeAt(c++), c == d) {
						b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >> 2), b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((3 & e) << 4), b += "==";
						break
					}
					if (f = a.charCodeAt(c++), c == d) {
						b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >> 2), b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((3 & e) << 4 | (240 & f) >> 4), b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((15 & f) << 2), b += "=";
						break
					}
					g = a.charCodeAt(c++), b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >> 2), b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((3 & e) << 4 | (240 & f) >> 4), b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((15 & f) << 2 | (192 & g) >> 6), b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(63 & g)
				}
				return b
			},
			u = {
				"-1": "该视频正在转码中... , 请稍候",
				"-2": "该视频正在审核中... , 请稍候",
				"-3": "该视频已被屏蔽",
				"-4": "该视频转码失败",
				"-9": "无效视频",
				"-5": "该视频被设为私密",
				"-6": "该视频已经加密",
				"-7": "对不起，您输入的密码错误，请重新输入",
				"-8": "Sorry,this video can only be streamed within Mainland China.",
				"-15": "很抱歉! 该视频的格式暂时不支持在ipad平台上播放",
				"-25": "您的账号观看过于频繁，超过IP上限,如账号被盗，请及时联系客服",
				"-26": "您所在的国家/地区无法观看此视频！"
			},
			J = function(a, c) {
				this.player = a, this._handle = {}, this._feedback = b.get(".x-feedback"), this._message = this._feedback.getElementsByClassName("x-message")[0], this._messagetxt = this._message.getElementsByClassName("x-message-txt")[0], this._messagebtn = this._message.getElementsByClassName("x-message-btn")[0], this._errorcode = this._error = null, this.init(c), this.bindEvent()
			};
		J.prototype = {
			init: function(a) {
				if (a && a.data && a.data[0] && (a.data[0].error_code || a.data[0].error)) {
					switch (b.hide(b.get(".x-video-button")), b.hide(b.get(".x-console")), this._vid = a.data[0].videoid, this._title = a.data[0].title, this._userid = a.data[0].userid, this._error = a.data[0].error, this._errorcode = parseInt(a.data[0].error_code), this._errorcode) {
					case -1:
						this.setMessage(u[-1]);
						break;
					case -2:
						this.setMessage(u[-2]);
						break;
					case -3:
						this.setMessage(u[-3]), this.setButton("搜索", this.search);
						break;
					case -4:
						this.setMessage(u[-4]), this.bind_feedback = b.bindAsEventListener(this, this.feedback), this.setButton("在线反馈", this.bind_feedback);
						break;
					case -9:
						this.setMessage(u[-9]);
						break;
					case -5:
						this.setMessage(u[-5]), this.bind_contact = b.bindAsEventListener(this, this.contactOwner), this.setButton("联系上传者", this.bind_contact);
						break;
					case -6:
						this._messagetxt.innerHTML = "<input type=password placeholder=输入密码观看视频 class=x-message-input>", this.bind_inputpassword = b.bindAsEventListener(this, this.inputPassword), this.setButton("确定", this.bind_inputpassword);
						break;
					case -7:
						this._messagetxt.innerHTML = '<input type=password placeholder="对不起,您输入的密码错误,请重新输入" class=x-message-input>', this.bind_inputpassword = b.bindAsEventListener(this, this.inputPassword), this.setButton("确定", this.bind_inputpassword);
						break;
					case -8:
						this.setMessage(u[-8]);
						break;
					case -15:
						this.setMessage(u[-15]);
						break;
					case -25:
						this.setMessage(u[-25]);
						break;
					case -26:
						this.setMessage(u[-26]);
						break;
					default:
						this.setMessage(a.data[0].error)
					}
					this.show(), this.showMessage()
				}
			},
			bindEvent: function() {},
			show: function() {
				b.show(this._feedback)
			},
			hide: function() {
				b.hide(this._feedback)
			},
			showMessage: function() {
				b.show(this._message)
			},
			hideMessage: function() {
				b.hide(this._message)
			},
			setMessage: function(a) {
				this._messagetxt.innerHTML = "<p>" + a + "</p>"
			},
			setButton: function(a, c) {
				this._messagebtn.innerHTML = "<button type=button class=x-btn>" + a + "</button>";
				var d = this._message.getElementsByClassName("x-btn")[0];
				b.addEventHandler(d, "click", c)
			},
			search: function() {
				window.location.href = "http://www.soku.com/search_video/q_" + this._title
			},
			feedback: function() {
				window.location.href = "http://www.youku.com/service/feed/subtype/4/"
			},
			contactOwner: function() {
				window.location.href = "http://i.youku.com/u/id_" + this._userid
			},
			onPasswordConfirm: function() {},
			inputPassword: function() {
				var a = this._messagetxt.getElementsByClassName("x-message-input")[0],
					c = a.value;
				if (null == c || 0 == c.replace(/\s/g, "").length) a.value = "", a.placeholder = "密码为空，请重新输入";
				else {
					var d = this.player;
					b.password = c, k.start(this._vid, c, b.config.content, function(a, e) {
						b.hide(b.get(".x-feedback")), b.password = c, b.show(b.get(".x-video-button")), b.hide(b.get(".x-message")), d.startPlay(a, e)
					})
				}
			}
		};
		var V = function(a) {
				this._handler = {}, this.player = a, this._fullflag = null, this.init(), this._fullscreen = b.get(".x-fullscreen"), this._btn = this._fullscreen.getElementsByTagName("button")[0], this._btnb = this._btn.getElementsByTagName("b")[0], this.bindEvent()
			};
		V.prototype = {
			addEventListener: function(a, b) {
				this._handler[a] = b
			},
			removeEventListener: function(a) {
				this._handler[a] = null
			},
			dispatch: function(a) {
				a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
			},
			init: function() {},
			bindEvent: function() {
				this.bind_switch = b.bindAsEventListener(this, this.switchFullScreen), b.addEventHandler(this._fullscreen, "click", this.bind_switch, !0)
			},
			removeEvent: function() {
				b.removeEventHandler(this._fullscreen, "click", this.bind_switch, !0)
			},
			zoomStatus: function() {
				return this._btnb.className
			},
			fullFlag: function() {
				if (null !== this._fullflag) return this._fullflag;
				var a = this.player.video.webkitDisplayingFullscreen;
				return this._fullflag = "undefined" != typeof a ? a : !1
			},
			switchFullScreen: function(a) {
				var c = a.method || "c",
					d = this._btnb.className;
				b.config.events && b.config.events.onSwitchFullScreen ? (-1 === d.indexOf("in") ? (this._fullflag = !1, this._btnb.className = d.replace(/out/g, "in"), this.player.controls.hideShowListBtn(), this.player._reporter.sendUserActionReport("xexfs", c), this.player.adjustVideoRatio(1), this.dispatch({
					type: "exitfullscreen"
				})) : (this._fullflag = !0, this._btnb.className = d.replace(/in/g, "out"), this.player.controls.showShowListBtn(), this.player._reporter.sendUserActionReport("xenfs", c), this.player.adjustVideoRatio(), this.dispatch({
					type: "enterfullscreen"
				})), (c = b.config.events.onSwitchFullScreen)(a, d)) : (a = document.getElementById("x-player"), -1 === d.indexOf("in") ? (this.player._reporter.sendUserActionReport("xexfs", c), document.webkitCancelFullScreen && (this._btnb.className = d.replace(/out/g, "in"), this._fullflag = !1, document.webkitCancelFullScreen())) : (this.player._reporter.sendUserActionReport("xenfs", c), a.webkitRequestFullScreen ? (this._btnb.className = d.replace(/in/g, "out"), this._fullflag = !0, a.webkitRequestFullScreen()) : this.player.video.webkitSupportsFullscreen && 1 <= this.player.video.readyState && this.player.video.webkitEnterFullscreen()))
			}
		};
		var W = function(a, c) {
				this.handler = {}, this.player = a, this.information = b.get(".x-video-info"), this.title = this.information.getElementsByClassName("x-title")[0], this.videoState = this.information.getElementsByClassName("x-video-state")[0], b.hide(this.videoState), this.init(c)
			};
		W.prototype = {
			init: function(a) {
				!a.data[0].trial && !a.data[0].error_code && !a.data[0].error && (this.title.innerHTML = a.data[0].title.substr(0, 20), this.videoState.innerHTML = "<span>时长: " + b.getTime(parseInt(a.data[0].seconds)) + "</span>", this.show())
			},
			show: function() {
				b.v.data[0].trial || b.show(this.information)
			},
			hide: function() {
				b.hide(this.information)
			},
			bindEvent: function() {}
		};
		var X = function(a) {
				this.player = a, this._tip = b.get(".x-prompt"), this.init()
			};
		X.prototype = {
			init: function() {
				this._tip.innerHTML = '<div class=x-prompt-mode><div class=x-prompt-time></div><div class=x-prompt-forward>快进</div><div class=x-prompt-back>快退</div><div class=x-mask></div></div><div class=x-prompt-status style="display:none"><div class=x-prompt-txt></div><div class=x-mask></div></div>', this._mode = this._tip.getElementsByClassName("x-prompt-mode")[0], this._time = this._tip.getElementsByClassName("x-prompt-time")[0], this._back = this._tip.getElementsByClassName("x-prompt-back")[0], this._forward = this._tip.getElementsByClassName("x-prompt-forward")[0], this._status = this._tip.getElementsByClassName("x-prompt-status")[0], this._statusTxt = this._tip.getElementsByClassName("x-prompt-txt")[0]
			},
			setProgress_: function(a) {
				1 != this._progressFlag && (this._time.innerHTML = b.getTime(parseInt(a)))
			},
			setStatus: function(a) {
				this._statusTxt.innerHTML = a, this.showStatus()
			},
			hideStatus: function() {
				b.hide(this._status), b.hide(this._tip)
			},
			showStatus: function() {
				b.hide(this._mode), b.show(this._status), b.show(this._tip)
			},
			setTip: function(a, c) {
				this._progressFlag = !0, this._time.innerHTML = b.getTime(pa(a + c)), 0 >= c ? (b.show(this._back), b.hide(this._forward)) : (b.show(this._forward), b.hide(this._back));
				var d = this;
				setTimeout(function() {
					d._progressFlag = !1
				}, 1e3)
			},
			isVisible: function() {
				return "none" != this._tip.style.display
			},
			hide: function() {
				b.hide(this._tip)
			},
			show: function() {
				b.show(this._mode), b.hide(this._status), b.show(this._tip)
			},
			autoHide: function(a) {
				var b = this;
				setTimeout(function() {
					b.hide()
				}, a || 1e3)
			}
		};
		var Y = function(a, c) {
				this._handler = {}, c && c.data && c.data[0] && c.data[0].dvd && c.data[0].dvd.audiolang ? (this.player = a, this._language = b.get(".x-localization"), this.init(c), this.bindEvent(), this._button = this._language.getElementsByTagName("button")[0], this._panel = this._language.getElementsByTagName("div")[0], this._nodes = this._language.getElementsByTagName("li")) : b.get(".x-localization").style.display = "none"
			};
		Y.prototype = {
			addEventListener: function(a, b) {
				this._handler[a] = b
			},
			removeEventListener: function(a) {
				this._handler[a] = null
			},
			dispatch: function(a) {
				a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
			},
			init: function(a) {
				for (var a = a.data[0], b = a.dvd.audiolang, c = ["<button class=x-control-btn>", "", "</button>"], d = ["<div class=x-panel><ul>", "", "</ul><div class=x-mask></div>", "</div>"], e = [], f = 0; f < b.length; f++) {
					var g = "",
						g = g + ("<li data-vid=" + b[f].vid),
						g = g + (" data-language=" + b[f].lang);
					b[f].vid == a.vidEncoded ? (c[1] = b[f].lang, g += " class=selected>") : g += ">", g += b[f].lang + "</li>", e[b[f].langid] = g
				}
				d[1] = e.join(""), this._language.innerHTML = c.join("") + d.join("")
			},
			bindEvent: function() {
				var a = this._language.getElementsByTagName("li");
				if (0 != a.length) {
					this.bind_toggle = b.bindAsEventListener(this, this.toggleLanguagePanel), b.addEventHandler(this._language, "click", this.bind_toggle);
					for (var c = 0; c < a.length; c++) b.addEventHandler(a[c], "click", b.bindAsEventListener(this, this.switchLanguage))
				}
			},
			removeEvent: function() {
				null != this._language && b.removeEventHandler(this._language, "click", this.bind_toggle)
			},
			hide: function(a) {
				if (this._language) {
					var b = this._panel;
					this._language.className = this._language.className.replace(/[\s]*pressed/g, ""), b.style.display = "none", a || this.dispatch({
						type: "settinghide"
					})
				}
			},
			toggleLanguagePanel: function(a) {
				var b = this._panel; - 1 === this._language.className.indexOf("pressed") ? (this._language.className += " pressed", b.style.display = "block", this.dispatch({
					type: "settingshow"
				}), this.player._reporter.sendUserActionReport("xcl", "c")) : (this.hide(), this.player._reporter.sendUserActionReport("xhl", "c")), this.dispatch(a)
			},
			switchLanguage: function(a) {
				this.player._reporter.sendUserActionReport("xsl", "c"), a.stopPropagation();
				var a = a.target,
					c = null,
					d = null;
				for (a.getAttribute ? (c = a.getAttribute("data-vid"), d = a.getAttribute("data-language")) : (c = a.parentNode.getAttribute("data-vid"), d = a.parentNode.getAttribute("data-language")), b.defaultLanguage = d, a = this._nodes, d = 0; d < a.length; d++) if (a[d].getAttribute("data-vid") == c) {
					if (-1 !== a[d].className.indexOf("selected")) return void this.toggleLanguagePanel();
					a[d].innerHTML = a[d].getAttribute("data-language"), a[d].className += " selected", this._button.innerHTML = a[d].getAttribute("data-language")
				} else a[d].innerHTML = a[d].getAttribute("data-language"), a[d].className = a[d].className.replace(/[\s]*selected/g, "");
				this.toggleLanguagePanel(), this.dispatch({
					type: "settingdone"
				});
				var e = this.player,
					f = this.player.currentTime;
				if ("mp4" == b.config.content) f = this.player.currentTime, k.start(c, "", b.config.content, function(a, d) {
					if (console.log("switchLanguage vid = " + c), a.data && a.data[0]) {
						null == a.data[0].dvd && (a.data[0].dvd = b.v.data[0].dvd, console.log("switchLanuage keep dvd info audiolang")), b.config.nextAutoPlay = 1, null != d._videoSegsDic && null != d._videoSegsDic[m] && (e.video.src = d._videoSegsDic[m][0].src, e.video.load(), e.video.play());
						var g = 0;
						e.video.addEventListener("canplay", function() {
							1 !== g && (g = 1, e.seek(f))
						})
					}
				});
				else {
					this.player.video.src = b.m3u8src_v2(c, b.defaultVideoType), this.player.video.autoplay = !0, b.unitedTag = null;
					var g = this,
						h = 0;
					this.player.video.addEventListener("canplay", function() {
						1 !== h && (h = 1, g.player.seek(f))
					}), this.player.video.load(), this.player.video.play()
				}
			}
		};
		var l = {
			setItem: function(a, b) {
				try {
					window.localStorage.setItem(a, b)
				} catch (c) {}
			},
			appendItem: function(a, b) {
				"phase" == a && !this.phaseTag && (this.phaseTag = !0, l.removeItem("phase"));
				try {
					var c = l.getItem(a);
					null !== c && (b = c + "-" + b), window.localStorage.setItem(a, b)
				} catch (d) {}
			},
			getItem: function(a) {
				try {
					return window.localStorage.getItem(a)
				} catch (b) {
					return null
				}
			},
			removeItem: function(a) {
				try {
					window.localStorage.removeItem(a)
				} catch (b) {}
			}
		},
			Z = function(a) {
				this.player = a, this._progress = b.get(".x-progress-mini"), this._track = this._progress.getElementsByClassName("x-progress-track-mini")[0], this._play = this._progress.getElementsByClassName("x-progress-play-mini")[0], this._load = this._progress.getElementsByClassName("x-progress-load-mini")[0], this._handler = {}, this.bindEvent(), this.resetProgress(), this.hide()
			};
		Z.prototype = {
			addEventListener: function(a, b) {
				this._handler[a] = b
			},
			removeEventListener: function(a) {
				this._handler[a] = null
			},
			bindEvent: function() {},
			removeEvent: function() {},
			dispatch: function(a) {
				a && this._handler[a.type] && this._handler[a.type]()
			},
			setProgress: function(a, c) {
				var d = Math.min(a, b.videoInfo.totalTime);
				this.playTime = d;
				var e = d / b.videoInfo.totalTime;
				this._play.style.width = 100 * e + "%", !0 !== c && (this.loadTime = d += Math.max(this.player.bufferedEnd() - a, 0), e = d / b.videoInfo.totalTime + .05, this._load.style.width = 100 * Math.min(Math.max(e, 0), 1) + "%")
			},
			resetProgress: function() {
				this._play.style.width = "0%", this._load.style.width = "0%"
			},
			show: function() {
				this._progress.style.display = "block"
			},
			hide: function() {
				this._progress.style.display = "none"
			}
		};
		var $ = function(a, c) {
				this._handler = {}, this._hasPayInfo = !1, this._payInfo = b.get(".x-pay"), this._text = b.get(".x-pay-txt"), this._title = this._text.getElementsByTagName("h1")[0], this._vip = this._text.getElementsByTagName("em")[0], this._tip = b.get(".x-pay-tips"), this._button = b.get(".x-pay-btn"), this._tryBtn = b.get("#x-try"), this._payBtn = b.get("#x-pay"), this.player = a, this.init(c)
			};
		$.prototype = {
			addEventListener: function(a, b) {
				this._handler[a] = b
			},
			removeEventListener: function(a) {
				this._handler[a] = null
			},
			dispatch: function(a) {
				a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
			},
			bindEvent: function() {
				this.bind_try = b.bindAsEventListener(this, this.play), this.bind_pay = b.bindAsEventListener(this, this.pay), b.addEventHandler(this._tryBtn, "click", this.bind_try), b.addEventHandler(this._payBtn, "click", this.bind_pay)
			},
			removeEvent: function() {
				b.removeEventHandler(this._tryBtn, "click", this.bind_try), b.removeEventHandler(this._payBtn, "click", this.bind_pay)
			},
			init: function(a) {
				if (null == a.data[0].trial) debug.log("not pay");
				else {
					this._hasPayInfo = !0, this._showid = a.data[0].show.showid, this._type = a.data[0].show.paid_type;
					var b = a.data[0].title;
					12 < b.length && (b = b.substr(0, 12) + "..."), this._tryDuration = parseInt(a.data[0].trial.time), this.player.tryDuration = this._tryDuration, debug.log("try = " + this._tryDuration), "vod" == this._type ? (this._title.innerHTML = b + "<em class=x-vip>付费影片</em>", this._payBtn.innerHTML = "立即购买") : (this._title.innerHTML = b + "<em class=x-vip>付费包月影片</em>", this._payBtn.innerHTML = "开通影视会员"), this.bindEvent(), this.show(), this.player._reporter.sendPayReport()
				}
			},
			play: function() {
				0 === this.activeTime ? this.player.seek(0) : this.player.video.play(), this.player._reporter.sendUserActionReport("xtry", "c")
			},
			pay: function() {
				this.player.video.pause(), -1 !== this._payBtn.innerHTML.indexOf("会员") ? window.open("http://cps.youku.com/redirect.html?id=000002b0", "", "", !1) : window.open("http://cps.youku.com/redirect.html?id=000002b1&url=" + escape("http://pay.youku.com/buy/redirect.html?pstype=1&psid=" + this._showid), "", "", !1), this.player._reporter.sendUserActionReport("xbuy", "c")
			},
			hide: function() {
				this._payInfo && (this._payInfo.style.display = "none")
			},
			show: function() {
				0 != this._hasPayInfo && (this._payInfo.style.display = "block", 0 >= this._tryDuration && b.hide(this._tryBtn))
			},
			isBlock: function() {
				return "block" == this._payInfo.style.display
			},
			showTip: function() {
				this._hasPayInfo && (this._tip.innerHTML = "免费试看已经结束，付费即可观看", this.show())
			},
			clearTip: function() {
				this._tip.innerHTML = ""
			},
			hasPayInfo: function() {
				return this._hasPayInfo
			},
			tryDuration: function() {
				return this._tryDuration
			}
		};
		var aa = function(a, b) {
				this._handler = {}, this.player = a, this._videoInfo = b, this._app_disable = !1, this._limitTime = 1200, 1 == this._videoInfo.controller.app_disable && (this._app_disable = !0), this._isLimit = !1, 1 == this._videoInfo.controller.xplayer_disable && (this._isLimit = !0, this.player.tryDuration = this._limitTime), this._isCreated = !1, debug.log("videoInfo.controller.xplayer_disable:", this._isLimit), debug.log("videoInfo.controller.app_disable:", this._app_disable)
			};
		aa.prototype = {
			addEventListener: function(a, b) {
				this._handler[a] = b
			},
			removeEventListener: function(a) {
				this._handler[a] = null
			},
			dispatch: function(a) {
				a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
			},
			create: function() {
				if (!this._isCreated) {
					debug.log("playLimit create"), this.player.video.pause(), this._isCreated = !0;
					var a = b.get("#x-player"),
						c = this._videoInfo.controller.mobile_disabled,
						d = this._videoInfo.controller.pad_disabled,
						f = this._videoInfo.controller.pc_disabled,
						c = 0 == this._app_disable && (1 == c || 1 == d) && 0 == f;
					1 == this._app_disable || c ? (a.innerHTML = "<div class=x-app-guide><div class=x-app-guide-tips><p>本页面提供20分钟预览，</p><p>请使用电脑观看完整版！</p></div></div>", this._content = b.get(".x-app-guide"), e.Log("http://hz.youku.com/red/click.php?tp=1&cp=4009227&cpp=1000752&url=")) : (a.innerHTML = '<div class=x-app-guide><div class=x-app-guide-tips><p>本页面提供20分钟预览</p></div><div class=x-app-guide-action><button type=button class="x-btn x-btn-major">&nbsp;&nbsp;&nbsp;点这里观看完整版&nbsp;&nbsp;&nbsp;</button></div><div class=x-app-openapp></div></div>', this._content = b.get(".x-app-guide"), this._fullBtn = this._content.getElementsByClassName("x-btn")[0], this._openApp = this._content.getElementsByClassName("x-app-openapp")[0], this.bind_onFullClick = b.bindAsEventListener(this, this.onFullClick), b.addEventHandler(this._fullBtn, "click", this.bind_onFullClick), e.Log("http://hz.youku.com/red/click.php?tp=1&cp=4009212&cpp=1000752&url=")), this._content.style.marginLeft = parseInt(-this._content.offsetWidth / 2) + "px", this._content.style.marginTop = parseInt(-this._content.offsetHeight / 2) + "px"
				}
			},
			onFullClick: function() {
				debug.log("onFullClick"), this._content.getElementsByClassName("x-app-guide-action")[0].innerHTML = '<button type=button class="x-btn x-btn-major">&nbsp;下载安装&nbsp;</button><button type=button class="x-btn">&nbsp;我知道了&nbsp;</button>', this._downloadBtn = this._content.getElementsByClassName("x-btn")[0], this._knowBtn = this._content.getElementsByClassName("x-btn")[1], this.bind_onDownload = b.bindAsEventListener(this, this.onDownloadClick), this.bind_onKnow = b.bindAsEventListener(this, this.onKnowClick), b.addEventHandler(this._downloadBtn, "click", this.bind_onDownload), b.addEventHandler(this._knowBtn, "click", this.bind_onKnow), e.Log("http://hz.youku.com/red/click.php?tp=1&cp=4009213&cpp=1000752&url="), this._content.getElementsByClassName("x-app-guide-tips")[0].innerHTML = "<p>看完整版需安装最新优酷app</p>", this._content.style.marginLeft = parseInt(-this._content.offsetWidth / 2) + "px", this._content.style.marginTop = parseInt(-this._content.offsetHeight / 2) + "px", this.openApp()
			},
			onDownloadClick: function() {
				e.Log("http://hz.youku.com/red/click.php?tp=1&cp=4009215&cpp=1000752&url="), window.open("http://hz.youku.com/red/click.php?tp=1&cp=4008066&cpp=1000687&url=http://m.youku.com/webapp/dl?app=youku&source=webqr", "_blank")
			},
			onKnowClick: function() {
				e.Log("http://hz.youku.com/red/click.php?tp=1&cp=4009216&cpp=1000752&url="), setTimeout(function() {
					window.location.reload()
				}, 500)
			},
			openApp: function() {
				var a = document.createElement("iframe");
				a.height = 0, a.width = 0, a.frameBorder = "no", a.src = "youku://play?vid=" + b.initConfig.vid, e.isIPAD && (a.src = "youkuhd://play?vid=" + b.initConfig.vid), document.getElementsByTagName("body")[0].appendChild(a)
			},
			isLimit: function() {
				return this._isLimit
			},
			limitTime: function() {
				return this._limitTime
			}
		};
		var A = {
			2: "2倍",
			1.5: "1.5倍",
			1: "常速",
			.8: "0.8倍"
		},
			ba = function(a, c) {
				this._handler = {}, e.isIPAD7 && (this.player = a, this.playRate = b.get(".x-playspeed"), this.init(c), this.bindEvent(), this.button = this.playRate.getElementsByTagName("button")[0], this.panel = this.playRate.getElementsByTagName("div")[0], this.nodes = this.playRate.getElementsByTagName("li"), b.show(this.playRate))
			};
		ba.prototype = {
			addEventListener: function(a, b) {
				this._handler[a] = b
			},
			removeEventListener: function(a) {
				this._handler[a] = null
			},
			dispatch: function(a) {
				a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
			},
			init: function() {
				for (var a = ["<button class=x-control-btn>", "", "</button>"], b = ['<div class=x-panel style="display:none"><ul>', "", "</ul><div class=x-mask></div>", "</div>"], c = "", d = [], e = ["2", "1.5", "1", "0.8"], f = 0; f < e.length; f++) {
					var g = e[f],
						h = "",
						i = "";
					"1" == g && (h = "", a[1] = A[g], i = " class=selected"), c += "<li data-vtype=" + g + i + ">" + h + A[g] + "</li>", d.push(A[g])
				}
				b[1] = c, this.playRate.innerHTML = a.join("") + b.join("")
			},
			bindEvent: function() {
				var a = this.playRate.getElementsByTagName("li");
				if (0 != a.length) {
					this.bind_toggle = b.bindAsEventListener(this, this.toggleRatePanel), b.addEventHandler(this.playRate, "click", this.bind_toggle);
					for (var c = 0; c < a.length; c++) b.addEventHandler(a[c], "click", b.bindAsEventListener(this, this.switchRate))
				}
			},
			removeEvent: function() {
				null != this.playRate && b.removeEventHandler(this.playRate, "click", this.bind_toggle)
			},
			hide: function(a) {
				if (this.playRate) {
					var b = this.panel;
					this.playRate.className = this.playRate.className.replace(/[\s]*pressed/g, ""), b.style.display = "none", a || this.dispatch({
						type: "settinghide"
					})
				}
			},
			toggleRatePanel: function(a) {
				var b = this.panel; - 1 === this.playRate.className.indexOf("pressed") ? (this.playRate.className += " pressed", b.style.display = "block", this.player._reporter.sendUserActionReport("xcra", "c"), this.dispatch({
					type: "settingshow"
				})) : (this.hide(), this.player._reporter.sendUserActionReport("xhra", "c")), this.dispatch(a)
			},
			switchRate: function(a) {
				a.stopPropagation();
				var b = a.target,
					a = null,
					a = b.getAttribute ? b.getAttribute("data-vtype") : b.parentNode.getAttribute("data-vtype");
				this.player._reporter.sendUserActionReport("xsra", "c", {
					rate: a
				});
				for (var b = this.button, c = this.nodes, d = 0; d < c.length; d++) if (c[d].getAttribute("data-vtype") == a) {
					if (-1 !== c[d].className.indexOf("selected")) return void this.toggleRatePanel();
					c[d].innerHTML = A[a], c[d].className += " selected", b.innerHTML = A[a]
				} else {
					var e = c[d].getAttribute("data-vtype");
					c[d].innerHTML = A[e], c[d].className = c[d].className.replace(/selected/, "")
				}
				this.toggleRatePanel(), this.dispatch({
					type: "settingdone"
				}), this.player.video.pause(), this.player.video.playbackRate = parseFloat(a), this.player.video.play()
			}
		};
		var ca = function(a) {
				this.player = a, this._progress = b.get(".x-progress"), this._track = this._progress.getElementsByClassName("x-progress-track")[0], this._play = this._progress.getElementsByClassName("x-progress-play")[0], this._load = this._progress.getElementsByClassName("x-progress-load")[0], this._seek = this._progress.getElementsByClassName("x-progress-seek")[0], this._seekHandle = this._seek.getElementsByClassName("x-seek-handle")[0], this._handler = {}, this.bindEvent()
			};
		ca.prototype = {
			addEventListener: function(a, b) {
				this._handler[a] = b
			},
			removeEventListener: function(a) {
				this._handler[a] = null
			},
			bindEvent: function() {
				this.bind_seek = b.bindAsEventListener(this, this.seek), this.bind_touchstart = b.bindAsEventListener(this, this.onTouchStart), b.addEventHandler(this._track, "click", this.bind_seek, !0), b.addEventHandler(this._seek, "touchstart", this.bind_touchstart)
			},
			removeEvent: function() {
				b.removeEventHandler(this._track, "click", this.bind_seek, !0), b.removeEventHandler(this._seek, "touchstart", this.bind_touchstart)
			},
			removeClickEvent: function() {
				b.removeEventHandler(this._track, "click", this.bind_seek, !0)
			},
			addClickEvent: function() {
				b.addEventHandler(this._track, "click", this.bind_seek, !0)
			},
			dispatch: function(a) {
				a && this._handler[a.type] && this._handler[a.type](a)
			},
			setProgress: function(a, c) {
				var d = Math.min(Math.max(a, 0), b.videoInfo.totalTime);
				this.playTime = d;
				var e = d / b.videoInfo.totalTime,
					f = this._track.offsetWidth,
					g = this._seek.offsetWidth;
				this._play.style.width = Math.min(100 * (e + g / f / 2), 100) + "%", this._seek.style.left = e * f > f - g ? f - g + "px" : 100 * Math.min(Math.max(e, 0), 1) + "%", this.uCurrentTime.innerHTML = b.getTime(d), !0 !== c && (this.loadTime = d += Math.max(this.player.bufferedEnd() - a, 0), e = d / b.videoInfo.totalTime, this._load.style.width = 100 * Math.min(Math.max(e + .05, 0), 1) + "%")
			},
			resetProgress: function() {
				this._seek.style.left = this._seek.style.width, this._load.style.width = "0", this._play.style.width = "0"
			},
			getRate: function(a, c) {
				var d = 1,
					e = b.get(".x-fs-console");
				return e && (d = parseFloat(b.getCurrentStyle(e).zoom)), a / (c * d)
			},
			seek: function(a) {
				var c = (new Date).getTime() - da;
				if (a.srcElement == this._seek || ea > c) return debug.log(c + "," + ea), !1;
				this.player._reporter.sendUserActionReport("xcs", "c"), c = a.offsetX || a.changedTouches[0].clientX - this._track.clientX, debug.log("x = " + c);
				var c = this.getRate(c, this._track.offsetWidth),
					d = c * b.videoInfo.totalTime;
				debug.log("progress bar time = " + d + "rate = " + c + "total = " + b.videoInfo.totalTime), this.setProgress(d, !0), this.dispatch({
					type: "progressend"
				}), this.player.seek(d), this.dispatch(a)
			},
			handleX: function() {
				return 0
			},
			onTouchStart: function(a) {
				if (1 != a.targetTouches.length || this.isTouching) return !1;
				if (this.startX = a.targetTouches[0].clientX, a.preventDefault(), this.isTouching = !0, this.startTime = this._currentTime = this.player.currentTime || 0, "m3u8" == b.config.content && (this._prepaused = this.player.video.paused, this.player.video.pause(), this.startTime = this.player.currentTime), "mp4" == b.config.content) for (this.player.video.pause(), this.startTime = this.player.video.currentTime, a = 0; r > a; a++) this.startTime += parseInt(b.videoInfo._videoSegsDic[m][a].seconds);
				this.bind_onTouchMove = b.bindAsEventListener(this, this.onTouchMove), this.bind_onTouchEnd = b.bindAsEventListener(this, this.onTouchEnd), b.addEventHandler(this._seek, "touchmove", this.bind_onTouchMove), b.addEventHandler(this._seek, "touchend", this.bind_onTouchEnd)
			},
			onTouchMove: function(a) {
				return 1 != a.targetTouches.length ? !1 : (a.preventDefault(), a.stopPropagation(), a = this.startTime + this.getRate(a.targetTouches[0].clientX - this.startX, this._track.offsetWidth) * b.videoInfo.totalTime, this.dispatch({
					type: "progressing",
					st: this._currentTime,
					dt: a - this._currentTime
				}), this._currentTime = a, this.setProgress(Math.min(Math.max(this._currentTime, 0), b.videoInfo.totalTime), !0), !1)
			},
			onTouchEnd: function(a) {
				if (this.dispatch({
					type: "progressend"
				}), this.isTouching = !1, 1 < a.changedTouches.length) return !1;
				var c = {
					tb: parseInt(100 * this.startTime) / 100,
					to: parseInt(100 * this._currentTime) / 100
				};
				debug.log("tb=" + c.tb), this.player._reporter.sendUserActionReport("xds", "d", c), a.preventDefault(), a.stopPropagation(), b.removeEventHandler(this._seek, "touchmove", this.bind_onTouchMove), b.removeEventHandler(this._seek, "touchend", this.bind_onTouchEnd), a = Math.min(Math.max(this._currentTime, 0), b.videoInfo.totalTime - 5), this.player.controls.onPlay();
				var d = this.player;
				return this.player.seek(a, function() {
					d.video.play()
				}), !1
			}
		};
		var fa = function(a, c) {
				this._handler = {}, "m3u8" != b.config.content ? b.get(".x-quality").style.display = "none" : c && c.data && c.data[0] && c.data[0].streamtypes && 1 < c.data[0].streamtypes.length ? (this.player = a, this._quality = b.get(".x-quality"), this.init(c), this.bindEvent(), this._button = this._quality.getElementsByTagName("button")[0], this._panel = this._quality.getElementsByTagName("div")[0], this._nodes = this._quality.getElementsByTagName("li")) : b.get(".x-quality").style.display = "none"
			};
		fa.prototype = {
			addEventListener: function(a, b) {
				this._handler[a] = b
			},
			removeEventListener: function(a) {
				this._handler[a] = null
			},
			dispatch: function(a) {
				a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
			},
			init: function(a) {
				var c, a = a.data[0],
					d = ["<button class=x-control-btn title=画质设置>", "", "</button>"],
					e = ['<div class=x-panel style="display:none"><ul>', "", "</ul><div class=x-mask></div>", "</div>"],
					f = "",
					g = [];
				for (c in s) if (-1 !== a.streamtypes.indexOf(c) && -1 === g.indexOf(s[c])) {
					var h = "",
						i = "";
					c == b.defaultVideoType && (h = "", d[1] = s[c], i = " class=selected"), f += "<li data-vtype=" + c + i + ">" + h + s[c] + "</li>", g.push(s[c])
				}
				"" == d[1] && (d[1] = g[0]), e[1] = f, this._quality.innerHTML = d.join("") + e.join("")
			},
			bindEvent: function() {
				var a = this._quality.getElementsByTagName("li");
				if (0 != a.length) {
					this.bind_toggle = b.bindAsEventListener(this, this.toggleQualityPanel), b.addEventHandler(this._quality, "click", this.bind_toggle);
					for (var c = 0; c < a.length; c++) b.addEventHandler(a[c], "click", b.bindAsEventListener(this, this.switchQuality))
				}
			},
			removeEvent: function() {
				null != this._quality && b.removeEventHandler(this._quality, "click", this.bind_toggle)
			},
			hide: function(a) {
				if (this._quality) {
					var b = this._panel;
					this._quality.className = this._quality.className.replace(/[\s]*pressed/g, ""), b.style.display = "none", a || this.dispatch({
						type: "settinghide"
					})
				}
			},
			toggleQualityPanel: function(a) {
				var b = this._panel; - 1 === this._quality.className.indexOf("pressed") ? (this._quality.className += " pressed", b.style.display = "block", this.player._reporter.sendUserActionReport("xcq", "c"), this.dispatch({
					type: "settingshow"
				})) : (this.hide(), this.player._reporter.sendUserActionReport("xhq", "c")), this.dispatch(a)
			},
			switchQuality: function(a) {
				this.player._reporter.sendUserActionReport("xsq", "c"), a.stopPropagation();
				for (var c = a.target, a = null, a = c.getAttribute ? c.getAttribute("data-vtype") : c.parentNode.getAttribute("data-vtype"), c = this._button, d = this._nodes, e = 0; e < d.length; e++) if (d[e].getAttribute("data-vtype") == a) {
					if (-1 !== d[e].className.indexOf("selected")) return void this.toggleQualityPanel();
					d[e].innerHTML = s[a], d[e].className += " selected", c.innerHTML = s[a], l.setItem("defaultVideoType", a), b.defaultVideoType = a
				} else {
					var f = d[e].getAttribute("data-vtype");
					d[e].innerHTML = s[f], d[e].className = d[e].className.replace(/selected/, "")
				}
				debug.log("q1"), this.toggleQualityPanel(), this.dispatch({
					type: "settingdone"
				});
				var g = this.player.currentTime,
					h = b.m3u8src_v2(b.v.data[0].videoid, a);
				b.unitedTag = null, this.player.video.src = h;
				var i = this,
					j = 0;
				this.player.video.addEventListener("canplay", function() {
					1 === j ? debug.log("XXXXXXXXXXXXXXXXXXXXX") : (j = 1, debug.log("q2 nsrc=" + h), i.player.seek(g), debug.log("q3"))
				}), this.player.video.load(), this.player.video.play()
			},
			switchQuality_: function(a) {
				a.stopPropagation();
				for (var a = a.target.dataset.vtype, b = this._button, c = this._nodes, d = 0; d < c.length; d++) if (c[d].dataset.vtype == a) {
					if (-1 !== c[d].className.indexOf("selected")) return void this.toggleQualityPanel();
					c[d].innerHTML = s[a], c[d].className += " selected", b.innerHTML = s[a]
				} else c[d].innerHTML = s[c[d].dataset.vtype], c[d].className = c[d].className.replace(/selected/, "");
				debug.log("q1"), this.toggleQualityPanel();
				var e = this.player.video.currentTime,
					f = this.player.video.src.replace(/type\/(flv|flvhd|mp4|hd2)/, "type/" + a);
				this.player.video.src = f;
				var g = this,
					h = 0;
				this.player.video.addEventListener("canplay", function() {
					1 === h ? debug.log("XXXXXXXXXXXXXXXXXXXXX") : (h = 1, debug.log("q2 nsrc=" + f), g.player.seek(e), debug.log("q3"))
				})
			}
		};
		var ga = function(a, c) {
				this._handler = {}, this.player = a, this._panel = document.createElement("div"), this._panel.className = "x-recommend", this.init(c), this.request(c), window.relatedpanel = this, b.get("#x-player").appendChild(this._panel), this._panel.style.display = "box";
				var d = {
					e: "xendcard"
				};
				d.device = e.isAndroid ? "adr" : e.isIPAD ? "ipad" : "oth", e.Log(e.uniplayerUrl + p(d))
			};
		ga.prototype = {
			bindDynamicEvent: function() {
				var a = this._listinner.getElementsByClassName("x-item");
				this.bind_itemclick = b.bindAsEventListener(this, this.onItemClick);
				for (var c = 0; c < a.length; c++) b.addEventHandler(a[c], "click", this.bind_itemclick, !0)
			},
			onItemClick: function(a) {
				a = a.currentTarget.getAttribute("data-i"), "x" == a ? this.replay() : (debug.log("related onitemclick" + a + " " + this._info.data[a].videoid), this.player._reporter.sendRecommendLog(this._info.data[a]))
			},
			init: function() {
				this._panel.innerHTML = "<div class=x-pages></div>", this._listinner = this._panel.getElementsByClassName("x-pages")[0]
			},
			request: function(a) {
				var c;
				c = {
					VideoID: a.data[0].vidEncoded,
					md: 2
				}, a.data[0].show && (c.ShowID = a.data[0].show.showid), a = a.controller.playmode, c.page = "1", c.page = {
					normal: 1,
					show: 3,
					folder: 4
				}[a], "interior" == b.config.winType ? c.apptype = 12 : (c.apptype = 12, c.page = 1);
				for (var d in b.initConfig.playlistconfig) c[d] = b.initConfig.playlistconfig[d];
				c.__callback = "relatedpanel.parseResponse", c = "http://v.youku.com/player/getRelatedPlayList?" + n(c), w(c)
			},
			parseResponse: function(a) {
				this._info = a, this.buildPanel(this._info)
			},
			buildPanel: function(a) {
				var a = a.data,
					c = a.length;
				debug.log("realted len = " + c);
				var d = [];
				d.push('<ul class="x-item" data-i="x"><li class="x-item-img"><img src="http://player.youku.com/h5player/img/replay.png"></li></ul>');
				for (var e = Math.floor((this._panel.offsetWidth - 60 + 16) / 166) * Math.floor((this._panel.offsetHeight - 120 + 12) / 97), e = (e > c ? c : e) - 1, e = 0 > e ? 0 : e, c = 0; e > c; c++) {
					var f = a[c].logo,
						g = a[c].title.substr(0, 20),
						h = a[c].link;
					"myoukucom" == b.initConfig.client_id && (h = "http://m.youku.com/smartphone/detail?vid=" + a[c].videoid), d.push('<ul class="x-item" data-i=' + c + '><li class="x-item-img"><img src=' + f + '></li><li class="x-item-info"><div class="x-item-title">' + g + '</div><div class="x-item-bg"></div></li><li class="x-item-url"><a href=' + h + ' target="_blank"></a></li><li class="x-item-loading"><div class="x-play-loading"></div></li></ul>')
				}
				this._listinner.innerHTML = d.join(""), this.bindDynamicEvent(), this.buildImgEvent()
			},
			buildImgEvent: function() {
				for (var a = this._listinner.getElementsByClassName("x-item-img"), c = 0; c < a.length; c++) b.addEventHandler(a[c], "error", b.bindAsEventListener(this, this.onLoadImgError)), b.addEventHandler(a[c], "abort", b.bindAsEventListener(this, this.onLoadImgError))
			},
			onLoadImgError: function(a) {
				debug.log("img error"), a = a.target, b.addClass(a.parentNode.parentNode, "x-no-pic"), a.src = "http://player.youku.com/h5player/img/no_pic.png"
			},
			replay: function(a) {
				this.player.controls.rePlay(a)
			},
			onResize: function() {
				var a = this;
				setTimeout(function() {
					a.buildPanel(a._info)
				}, 500)
			}
		};
		var ha = function(a, c) {
				this._handler = {}, this.player = a, this._showbtn = b.get(".x-playshow"), this._showlist = b.get(".x-showlist"), this.init(c), this._inner = this._showlist.getElementsByClassName("x-showlist-inner"), this._bullet = this._showlist.getElementsByClassName("x-showlist-bullet"), this.bindEvent()
			};
		ha.prototype = {
			init: function(a) {
				this._showlist.innerHTML = '<div class=x-showlist-inner><div class=x-showlist-hd></div><div class=x-showlist-bd></div><div class=x-showlist-ft style="display:none"></div><div class=x-mask></div></div>', this._slhd = this._showlist.getElementsByClassName("x-showlist-hd")[0], this._slbd = this._showlist.getElementsByClassName("x-showlist-bd")[0], this._slft = this._showlist.getElementsByClassName("x-showlist-ft")[0], this._slhd.innerHTML = "<label>选集</label><div class=x-showlist-close></div>", this._closeHandle = this._slhd.getElementsByClassName("x-showlist-close")[0];
				var c = a.data[0].list;
				if (null != c && 0 != c.length) {
					for (var d = ["<ul class=x-showlist-bullet>", "", "</ul>"], e = [], f = 0; f < c.length; f++) {
						var g = c[f],
							h = "http://v.youku.com/v_show/id_" + g.vidEncoded + ".html";
						b.v.folder && (h = h + "?f=" + b.v.folder.folderId);
						var i = "";
						g.vidEncoded == b.v.data[0].vidEncoded && (i = " class=selected"), g = "<li" + i + "><a href=" + h + ">" + g.title.substr(0, 20) + "</a></li>", e.push(g)
					}
					for (d[1] = e.join(""), this._slbd.innerHTML = d.join(""), d = "<div class=x-showlist-pages>;<span class=x-showlist-pre></span>;<ul>;;</ul>;<span class=x-showlist-next></span>".split(";"), e = [], i = a.data[0].list_pre ? parseInt(a.data[0].list_pre.seq / 60) : 0, f = 0; f < (c.length - 1) / 60 + 1; f++) a = "", f == i && (a = " class=current"), g = "<li" + a + "><em>" + (f + 1) + "</em></li>", e.push(g);
					d[3] = e.join(""), this._slft.innerHTML = d.join("")
				}
			},
			addEventListener: function(a, b) {
				this._handler[a] = b
			},
			removeEventListener: function(a) {
				this._handler[a] = null
			},
			dispatch: function(a) {
				a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
			},
			bindEvent: function() {
				this.bind_close = b.bindAsEventListener(this, this.hide), b.addEventHandler(this._closeHandle, "click", this.bind_close), this.bind_toggle = b.bindAsEventListener(this, this.toggle), b.addEventHandler(this._showbtn, "click", this.bind_toggle)
			},
			removeEvent: function() {
				b.removeEventHandler(this._closeHandle, "click", this.bind_close)
			},
			hide: function() {
				this._showbtn.className = this._showbtn.className.replace(/[\s]*pressed/g, ""), b.hide(this._showlist)
			},
			show: function() {
				this._showbtn.className += " pressed", b.show(this._showlist)
			},
			showListBtn: function() {
				var a = b.v.data[0].list;
				null == a || 1 >= a.length || b.show(this._showbtn)
			},
			hideListBtn: function() {
				var a = b.v.data[0].list;
				null == a || 0 == a.length || (b.hide(this._showbtn), this.hide())
			},
			toggle: function(a) {
				"block" != this._showlist.style.display ? (this.show(), this.player._reporter.sendUserActionReport("xshl", "c"), e.Log(e.uniplayerUrl + p({
					e: "xshl",
					adr: e.isAndroid,
					ios: e.isIPAD
				}))) : this.hide(), this.dispatch(a)
			},
			touchStart: function(a) {
				this._sx = a.targetTouches[0].clientX, this._sy = a.targetTouches[0].clientY, this._ex = this._sx, this._ey = this._ey
			},
			touchEnd: function() {},
			touchMove: function(a) {
				this._ex = a.targetTouches[0].clientX, this._ey = a.targetTouches[0].clientY, this._dx = this._ex - this._sx, this._dy = this._ey - this._sy, Math.abs(this._dx) > Math.abs(this._dy) || a.preventDefault()
			}
		};
		var ia = function(a) {
				this.player = a, this._handle = {}, this._tips = b.get(".x-tips"), b.hide(this._tips), this._tips.innerHTML = "<div class=x-tips-txt></div><div class=x-tips-close><a href=#><em>关闭</em></a></div><div class=x-tips-mask></div>", this._ptip = this._tips.getElementsByClassName("x-tips-txt")[0], this._ctip = this._tips.getElementsByClassName("x-tips-close")[0], null == l.getItem("youku_conf_skip") && l.setItem("youku_conf_skip", !0), this.bindEvent()
			};
		ia.prototype = {
			bindEvent: function() {
				b.addEventHandler(this._ctip, "click", b.bindAsEventListener(this, this.closeTip))
			},
			closeTip: function() {
				b.hide(this._tips), this.keepLastTime()
			},
			autoHide: function(a) {
				var b = this;
				setTimeout(function() {
					b.closeTip()
				}, a)
			},
			keepLastTime: function() {},
			ignoreLastTime: function() {},
			isShowTimeTip: function() {
				var a = l.getItem("youku_keep_lasttime"),
					a = parseInt(a),
					b = l.getItem("youku_ignore_lasttime"),
					b = parseInt(b);
				return a >= 3 || b >= 3 ? !1 : !0
			},
			showLastTimeTip: function(a) {
				a = b.getTime(a), debug.log("last = " + a), 0 != this.isShowTimeTip() && (this._ptip.innerHTML = "优酷记忆您上次播放到<span class=x-tips-time>" + a + "</span>, <a class=x-tip-timebegin href=#>从头观看</a>", this._playBegin = this._ptip.getElementsByClassName("x-tip-timebegin")[0], b.addEventHandler(this._playBegin, "click", b.bindAsEventListener(this, this.seekBegin)), b.show(this._tips), this.autoHide(5e3))
			},
			onSkipTail: function() {
				"true" == l.getItem("youku_conf_skip") ? (this._ptip.innerHTML = "即将为您跳过片尾, <a class=x-tip-skipnoway href=#>不再跳过</a>", this._skipnowtail = this._ptip.getElementsByClassName("x-tip-skipnoway")[0], b.addEventHandler(this._skipnowtail, "click", b.bindAsEventListener(this, this.skipNoway))) : (this._ptip.innerHTML = "是否跳过片头片尾? <a class=x-tip-skipalways href=#>始终跳过</a>", this._skipalwtail = this._ptip.getElementsByClassName("x-tip-skipalways")[0], b.addEventHandler(this._skipalwtail, "click", b.bindAsEventListener(this, this.skipAlways))), b.show(this._tips), this.autoHide(1e4)
			},
			onSkipHead: function() {
				"true" == l.getItem("youku_conf_skip") ? (this._ptip.innerHTML = "已经为您跳过片头, <a class=x-tip-skipnoway href=#>不再跳过</a>", this._skipnow = this._ptip.getElementsByClassName("x-tip-skipnoway")[0], b.addEventHandler(this._skipnow, "click", b.bindAsEventListener(this, this.skipNoway))) : (this._ptip.innerHTML = "是否跳过片头片尾? <a class=x-tip-skipalways href=#>始终跳过</a>", this._skipalw = this._ptip.getElementsByClassName("x-tip-skipalways")[0], b.addEventHandler(this._skipalw, "click", b.bindAsEventListener(this, this.skipImediately))), b.show(this._tips), this.autoHide(5e3)
			},
			onUglyAdPlay: function() {
				this._ptip.innerHTML = "尊敬的会员，因版权原因，请点击右上角 关闭广告 ", b.show(this._tips);
				var a = this;
				setTimeout(function() {
					b.hide(a._tips)
				}, 15e3)
			},
			closeUglyHint: function() {
				b.hide(this._tips)
			},
			skipImediately: function() {
				debug.log("skip imediately"), this.player._reporter.sendUserActionReport("xskh", "c"), l.setItem("youku_conf_skip", !0);
				var a = parseInt((b.v.data[0].dvd || "").head) / 1e3;
				return this.onSkipHead(), this.player.seek(a), !1
			},
			skipNoway: function() {
				return this.player._reporter.sendUserActionReport("xnsk", "c"), l.setItem("youku_conf_skip", !1), this._ptip.innerHTML = "设置成功", !1
			},
			skipAlways: function() {
				return this.player._reporter.sendUserActionReport("xask", "c"), l.setItem("youku_conf_skip", !0), this._ptip.innerHTML = "设置成功", !1
			},
			seekBegin: function() {
				return this.player._reporter.sendUserActionReport("xseb", "c"), b.hide(this._tips), this.ignoreLastTime(), this.player.seek(0), !1
			}
		};
		var K = function(a, b, c) {
				if (this.player = a, this.v = b, this.sid = c, this.isSendedConsumeReport = !1, 0 < C.length) for (a = 0; a < C.length; a++) this.sendUepReport(C[a].type, C[a].time);
				if (this.dimension = {
					w: document.getElementById("x-player").offsetWidth,
					h: document.getElementById("x-player").offsetHeight
				}, this.screenDim = {
					w: screen.availWidth,
					h: screen.availHeight
				}, "onorientationchange" in window) {
					var d = this;
					window.addEventListener("orientationchange", function() {
						d.sendUserActionReport("xro", "r");
						var a = {
							e: "xro"
						};
						a.device = e.isAndroid ? "adr" : e.isIPAD ? "ipad" : "oth", e.Log(e.uniplayerUrl + p(a))
					})
				}
			};
		K.prototype = {
			sendRecommendLog: function(a) {
				var c = b.v.data[0];
				c.sid = b.videoInfo._sid, a = {
					vid: c.videoid,
					uid: b.v.user.id,
					sct: c.categories,
					apt: 12,
					pg: a.pg,
					md: 2,
					pos: a.cpos,
					dvid: a.dvid,
					dsid: a.dsid,
					dct: a.dct,
					abver: a.abver,
					dma: a.dma,
					ord: a.ord,
					rtlid: a.rtlid,
					alginfo: a.alginfo,
					sid: 0
				}, c.show && (a.sid = c.show.showid), a.xts = parseInt(1e4 * Math.random()), e.Log("http://e.stat.youku.com/recommond/log?" + n(a))
			},
			tsInit: function() {
				this.tsSn = null
			},
			sendTSLog: function(a) {
				null == this.tsSn && (this.tsSn = 0);
				var c = 5,
					c = 24 < this.tsSn ? 20 : 12 < this.tsSn ? 10 : 5,
					d = this;
				if (this.tstimer = setTimeout(function() {
					d.sendTSLog(60)
				}, 1e3 * c), 61 == a) clearTimeout(this.tstimer), this.tstimer = null;
				else if (d.player.video.paused) return;
				if (0 == this.tsSn) this.tsSn++;
				else {
					var f = b.v.data[0];
					f.sid = b.videoInfo._sid, b.initConfig.tslogconfig = b.initConfig.tslogconfig || {};
					var g = {};
					g.vvid = f.sid, g.vid = f.videoid, g.cf = this.getHDFlag(), g.cpt = this.player.currentTime ? Math.floor(this.player.currentTime) : 0, g.full = this.player.controls.fullscreenPanel.fullFlag() ? 1 : 0, g.lang = this.getLanguage(), g.pc = 60 == a ? 0 : 1, g.clb = 0, g.iku = "m", g.pt = this.getPlayTime(), g.sn = this.tsSn++, g.hi = c, g.uid = b.v.user.id, g.r = this.signTS(g.vvid + g.vid + g.cpt + g.pt + g.sn), e.Log("http://p-log.ykimg.com/tslog?" + n(g))
				}
			},
			signTS: function(a) {
				if (null == a) return 0;
				var b = 0,
					c = a.length;
				for (j = 0; c > j; j++) b = 43 * b + a.charCodeAt(j), b %= 1e10;
				return b
			},
			getPlayTime: function() {
				var a = 0;
				return a = 24 < this.tsSn ? 180 + 20 * (this.tsSn - 24) : 12 < this.tsSn ? 60 + 10 * (this.tsSn - 12) : 5 * this.tsSn
			},
			tslogparse: function() {},
			sendTSErrorLog: function() {},
			sendVVLog: function(a) {
				var c = b.v.data[0];
				c.sid = b.videoInfo._sid, b.initConfig.vvlogconfig = b.initConfig.vvlogconfig || {};
				var d = {
					pvid: ""
				};
				d.chid = c.ct, d.url = escape(window.location.href), d.rurl = "", d.vvid = c.sid, d.vid = c.videoid, d.schid = c.cs, d.plid = "", d.plchid = "", d.shid = null != c.show && c.show.showid ? c.show.showid : "", d.shchid = c.ct, d.ptype = b.WIN_TYPE, d.cp = null != c.show && c.show.copyright ? c.show.copyright : "", d.vl = parseInt(c.seconds), d.cf = this.getHDFlag(), d.hf = this.getMaxFileType(), d.spt = 0, d.pb = 62 == a ? 2 : 0, d.vdoid = c.userid, d.out = "interior" == b.initConfig.wintype ? 0 : 1, d.r = this.signTS(d.vvid + d.vid), d.ext = this.getExtString(a);
				for (var f in b.initConfig.vvlogconfig) d[f] = b.initConfig.vvlogconfig[f];
				e.Log("http://v.l.youku.com/ykvvlog?" + n(d))
			},
			getLanguage: function() {
				return null == this.langMap && (this.langMap = {
					"国语": 1,
					"粤语": 2,
					"英语": 6,
					"日语": 7,
					"川话": 3
				}), this.langMap[b.defaultLanguage || "国语"]
			},
			getExtString: function(a) {
				var c = {
					iku: "m"
				};
				return c.full = this.player.controls.fullscreenPanel.fullFlag(), c.lang = this.getLanguage(), c.num = a, c.ctp = 0, c.pc = 60 == a ? 0 : 1, c.clb = 0, c.ctype = "12", c.ev = "1", c.tk = e.userCache.token, c.oip = b.v.data[0].ip, escape(n(c))
			},
			getPlayByType_: function(a) {
				var c = 0;
				return 62 == a && (c = 2), b.initConfig.vvlogconfig.pb && (c = b.initConfig.vvlogconfig.pb), c
			},
			getMaxFileType: function() {
				return b.v.data[0].segs.hd2 ? 2 : b.v.data[0].segs.mp4 ? 1 : 0
			},
			getHDFlag: function() {
				var a = null,
					c = this.player.video.src; - 1 != c.indexOf("m3u8") ? (a = {
					flv: 0,
					flvhd: 0,
					mp4: 1,
					hd2: 2,
					hd3: 3
				}, c = b.defaultVideoType) : a = {
					"030020": 4,
					"030004": 0,
					"030008": 1,
					"030080": 3
				};
				for (var d in a) if (-1 !== c.indexOf(d)) return a[d];
				return 0
			},
			addPlayerDurationReport: function(a) {
				var c = b.videoInfo;
				if (null != c && null != c._playListData) {
					if (null == this.drtimer) {
						var d = this;
						this.drtimer = setInterval(function() {
							d.player.video.paused || d.addPlayerDurationReport(60)
						}, 6e4)
					}
					61 == a && (clearInterval(this.drtimer), this.drtimer = null);
					var f = {};
					f.sid = c._sid, f.videoOwnerId = b.v.data[0].userid, f.viewUserId = b.v.user.id, f.videoid = b.v.data[0].videoid, f.ct = b.v.data[0].ct, f.cs = b.v.data[0].cs, f.number = a, f.rnd = ((new Date).getTime() - c.abstarttime) / 1e3, null != c._playListData.show ? (f.showid_v2 = null == c._playListData.show ? "" : c._playListData.show.showid, f.showid_v3 = null == c._playListData.show ? "" : c._playListData.show.showid_encode, f.show_videotype = c._playListData.show.show_videotype, f.stg = c._playListData.show.stage, f.Tid = c._playListData.show.theaterid, f.Copyright = c._playListData.show.copyright) : (f.showid_v2 = "", f.Tid = 0, f.Copyright = ""), f.hd = 0, f.ikuflag = "m", f.hd = {
						flv: 0,
						flvhd: 0,
						mp4: 1,
						hd2: 2,
						hd3: 3
					}[b.defaultVideoType], f.winType = b.WIN_TYPE, f.mtype = P(), f.totalsec = c.totalTime, f.fullflag = this.player.controls.fullscreenPanel.fullFlag(), f.playComplete = 0, 61 == a && (f.playComplete = 1), 59 == a && (f.referUrl = (b.initConfig.vvlogconfig || "").rurl, f.url = encodeURIComponent(window.location.href), f.starttime = 0), f.currentPlayTime = parseInt(this.player.currentTime || 0), f.continuationPlay = 0, f.pid = b.initConfig.client_id, f.timestamp = (new Date).getTime(), f.ctype = "12", f.ev = "1", f.tk = e.userCache.token, f.oip = b.v.data[0].ip, e.Log("http://stat.youku.com/player/addPlayerDurationReport?" + n(f))
				}
			},
			addPlayerStaticReport: function() {
				var a = {};
				a.videoid = this.v.data[0].videoid, a.t = this.v.data[0].ts, a.totalsec = parseInt(this.v.data[0].seconds), a.ikuflag = "m", a.url = escape(window.location.href), a.fullflag = this.player.controls.fullscreenPanel.fullFlag(), a.source = "video", a.referer = (b.initConfig.vvlogconfig || "").rurl, a.sid = this.sid, a.uid = this.v.data[0].userid;
				for (var c = a.t, d = !1, f = ""; !d;) {
					for (var f = "", g = 0; 20 > g; g++) var h = Math.floor(61 * Math.random()),
						f = f + "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".substring(h, h + 1);
					hstr = c + f, hashcash = oa(hstr), "00" == hashcash.substring(0, 2) && (d = !0)
				}
				a.h = f, a.totalseg = b.pieceLength(), a = n(a), e.Log("http://stat.youku.com/player/addPlayerStaticReport?" + a)
			},
			sendUserActionReport: function(a, c, d) {
				c = {
					t: 1002,
					e: a,
					v: c
				}, c.d = D(P());
				var f = {
					v: "h5player",
					vid: b.v.data[0].videoid,
					ssid: b.videoInfo._sid,
					ct: b.v.data[0].ct,
					cs: b.v.data[0].cs,
					uid: 0
				};
				b.v.data[0].user && (f.uid = b.v.user.id), f.sid = "", b.v.data[0].show && (f.sid = b.v.data[0].show.showid), f.tc = this.player.currentTime || 0, f.w = b.get("#x-player").offsetWidth, f.h = b.get("#x-player").offsetHeight, f.f = this.player.video.webkitDisplayingFullscreen ? "on" : "off", f.q = this.player.getQuality(), f.ver = "1.0.0";
				for (var g in d) f[g] = d[g];
				if (c.x = D(n(f)), g = n(c), "xre" == a) this.checkPlayerResize("http://e.stat.ykimg.com/red/ytes.php?", g);
				else {
					if ("xenfs" == a || "xexfs" == a) {
						this._giveupReTag = !0;
						var h = this;
						setTimeout(function() {
							h._giveupReTag = !1
						}, 800)
					}
					e.Log("http://p-log.ykimg.com/event?" + g)
				}
				this.sendCustomUserAction(a, d)
			},
			checkScreenRotate: function(a, b) {
				var c = screen.availWidth,
					d = screen.availHeight;
				debug.log("<hr/>rota w,h = " + c + "," + d), (this.screenDim.w != c || this.screenDim.h != d) && (this.screenDim.w = c, this.screenDim.h = d, debug.log("<b><font color=red>rotate</font></b>"), e.Log(a + b))
			},
			checkPlayerResize: function(a, b) {
				if (!0 === this._giveupReTag) debug.log("give up xre after enfs or exfs");
				else {
					var c = document.getElementById("x-player");
					this._resizeList = this._resizeList || [], this._resizeList.push({
						str: b,
						time: (new Date).getTime(),
						w: c.offsetWidth,
						h: c.offsetHeight
					});
					var d = this;
					setTimeout(function() {
						if (0 != d._resizeList.length) {
							for (var b = d._resizeList[0].time, c = 0; c < d._resizeList.length; c++) {
								var f = d._resizeList[c].w,
									g = d._resizeList[c].h,
									h = d._resizeList[c].time;
								(f != d.dimension.w || g != d.dimension.h) && (d.dimension.w = f, d.dimension.h = g, (h - b > 800 || c == d._resizeList.length - 1) && e.Log(a + d._resizeList[c].str))
							}
							d._resizeList = []
						}
					}, 1e3)
				}
			},
			sendCustomUserAction: function(a, b) {
				var c, d = {
					e: a
				};
				for (c in b) d[c] = b[c];
				switch (d.device = e.isAndroid ? "adr" : e.isIPAD ? "ipad" : "oth", a) {
				case "xenfs":
					e.Log(e.uniplayerUrl + p(d));
					break;
				case "xexfs":
					e.Log(e.uniplayerUrl + p(d));
					break;
				case "xsra":
					e.Log(e.uniplayerUrl + p(d))
				}
			},
			sendCustomLoadedTime: function(a) {
				a = {
					vid: b.v.data[0].videoid,
					os: escape(e.os),
					adrd4: e.isAndroid4,
					mobile: e.isMobile,
					type: "mp4" == b.config.content ? m : b.config.content,
					cost: a,
					ver: VER.replace(/[-:]/g, "")
				}, 0 == a.mobile && (a.ua = escape(navigator.userAgent.replace(/[\/\+\*@\(\)\,]/g, ""))), e.Log("http://passport-log.youku.com/logsys/logstorage/append?project=xplayerloadtime&log=" + p(a))
			},
			sendUepReport: function(a, c, d) {
				!1 !== d && 10 < 100 * Math.random() || (d = "", d = e.isIPAD ? "xplayer_ipad" : e.isIPHONE ? "xplayer_iphone" : "xplayer_android", a = {
					m: d,
					hd: this.getHDFlag(),
					t: a,
					s: c,
					u: escape(window.location.href),
					p: 2,
					v: b.videoInfo._sid,
					ct: b.v.data[0].ct,
					cs: b.v.data[0].cs,
					a: b.v.controller.area_code + "|" + b.v.controller.dma_code
				}, e.Log("http://v.l.youku.com/uep?" + n(a)))
			},
			sendLoadedTime: function(a) {
				debug.log("loaded cost = " + a), this.sendCustomLoadedTime(a), this.sendUepReport("videoload", a)
			},
			sendComScoreReport: function(a) {
				if (!this._hasComScore) {
					for (var c = document.getElementsByTagName("script"), d = 0; d < c.length; d++) if (-1 !== c[d].src.indexOf("scorecardresearch.com/beacon.js")) {
						this._hasComScore = !0;
						break
					}!0 !== this._hasComScore && (c = document.createElement("script"), d = document.getElementsByTagName("script")[0], c.async = !0, c.src = ("https:" == document.location.protocol ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js", d.parentNode.insertBefore(c, d)), this._hasComScore = !0
				}
				var e = setInterval(function() {
					if ("undefined" != typeof COMSCORE) {
						clearInterval(e);
						try {
							COMSCORE.beacon({
								c1: 1,
								c2: 7293931,
								c3: a,
								c6: b.v.data[0].categories
							})
						} catch (c) {
							debug.log("beacon exception")
						}
					}
				}, 500)
			},
			sendIResearchReport: function() {},
			sendThirdPartyReport: function(a) {
				"xplayer_h5" == a && (a = e.isAndroid ? "xplayer_h5_android" : e.isIPAD ? "xplayer_h5_ipad" : "xplayer_h5_other"), this.sendComScoreReport(a), this.sendIResearchReport(a)
			},
			sendPayReport: function() {
				var a = {
					vid: b.v.data[0].videoid,
					os: escape(e.os)
				};
				e.Log("http://passport-log.youku.com/logsys/logstorage/append?project=unipay&log=" + p(a))
			},
			sendClientConsumeReport: function() {
				1 != this.isSendedConsumeReport && null != b.config.partner_config && 1 == b.config.partner_config.status && null != b.config.partner_config.token && "" != b.config.partner_config.token && (this.isSendedConsumeReport = !0, e.Log("https://openapi.youku.com/v2/players/consume.json?token=" + b.config.partner_config.token))
			}
		};
		var ja = function(a, b) {
				this._handler = {}, this._adinfo = a, this._info = {
					VAL: []
				};
				for (var c in a)"VAL" != c && (this._info[c] = a[c]);
				this._vt2nodes = b || []
			};
		ja.prototype = {
			addEventListener: function(a, b) {
				this._handler[a] = b
			},
			removeEventListener: function(a) {
				this._handler[a] = null
			},
			dispatch: function(a) {
				a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
			},
			buildAdRS: function() {
				for (var a = "http://pl.youku.com/playlist/m3u8?", c = {}, d = {}, f = this._adinfo.VAL, g = 0; g < f.length; g++) {
					var h = f[g];
					d["a" + (g + 1)] = h.VID + "_" + h.VQT
				}
				d.v = b.v.data[0].videoid + "_" + b.defaultVideoType;
				var i, g = escape,
					h = [];
				for (i in d) h.push('"' + i + '":"' + d[i] + '"');
				for (d = "{" + h.join(",") + "}", c.ids = g(d), c.ts = parseInt((new Date).getTime() / 1e3), b.password && (c.password = b.password), b.password && b.initConfig.client_id && b.config.partner_config && 1 == b.config.partner_config.status && 1 == b.config.partner_config.passless && (c.client_id = b.initConfig.client_id), d = [], i = 0; i < f.length; i++) d.push(f[i].VID);
				return d.push(b.v.data[0].videoid), f = encodeURIComponent(D(E(F(b.mk.a4 + "poz" + e.userCache.a2, [19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26]).toString(), e.userCache.sid + "_" + d.join("") + "_" + e.userCache.token))), c.ep = f, c.sid = e.userCache.sid, c.token = e.userCache.token, c.ctype = "12", c.ev = "1", c.oip = b.v.data[0].ip, a += n(c)
			},
			run: function() {
				if (null != this._adinfo && null != this._adinfo.VAL && 0 != this._adinfo.VAL.length) {
					for (var a = {
						SUS: [],
						SU: [],
						SUE: [],
						CU: [],
						CUM: [],
						VTVC: []
					}, b = 0, c = 0; c < this._adinfo.VAL.length; c++) {
						var d = this._adinfo.VAL[c];
						if (null != d.VID && null != d.VQT) {
							if (null == d.SU && (d.SU = []), null == d.SUE && (d.SUE = []), 0 == c) a.SUS = d.SUS || [];
							else for (var e = 0; e < d.SUS.length; e++) a.SU.push({
								T: b,
								U: d.SUS[e].U
							});
							for (e = 0; e < d.SU.length; e++) {
								var f = d.SU[e].T + b;
								a.SU.push({
									T: f,
									U: d.SU[e].U
								})
							}
							if (c == this._adinfo.VAL.length - 1) a.SUE = d.SUE;
							else for (e = 0; e < d.SUE.length; e++) f = b + d.AL, a.SU.push({
								T: f,
								U: d.SUE[e].U
							});
							if (b += d.AL, a.CU.push({
								T: b,
								U: d.CU
							}), a.CUM.push({
								T: b,
								CUM: d.CUM
							}), 1 == parseInt(d.VT) && a.VTVC.push({
								U: d.VC,
								T: b
							}), 0 != this._vt2nodes.length) for (e = 0; e < this._vt2nodes.length; e++) d = this._vt2nodes[e].VC, f = this._vt2nodes[e].pos_, -1 == f && a.VTVC.push({
								U: d,
								T: 0
							}), f == c && a.VTVC.push({
								U: d,
								T: b
							})
						}
					}
					a.AL = b, a.RS = this.buildAdRS(), this._info.VAL.push(a), this._info.src = a.RS
				}
				this.dispatch({
					type: ADConstant.FRONT_AD_INFO_ADAPER_OK,
					data: this._info
				})
			}
		};
		var L = function(a, b) {
				this._handler = {}, this.player = a, this.video = this.player.video, this.controls = this.player.controls, this._adplugin = this.player._adplugin, this._adplugin.adplayer = this, this.video.preload = "none", this.video.src = b.data.urls[0], debug.log("ad src=" + this.video.src), this.video.style.display = "block", this._addata = b.data, this._addata.curnum = 0, this._playTag = [], this.bindAdEvent(), this._adreporter = new G(this, this._addata)
			};
		L.prototype = {
			addEventListener: function(a, b) {
				this._handler[a] = b
			},
			removeEventListener: function(a) {
				this._handler[a] = null
			},
			dispatch: function(a) {
				a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
			},
			bindAdEvent: function() {
				this.bind_fadtoplay = b.bindAsEventListener(this, this.onPlayClick), this.bind_fadplay = b.bindAsEventListener(this, this.onAdPlay), this.bind_fadended = b.bindAsEventListener(this, this.onAdEnded), this.bind_faderror = b.bindAsEventListener(this, this.onAdError), this.bind_fadpause = b.bindAsEventListener(this, this.onAdPause), this.bind_fadsuspend = b.bindAsEventListener(this, this.onAdSuspend), this.bind_fadstalled = b.bindAsEventListener(this, this.onAdStalled), this.bind_fadwaiting = b.bindAsEventListener(this, this.onAdWaiting), this.bind_fadloadedmetadata = b.bindAsEventListener(this, this.onAdLoadedMetaData), this.bind_fadtimeupdate = b.bindAsEventListener(this, this.onAdTimeUpdate), b.addEventHandler(this.video, "play", this.bind_fadplay), b.addEventHandler(this.video, "ended", this.bind_fadended), b.addEventHandler(this.video, "error", this.bind_faderror), b.addEventHandler(this.video, "pause", this.bind_fadpause), b.addEventHandler(this.video, "suspend", this.bind_fadsuspend), b.addEventHandler(this.video, "stalled", this.bind_fadstalled), b.addEventHandler(this.video, "waiting", this.bind_fadwaiting), b.addEventHandler(this.video, "loadedmetadata", this.bind_fadloadedmetadata), b.addEventHandler(this.video, "timeupdate", this.bind_fadtimeupdate), this.shadow = this.controls.buttons.shadow, this.videobtn = this.controls.buttons.videobtn, b.addEventHandler(this.videobtn, "click", this.bind_fadtoplay, !0)
			},
			removeAdEvent: function() {
				b.removeEventHandler(this.video, "play", this.bind_fadplay), b.removeEventHandler(this.video, "ended", this.bind_fadended), b.removeEventHandler(this.video, "error", this.bind_faderror), b.removeEventHandler(this.video, "pause", this.bind_fadpause), b.removeEventHandler(this.video, "suspend", this.bind_fadsuspend), b.removeEventHandler(this.video, "stalled", this.bind_fadstalled), b.removeEventHandler(this.video, "waiting", this.bind_fadwaiting), b.removeEventHandler(this.video, "timeupdate", this.bind_fadtimeupdate), b.removeEventHandler(this.video, "loadedmetadata", this.bind_fadloadedmetadata), b.removeEventHandler(this.videobtn, "click", this.bind_fadtoplay, !0)
			},
			onPlayClick: function() {
				this.video.play()
			},
			checkVTVC: function(a) {
				var b = this._addata.vtvc;
				if (null != b && 0 !== b.length) for (var c = 0; c < b.length; c++) {
					var d = b[c];
					d.pos_ == a - 1 && x(d.VC, "js")
				}
			},
			play: function() {
				this.checkVTVC(0), this.video.load(), this.video.play()
			},
			leftSecond: function() {
				for (var a = this._addata.curnum, b = this._addata.seconds.length, c = this._addata.seconds[a] - this.video.currentTime, a = a + 1; b > a; a++) c += this._addata.seconds[a];
				return parseInt(c)
			},
			clearTimer: function() {
				clearInterval(this._checkTimer), this._checkTimer = null
			},
			checkPause: function() {
				if (!this._checkTimer) {
					var a = this;
					this._timelist = [], this._checkTimer = setInterval(function() {
						a.video.paused ? a.onAdPause() : (a._timelist.push(a.video.currentTime), 3 <= a._timelist.length && (1 > Math.abs(a._timelist[0] - a._timelist[2]) && (debug.log("<b>ad unexpected pause</b>"), a.video.play(), 0 == a.leftSecond() && (debug.log("<b>exception left = 0 </b>"), a.onAdEnded())), a._timelist = []))
					}, 1e3)
				}
			},
			onAdPlay: function() {
				this.checkPause();
				var a = this.controls.container.poster;
				b.hide(this.controls.buttons.videobtn), b.hide(a), b.hide(b.get(".x-video-info")), this.video.style.display = "block", a = this._addata.curnum, debug.log("left=" + this.leftSecond() + " curtotal=" + this._addata.seconds[a] + " curtime=" + this.video.currentTime), this._adplugin.setLeftSecond(this.leftSecond());
				var c = this;
				setTimeout(function() {
					debug.log("ad media timeout check begin = " + c._adBegin), c._adBegin || (c.removeAdEvent(), c._adplugin.hide(), c._adplugin.reportTime("advideo", -1, !1), c.dispatch({
						type: ADConstant.AD_ERROR,
						data: !0
					}))
				}, 1e4), this._playTag[a] || (this._playTag[a] = !0, this._adfirsttu = !1, this._adplugin.recordTime("advideo"), l.appendItem("phase", "adplay"))
			},
			uglyClose: function() {
				this.video.src = "", this.video.load(), this.video.play()
			},
			onAdError: function() {
				this.checkVTVC(this._addata.curnum + 1), this.removeAdEvent(), this._adplugin.hide(), this._adplugin.reportTime("advideo", -1, !1), this.dispatch({
					type: ADConstant.AD_ERROR,
					data: !0
				})
			},
			onAdEnded: function(a) {
				debug.log("ad ended"), this._adreporter.sendSUE(), this.checkVTVC(this._addata.curnum + 1), this._addata.curnum < this._addata.urls.length - 1 ? this.onMiddleAdEnded(a) : (this.removeAdEvent(), this._adplugin.hide(), this.clearTimer(), this.dispatch({
					type: ADConstant.AD_END,
					data: !0
				}), l.appendItem("phase", "adend"))
			},
			onMiddleAdEnded: function() {
				debug.log("onMiddleAdEnded"), this._pauseLeftSec = !0;
				var a = this;
				setTimeout(function() {
					a._pauseLeftSec = !1
				}, 1e3), this._addata.curnum++, this.video.src = this._addata.urls[this._addata.curnum], this.video.load(), this.video.play(), this._adBegin = !1
			},
			onAdPause: function() {
				this.player.video.ended || (b.show(this.controls.buttons.videobtn), b.hide(this.controls.buttons.shadow))
			},
			onAdSuspend: function() {
				debug.log("<font color=red>ad suspend</font>")
			},
			onAdStalled: function() {
				debug.log("<font color=red>ad stalled</font>")
			},
			onAdWaiting: function(a) {
				this.controls.onWaiting(a)
			},
			onAdTimeUpdate: function() {
				b.hide(this.controls.buttons.loading), this._adBegin = !0, b.hide(this.controls.buttons.loading), this._pauseLeftSec || this._adplugin.setLeftSecond(this.leftSecond()), this._adreporter.sendSU(this.video.currentTime), .5 <= this.video.currentTime && this._adplugin.show(), this._adfirsttu || (this._adfirsttu = !0, this._adreporter.sendSUS(), this._adreporter.sendVC(), this._adplugin.reportTime("advideo"), e.isNeedAdrTrick() && e.adrInvalidPauseCheck(this.video), 0 === this._adplugin.SKIP && this.dispatch({
					type: ADConstant.UGLY_CLOSE_AD_HINT
				}))
			},
			onAdLoadedMetaData: function() {
				this._adBegin = !0
			},
			onAdClick: function() {
				this.video.pause(), this._adreporter.sendCUM();
				var a = this._addata,
					a = a.info.VAL[a.curnum].CU;
				debug.log("click cu=" + a), window.open(a, "", "", !1)
			}
		}, ADConstant = {
			FRONT_REQUEST_BASE: "http://mf.atm.youku.com/mf?",
			BACK_REQUEST_BASE: "http://mb.atm.youku.com/mb?",
			PAUSE_REQUEST_BASE: "http://mp.atm.youku.com/mp?",
			INSERT_REQUEST_BASE: "http://valo.atm.youku.com/valo?",
			OVERLAY_REQUEST_BASE: "http://valc.atm.youku.com/valc?",
			FRONT_AD: "frontAD",
			BACK_AD: "backAD",
			INSERT_AD: "insertAD",
			PAUSE_AD: "pauseAD",
			OVERLAY_AD: "overlayAD",
			AD_END: "adend",
			AD_ERROR: "aderror",
			UGLY_CLOSE_AD: "uglyclosead",
			FRONT_AD_END: "frontADend",
			FRONT_AD_ERROR: "frontADerror",
			FRONT_AD_INFO_OK: "frontAdinfook",
			FRONT_AD_UNITED_INFO_OK: "unitedfrontadinfook",
			FRONT_AD_INFO_ADAPER_OK: "frontAdinfoadapterok",
			FRONT_AD_INFO_TIMEOUT: "frontAdinfotimeout",
			BACK_AD_END: "backAdend",
			BACK_AD_ERROR: "backaderror",
			BACK_AD_INFO_OK: "backAdinfook",
			BACK_AD_INFO_TIMEOUT: " backAdinfotimeout",
			INSERT_AD_INFO_OK: "insertAdinfook",
			PAUSE_AD_INFO_OK: "pauseAdinfook",
			PAUSE_AD_INFO_ERROR: "pauseAdinfoerror",
			PAUSE_AD_INFO_TIMEOUT: "pauseadinfotimeout",
			OVERLAY_AD_INFO_OK: "overlayAdinfook",
			AdPluginObject: "adpluginobject"
		};
		var M = function(a, c, d) {
				this._handler = {}, this.player = a, this.sid = d, this._advids = [], this._adsecs = [], this._adsrcs = [], this._vid = c.data[0].videoid, this._advert = b.get(".x-advert"), this._adskip = this._advert.getElementsByClassName("x-advert-skip")[0], this._adcount = this._advert.getElementsByClassName("x-advert-countdown")[0], this._adknowdet = this._advert.getElementsByClassName("x-advert-detail")[0], this.init(c), this.bindEvent()
			};
		M.prototype = {
			init: function(a) {
				this.initRequestParam(a), this._adskipTxt = this._adskip.getElementsByClassName("x-advert-txt")[0], this._adskipTxt.innerHTML = "跳过广告", this._adcountTxt = this._adcount.getElementsByClassName("x-advert-txt")[0], this._adcountTxt.innerHTML = "广告剩余时间<span class=x-advert-sec></span>秒", this._adsec = this._adcountTxt.getElementsByClassName("x-advert-sec")[0]
			},
			initRequestParam: function(a) {
				var c = {
					site: 1,
					p: 0,
					vl: parseInt(a.data[0].seconds),
					fu: 0,
					ct: a.data[0].ct,
					cs: a.data[0].cs,
					d: 0,
					paid: a.data[0].show ? a.data[0].show.paid : 0,
					s: a.data[0].show ? a.data[0].show.showid : 0,
					sid: this.sid,
					td: a.data[0].sourceVid ? a.data[0].sourceVid : 0,
					v: a.data[0].videoid,
					vip: a.user.vip ? 1 : 0,
					wintype: "xplayer_m3u8",
					k: "",
					u: a.data[0].userid,
					bt: e.isPad ? "pad" : "phone",
					os: e.isMobileIOS ? "ios" : "Android",
					rst: e.isMobileIOS ? "m3u8" : "3gphd",
					tict: 0,
					aw: "w",
					vs: "1.0",
					ti: encodeURIComponent(a.data[0].title)
				};
				null != b.config.partner_config && (c.partnerid = b.initConfig.client_id, c.atm = b.config.partner_config.atm), c.k = escape((a.data[0].tags || []).join("|"));
				for (var d in b.initConfig.adconfig) c[d] = b.initConfig.adconfig[d];
				this._param = c, this.loadPartnerParam()
			},
			loadPartnerParam: function() {},
			partnerParse: function() {},
			initRequestParam_: function(a) {
				var c = {
					ct: a.data[0].ct,
					cs: a.data[0].cs,
					v: a.data[0].videoid,
					t: parseInt(a.data[0].seconds),
					u: a.data[0].userid,
					fileid: "todo",
					winType: "xplayer_m3u8",
					partnerid: b.config.partnerId,
					sid: this.sid,
					k: "",
					td: "todo"
				};
				c.s = a.data[0].show ? a.data[0].show.showid : "", a.user && (c.vip = a.user.vip ? 1 : 0), c.paid = a.data[0].show ? a.data[0].show.paid : 0;
				for (var d in b.initConfig.adconfig) c[d] = b.initConfig.adconfig[d];
				this._param = c
			},
			bindEvent: function() {
				var a = this;
				this.fSkipAd = function() {
					a.adplayer.video.pause(), window.open("http://cps.youku.com/redirect.html?id=000002bf", "", "", !1)
				}, this._adskip.addEventListener("click", this.fSkipAd, !1), this._adknowdet.addEventListener("click", function() {
					debug.log("detail clicked"), a.adplayer.onAdClick("")
				}, !1)
			},
			addEventListener: function(a, b) {
				this._handler[a] = b
			},
			removeEventListener: function(a) {
				this._handler[a] = null
			},
			dispatch: function(a) {
				a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
			},
			show: function() {
				b.show(this._advert)
			},
			hide: function() {
				b.hide(this._advert)
			},
			setLeftSecond: function(a) {
				this._adsec && (this._adsec.innerText = a)
			},
			splitVTVC: function(a) {
				debug.log("split adinfo vt vc"), this._vtvc = [];
				var b, c = {};
				for (b in a)"VAL" != b && (c[b] = a[b]);
				for (c.VAL = [], a = a.VAL, b = 0; b < a.length; b++) 2 === parseInt(a[b].VT) ? (a[b].pos_ = b - 1 - this._vtvc.length, this._vtvc.push(a[b])) : null == a[b].RS || "" == a[b].RS.trim() || null == a[b].VID || null == a[b].VQT || c.VAL.push(a[b]);
				return c
			},
			buildTestData: function() {
				return {
					VAL: [{
						AL: 15,
						VID: 147660115,
						VQT: "flv",
						SUS: [{
							U: "http://mytestdata.com1"
						}, {
							U: "http://mytestdata.com2"
						}],
						SU: [],
						SUE: [],
						CU: "http://www.baidu.com",
						CUM: [{
							U: "http://cum"
						}],
						RS: "http://fasdfa"
					}, {
						AL: 15,
						VID: 15252,
						VQT: "flv",
						SUS: [{
							U: "http://mytestdata.com1"
						}, {
							U: "http://mytestdata.com2"
						}],
						SU: [],
						SUE: [],
						CU: "http://www.bing.com",
						CUM: [{
							U: "http://cum"
						}],
						RS: "http://fasdfa",
						VT: 2,
						VC: "http://vc.com"
					}]
				}
			},
			checkSkip: function(a) {
				a && 0 === parseInt(a.SKIP) && (b.hide(this._adskip), this.SKIP = 0)
			},
			adParseUnited: function(a) {
				if (this.checkSkip(a), this._isAdInfoOk = !0, l.appendItem("phase", "adinfo"), this.reportTime("adinfo"), a && a.VAL && (debug.log("<b>before split val length =  " + a.VAL.length + "</b>"), a = this.splitVTVC(a), debug.log("<b>after : val length =  " + a.VAL.length + "</b>")), null == a || null == a.VAL || 0 == a.VAL.length) a = {
					VAL: []
				}, this.dispatch({
					type: ADConstant.FRONT_AD_UNITED_INFO_OK,
					data: {
						info: {
							VAL: []
						},
						vtvc: this._vtvc || []
					}
				});
				else {
					var a = new ja(a, this._vtvc),
						b = this;
					a.addEventListener(ADConstant.FRONT_AD_INFO_ADAPER_OK, function(a) {
						debug.log("ad info adapter ok"), b.dispatch({
							type: ADConstant.FRONT_AD_UNITED_INFO_OK,
							data: {
								info: a.data,
								vtvc: b._vtvc || []
							}
						})
					}), a.run()
				}
			},
			adParse: function(a) {
				if (this.checkSkip(a), l.appendItem("phase", "adinfo"), this.reportTime("adinfo"), this._isAdInfoOk = !0, a && a.VAL) for (var a = this.splitVTVC(a), b = a.VAL, c = 0; c < b.length; c++) this._adsrcs.push(b[c].RS), this._adsecs.push(parseInt(b[c].AL));
				debug.log("frontad len =" + this._adsrcs.length), this.dispatch({
					type: ADConstant.FRONT_AD_INFO_OK,
					data: {
						ids: this._advids || [],
						urls: this._adsrcs,
						seconds: this._adsecs,
						info: a,
						vtvc: this._vtvc || []
					}
				})
			},
			buildPauseData: function() {
				return adinfo = {
					P: 10,
					VAL: [{
						RS: "http://static.atm.youku.com/Youku2013/201307/0715/27896/600-430.jpg",
						RST: "img",
						AT: 73,
						SU: [],
						SUS: [{
							U: "http://mf.atm.youku.com/mshow?v=137006183&at=73&ct=d&cs=1003&ca=135159&ie=150597&uid=1234567&ck=137689524489061H&al=0&bl=1&s=&td=&st=1&vl=1200.0&ap=4&sid=1&cr=0&tvb=0&pr=100&oidtype=27896%7C1&tpa=null&rid=&os=1&dt=1&aw=a&avs="
						}],
						SUE: [],
						CU: "http://vid.atm.youku.com/mclick?v=137006183&at=73&ct=d&cs=1003&ca=135159&ie=150597&uid=1234567&ck=137689524489061H&al=0&bl=1&s=&td=&st=1&vl=1200.0&ap=4&sid=1&cr=0&tvb=0&pr=100&oidtype=27896%7C1&tpa=null&rid=&os=1&dt=1&aw=a&avs=&u=http://static.youku.com/pub/youku/fragment/panel_phone.html&md5=f2450cd80597324b57d986147dc1b3a9",
						W: 400,
						H: 300,
						CF: "1"
					}]
				}
			},
			adParsePause: function(a) {
				debug.log("<b> ad parse pause </b>"), l.appendItem("phase", "pauseadinfo"), this.reportTime("adinfo"), this._isPauseAdInfoOk = !0, null == a || null == a.VAL || 0 == a.VAL.length || 10 != a.P ? this.dispatch({
					type: ADConstant.PAUSE_AD_INFO_ERROR
				}) : (debug.log("<b>pause ad len = " + a.VAL.length + "</b>"), this.dispatch({
					type: ADConstant.PAUSE_AD_INFO_OK,
					data: {
						info: a
					}
				}))
			},
			frontAd: function() {
				this._param.fu = this.player.controls.fullscreenPanel.fullFlag() ? 1 : 0, this._param.p = 7, this._param.callback = ADConstant.AdPluginObject + ".adParse", b.OLD_M3U8 = !0, e.isIPAD && (debug.log("<font color=red> new m3u8 api</font>"), b.OLD_M3U8 = !1, this._param.callback = ADConstant.AdPluginObject + ".adParseUnited");
				var a = ADConstant.FRONT_REQUEST_BASE + n(this._param);
				w(a), this.recordTime("adinfo");
				var c = this;
				setTimeout(function() {
					c._isAdInfoOk || (debug.log("adinfo timeout"), c.reportTime("adinfo", -1), c.dispatch({
						type: ADConstant.FRONT_AD_INFO_TIMEOUT,
						data: {
							timeout: 8e3
						}
					}))
				}, 8e3)
			},
			pauseAd: function() {
				this._param.r_ = parseInt(1e4 * Math.random()), this._param.p = 10, this._param.fu = this.player.controls.fullscreenPanel.fullFlag() ? 1 : 0, this._param.callback = ADConstant.AdPluginObject + ".adParsePause";
				var a = ADConstant.PAUSE_REQUEST_BASE + n(this._param);
				w(a), this.recordTime("adinfo");
				var b = this;
				setTimeout(function() {
					b._isPauseAdInfoOk || (debug.log("pause ad info timeout"), b.reportTime("adinfo", -1), b.dispatch({
						type: ADConstant.PAUSE_AD_INFO_TIMEOUT,
						data: {
							timeout: 8e3
						}
					}))
				}, 8e3)
			},
			recordTime: function(a) {
				null == this._timearr && (this._timearr = {}), this._timearr[a] = (new Date).getTime()
			},
			reportTime: function(a, b, c) {
				null == this._timearr && (this._timearr = {}), b = b || (new Date).getTime() - this._timearr[a], this.player._reporter.sendUepReport({
					adinfo: "valfload",
					advideo: "adload"
				}[a], b, c)
			},
			backAd: function() {
				this._param.fu = this.player.controls.fullscreenPanel.fullFlag(), this._param.p = 9, this._param.callback = ADConstant.AdPluginObject + ".adParse", this._param.ctu = 0;
				var a = ADConstant.BACK_REQUEST_BASE + n(this._param);
				w(a);
				var b = this;
				setTimeout(function() {
					b._isAdInfoOk || (debug.log("adinfo timeout"), b.dispatch({
						type: ADConstant.BACK_AD_INFO_TIMEOUT,
						data: {
							timeout: 5e3
						}
					}))
				}, 5e3)
			},
			insertAd: function() {
				this._param.ps = 0, this._param.pt = 0
			}
		};
		var G = function(a, b) {
				this.adplayer = a, this.addata = b, "undefined" == typeof b.curnum && (this.addata.curnum = 0)
			};
		G.prototype = {
			sendSUS: function() {
				var a = this.addata.info.VAL[this.addata.curnum].SUS;
				if ("undefined" != typeof a) for (var b = 0; b < a.length; b++) e.Log(a[b].U)
			},
			sendUnitedVTVC: function(a) {
				var a = a + 2,
					b = this.addata.info.VAL[0].VTVC;
				this._vtccache || (this._vtccache = []);
				for (var c = null, d = 1e6, e = 1e5, f = 0; f < b.length; f++) {
					var g = b[f].U,
						h = parseInt(b[f].T),
						i = a - h;
					i >= 0 && e > i && (e = i, c = g, d = h)
				}
				null != c && -1 == this._vtccache.indexOf(d) && (this._vtccache.push(d), debug.log("<b> vc = " + c + "</b>"), x(c, "js"))
			},
			sendVC: function() {
				var a = this.addata.info.VAL[this.addata.curnum];
				"undefined" != typeof a.VT && x(a.VC, "js")
			},
			sendSUS_: function() {
				var a = this.addata.info,
					b = this.addata.curnum + 2,
					c = a["A" + b].ATMSU,
					d = a["A" + b].ISOSU;
				e.Log(a["A" + b].SU), e.Log(c), e.Log(d)
			},
			sendSUE: function() {
				var a = this.addata.info.VAL[this.addata.curnum].SUE;
				if ("undefined" != typeof a) for (var b = 0; b < a.length; b++) e.Log(a[b].U)
			},
			sendSUE_: function() {
				var a = this.addata.info,
					b = this.addata.curnum + 2,
					c = a["A" + b].COU;
				e.Log(a["A" + b].OU), e.Log(c)
			},
			sendSU: function(a) {
				var b = this.addata.info.VAL[this.addata.curnum].SU;
				if ("undefined" != typeof b) {
					this._sucache || (this._sucache = []);
					for (var c = 1e4, d = 1e6, f = 0; f < b.length; f++) {
						var g = parseInt(b[f].T),
							h = a - g;
						h >= 0 && c > h && (c = h, d = g)
					}
					if (1e6 != d && -1 == this._sucache.indexOf(d)) for (this._sucache.push(d), f = 0; f < b.length; f++) parseInt(b[f].T) == d && e.Log(b[f].U)
				}
			},
			sendSU_: function(a) {
				curnum += 2;
				var b = this.addata.info["A" + curnum].MT;
				b && a >= parseInt(b) && (a = this.addata.info["A" + curnum].CMU, e.Log(this.addata.info["A" + curnum].MU), e.Log(a))
			},
			sendCUM: function() {
				var a = this.addata.info.VAL[this.addata.curnum].CUM;
				if ("undefined" != typeof a) for (var b = 0; b < a.length; b++) e.Log(a[b].U)
			},
			sendUnitedCUM: function(a) {
				var b = this.addata.info.VAL[0].CUM;
				if ("undefined" != typeof b && 0 !== b.length) for (var c = 0; c < b.length; c++) if (a < parseInt(b[c].T)) {
					for (a = 0; a < (b[c].CUM || []).length; a++) e.Log(b[c].CUM[a].U);
					break
				}
			},
			sendCUM_: function() {
				var a = this.addata;
				e.Log(a.info["A" + (a.curnum + 2)].VCU)
			}
		};
		var ka = function(a, c) {
				this._handler = {}, this.player = a, this.controls = a.controls, this.adplugin = this.controls._pauseAdPlugin, this.info = c.data.info, this.adjustIMGWH(), this.adpause = b.get(".x-ad-pause"), this.info.VAL[0].VT = parseInt(this.info.VAL[0].VT), 2 != this.info.VAL[0].VT && (this.init(), this.bindEvent(), this._adreporter = new G(this, c.data)), this.loadVC()
			};
		ka.prototype = {
			addEventListener: function(a, b) {
				this._handler[a] = b
			},
			removeEventListener: function(a) {
				this._handler[a] = null
			},
			dispatch: function(a) {
				a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
			},
			bindEvent: function() {
				b.addEventHandler(this.adcontent, "click", b.bindAsEventListener(this, this.adClick)), b.addEventHandler(this.adclose, "click", b.bindAsEventListener(this, this.hide));
				var a = this;
				window.addEventListener("orientationchange", function() {
					setTimeout(function() {
						b.isLandScape() || a.hide()
					}, 1e3)
				})
			},
			adjustIMGWH: function() {
				var a = this.info.VAL[0].W,
					c = this.info.VAL[0].H,
					d = (b.get("#x-player").offsetHeight - 110) / c;
				(d > 1 || 0 >= d) && (d = 1), this.info.VAL[0].W = a * d, this.info.VAL[0].H = c * d, debug.log("pause img adjusted w = " + this.info.VAL[0].W + " h = " + this.info.VAL[0].H)
			},
			init: function() {
				this.adpause.innerHTML = "<div class=x-pause-content></div><div class=x-pause-close></div>", this.adcontent = this.adpause.getElementsByClassName("x-pause-content")[0], this.adcontent.innerHTML = " <img class=x-pause-img width=" + this.info.VAL[0].W + " height=" + this.info.VAL[0].H + " src=" + this.info.VAL[0].RS + ">", this.adclose = this.adpause.getElementsByClassName("x-pause-close")[0], this.adimg = this.adcontent.getElementsByClassName("x-pause-img")[0], this.adimg.style.height = this.info.VAL[0].H + "px", this.adimg.style.width = this.info.VAL[0].W + "px", this.adpause.style.marginLeft = "-" + this.info.VAL[0].W / 2 + "px", this.adpause.style.marginTop = "-" + this.info.VAL[0].H / 2 + "px"
			},
			hide: function() {
				b.hide(this.adpause)
			},
			play: function() {
				2 != this.info.VAL[0].VT && (b.show(this.adpause), this._adreporter.sendSUS())
			},
			adClick: function() {
				window.open(this.info.VAL[0].CU, null), this._adreporter && this._adreporter.sendCUM()
			},
			loadVC: function() {
				(2 == this.info.VAL[0].VT || 1 == this.info.VAL[0].VT) && x(this.info.VAL[0].VC, "js")
			}
		};
		var la = function(a, b) {
				this._handler = {}, this.player = a, this.video = this.player.video, this.controls = this.player.controls, this._adplugin = this.player._adplugin, this._adplugin.adplayer = this, this._addata = b.data.info, this.video.preload = "none", this.video.src = this._addata.VAL[0].RS, debug.log("ad src=" + this.video.src), this.video.style.display = "block", this._playTag = [], this.bindAdEvent(), this._adreporter = new G(this, {
					curnum: 0,
					info: this._addata
				})
			};
		la.prototype = {
			addEventListener: function(a, b) {
				this._handler[a] = b
			},
			removeEventListener: function(a) {
				this._handler[a] = null
			},
			dispatch: function(a) {
				a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
			},
			bindAdEvent: function() {
				this.bind_fadtoplay = b.bindAsEventListener(this, this.onPlayClick), this.bind_fadplay = b.bindAsEventListener(this, this.onAdPlay), this.bind_fadended = b.bindAsEventListener(this, this.onAdEnded), this.bind_faderror = b.bindAsEventListener(this, this.onAdError), this.bind_fadpause = b.bindAsEventListener(this, this.onAdPause), this.bind_fadsuspend = b.bindAsEventListener(this, this.onAdSuspend), this.bind_fadstalled = b.bindAsEventListener(this, this.onAdStalled), this.bind_fadwaiting = b.bindAsEventListener(this, this.onAdWaiting), this.bind_fadloadedmetadata = b.bindAsEventListener(this, this.onAdLoadedMetaData), this.bind_fadtimeupdate = b.bindAsEventListener(this, this.onAdTimeUpdate), b.addEventHandler(this.video, "play", this.bind_fadplay), b.addEventHandler(this.video, "error", this.bind_faderror), b.addEventHandler(this.video, "pause", this.bind_fadpause), b.addEventHandler(this.video, "suspend", this.bind_fadsuspend), b.addEventHandler(this.video, "stalled", this.bind_fadstalled), b.addEventHandler(this.video, "waiting", this.bind_fadwaiting), b.addEventHandler(this.video, "loadedmetadata", this.bind_fadloadedmetadata), b.addEventHandler(this.video, "timeupdate", this.bind_fadtimeupdate), this.shadow = this.controls.buttons.shadow, this.videobtn = this.controls.buttons.videobtn, b.addEventHandler(this.videobtn, "click", this.bind_fadtoplay, !0)
			},
			removeAdEvent: function() {
				b.removeEventHandler(this.video, "play", this.bind_fadplay), b.removeEventHandler(this.video, "ended", this.bind_fadended), b.removeEventHandler(this.video, "error", this.bind_faderror), b.removeEventHandler(this.video, "pause", this.bind_fadpause), b.removeEventHandler(this.video, "suspend", this.bind_fadsuspend), b.removeEventHandler(this.video, "stalled", this.bind_fadstalled), b.removeEventHandler(this.video, "waiting", this.bind_fadwaiting), b.removeEventHandler(this.video, "timeupdate", this.bind_fadtimeupdate), b.removeEventHandler(this.video, "loadedmetadata", this.bind_fadloadedmetadata), b.removeEventHandler(this.videobtn, "click", this.bind_fadtoplay, !0)
			},
			onPlayClick: function() {
				this.video.play()
			},
			play: function() {
				this.video.load(), this.video.play()
			},
			leftSecond: function() {
				return parseInt(Math.max(0, this._addata.VAL[0].AL - this.video.currentTime))
			},
			clearTimer: function() {
				clearInterval(this._checkTimer), this._checkTimer = null
			},
			checkPause: function() {
				if (!this._checkTimer) {
					var a = this;
					this._timelist = [], this._checkTimer = setInterval(function() {
						a.video.paused ? a.onAdPause() : (a._timelist.push(a.video.currentTime), 3 <= a._timelist.length && (1 > Math.abs(a._timelist[0] - a._timelist[2]) && (debug.log("<b>ad unexpected pause</b>"), a.video.play(), 0 == a.leftSecond() && (debug.log("<b>exception left = 0 </b>"), a.onAdEnded())), a._timelist = []))
					}, 1e3)
				}
			},
			onAdPlay: function() {
				this.checkPause();
				var a = this.controls.container.poster;
				b.hide(this.controls.buttons.videobtn), b.hide(a), b.hide(b.get(".x-video-info")), this.video.style.display = "block", this._adplugin.setLeftSecond(this.leftSecond());
				var c = this;
				setTimeout(function() {
					debug.log("ad media timeout check begin = " + c._adBegin), c._adBegin || (c.removeAdEvent(), c._adplugin.hide(), c._adplugin.reportTime("advideo", -1, !1), c.dispatch({
						type: ADConstant.AD_ERROR,
						data: !0
					}))
				}, 15e3), this._playTag[0] || (this._playTag[0] = !0, this._adfirsttu = !1, this._adplugin.recordTime("advideo"), l.appendItem("phase", "adplay"))
			},
			uglyClose: function() {
				debug.log("united ugly close"), this.onAdError()
			},
			onAdError: function() {
				this.removeAdEvent(), this._adplugin.hide(), this._adplugin.reportTime("advideo", -1, !1), this.clearTimer(), this.dispatch({
					type: ADConstant.AD_ERROR,
					data: !0
				})
			},
			onAdEnded: function() {
				debug.log("united ad ended"), this._adreporter.sendSUE(), this.removeAdEvent(), this._adplugin.hide(), this.clearTimer(), this.dispatch({
					type: ADConstant.AD_END,
					data: !0
				}), l.appendItem("phase", "adend")
			},
			onAdPause: function() {
				this.player.video.ended || (b.show(this.controls.buttons.videobtn), b.hide(this.controls.buttons.shadow))
			},
			onAdSuspend: function() {
				debug.log("<font color=red>ad suspend</font>")
			},
			onAdStalled: function() {
				debug.log("<font color=red>ad stalled</font>")
			},
			onAdWaiting: function(a) {
				this.controls.onWaiting(a)
			},
			onAdTimeUpdate: function() {
				this.video.currentTime > this._addata.VAL[0].AL ? this.onAdEnded() : (b.hide(this.controls.buttons.loading), this._adBegin = !0, b.hide(this.controls.buttons.loading), this._adplugin.setLeftSecond(this.leftSecond()), this._adreporter.sendSU(this.video.currentTime), this._adreporter.sendUnitedVTVC(this.video.currentTime), this._adfirsttu || (this._adplugin.show(), this._adreporter.sendSUS(), this._adfirsttu = !0, this._adplugin.reportTime("advideo"), 0 === this._adplugin.SKIP && this.dispatch({
					type: ADConstant.UGLY_CLOSE_AD_HINT
				})))
			},
			onAdLoadedMetaData: function() {
				this._adBegin = !0
			},
			onAdClick: function() {
				this.video.pause(), this._adreporter.sendUnitedCUM(this.video.currentTime || 0);
				for (var a = this._addata.VAL[0].CU, b = this.video.currentTime, c = 0; c < a.length; c++) {
					var d = a[c],
						e = d.U;
					if (b <= parseInt(d.T)) {
						window.open(e, "", "", !1);
						break
					}
				}
			}
		}, DirectPlayer = function(a) {
			b.config = a, null == b.config.width && (b.config.width = document.getElementById(b.config.parentBox).offsetWidth), this.buildDirectDom(document.getElementById(b.config.parentBox))
		}, DirectPlayer.prototype = {
			buildDirectDom: function(a) {
				a.innerHTML = "<div id=x-player class=" + y(b.config.width) + '><div class=x-video-poster><img id=x-img></img></div><div class=x-video-button><div class=x-video-play-ico></div></div><div class=x-video-info><h1 class=x-title></h1><div class=x-video-state style="display:none"><span class=x-time-span></span></div><div class=x-showmore></div><div class=x-mask></div></div>'
			},
			bindEvent: function() {
				this._videobtn = b.get(".x-video-button"), b.addEventHandler(this._videobtn, "click", b.bindAsEventListener(this, this.redirect))
			},
			startPlay: function(a, c) {
				b.v = a, b.videoInfo = c, b.videoInfo._playListData = a.data[0], this._pimg = b.get("#x-img"), this._pimg.src = a.data[0].logo, this._title = b.get(".x-title"), this._title.innerHTML = a.data[0].title, this._timespan = b.get(".x-time-span"), this._timespan.innerHTML = b.getTime(a.data[0].seconds), b.show(b.get(".x-video-poster")), b.show(b.get(".x-video-info")), this.adapterForReport(), this._reporter = new K(this, b.v, b.videoInfo._sid), this.bindEvent()
			},
			onPlayStart: function() {
				b.config.events && b.config.events.onPlayStart && (e.playerCurrentState = e.playerState.PLAYER_STATE_PLAYING, debug.log(e.playerCurrentState), debug.log("api:onplaystart"), b.config.events.onPlayStart())
			},
			getSrc: function() {
				return this.src ? this.src : ("m3u8" == b.config.content ? this.src = b.videoInfo.src : null != b.videoInfo._videoSegsDic && null != b.videoInfo._videoSegsDic[m] && (this.src = b.videoInfo._videoSegsDic[m][0].src), this.src)
			},
			redirect: function() {
				var a = this.getSrc();
				debug.log("redirect play src=" + a), e.isMIUI ? window.location.href = a : window.open(a, "", "", !1), this.onPlayStart(), this._reporter.addPlayerStaticReport(), this._reporter.addPlayerDurationReport(59), this._reporter.sendVVLog(59), this._reporter.sendTSLog(60), this._reporter.sendUserActionReport("xps", "c"), this._reporter.sendThirdPartyReport("xplayer_dl"), this._reporter.sendCustomLoadedTime(1), this._reporter.sendClientConsumeReport()
			},
			adapterForReport: function() {
				this.controls = {
					fullscreenPanel: {
						fullFlag: function() {
							return 1
						}
					}
				}, this.video = {
					src: this.getSrc()
				}, this.getQuality = function() {
					return "m"
				}
			}
		}, x("http://player.youku.com/h5player/play.css?ver=" + VER.replace(/[-:]/g, ""), "css");
		var ma = function(a, c) {
				this.setting = {
					debug: !1,
					controls: b.get(".x-console"),
					feedback: b.get(".x-feedback"),
					container: {
						poster: b.get(".x-video-poster")
					},
					buttons: {
						pointVideo: b.get("#point-video"),
						playControl: b.get(".x-play-control"),
						play: b.get("#x-playbtn"),
						videobtn: b.get(".x-video-button"),
						loading: b.get(".x-video-loading"),
						videoinfo: b.get(".x-video-info"),
						shadow: b.get(".x-trigger"),
						currentTime: b.get(".x-time-current"),
						totalTime: b.get(".x-time-duration"),
						fullscreen: b.get(".x-fullscreen")
					},
					classNames: {
						play: "x-playing",
						pause: "x-pause"
					},
					init: function() {}
				}, b.extend(this.setting, c), this.player = a, this.dashboard = this.setting.controls, this.container = this.setting.container, this.progressBar = new ca(a), this.progressBar.uCurrentTime = this.setting.buttons.currentTime, this.miniProgressBar = new Z(a), this.fullscreenPanel = new V(a), this.interactionPanel = new X(a), this.xplayer = b.get("#x-player"), this.buttons = this.setting.buttons
			};
		ma.prototype = {
			init: function(a, c) {
				this.buttons.totalTime.innerHTML = c.totalTime ? b.getTime(c.totalTime) : "00:00", this.resetProgress(), this.buttons.play.className = this.setting.classNames.play;
				var d = this.container.poster.getElementsByTagName("img")[0];
				b.config.poster ? d.src = b.config.poster : a.data[0].trial || -6 == a.data[0].error_code ? (this.container.poster.style.backgroundColor = "black", d.parentNode.removeChild(d), b.show(this.container.poster)) : (d.src = a.data[0].logo, this.container.poster.style.display = "block"), this._qualityPanel = new fa(this.player, a), this._languagePanel = new Y(this.player, a), this._playratePanel = new ba(this.player, a), this._payPanel = new $(this.player, a), this._feedbackPanel = new J(this.player, a), this._informationPanel = new W(this.player, a), this.tipPanel = new ia(this.player, a), this.showlistPanel = new ha(this.player, a), this.playLimit = new aa(this.player, a), this.bindDynamicEvent()
			},
			bindDynamicEvent: function() {
				this.bind_mutualHide = b.bindAsEventListener(this, this.mutualHide), b.addEventHandler(this._languagePanel, "click", this.bind_mutualHide), b.addEventHandler(this._qualityPanel, "click", this.bind_mutualHide), b.addEventHandler(this.showlistPanel, "click", this.bind_mutualHide), b.addEventHandler(this._playratePanel, "click", this.bind_mutualHide), this.bind_progress = b.bindAsEventListener(this, this.onProgress), b.addEventHandler(this.progressBar, "progressing", this.bind_progress), b.addEventHandler(this.progressBar, "progressend", b.bindAsEventListener(this, this.onProgressEnd)), b.addEventHandler(this._languagePanel, "settingdone", b.bindAsEventListener(this, this.onSettingDone)), b.addEventHandler(this._qualityPanel, "settingdone", b.bindAsEventListener(this, this.onSettingDone)), b.addEventHandler(this._playratePanel, "settingdone", b.bindAsEventListener(this, this.onSettingDone)), b.addEventHandler(this._languagePanel, "settingshow", b.bindAsEventListener(this, this.onSettingShow)), b.addEventHandler(this._qualityPanel, "settingshow", b.bindAsEventListener(this, this.onSettingShow)), b.addEventHandler(this._playratePanel, "settingshow", b.bindAsEventListener(this, this.onSettingShow)), b.addEventHandler(this._languagePanel, "settinghide", b.bindAsEventListener(this, this.onSettingHide)), b.addEventHandler(this._qualityPanel, "settinghide", b.bindAsEventListener(this, this.onSettingHide)), b.addEventHandler(this._playratePanel, "settinghide", b.bindAsEventListener(this, this.onSettingHide)), b.addEventHandler(this.fullscreenPanel, "enterfullscreen", b.bindAsEventListener(this, this.onEnterFullScreen)), b.addEventHandler(this.fullscreenPanel, "exitfullscreen", b.bindAsEventListener(this, this.onExitFullScreen))
			},
			retimer: function() {
				debug.log("retimer"), this.autoHideDashBoard()
			},
			hideDashBoard: function() {
				var a = this._payPanel,
					b = this._informationPanel,
					c = this.miniProgressBar,
					d = this.interactionPanel,
					e = this._languagePanel;
				this.setting.controls.style.display = "none", c.show(), a.hide(), b.hide(), d.hideStatus(), e.hide(), this._qualityPanel.hide(), this._playratePanel.hide()
			},
			autoHideDashBoard: function(a) {
				this.dashboardTimer && clearTimeout(this.dashboardTimer);
				var c = this;
				this.dashboardTimer = setTimeout(function() {
					"block" == b.get(".x-showlist").style.display ? c.autoHideDashBoard(a) : c.player.video.paused || c.hideDashBoard()
				}, a || 2e3)
			},
			onMultiTouch: function() {},
			showUglyHint: function() {},
			closeUglyHint: function() {},
			showBoardInfo: function() {
				b.show(this.setting.controls), this.miniProgressBar.hide(), this._informationPanel.show(), this._payPanel.hasPayInfo() && this._payPanel.show()
			},
			toggleDashBoard: function(a) {
				if (!("touchend" == a.type && 1 < a.changedTouches.length)) {
					this._sx = this._sx || 0, this._sy = this._sy || 0, a.changedTouches = a.changedTouches || [{
						clientX: this._sx,
						clientY: this._sy
					}];
					var b = {
						x: this._sx,
						y: this._sy
					},
						a = {
							x: a.changedTouches[0].clientX,
							y: a.changedTouches[0].clientY
						};
					!this._stmtag && 1 !== this._sactionType && this.isTouchTooShort(b, a, 100) && (b = this.setting.controls.style.display, "none" == b || "" == b ? (this.player._reporter.sendUserActionReport("xcd", "c"), this.showBoardInfo(), this.autoHideDashBoard(), da = (new Date).getTime()) : (this.player._reporter.sendUserActionReport("xhd", "c"), clearTimeout(this.dashboardTimer), this.hideDashBoard()))
				}
			},
			bindAdVideoBtnEvent: function() {
				b.addEventHandler(this.buttons.videobtn, "touchstart", b.bindAsEventListener(this, this.onVideoBtnTouchStart)), b.addEventHandler(this.buttons.videobtn, "touchend", b.bindAsEventListener(this, this.onVideoBtnTouchEnd))
			},
			bindVideoBtnEvent: function() {
				b.addEventHandler(this.buttons.videobtn, "click", b.bindAsEventListener(this, this.onVideoBtnClick), !0)
			},
			bindEvent: function() {
				debug.log("bind event"), this.bind_uireinit = b.bindAsEventListener(this, this.uiInit), this.bind_play = b.bindAsEventListener(this, this.play), this.bind_redirect = b.bindAsEventListener(this, this.redirect), this.bind_showTimeTip = b.bindAsEventListener(this, this.showTimeTip), this.bind_hideTimeTip = b.bindAsEventListener(this, this.hideTimeTip), this.bind_changeVolume = b.bindAsEventListener(this, this.changeVolume), this.bind_toggleVolume = b.bindAsEventListener(this, this.toggleVolume), this.bind_gestureChange = b.bindAsEventListener(this, this.onGestureChange), this.bind_toggleDashBoard = b.bindAsEventListener(this, this.toggleDashBoard), this.bind_retimer = b.bindAsEventListener(this, this.retimer), b.addEventHandler(this.progressBar, "click", this.bind_uireinit), b.addEventHandler(this.setting.controls, "click", this.bind_retimer), b.addEventHandler(this.setting.controls, "touchstart", this.bind_retimer), b.addEventHandler(this.buttons.playControl, "click", this.bind_play), "directsrc" == b.config.playType && (e.isIPHONE || e.isIPOD ? b.addEventHandler(this.buttons.videobtn, "click", b.bindAsEventListener(this, this.playIPH), !0) : b.addEventHandler(this.buttons.videobtn, "click", this.bind_redirect, !0)), b.addEventHandler(this.buttons.shadow, "touchstart", b.bindAsEventListener(this, this.shadowTouchStart)), b.addEventHandler(this.buttons.shadow, "touchmove", b.bindAsEventListener(this, this.shadowTouchMove)), b.addEventHandler(this.buttons.shadow, "touchend", b.bindAsEventListener(this, this.shadowTouchEnd)), b.addEventHandler(this.buttons.shadow, "click", this.bind_toggleDashBoard), b.addEventHandler(this.buttons.shadow, "touchend", b.bindAsEventListener(this, this.onMultiTouch)), b.addEventHandler(this.buttons.shadow, "gesturechange", this.bind_gestureChange)
			},
			removeEvent: function() {
				debug.log("remove event begin"), b.removeEventHandler(this.progressBar, "click", this.bind_uireinit), b.removeEventHandler(this.buttons.playControl, "click", this.bind_play), b.removeEventHandler(this.buttons.shadow, "click", this.bind_toggleDashBoard), b.removeEventHandler(this.progressBar, "touchstart", this.bind_uireinit), b.removeEventHandler(this._languagePanel, "click", this.bind_mutualHide), b.removeEventHandler(this._qualityPanel, "click", this.bind_mutualHide), b.removeEventHandler(this._playratePanel, "click", this.bind_mutualHide), this.progressBar.removeEvent(), this.fullscreenPanel.removeEvent(), this._languagePanel.removeEvent(), this._qualityPanel.removeEvent(), debug.log("remove event end")
			},
			onGestureChange: function(a) {
				a.preventDefault();
				var b = -1 !== this.fullscreenPanel.zoomStatus().indexOf("in");
				(1.1 < a.scale && b || .9 > a.scale && !b) && (a.method = "m", this.fullscreenPanel.switchFullScreen(a))
			},
			toggleVolume: function() {},
			changeVolume: function() {},
			rePlay: function() {
				debug.log("replay"), this.player._reporter.sendUserActionReport("xrp", "c"), v = !1, (this._recommend = b.get(".x-recommend")) && b.get("#x-player").removeChild(this._recommend), this.resetProgress(), this._first = !1, this.player.replay(), debug.log("replay func end")
			},
			redirect: function(a) {
				this.player.redirect(a)
			},
			hideFacade: function() {
				var a = this.container.poster;
				b.hide(this.buttons.videobtn), b.hide(a), b.hide(b.get(".x-feedback")), debug.log("<font color=blue>hide facade</font>")
			},
			onVideoBtnTouchStart: function(a) {
				this._vtsx = a.targetTouches[0].clientX, this._vtsy = a.targetTouches[0].clientY
			},
			onVideoBtnTouchEnd: function(a) {
				debug.log("<font color=red>video btn clicked</font>"), a = a || {}, v ? this.rePlay() : 50 < Math.abs(a.changedTouches[0].clientY - this._vtsy) ? debug.log("videobtn too long y") : (this.player._reporter.sendUserActionReport("xps", "c"), !0 !== this._hasAdReq && (this._hasAdReq = !0, this.hideFacade(), debug.log("active src=" + this.player.video.src), this.player.video.load(), this.player.requestAd()))
			},
			onVideoBtnClick: function() {
				v ? this.rePlay() : b.v.data[0].trial && 0 == b.v.data[0].trial.time || (this.player.video.load(), this.player.video.play())
			},
			playIPH: function() {
				if (!this.iphTag) {
					this.player.video.load();
					var a = this;
					this.player.video.addEventListener("timeupdate", function(b) {
						4 == b.target.readyState && (a.iphTag = !0)
					})
				}
				this.player.video.play()
			},
			play: function(a) {
				if (a = a || {}, v) this.rePlay();
				else {
					var b = this.player.video.paused;
					debug.log("m3u8 isPause = " + b + " e = " + a), b ? (0 === this._payPanel.activeTime ? (this._payPanel.activeTime = -1, this.player.seek(0)) : this.player.video.play(), this.player._reporter.sendUserActionReport("xpl", "c"), this.interactionPanel.setStatus("播放")) : (this.player.video.pause(), this.player._reporter.sendUserActionReport("xpa", "c"), this.interactionPanel.setStatus("暂停")), this.checkPauseAd()
				}
			},
			isProperWH: function(a, c) {
				var d = b.get("#x-player");
				return d.offsetWidth >= a && d.offsetHeight >= c
			},
			isNeedPauseAd: function() {
				return this.player.video.paused && b.isLandScape()
			},
			checkPauseAd: function() {
				this.isNeedPauseAd() ? (this._pauseAdPlugin = new M(this.player, b.v, b.videoInfo._sid), this._pauseAdPlugin.addEventListener(ADConstant.PAUSE_AD_INFO_OK, b.bindAsEventListener(this, this.onPauseAdInfoOK)), this._pauseAdPlugin.addEventListener(ADConstant.PAUSE_AD_INFO_TIMEOUT, b.bindAsEventListener(this, this.onPauseAdInfoTimeout)), this._pauseAdPlugin.addEventListener(ADConstant.PAUSE_AD_INFO_ERROR, b.bindAsEventListener(this, this.onPauseAdInfoERROR)), window[ADConstant.AdPluginObject] = this._pauseAdPlugin, this._pauseAdPlugin.pauseAd(), debug.log("send pause ad request<br/>")) : (debug.log("<font color=blue> donot need pause ad </font>"), this.hidePauseAd())
			},
			hidePauseAd: function() {
				b.hide(b.get(".x-ad-pause"))
			},
			onPauseAdInfoOK: function(a) {
				debug.log("pause info ok"), this._pauseAdStart || (this._pauseAdStart = !0), this._pauseAdPlayer = new ka(this.player, a), this._pauseAdPlayer.play()
			},
			onPauseAdInfoTimeout: function(a) {
				debug.log("pause info timeout = " + a.data.timeout), this._pauseAdStart || (this._pauseAdStart = !0)
			},
			onPauseAdInfoERROR: function() {
				debug.log("<font color=blue>pause info error no info</font>"), this._pauseAdStart || (this._pauseAdStart = !0)
			},
			autoShow: function() {
				this.show();
				var a = this;
				setTimeout(function() {
					a.hide()
				}, 5e3)
			},
			mutualHide: function(a) {
				a._target == this._languagePanel ? (this._qualityPanel.hide(!0), this._playratePanel.hide(!0), this.showlistPanel.hide()) : a._target == this._qualityPanel ? (this._languagePanel.hide(!0), this._playratePanel.hide(!0), this.showlistPanel.hide()) : a._target == this.showlistPanel ? (this._qualityPanel.hide(!0), this._languagePanel.hide(!0), this._playratePanel.hide(!0)) : a._target == this._playratePanel && (this._qualityPanel.hide(!0), this._languagePanel.hide(!0), this.showlistPanel.hide())
			},
			show: function(a) {
				b.show(a ? this.buttons[a] : this.setting.controls)
			},
			hide: function(a) {
				b.hide(a ? this.buttons[a] : this.setting.controls)
			},
			backAdPrepare: function() {
				this.dashboard.style.display = "none", this.buttons.shadow.display = "none"
			},
			onEnded: function() {
				this.dashboard.style.display = "none", this.buttons.shadow.display = "none", this.buttons.videobtn.style.display = "block", this.container.poster.style.display = "block", this._informationPanel.show(), this.miniProgressBar.hide(), this.interactionPanel.hide(), null == b.v.data[0].trial && (this._relatedPanel = new ga(this.player, b.v))
			},
			onPlay: function() {
				this.player.video.style.display = "block", this.buttons.play.className = this.setting.classNames.pause, this.buttons.videobtn.style.display = "none", this.container.poster.style.display = "none", this.hidePauseAd(), this.buttons.shadow.style.display = "block", (this._recommend = b.get(".x-recommend")) && b.get("#x-player").removeChild(this._recommend), v = !1, this._first || (this._first = !0, this._informationPanel.show(), this.setting.controls.style.display = "block"), this.autoHideDashBoard(5e3)
			},
			onPause: function() {
				this.buttons.play.className = this.setting.classNames.play, b.hide(this.buttons.loading), this.interactionPanel.isVisible() || (this.showBoardInfo(), this.interactionPanel.setStatus("暂停"))
			},
			onWaiting: function() {
				!this.player.video.paused && "none" == this.buttons.videobtn.style.display && (this.buttons.loading.style.display = "block")
			},
			onTryPlayEnded: function() {
				debug.log("try end");
				var a = this.player.video;
				this.player.video.pause(), this._payPanel.activeTime = 0, v = !0, this.onEnded({
					target: a
				}), this._payPanel.showTip();
				var b = this;
				setTimeout(function() {
					b.dashboard.style.display = "none", b.buttons.shadow.style.display = "none", b.interactionPanel.hide()
				}, 1e3)
			},
			onTimeUpdate: function(a) {
				if (this.buttons.loading.style.display = "none", a.target == this.player.video) {
					var b = this.player.currentTime;
					4 == a.target.readyState && this.setProgress(b), this._payPanel.hasPayInfo() && b >= this._payPanel.tryDuration() && this.onTryPlayEnded(), this.playLimit.isLimit() && b >= this.playLimit.limitTime() && this.playLimit.create()
				}
			},
			checkPlayLimit: function() {
				return this.playLimit.isLimit() ? (this.playLimit.create(), !0) : !1
			},
			removeControls: function() {
				this.video.controls = !1
			},
			loadControls: function() {
				this.video.controls = !0
			},
			setProgress: function(a) {
				a = Math.min(Math.max(a, 0), b.videoInfo.totalTime), this.progressBar.setProgress(a), this.miniProgressBar.setProgress(a), this.buttons.currentTime.innerHTML = b.getTime(this.progressBar.playTime)
			},
			resetProgress: function() {
				this.progressBar.resetProgress(), this.miniProgressBar.resetProgress(), this.buttons.currentTime.innerHTML = "00:00"
			},
			hideTimeTip: function(a) {
				return a.srcElement.id == this.buttons.progressHandler.id ? !1 : void(this.buttons.progressTime.style.display = "none")
			},
			showTimeTip: function(a) {
				return a.srcElement.id == this.buttons.progressHandler.id || a.srcElement.id == this.buttons.progressTime.id || a.srcElement.id == this.buttons.pointVideo.id ? !1 : (a = a.offsetX / this.buttons.progressBar.offsetWidth, this.buttons.progressTime.innerHTML = b.getTime(a * b.videoInfo.totalTime), this.buttons.progressTime.style.left = 100 * Math.min(Math.max(a, .023), .977) + "%", void(this.buttons.progressTime.style.display = "block"))
			},
			shadowTouchStart: function(a) {
				1 < a.targetTouches.length ? this.interactionPanel.hide() : (this._sx = a.targetTouches[0].clientX, this._sy = a.targetTouches[0].clientY, this._smx = this._sx, this._smy = this._sy, this._presmx = this._sx, this._presmy = this._sy, this._deltaxs = [], this._ttime = this._stime = this.player.currentTime || 0, this._spretag = this._stmtag = !1, this._presmt = this._sactionTime = (new Date).getTime(), this._stmlrtag = this._sactionType = 0)
			},
			shadowTouchMove: function(a) {
				if (1 < a.targetTouches.length) this.interactionPanel.hide();
				else {
					this._smx = a.targetTouches[0].clientX, this._smy = a.targetTouches[0].clientY, this._smt = (new Date).getTime();
					var b = Math.abs(this._smx - this._sx),
						c = Math.abs(this._smy - this._sy),
						d = this._smt - this._sactionTime;
					0 === this._stmlrtag && (this._stmlrtag = b > c ? 1 : -1), 1 == this._stmlrtag && a.preventDefault(), 1 != this._sactionType && (b > 100 && b > c && 500 > d ? (debug.log("quick seek moving"), this.player.video.pause(), this._sactionType = 1, d = this._smx > this._sx ? 30 : -30, this.interactionPanel.setTip(this._stime, d), this.interactionPanel.show()) : (200 > b && 100 > c && d > 1e3 && (this._spretag = !0), (this._spretag && b > c || this._stmtag) && (debug.log("stmtag =" + this._stmtag), this._sactionType = 2, this._stmtag = !0, this.player.video.pause(), this.dragging(a))))
				}
			},
			shadowTouchEnd: function(a) {
				1 < a.changedTouches.length ? this.interactionPanel.hide() : (this.adrAdapt(a), this.isShadowTouchTooShort() && !this._stmtag && 1 != this._sactionType ? debug.log("too short or horizontal") : (a = Math.abs(this._smy - this._sy) > Math.abs(this._smx - this._sx) ? "xdud" : "xdlr", debug.log("shadow action = " + a), this.player._reporter.sendUserActionReport(a, "d"), 2 == this._sactionType ? (debug.log("<br/><b>normal seek</b>"), this.player.video.play(), this.player.seek(this._ttime), this.interactionPanel.hide(), this.player._reporter.sendUserActionReport("xtseek", "d"), e.Log(e.uniplayerUrl + p({
					e: "xtseek",
					adr: e.isAndroid,
					ios: e.isIPAD,
					d: parseInt(this._ttime - this._stime)
				}))) : 1 == this._sactionType && (a = 0 < this._smx - this._sx ? 30 : -30, debug.log("<br/><font color=red>quick seek deltat = " + a + " cur=" + this._stime + "</font>"), this.setProgress(this._stime + a), this.interactionPanel.setTip(this._stime, a), this.interactionPanel.show(), this.interactionPanel.autoHide(), this.player.video.play(), this.player.seek(this._stime + a), this.player._reporter.sendUserActionReport("xqseek", "d"), e.Log(e.uniplayerUrl + p({
					e: "xqseek",
					adr: e.isAndroid,
					ios: e.isIPAD,
					d: a
				})), debug.log("<br/>"))))
			},
			dragging_: function(a) {
				var c = this._smx - this._presmx;
				this._deltaxs.push(c > 10 ? c / 2 : c);
				for (var d = c = 0; d < this._deltaxs.length; d++) c += this._deltaxs[d];
				a = Math.min(Math.max(c / a.currentTarget.offsetWidth * b.videoInfo.totalTime + this._stime, 0), b.videoInfo.totalTime), this.setProgress(a), this.interactionPanel.show(), this._ttime = a, this._presmx = this._smx, this._presmy = this._smy, this._presmt = this._smt
			},
			dragging: function(a) {
				a = Math.min(Math.max(60 * ((this._smx - this._sx) / a.currentTarget.offsetWidth) + this._stime, 0), b.videoInfo.totalTime), this.setProgress(a), this.interactionPanel.setTip(this._ttime, a - this._ttime), this.interactionPanel.show(), this._ttime = a, this._presmx = this._smx, this._presmy = this._smy, this._presmt = this._smt
			},
			onProgress: function(a) {
				this.interactionPanel.setTip(a.st || 0, a.dt || 0), this.interactionPanel.show()
			},
			onProgressEnd: function() {
				this.interactionPanel.hide()
			},
			onSettingDone: function() {
				this.interactionPanel.setStatus("设置成功")
			},
			onSettingShow: function() {
				debug.log("<b>setting show</b>"), clearTimeout(this.pbarClickTimer), this.progressBar.removeClickEvent()
			},
			onSettingHide: function() {
				debug.log("<b>setting hide</b>");
				var a = this;
				this.pbarClickTimer = setTimeout(function() {
					a.progressBar.addClickEvent()
				}, 1e3)
			},
			onEnterFullScreen: function() {
				e.isIPAD && b.addClass(this.setting.controls, "x-fs-console")
			},
			onExitFullScreen: function() {
				e.isIPAD && b.removeClass(this.setting.controls, "x-fs-console")
			},
			adrAdapt: function(a) {
				e.isAndroid && (this._smx = a.changedTouches[0].clientX, this._smy = a.changedTouches[0].clientY, debug.log("<hr/>adr smy= " + this._smy + " y = " + this._sy))
			},
			isShadowTouchTooShort: function(a) {
				return this.isTouchTooShort({
					x: this._sx,
					y: this._sy
				}, {
					x: this._smx,
					y: this._smy
				}, a)
			},
			isTouchTooShort: function(a, b, c) {
				var d = Math.abs(b.x - a.x),
					d = d || 1e-6,
					a = (a = Math.abs(b.y - a.y)) || 1e-6;
				return debug.log(d + "," + a), c = c || 100, c > d && c > a ? !0 : !1
			},
			showShowListBtn: function() {
				this.showlistPanel.showListBtn()
			},
			hideShowListBtn: function() {
				this.showlistPanel.hideListBtn()
			},
			showLastTimeTip: function(a) {
				0 >= a || this.tipPanel.showLastTimeTip(a)
			},
			uiInit: function() {
				debug.log("uiInit"), v && (v = !1, this.buttons.videobtn.style.display = "block")
			},
			onResize: function(a) {
				var c = document.getElementById(b.config.parentBox).offsetWidth,
					d = document.getElementById(b.config.parentBox).offsetHeight;
				c && d && b.resizeTag && (this.player._reporter.sendUserActionReport("xre", "r"), d = this.xplayer.className, this.xplayer && (-1 === d.indexOf("fullscreen") ? this.xplayer.className = y(c) : (c = window.innerWidth, this.xplayer.className = y(c) + " x-player-fullscreen")), this._relatedPanel) && this._relatedPanel.onResize(a)
			}
		};
		var N = function() {
				this.video = b.get("#youku-html5player-video"), this._startPlayTime = -1, this.currentTime = this._waitTry = 0
			};
		N.prototype = {
			getVideo: function() {
				return this.video
			},
			show: function() {
				b.show(this.video)
			},
			hide: function() {
				b.hide(this.video)
			},
			play: function() {
				b.v && b.v.data[0].trial && 0 == b.v.data[0].trial.time ? debug.log("<b> trial time = 0  </b>") : this.video.play()
			},
			pause: function() {
				this.video.pause()
			},
			setupControls: function(a) {
				return this.controls && this.controls.removeEvent(), new ma(a)
			},
			hideControls: function() {
				this.controls.hide()
			},
			showControls: function() {
				this.controls.show()
			},
			removeControls: function() {
				this.controls.removeControls()
			},
			loadControls: function() {
				this.controls.loadControls()
			},
			retry: function() {},
			showError: function(a) {
				this.errorBox || (this.errorBox = document.createElement("div"), this.errorBox.style.cssText = "position:absolute;width:100%;top:50%;display:none;text-align:center;", this.video.parentNode.appendChild(this.errorBox)), this.errorBox.innerHTML = a, this.errorBox.style.marginTop = "-" + this.errorBox.offsetHeight / 2 + "px", this.errorBox.style.display = "block"
			},
			onLoadStart: function() {},
			onCanPlay: function() {},
			onLoadedData: function() {},
			onLoadedMetaData: function() {},
			onAbort: function() {},
			onError: function() {
				if (this._reporter.sendUserActionReport("xve", "e"), this._reporter.sendUepReport("videoload", -1, !1), e.uniReport({
					error: 10,
					vid: b.v.data[0].videoid,
					time: this.currentTime,
					errorcode: this.video.error.code,
					ua: escape(navigator.userAgent.replace(/[\/\+\*@\(\)\,]/g, ""))
				}), 0 <= this._retry--) - 1 !== this.video.src.indexOf("m3u8") && (this.video.src = b.m3u8src_v2(b.v.data[0].videoid, b.defaultVideoType)), debug.log("video onerror retry it ,time=" + this.currentTime + " src=" + this.video.src), this.video.load(), this.video.play(), this.seek(this.currentTime);
				else if (!(this.isOnePiece() && 1 == this.controls.checkPlayLimit() || this._errorTag)) {
					e.uniReport({
						error: 11,
						errorcode: this.video.error.code,
						vid: b.v.data[0].videoid,
						ua: escape(navigator.userAgent.replace(/[\/\+\*@\(\)\,]/g, ""))
					}), this._errorTag = !0, b.playerEvents && b.playerEvents.onPlayError && b.playerEvents.onPlayError("抱歉，视频出错，请刷新");
					var a = b.get("#x-player");
					a.innerHTML = "抱歉，视频出错，请刷新", a.style.textAlign = "center", a.style.color = "white", a.style.lineHeight = a.offsetHeight + "px"
				}
			},
			onPause: function() {
				this.controls.onPause()
			},
			onPlayIPH: function() {
				debug.log("onplayiph"), this.onPlayStart(), this._firstPlayTag ? 1 == this._endedIPH && (this._reporter.tsInit(), this._reporter.sendVVLog(62), this._reporter.sendTSLog(60), this._reporter.addPlayerDurationReport(62)) : (this._firstPlayTag = !0, this._reporter.addPlayerStaticReport(), this._reporter.addPlayerDurationReport(59), this._reporter.sendVVLog(59), this._reporter.sendTSLog(60), this._reporter.sendUserActionReport("xps", "c"), this._reporter.sendLoadedTime(3), this._reporter.sendThirdPartyReport("xplayer_iph"), this._reporter.sendClientConsumeReport())
			},
			onTimeUpdateIPH: function() {
				this.currentTime = this.video.currentTime
			},
			onEndedIPH: function() {
				this.onPlayEnd(), this._reporter.addPlayerDurationReport(61), this._reporter.sendTSLog(61), this._endedIPH = !0
			},
			onPlay: function() {
				debug.log("onplay"), this.controls.onPlay(), this._firstPlayTag || (this._firstPlayTag = !0, this.onPlayStart(), b.initConfig.firsttime ? (debug.log("starttime = " + b.initConfig.firsttime), this.seek(b.initConfig.firsttime)) : this.seekToLastPoint() || this.skipHead(), this._startPlayTime = (new Date).getTime(), this._reporter.addPlayerStaticReport(), this._reporter.addPlayerDurationReport(59), this._reporter.sendVVLog(59), this._reporter.sendTSLog(60), this._reporter.sendClientConsumeReport()), l.appendItem("phase", "videoplay")
			},
			onVolumeChange: function() {},
			onPlaying: function() {},
			onStalled: function(a) {
				debug.log("<b>stalled</b>"), (this.isOnePiece() || a.target == this.video) && this.controls.onWaiting(a)
			},
			onSuspend: function() {},
			onWaiting: function(a) {
				(this.isOnePiece() || a.target == this.video) && this.controls.onWaiting(a)
			},
			onSeeked: function() {
				if (debug.log("onSeeked waitSkip=" + this._waitSeek + " try= " + this._waitTry), !isNaN(this._waitSeek)) {
					var a = this._waitSeek;
					10 < Math.abs(this.video.currentTime - a) && 5 >= this._waitTry ? (this._waitTry += 1, this.seek(a)) : this._waitSeek = "NaN"
				}
			},
			onSeeking: function(a) {
				if (debug.log("seeking"), this.isOnePiece() || a.target == this.video) {
					var b = this;
					setTimeout(function() {
						b.controls.onWaiting(a)
					}, 100)
				}
			},
			onDurationChange: function() {},
			onProgress: function() {},
			onRateChange: function() {},
			customWaiting: function() {
				var a = this;
				0 == this.video.paused && this._lastTime === this.currentTime && (debug.log("custom waiting!:) networkstate=" + this.video.networkState), this.controls.onWaiting()), this._lastTime = this.currentTime, setTimeout(function() {
					a.customWaiting()
				}, 5e3)
			},
			sendLoadedTime: function() {
				var a = 0,
					a = -1 == this._startPlayTime ? 0 : (new Date).getTime() - this._startPlayTime;
				this._reporter.sendLoadedTime(a)
			},
			onTimeUpdate: function(a) {
				if (this.isOnePiece()) this.currentTime = this.video.currentTime, b.unitedTag && (this.currentTime -= b.unitedTag.offset);
				else {
					for (var c = 0, d = 0; r > d; d++) c += parseInt(b.videoInfo._videoSegsDic[m][d].seconds);
					this.currentTime = c + this.video.currentTime
				}
				this.controls.onTimeUpdate(a), this._firstflag || (this._firstflag = !0, this.customWaiting(), this.recordLocalPlayPoint(), this.sendLoadedTime(), l.appendItem("phase", "videotimeupdate"), e.isNeedAdrTrick() && e.adrInvalidPauseCheck(this.video)), this._comscoreflag || (this._comscoreflag = !0, this._reporter.sendThirdPartyReport("xplayer_h5")), this.skipTail(this.currentTime)
			},
			curVideo: function() {
				return this.video
			},
			getQuality: function() {
				if ("m3u8" != b.config.content) return "m";
				var a = this.video.src;
				return -1 !== a.indexOf("mp4") ? "m" : -1 !== a.indexOf("flv") ? "f" : -1 !== a.indexOf("hd2") ? "h" : void 0
			},
			bufferedEnd: function() {
				var a = this.curVideo().buffered;
				return 0 == a.length ? 0 : a.end(a.length - 1)
			},
			loadNextVideo: function() {
				var a = b.v.data[0].list_next,
					c = this;
				if (debug.log("loadNextVideo vid = " + a.vidEncoded), a.vidEncoded) {
					var d = {
						isFullScreen: !0,
						vid: a.vid,
						vidEncoded: a.vidEncoded,
						Pt: 2 == window.playmode ? a.seq : null
					};
					b.config.nextAutoPlay = !0, k.start(a.vidEncoded, "", b.config.content, function(a, b) {
						c.startPlay(a, b);
						try {
							onPlayerStart(d)
						} catch (e) {
							console.log("onPlayerStart error")
						}
					})
				}
			},
			onPlayEnd: function() {
				e.playerCurrentState = e.playerState.PLAYER_STATE_END, debug.log(e.playerCurrentState), b.config.events && b.config.events.onPlayEnd && (debug.log("callback: on play end"), b.config.events.onPlayEnd(b.v.data[0].list_next))
			},
			onPlayStart: function() {
				b.config.events && b.config.events.onPlayStart && (e.playerCurrentState = e.playerState.PLAYER_STATE_PLAYING, debug.log(e.playerCurrentState), debug.log("callback: on play start"), b.config.events.onPlayStart())
			},
			onMiddleEnded: function() {
				r++, this.video.src = b.multiPieceSrc(r), this.video.load(), this.video.play(), this.video.style.display = "block", debug.log("middle src = " + this.video.src)
			},
			onEnded: function(a) {
				this.isOnePiece() && 1 == this.controls.checkPlayLimit() || (this.isOnePiece() || r == b.videoInfo._videoSegsDic[m].length - 1 ? (v = !0, this._reporter.addPlayerDurationReport(61), this._reporter.sendTSLog(61), this.clearLocalPlayPoint(), this.showEndCard(a), l.appendItem("phase", "videoended")) : this.onMiddleEnded(a))
			},
			showEndCard: function(a) {
				this.video.style.display = "none", this.controls.onEnded(a), this.onPlayEnd()
			},
			onBeginFullscreen: function() {},
			onEndFullscreen: function() {
				debug.log("end full screen controls = " + this.video.controls)
			},
			detectIsPlaying: function(a) {
				var b = a || 0,
					c = this;
				clearTimeout(this.timeoutTimer), 0 === this.video.currentTime && 60 >= b && (this.video.load(), this.play(), this.timeoutTimer = setTimeout(function() {
					c.detectIsPlaying(++b)
				}, 1e3))
			},
			isOnePiece: function() {
				return "m3u8" == b.config.content || "mp4" == b.config.content && 1 == b.videoInfo._videoSegsDic[m].length
			},
			bindEvent: function() {
				if (!b.v.data[0].error_code && !b.v.data[0].error) if ("directsrc" == b.config.playType) b.addEventHandler(this.video, "play", b.bindAsEventListener(this, this.onPlayIPH)), b.addEventHandler(this.video, "timeupdate", b.bindAsEventListener(this, this.onTimeUpdateIPH)), b.addEventHandler(this.video, "ended", b.bindAsEventListener(this, this.onEndedIPH));
				else {
					var a, c = {
						loadstart: "onLoadStart",
						canplay: "onCanPlay",
						loadeddata: "onLoadedData",
						loadedmetadata: "onLoadedMetaData",
						abort: "onAbort",
						error: "onError",
						pause: "onPause",
						waiting: "onWaiting",
						stalled: "onStalled",
						suspend: "onSuspend",
						play: "onPlay",
						volumechange: "onVolumeChange",
						playing: "onPlaying",
						seeked: "onSeeked",
						seeking: "onSeeking",
						durationchange: "onDurationChange",
						progress: "onProgress",
						ratechange: "onRateChange",
						timeupdate: "onTimeUpdate",
						ended: "onEnded",
						webkitbeginfullscreen: "onBeginFullscreen",
						webkitendfullscreen: "onEndFullscreen"
					};
					for (a in c) b.addEventHandler(this.video, a, b.bindAsEventListener(this, this[c[a]]))
				}
			}
		};
		var r = -1,
			v = !1,
			m = null,
			da = 0,
			ea = 600,
			s = {
				flvhd: "标清",
				flv: "标清",
				mp4: "高清",
				hd2: "超清"
			};
		b.WIN_TYPE = 30, b.defaultVideoType = "mp4", b.resizeTag = !0, b.extend = function(a, b) {
			for (var c in b) a[c] = b[c]
		}, b.inherits = function(a, b) {
			var c = function() {};
			c.prototype = b.prototype, a.prototype = new c, a.prototype.constructor = a
		}, b.bind = function(a, b) {
			return function() {
				return b.apply(a, arguments)
			}
		}, b.bindAsEventListener = function(a, b) {
			var c = Array.prototype.slice.call(arguments).slice(2);
			return function(d) {
				return b.apply(a, [d || window.event].concat(c))
			}
		}, b.getCurrentStyle = function(a) {
			return a.currentStyle || document.defaultView.getComputedStyle(a, null)
		}, b.addEventHandler = function(a, c, d, e) {
			b.config.isMobile && "click" == c && !e && (c = "touchend"), a.addEventListener ? a.addEventListener(c, d, !1) : a.attachEvent ? a.attachEvent("on" + c, d) : a["on" + c] = d
		}, b.removeEventHandler = function(a, c, d, e) {
			b.config.isMobile && "click" == c && !e && (c = "touchend"), a.removeEventListener ? a.removeEventListener(c, d, !1) : a.detachEvent ? a.detachEvent("on" + c, d) : a["on" + c] = null
		}, b.show = function(a) {
			a.style.display = "video" === a.tagName.toLowerCase() ? "" : "block"
		}, b.hide = function(a) {
			a && (a.style.display = "none")
		}, b.getLeftPosition = function(a) {
			for (var b = a.offsetLeft; a.offsetParent;) a = a.offsetParent, b += a.offsetLeft;
			return b
		}, b.get = function(a) {
			return document.querySelector(a)
		}, b.pieceLength = function() {
			return "m3u8" == b.config.content ? 1 : b.videoInfo._videoSegsDic[m].length
		}, b.multiPieceSrc = function(a) {
			return a >= b.videoInfo._videoSegsDic[m].length ? "" : b.videoInfo._videoSegsDic[m][a].src
		}, b.getTime = function(a) {
			if (!a) return "00:00";
			var b = Math.floor(a),
				a = b % 60,
				b = Math.floor(b / 60);
			return (10 > b ? "0" + b : b) + ":" + (10 > a ? "0" + a : a)
		}, b.addClass = function(a, c) {
			b.hasClass(a, c) || (a.className += " " + c)
		}, b.hasClass = function(a, b) {
			return RegExp("(^| )" + b + "( |$)").test(a.className)
		}, b.removeClass = function(a, b) {
			a.className = a.className.replace(RegExp("(^| )" + b + "( |$)"), " ").replace(/^\s+|\s+$/g, "")
		}, b.m3u8src = function(a, b) {
			var c = "http://v.youku.com/player/getM3U8/vid/" + a + "/type/" + b + "/ts/" + parseInt((new Date).getTime() / 1e3);
			return (e.isIPHONE || e.isIPOD) && (c += "/useKeyFrame/0"), c + "/v.m3u8"
		}, b.m3u8src_v2 = function(a, c) {
			if (b.OLD_M3U8) return b.m3u8src(a, c);
			var d = {
				vid: a,
				type: c,
				ts: parseInt((new Date).getTime() / 1e3),
				keyframe: e.isIPHONE ? 0 : 1
			};
			b.password && (d.password = b.password), b.password && b.initConfig.client_id && b.config.partner_config && 1 == b.config.partner_config.status && 1 == b.config.partner_config.passless && (d.client_id = b.initConfig.client_id);
			var f = encodeURIComponent(D(E(F(b.mk.a4 + "poz" + e.userCache.a2, [19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26]).toString(), e.userCache.sid + "_" + a + "_" + e.userCache.token)));
			return d.ep = f, d.sid = e.userCache.sid, d.token = e.userCache.token, d.ctype = "12", d.ev = "1", d.oip = b.v.data[0].ip, "http://pl.youku.com/playlist/m3u8?" + n(d)
		}, b.isLandScape = function() {
			return 90 == window.orientation || -90 == window.orientation
		}, YoukuHTML5Player = function(a) {
			null == a.parentBox && (a.parentBox = "parentBox"), a.expand && 0 < parseInt(a.width) ? (document.getElementById(a.parentBox).style.width = a.width + "px", document.getElementById(a.parentBox).style.height = a.height + "px") : (a.width = document.getElementById(a.parentBox).offsetWidth, a.height = document.getElementById(a.parentBox).offsetHeight), b.config = a;
			var c = document.getElementById(b.config.parentBox),
				d = parseInt(b.config.width);
			parseInt(b.config.height), playerDom = '<div id=x-player class="' + y(d) + '">', c.innerHTML = playerDom + '<video class=x-video-player id=youku-html5player-video></video><div class=x-video-poster><img></img></div><div class=x-video-loading></div><div class=x-video-info><h1 class=x-title></h1><div class=x-video-state></div><div class=x-showmore></div><div class=x-mask></div></div><div id=x-video-button class=x-video-button><div class=x-video-play-ico></div></div><div class=x-feedback><div class="x-message"><div class=x-message-txt></div><div class=x-message-btn></div></div><div class="x-mask"></div></div><div class="x-pay"><div class=x-pay-txt><h1><em class=vip></em></h1><p class=x-pay-tips></p></div><div class=x-pay-btn><button type=button id=x-try class=x-btn>免费试看</button><button type=button id=x-pay class="x-btn x-btn-pay"></button></div></div><div class=x-advert><div class=x-advert-info><div class=x-advert-skip><div class=x-advert-txt></div><div class=x-mask></div></div><div class=x-advert-countdown><div class=x-advert-txt></div><div class=x-mask></div></div></div><div class=x-advert-detail><div class=x-advert-txt>详细了解<span class=x-ico-detail></span></div><div class=x-mask></div></div></div><div class=x-ad-pause></div><div class=x-prompt></div><div class="x-dashboard"><div class=x-progress-mini><div class=x-progress-track-mini></div><div class=x-progress-load-mini></div><div class=x-progress-play-mini></div></div><div class="x-console"><div class="x-progress"><div class="x-progress-track"><div class="x-progress-load"></div><div class=x-progress-play></div><div class="x-progress-seek"><div class="x-seek-handle"></div></div></div></div><div class="x-controls"><div class="x-play-control"><button class="x-control-btn"><b id=x-playbtn class="x-playing"><em>播放</em></b></button></div><div class="x-time-display"><span class="x-time-current">00:00</span><span class="x-time-splite">/</span><span class="x-time-duration">00:00</span></div><div class="x-settings"><div class=x-playspeed></div><div class=x-playshow style=display:none><button class=x-control-btn title=选集>选集</button></div><div class="x-localization"></div><div class="x-quality"></div><div class="x-fullscreen"><button class="x-control-btn" type="button" title="全屏模式" rol="button"><b class=x-zoomin><em>全屏</em></b></button></div></div></div></div></div><div class=x-showlist></div><div class=x-tips></div><div class=x-trigger></div></div>', N.apply(this, arguments), this.video.style.width = "100%", this.video.style.height = "100%", this.video.style.display = "none", this.video.style.position = "relative", this._firstPlayTag = !1, this._retry = 2, this.uiAdapter()
		}, b.inherits(YoukuHTML5Player, N), b.extend(YoukuHTML5Player.prototype, {
			startPlay: function(a, c, d) {
				a && a.data && a.data[0] && (a.data[0].show = a.data[0].show || {}, c.abstarttime = (new Date).getTime(), c._playListData = a.data[0], c._user = a.user, b.v = a, b.videoInfo = c, this.setting = {}, b.extend(this.setting, d), !a.data[0].error_code && !a.data[0].error || !this.processError(a, c, d)) && (this._reporter = new K(this, b.v, b.videoInfo._sid), this.controls = this.setupControls(this), this.controls.init(b.v, b.videoInfo), this.mpieceReport(), this.createIdNode(), this.isNeedAdRequest() ? this.processAd() : (this.controls.bindVideoBtnEvent(), this.realStartPlay()))
			},
			isNeedAdRequest: function() {
				return "undefined" == typeof this._frontAdTag && (this._frontAdTag = !1), e.isNeedFrontAd = !this._frontAdTag && "directsrc" != b.config.playType && !b.v.data[0].trial, e.isNeedFrontAd
			},
			processAd: function() {
				this.isNeedAdRequest() && (this._frontAdTag = !0, this._adplugin = new M(this, b.v, b.videoInfo._sid), this.bind_frontAd = b.bindAsEventListener(this, this.onFrontAdInfoOK), this.bind_frontAdInfoTimeout = b.bindAsEventListener(this, this.onFrontAdInfoTimeout), this._adplugin.addEventListener(ADConstant.FRONT_AD_INFO_OK, this.bind_frontAd, !1), this._adplugin.addEventListener(ADConstant.FRONT_AD_INFO_TIMEOUT, this.bind_frontAdInfoTimeout), this.bind_unitedFrontAd = b.bindAsEventListener(this, this.onUnitedFrontAdInfoOK), this._adplugin.addEventListener(ADConstant.FRONT_AD_UNITED_INFO_OK, this.bind_unitedFrontAd, !1), this.bind_backAdInfoOK = b.bindAsEventListener(this, this.onBackAdInfoOK), this.bind_backAdInfoTimeout = b.bindAsEventListener(this, this.onBackAdInfoTimeout), this._adplugin.addEventListener(ADConstant.BACK_AD_INFO_OK, this.bind_backAdInfoOK, !1), this._adplugin.addEventListener(ADConstant.BACK_AD_INFO_TIMEOUT, this.bind_backAdInfoTimeout), this.bind_uglyCloseAd = b.bindAsEventListener(this, this.onUglyCloseAd), this._adplugin.addEventListener(ADConstant.UGLY_CLOSE_AD, this.bind_uglyCloseAd), this.controls.bindAdVideoBtnEvent(), window[ADConstant.AdPluginObject] = this._adplugin)
			},
			requestAd: function() {
				this._adplugin && this._adplugin.frontAd()
			},
			onUglyCloseHint: function() {
				this.controls.showUglyHint()
			},
			onUglyCloseAd: function() {
				debug.log("ugly close"), this.controls.closeUglyHint(), this.adplayer.uglyClose()
			},
			onFrontAdInfoTimeout: function() {
				this._hasStartPlay = !0, this.realStartPlay(!0)
			},
			onUnitedFrontAdInfoOK: function(a) {
				debug.log("<b>on united front adinfo ok</b>");
				var c = a.data.info;
				if (0 == a.data.info.VAL.length) debug.log("<b>onUnitedFrontAdInfoOK val length == 0 </b>"), this.loadVTVC(a.data.vtvc), this.video.src = b.m3u8src_v2(b.v.data[0].videoid, b.defaultVideoType), this.unitedStartPlay(c, !0);
				else {
					this.adplayer = new la(this, a);
					var d = this;
					this.adplayer.addEventListener(ADConstant.AD_END, function() {
						debug.log("<font color=red>united ad end</font>"), d._realFlag || (d._realFlag = !0, d.adplayer.clearTimer(), d.unitedStartPlay(c))
					}, !1), this.adplayer.addEventListener(ADConstant.AD_ERROR, function() {
						debug.log("<font color=red>united ad error</font>"), d._realFlag || (b.unitedTag = null, d._realFlag = !0, d.adplayer.clearTimer(), d.video.src = b.m3u8src_v2(b.v.data[0].videoid, b.defaultVideoType), d.unitedStartPlay(c, !0))
					}, !1), this.adplayer.addEventListener(ADConstant.UGLY_CLOSE_AD_HINT, function() {
						debug.log("<b>ugly hint</b>"), d.onUglyCloseHint()
					}, !1), this.adplayer.play(), this.createIdNode()
				}
			},
			loadVTVC: function(a) {
				for (var b = 0; b < a.length; b++) x(a[b].VC, "js")
			},
			onFrontAdInfoOK: function(a) {
				if (debug.log("onFrontAdInfoOK"), !0 !== this._hasStartPlay) if (0 == a.data.urls.length) this.loadVTVC(a.data.vtvc), this.realStartPlay(!0);
				else {
					e.playerCurrentState = e.playerState.PLAYER_STATE_AD, debug.log(e.playerCurrentState), this.adplayer = new L(this, a);
					var b = this;
					this.adplayer.addEventListener(ADConstant.AD_END, function(a) {
						debug.log("ad end"), b._realFlag || (b._realFlag = !0, b.adplayer.clearTimer(), b.realStartPlay(a.data))
					}, !1), this.adplayer.addEventListener(ADConstant.AD_ERROR, function(a) {
						debug.log("<font color=red>ad error</font>"), b._realFlag || (b._realFlag = !0, b.adplayer.clearTimer(), b.realStartPlay(a.data))
					}, !1), this.adplayer.addEventListener(ADConstant.UGLY_CLOSE_AD_HINT, function() {
						debug.log("<b>ugly hint</b>"), b.onUglyCloseHint()
					}, !1), this.adplayer.play(), this.createIdNode()
				}
			},
			onBackAdInfoTimeout: function() {
				debug.log("onBackAdInfoTimeout"), this.showEndCard()
			},
			onBackAdInfoOK: function(a) {
				if (debug.log("onBackAdInfoOK"), 0 == a.data.urls.length) this.showEndCard();
				else {
					this.adplayer = new L(this, a);
					var b = this;
					this.adplayer.addEventListener(ADConstant.AD_END, function() {
						b.showEndCard()
					}), this.adplayer.addEventListener(ADConstant.AD_ERROR, function() {
						b.showEndCard()
					}), this.adplayer.play()
				}
			},
			prepareVideoTag: function() {
				this.video.preload = "none", "m3u8" == b.config.content ? this.video.src = b.videoInfo.src : null != b.videoInfo._videoSegsDic && null != b.videoInfo._videoSegsDic[m] && (this.video.src = b.videoInfo._videoSegsDic[m][0].src), b.v.data[0].trial && 0 == b.v.data[0].trial.time && (this.video.src = null), this.createIdNode()
			},
			createIdNode: function() {
				if (!document.getElementById(b.config.id)) {
					var a = document.createElement("div");
					a.id = b.config.id, document.getElementById(b.config.parentBox).appendChild(a)
				}
			},
			redirect: function() {
				var a = "";
				"m3u8" == b.config.content ? a = b.videoInfo.src : null != b.videoInfo._videoSegsDic && null != b.videoInfo._videoSegsDic[m] && (a = b.videoInfo._videoSegsDic[m][0].src), debug.log("redirect play src=" + a), this._reporter.addPlayerStaticReport(), this._reporter.addPlayerDurationReport(59), this._reporter.sendVVLog(59), this._reporter.sendTSLog(60), this._reporter.sendUserActionReport("xps", "c"), window.open(a, "", "", !1), this._reporter.sendClientConsumeReport(), this.onPlayStart()
			},
			realStartPlay: function(a) {
				debug.log("realStartPlay " + a), this.controls.bindEvent(), this.bindEvent(), this.prepareVideoTag(), this.playVideos(a)
			},
			unitedStartPlay: function(a, c) {
				debug.log("<b>united start play </b>"), b.unitedTag = {
					offset: a.VAL.length ? a.VAL[0].AL : 0
				}, this.controls.bindEvent(), this.bindEvent(), !0 === c ? (this.video.load(), this.video.play()) : this.onPlay(), this.controls.onPlay()
			},
			playVideos: function(a) {
				debug.log("playVideos " + a), v = !1, r = 0, this.video.style.display = "block", (b.config.autoplay || b.config.nextAutoPlay || a) && (debug.log("src= " + this.video.src + " auto = " + a), this.video.load(), this.video.play())
			},
			processError: function(a) {
				var c = a.data[0].error_code;
				return -12 == c || -13 == c ? (a.data[0].error_code = null, a.data[0].error = null, a.data[0].trial = {
					time: 0
				}, !1) : (b.hide(b.get(".x-video-poster")), this.feedbackPanel = new J(this, a), !0)
			},
			mpieceReport: function() {
				"mp4" == b.config.content && b.videoInfo._videoSegsDic && null != b.videoInfo._videoSegsDic[m] && 1 < b.videoInfo._videoSegsDic[m].length && (debug.log("mpiece report"), e.Log(e.MPIECEURL + p({
					partner: b.config.partnerId,
					type: m,
					length: b.videoInfo._videoSegsDic[m].length,
					vid: b.v.data[0].videoid
				})))
			},
			resize_: function(a, c, d) {
				debug.log("resize=" + b.resizeTag), c && d && b.resizeTag && this.controls && (a = this.controls.xplayer.className, this.controls && this.controls.xplayer && (-1 === a.indexOf("fullscreen") ? this.controls.xplayer.className = y(c) : (c = window.innerWidth, this.controls.xplayer.className = y(c) + " x-player-fullscreen")))
			},
			uiAdapter: function() {
				"index" == b.config.wintype && (b.hide(b.get(".x-localization")), b.hide(b.get(".x-quality"))), b.get("#x-video-button").className = "x-video-button", "m3u8" != b.config.content && b.hide(b.get(".x-quality"));
				var a = this;
				window.addEventListener("resize", function(b) {
					debug.log("window.resize"), a.controls && a.controls.onResize(b)
				}, !1)
			},
			isOutTryDuration: function(a) {
				return this.tryDuration ? a >= this.tryDuration : !1
			},
			replay: function() {
				r = 0, this._ireflag = this._comscoreflag = !1, this._firstflag = e.adrPlayTrick = !1, this.video.style.display = "block", this.isOnePiece() || (this.video.src = b.multiPieceSrc(r)), e.isIPAD && (this.video.src = b.m3u8src_v2(b.v.data[0].videoid, b.defaultVideoType), b.unitedTag = null), this.video.load(), this.video.play(), this._reporter.tsInit(), this._reporter.sendVVLog(62), this._reporter.sendTSLog(60), this._reporter.addPlayerDurationReport(62)
			},
			seekToLastPoint: function() {
				if (e.isAndroid) return !1;
				var a = b.v.data[0].lastpoint / 1e3 || -1,
					c = parseInt(l.getItem(b.v.data[0].videoid + "_playpoint")) || -1,
					d = -1;
				return -1 != a && -1 != c ? (d = a, 60 > Math.abs(a - c) && (d = c)) : (d = a, -1 == a && (d = c)), debug.log("lastpoint=" + d), a = l.getItem("youku_ignore_lasttime"), a = parseInt(a) || 0, -1 !== d && d >= 120 && 3 > a && null == b.v.data[0].trial && 0 == b.v.controller.xplayer_disable && 600 <= b.v.data[0].seconds ? (this.controls.showLastTimeTip(d), e.isAndroid && (this._waitSeek = d), this.seek(d), !0) : !1
			},
			clearLocalPlayPoint: function() {
				var a = b.v.data[0].videoid;
				clearTimeout(this._recordLPPTimer), l.removeItem(a + "_playpoint")
			},
			recordLocalPlayPoint: function() {
				var a = b.v.data[0].videoid,
					c = this.currentTime || 0,
					d = this;
				if (this._recordLPPTimer = setTimeout(function() {
					d.recordLocalPlayPoint()
				}, 1e4), l.removeItem(a + "_playpoint"), 600 <= b.v.data[0].seconds && c < b.v.data[0].seconds - 120 && null == b.v.data[0].trial && c >= 120 && (l.setItem(a + "_playpoint", c), !this.updatePPVids)) {
					if (this.updatePPVids = !0, c = l.getItem("youku_playpoint_vids") || "", "" == c) c = a;
					else {
						for (var c = c.split(":"), e = 0; e < c.length; e++) c[e] == a && (c[e] = "");
						for (c.push(a), c = c.join(":"), e = 0;
						":" == c.charAt(e);) e++;
						c = c.substring(e), c = c.replace(/:(:)+/g, ":")
					}
					a = c.split(":"), 30 < a.length && (debug.log("slice"), l.removeItem(a[0] + "_playpoint"), c = a.slice(1).join(":")), debug.log("youku_playpoint_vids=" + c), l.setItem("youku_playpoint_vids", c)
				}
			},
			skipHead: function() {
				if (!e.isAndroid) {
					var a = parseInt((b.v.data[0].dvd || {}).head || -1);
					debug.log("skiphead = " + a), -1 != a && (this.controls.tipPanel.onSkipHead(), "true" == l.getItem("youku_conf_skip") && (e.isAndroid && (this._waitSeek = a / 1e3), this.seek(a / 1e3)))
				}
			},
			skipTail: function(a) {
				if (!e.isAndroid) {
					var c = parseInt((b.v.data[0].dvd || {}).tail || -1); - 1 != c && a >= c / 1e3 - 10 && !this._tailTip && (debug.log("skiptail(act before 10) =" + c), this._tailTip = !0, this.controls.tipPanel.onSkipTail()), -1 != c && a >= c / 1e3 && !this._tailSkipped && (this._tailSkipped = !0, "true" == l.getItem("youku_conf_skip") && this.seek(parseInt(b.v.data[0].seconds) - 1))
				}
			},
			assistSkipTail: function(a) {
				var c = parseInt((b.v.data[0].dvd || {}).tail || -1);
				this._tailTip = this._tailSkipped = a >= c / 1e3 ? !0 : !1
			},
			seek: function(a, c) {
				a = a || 0, a = Math.max(a, 0), b.videoInfo.totalTime && (a = Math.min(a, b.videoInfo.totalTime - 5)), this.isOutTryDuration(a) && (a = this.tryDuration - 1), this.assistSkipTail(a);
				var d = this;
				if (this.switchTimer && clearTimeout(this.switchTimer), this.currentTime = a, this.isOnePiece()) {
					var e = this.video.seekable;
					b.unitedTag && (a += b.unitedTag.offset), 1 == e.length && a < e.end(0) ? (debug.log("seek ct = " + a + ",end = " + e.end(0)), this.seekTo(a, c)) : (this.controls.onWaiting(), this.switchTimer = setTimeout(function() {
						d.seek(a, c)
					}, 100))
				} else debug.log("multi seek"), this.multiSeekTo(a)
			},
			seekTo: function(a, b) {
				if (this.isOnePiece()) {
					debug.log("is one piece");
					var c = this;
					try {
						c.video.currentTime = a
					} catch (d) {
						var e = 0;
						this.video.addEventListener("canplay", function() {
							1 !== e && (e = 1, debug.log("canplay time=" + a), c.video.currentTime = a)
						})
					}
					"function" == typeof b && (debug.log("<b>seekto callback(mayby play)</b>"), b())
				}
			},
			multiSeekTo_: function() {
				debug.log("YoukuHTML5 ")
			},
			multiSeekTo: function(a) {
				debug.log("YoukuHTML5Player multiSeekTo !");
				for (var c = 0, d = 0, e = 0, f = 0; f < b.videoInfo._videoSegsDic[m].length; f++) {
					var g = parseInt(b.videoInfo._videoSegsDic[m][f].seconds),
						c = c + g;
					if (c > a) {
						d = f, e = g - (c - a);
						break
					}
					if (c == a) {
						d = f + 1, e = 0;
						break
					}
				}
				if (this.video.pause(), d == r) {
					debug.log(" piece time = " + e);
					try {
						this.video.currentTime = e
					} catch (h) {}
				} else {
					r = d;
					var i = 0,
						j = this;
					this.video.addEventListener("canplay", function() {
						1 !== i && (i = 1, debug.log("canplay time=" + e), j.video.currentTime = e)
					}), this.video.src = b.multiPieceSrc(r), this.video.load()
				}
				this.video.play(), this.video.style.display = "block"
			},
			adjustVideoRatio: function(a) {
				if (!e.isIOS) {
					if (("onorientationchange" in window || "orientation" in window) && !this._avrTag) {
						this._avrTag = !0;
						var c = this;
						window.addEventListener("orientationchange", function() {
							!0 === c.controls.fullscreenPanel.fullFlag() && c.adjustVideoRatio()
						})
					}
					var c = this,
						d = this.video;
					setTimeout(function() {
						if (1 === a) d.style.width = "100%", d.style.height = "100%", d.style.top = null, d.style.left = null;
						else {
							var c = b.get(".x-player"),
								c = c.offsetWidth / c.offsetHeight,
								e = d.videoWidth / d.videoHeight;
							isNaN(e) || isNaN(c) || !isFinite(c) || !isFinite(e) ? (d.style.width = "100%", d.style.height = "100%", d.style.top = null, d.style.left = null) : e > c ? (d.style.width = "100%", d.style.height = 100 * (c / e) + "%", d.style.top = 100 * (1 / c - 1 / e) / 2 * c + "%", d.style.left = null) : (d.style.height = "100%", d.style.width = 100 * (e / c) + "%", d.style.left = 100 * ((c - e) / 2 / c) + "%", d.style.top = null)
						}
					}, 2e3)
				}
			}
		}), window.YoukuPlayerSelect = I, window.BuildVideoInfo = k, window.checkSrc = function() {
			k._fyks.length > k.mp4srcs.length || (clearInterval(k._tid), k.cleanSrc(), k.cache(), null == k._callback ? e.GetMP4OK(k._v, k._videoInfo) : k._callback(k._v, k._videoInfo))
		}, window.QS = function() {
			for (var a = {}, b = window.location.search.substring(1).split("&"), c = 0; c < b.length; c++) {
				var d = b[c].split("=");
				"undefined" == typeof a[d[0]] ? a[d[0]] = d[1] : "string" == typeof a[d[0]] ? a[d[0]] = [a[d[0]], d[1]] : a[d[0]].push(d[1])
			}
			return a
		}, window.YKP = e, window.YKU = B, window.YoukuHTML5Player = YoukuHTML5Player;
		for (var O = document.getElementsByTagName("script"), H = 0; H < O.length; H++) if (-1 !== O[H].src.indexOf("player.youku.com/jsapi")) {
			eval(O[H].innerHTML);
			break
		}
		window.notifyYKU = function() {
			B.swfLoaded = 1
		}, window.onPlayerStart = function() {
			b.initConfig.events && b.initConfig.events.onPlayStart && (e.playerCurrentState = e.playerState.PLAYER_STATE_PLAYING, debug.log(e.playerCurrentState), debug.log("api:flash play start"), b.initConfig.events.onPlayStart())
		}, window.onPlayerComplete = function() {
			b.initConfig.events && b.initConfig.events.onPlayEnd && (e.playerCurrentState = e.playerState.PLAYER_STATE_END, debug.log(e.playerCurrentState), debug.log("api:flash play end"), b.initConfig.events.onPlayEnd())
		}
	}(), consoleBak && (window.console = consoleBak), module.exports = {
		YKU: YKU,
		YKP: YKP,
		YoukuHTML5Player: YoukuHTML5Player,
		YoukuPlayerSelect: YoukuPlayerSelect
	}
}), define("lib/zepto/ajax", ["./zepto"], function(a, b, c) {
	var d = a("./zepto");
	c.exports = d, function(a) {
		function b(b, c, d) {
			var e = a.Event(c);
			return a(b).trigger(e, d), !e.isDefaultPrevented()
		}
		function c(a, c, d, e) {
			return a.global ? b(c || s, d, e) : void 0
		}
		function d(b) {
			b.global && 0 === a.active++ && c(b, null, "ajaxStart")
		}
		function e(b) {
			b.global && !--a.active && c(b, null, "ajaxStop")
		}
		function f(a, b) {
			var d = b.context;
			return b.beforeSend.call(d, a, b) === !1 || c(b, d, "ajaxBeforeSend", [a, b]) === !1 ? !1 : void c(b, d, "ajaxSend", [a, b])
		}
		function g(a, b, d, e) {
			var f = d.context,
				g = "success";
			d.success.call(f, a, g, b), e && e.resolveWith(f, [a, g, b]), c(d, f, "ajaxSuccess", [b, d, a]), i(g, b, d)
		}
		function h(a, b, d, e, f) {
			var g = e.context;
			e.error.call(g, d, b, a), f && f.rejectWith(g, [d, b, a]), c(e, g, "ajaxError", [d, e, a || b]), i(b, d, e)
		}
		function i(a, b, d) {
			var f = d.context;
			d.complete.call(f, b, a), c(d, f, "ajaxComplete", [b, d]), e(d)
		}
		function j() {}
		function k(a) {
			return a && (a = a.split(";", 2)[0]), a && (a == x ? "html" : a == w ? "json" : u.test(a) ? "script" : v.test(a) && "xml") || "text"
		}
		function l(a, b) {
			return "" == b ? a : (a + "&" + b).replace(/[&?]{1,2}/, "?")
		}
		function m(b) {
			b.processData && b.data && "string" != a.type(b.data) && (b.data = a.param(b.data, b.traditional)), !b.data || b.type && "GET" != b.type.toUpperCase() || (b.url = l(b.url, b.data), b.data = void 0)
		}
		function n(b, c, d, e) {
			return a.isFunction(c) && (e = d, d = c, c = void 0), a.isFunction(d) || (e = d, d = void 0), {
				url: b,
				data: c,
				success: d,
				dataType: e
			}
		}
		function o(b, c, d, e) {
			var f, g = a.isArray(c),
				h = a.isPlainObject(c);
			a.each(c, function(c, i) {
				f = a.type(i), e && (c = d ? e : e + "[" + (h || "object" == f || "array" == f ? c : "") + "]"), !e && g ? b.add(i.name, i.value) : "array" == f || !d && "object" == f ? o(b, i, d, c) : b.add(c, i)
			})
		}
		var p, q, r = 0,
			s = window.document,
			t = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
			u = /^(?:text|application)\/javascript/i,
			v = /^(?:text|application)\/xml/i,
			w = "application/json",
			x = "text/html",
			y = /^\s*$/;
		a.active = 0, a.ajaxJSONP = function(b, c) {
			if (!("type" in b)) return a.ajax(b);
			var d, e, i = b.jsonpCallback,
				j = (a.isFunction(i) ? i() : i) || "jsonp" + ++r,
				k = s.createElement("script"),
				l = window[j],
				m = function(b) {
					a(k).triggerHandler("error", b || "abort")
				},
				n = {
					abort: m
				};
			return c && c.promise(n), a(k).on("load error", function(f, i) {
				clearTimeout(e), a(k).off().remove(), "error" != f.type && d ? g(d[0], n, b, c) : h(null, i || "error", n, b, c), window[j] = l, d && a.isFunction(l) && l(d[0]), l = d = void 0
			}), f(n, b) === !1 ? (m("abort"), n) : (window[j] = function() {
				d = arguments
			}, k.src = b.url.replace(/\?(.+)=\?/, "?$1=" + j), s.head.appendChild(k), b.timeout > 0 && (e = setTimeout(function() {
				m("timeout")
			}, b.timeout)), n)
		}, a.ajaxSettings = {
			type: "GET",
			beforeSend: j,
			success: j,
			error: j,
			complete: j,
			context: null,
			global: !0,
			xhr: function() {
				return new window.XMLHttpRequest
			},
			accepts: {
				script: "text/javascript, application/javascript, application/x-javascript",
				json: w,
				xml: "application/xml, text/xml",
				html: x,
				text: "text/plain"
			},
			crossDomain: !1,
			timeout: 0,
			processData: !0,
			cache: !0
		}, a.ajax = function(b) {
			var c = a.extend({}, b || {}),
				e = a.Deferred && a.Deferred();
			for (p in a.ajaxSettings) void 0 === c[p] && (c[p] = a.ajaxSettings[p]);
			d(c), c.crossDomain || (c.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(c.url) && RegExp.$2 != window.location.host), c.url || (c.url = window.location.toString()), m(c), c.cache === !1 && (c.url = l(c.url, "_=" + Date.now()));
			var i = c.dataType,
				n = /\?.+=\?/.test(c.url);
			if ("jsonp" == i || n) return n || (c.url = l(c.url, c.jsonp ? c.jsonp + "=?" : c.jsonp === !1 ? "" : "callback=?")), a.ajaxJSONP(c, e);
			var o, r = c.accepts[i],
				s = {},
				t = function(a, b) {
					s[a.toLowerCase()] = [a, b]
				},
				u = /^([\w-]+:)\/\//.test(c.url) ? RegExp.$1 : window.location.protocol,
				v = c.xhr(),
				w = v.setRequestHeader;
			if (e && e.promise(v), c.crossDomain || t("X-Requested-With", "XMLHttpRequest"), t("Accept", r || "*/*"), (r = c.mimeType || r) && (r.indexOf(",") > -1 && (r = r.split(",", 2)[0]), v.overrideMimeType && v.overrideMimeType(r)), (c.contentType || c.contentType !== !1 && c.data && "GET" != c.type.toUpperCase()) && t("Content-Type", c.contentType || "application/x-www-form-urlencoded"), c.headers) for (q in c.headers) t(q, c.headers[q]);
			if (v.setRequestHeader = t, v.onreadystatechange = function() {
				if (4 == v.readyState) {
					v.onreadystatechange = j, clearTimeout(o);
					var b, d = !1;
					if (v.status >= 200 && v.status < 300 || 304 == v.status || 0 == v.status && "file:" == u) {
						i = i || k(c.mimeType || v.getResponseHeader("content-type")), b = v.responseText;
						try {
							"script" == i ? (1, eval)(b) : "xml" == i ? b = v.responseXML : "json" == i && (b = y.test(b) ? null : a.parseJSON(b))
						} catch (f) {
							d = f
						}
						d ? h(d, "parsererror", v, c, e) : g(b, v, c, e)
					} else h(v.statusText || null, v.status ? "error" : "abort", v, c, e)
				}
			}, f(v, c) === !1) return v.abort(), h(null, "abort", v, c, e), v;
			if (c.xhrFields) for (q in c.xhrFields) v[q] = c.xhrFields[q];
			var x = "async" in c ? c.async : !0;
			v.open(c.type, c.url, x, c.username, c.password);
			for (q in s) w.apply(v, s[q]);
			return c.timeout > 0 && (o = setTimeout(function() {
				v.onreadystatechange = j, v.abort(), h(null, "timeout", v, c, e)
			}, c.timeout)), v.send(c.data ? c.data : null), v
		}, a.get = function() {
			return a.ajax(n.apply(null, arguments))
		}, a.post = function() {
			var b = n.apply(null, arguments);
			return b.type = "POST", a.ajax(b)
		}, a.getJSON = function() {
			var b = n.apply(null, arguments);
			return b.dataType = "json", a.ajax(b)
		}, a.fn.load = function(b, c, d) {
			if (!this.length) return this;
			var e, f = this,
				g = b.split(/\s/),
				h = n(b, c, d),
				i = h.success;
			return g.length > 1 && (h.url = g[0], e = g[1]), h.success = function(b) {
				f.html(e ? a("<div>").html(b.replace(t, "")).find(e) : b), i && i.apply(f, arguments)
			}, a.ajax(h), this
		};
		var z = encodeURIComponent;
		a.param = function(a, b) {
			var c = [];
			return c.add = function(a, b) {
				this.push(z(a) + "=" + z(b))
			}, o(c, a, b), c.join("&").replace(/%20/g, "+")
		}
	}(d)
}), define("lib/zepto/zepto", [], function(a, b, c) {
	var d = function() {
			function a(a) {
				return null == a ? String(a) : U[V.call(a)] || "object"
			}
			function b(b) {
				return "function" == a(b)
			}
			function c(a) {
				return null != a && a == a.window
			}
			function d(a) {
				return null != a && a.nodeType == a.DOCUMENT_NODE
			}
			function e(b) {
				return "object" == a(b)
			}
			function f(a) {
				return e(a) && !c(a) && Object.getPrototypeOf(a) == Object.prototype
			}
			function g(a) {
				return "number" == typeof a.length
			}
			function h(a) {
				return D.call(a, function(a) {
					return null != a
				})
			}
			function i(a) {
				return a.length > 0 ? x.fn.concat.apply([], a) : a
			}
			function j(a) {
				return a.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
			}
			function k(a) {
				return a in G ? G[a] : G[a] = new RegExp("(^|\\s)" + a + "(\\s|$)")
			}
			function l(a, b) {
				return "number" != typeof b || H[j(a)] ? b : b + "px"
			}
			function m(a) {
				var b, c;
				return F[a] || (b = E.createElement(a), E.body.appendChild(b), c = getComputedStyle(b, "").getPropertyValue("display"), b.parentNode.removeChild(b), "none" == c && (c = "block"), F[a] = c), F[a]
			}
			function n(a) {
				return "children" in a ? C.call(a.children) : x.map(a.childNodes, function(a) {
					return 1 == a.nodeType ? a : void 0
				})
			}
			function o(a, b, c) {
				for (w in b) c && (f(b[w]) || Z(b[w])) ? (f(b[w]) && !f(a[w]) && (a[w] = {}), Z(b[w]) && !Z(a[w]) && (a[w] = []), o(a[w], b[w], c)) : b[w] !== v && (a[w] = b[w])
			}
			function p(a, b) {
				return null == b ? x(a) : x(a).filter(b)
			}
			function q(a, c, d, e) {
				return b(c) ? c.call(a, d, e) : c
			}
			function r(a, b, c) {
				null == c ? a.removeAttribute(b) : a.setAttribute(b, c)
			}
			function s(a, b) {
				var c = a.className,
					d = c && c.baseVal !== v;
				return b === v ? d ? c.baseVal : c : void(d ? c.baseVal = b : a.className = b)
			}
			function t(a) {
				var b;
				try {
					return a ? "true" == a || ("false" == a ? !1 : "null" == a ? null : /^0/.test(a) || isNaN(b = Number(a)) ? /^[\[\{]/.test(a) ? x.parseJSON(a) : a : b) : a
				} catch (c) {
					return a
				}
			}
			function u(a, b) {
				b(a);
				for (var c in a.childNodes) u(a.childNodes[c], b)
			}
			var v, w, x, y, z, A, B = [],
				C = B.slice,
				D = B.filter,
				E = window.document,
				F = {},
				G = {},
				H = {
					"column-count": 1,
					columns: 1,
					"font-weight": 1,
					"line-height": 1,
					opacity: 1,
					"z-index": 1,
					zoom: 1
				},
				I = /^\s*<(\w+|!)[^>]*>/,
				J = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
				K = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
				L = /^(?:body|html)$/i,
				M = /([A-Z])/g,
				N = ["val", "css", "html", "text", "data", "width", "height", "offset"],
				O = ["after", "prepend", "before", "append"],
				P = E.createElement("table"),
				Q = E.createElement("tr"),
				R = {
					tr: E.createElement("tbody"),
					tbody: P,
					thead: P,
					tfoot: P,
					td: Q,
					th: Q,
					"*": E.createElement("div")
				},
				S = /complete|loaded|interactive/,
				T = /^[\w-]*$/,
				U = {},
				V = U.toString,
				W = {},
				X = E.createElement("div"),
				Y = {
					tabindex: "tabIndex",
					readonly: "readOnly",
					"for": "htmlFor",
					"class": "className",
					maxlength: "maxLength",
					cellspacing: "cellSpacing",
					cellpadding: "cellPadding",
					rowspan: "rowSpan",
					colspan: "colSpan",
					usemap: "useMap",
					frameborder: "frameBorder",
					contenteditable: "contentEditable"
				},
				Z = Array.isArray ||
			function(a) {
				return a instanceof Array
			};
			return W.matches = function(a, b) {
				if (!b || !a || 1 !== a.nodeType) return !1;
				var c = a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.matchesSelector;
				if (c) return c.call(a, b);
				var d, e = a.parentNode,
					f = !e;
				return f && (e = X).appendChild(a), d = ~W.qsa(e, b).indexOf(a), f && X.removeChild(a), d
			}, z = function(a) {
				return a.replace(/-+(.)?/g, function(a, b) {
					return b ? b.toUpperCase() : ""
				})
			}, A = function(a) {
				return D.call(a, function(b, c) {
					return a.indexOf(b) == c
				})
			}, W.fragment = function(a, b, c) {
				var d, e, g;
				return J.test(a) && (d = x(E.createElement(RegExp.$1))), d || (a.replace && (a = a.replace(K, "<$1></$2>")), b === v && (b = I.test(a) && RegExp.$1), b in R || (b = "*"), g = R[b], g.innerHTML = "" + a, d = x.each(C.call(g.childNodes), function() {
					g.removeChild(this)
				})), f(c) && (e = x(d), x.each(c, function(a, b) {
					N.indexOf(a) > -1 ? e[a](b) : e.attr(a, b)
				})), d
			}, W.Z = function(a, b) {
				return a = a || [], a.__proto__ = x.fn, a.selector = b || "", a
			}, W.isZ = function(a) {
				return a instanceof W.Z
			}, W.init = function(a, c) {
				var d;
				if (!a) return W.Z();
				if ("string" == typeof a) if (a = a.trim(), "<" == a[0] && I.test(a)) d = W.fragment(a, RegExp.$1, c), a = null;
				else {
					if (c !== v) return x(c).find(a);
					d = W.qsa(E, a)
				} else {
					if (b(a)) return x(E).ready(a);
					if (W.isZ(a)) return a;
					if (Z(a)) d = h(a);
					else if (e(a)) d = [a], a = null;
					else if (I.test(a)) d = W.fragment(a.trim(), RegExp.$1, c), a = null;
					else {
						if (c !== v) return x(c).find(a);
						d = W.qsa(E, a)
					}
				}
				return W.Z(d, a)
			}, x = function(a, b) {
				return W.init(a, b)
			}, x.extend = function(a) {
				var b, c = C.call(arguments, 1);
				return "boolean" == typeof a && (b = a, a = c.shift()), c.forEach(function(c) {
					o(a, c, b)
				}), a
			}, W.qsa = function(a, b) {
				var c, e = "#" == b[0],
					f = !e && "." == b[0],
					g = e || f ? b.slice(1) : b,
					h = T.test(g);
				return d(a) && h && e ? (c = a.getElementById(g)) ? [c] : [] : 1 !== a.nodeType && 9 !== a.nodeType ? [] : C.call(h && !e ? f ? a.getElementsByClassName(g) : a.getElementsByTagName(b) : a.querySelectorAll(b))
			}, x.contains = function(a, b) {
				return a !== b && a.contains(b)
			}, x.type = a, x.isFunction = b, x.isWindow = c, x.isArray = Z, x.isPlainObject = f, x.isEmptyObject = function(a) {
				var b;
				for (b in a) return !1;
				return !0
			}, x.inArray = function(a, b, c) {
				return B.indexOf.call(b, a, c)
			}, x.camelCase = z, x.trim = function(a) {
				return null == a ? "" : String.prototype.trim.call(a)
			}, x.uuid = 0, x.support = {}, x.expr = {}, x.map = function(a, b) {
				var c, d, e, f = [];
				if (g(a)) for (d = 0; d < a.length; d++) c = b(a[d], d), null != c && f.push(c);
				else for (e in a) c = b(a[e], e), null != c && f.push(c);
				return i(f)
			}, x.each = function(a, b) {
				var c, d;
				if (g(a)) {
					for (c = 0; c < a.length; c++) if (b.call(a[c], c, a[c]) === !1) return a
				} else for (d in a) if (b.call(a[d], d, a[d]) === !1) return a;
				return a
			}, x.grep = function(a, b) {
				return D.call(a, b)
			}, window.JSON && (x.parseJSON = JSON.parse), x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
				U["[object " + b + "]"] = b.toLowerCase()
			}), x.fn = {
				forEach: B.forEach,
				reduce: B.reduce,
				push: B.push,
				sort: B.sort,
				indexOf: B.indexOf,
				concat: B.concat,
				map: function(a) {
					return x(x.map(this, function(b, c) {
						return a.call(b, c, b)
					}))
				},
				slice: function() {
					return x(C.apply(this, arguments))
				},
				ready: function(a) {
					return S.test(E.readyState) && E.body ? a(x) : E.addEventListener("DOMContentLoaded", function() {
						a(x)
					}, !1), this
				},
				get: function(a) {
					return a === v ? C.call(this) : this[a >= 0 ? a : a + this.length]
				},
				toArray: function() {
					return this.get()
				},
				size: function() {
					return this.length
				},
				remove: function() {
					return this.each(function() {
						null != this.parentNode && this.parentNode.removeChild(this)
					})
				},
				each: function(a) {
					return B.every.call(this, function(b, c) {
						return a.call(b, c, b) !== !1
					}), this
				},
				filter: function(a) {
					return b(a) ? this.not(this.not(a)) : x(D.call(this, function(b) {
						return W.matches(b, a)
					}))
				},
				add: function(a, b) {
					return x(A(this.concat(x(a, b))))
				},
				is: function(a) {
					return this.length > 0 && W.matches(this[0], a)
				},
				not: function(a) {
					var c = [];
					if (b(a) && a.call !== v) this.each(function(b) {
						a.call(this, b) || c.push(this)
					});
					else {
						var d = "string" == typeof a ? this.filter(a) : g(a) && b(a.item) ? C.call(a) : x(a);
						this.forEach(function(a) {
							d.indexOf(a) < 0 && c.push(a)
						})
					}
					return x(c)
				},
				has: function(a) {
					return this.filter(function() {
						return e(a) ? x.contains(this, a) : x(this).find(a).size()
					})
				},
				eq: function(a) {
					return -1 === a ? this.slice(a) : this.slice(a, +a + 1)
				},
				first: function() {
					var a = this[0];
					return a && !e(a) ? a : x(a)
				},
				last: function() {
					var a = this[this.length - 1];
					return a && !e(a) ? a : x(a)
				},
				find: function(a) {
					var b, c = this;
					return b = "object" == typeof a ? x(a).filter(function() {
						var a = this;
						return B.some.call(c, function(b) {
							return x.contains(b, a)
						})
					}) : 1 == this.length ? x(W.qsa(this[0], a)) : this.map(function() {
						return W.qsa(this, a)
					})
				},
				closest: function(a, b) {
					var c = this[0],
						e = !1;
					for ("object" == typeof a && (e = x(a)); c && !(e ? e.indexOf(c) >= 0 : W.matches(c, a));) c = c !== b && !d(c) && c.parentNode;
					return x(c)
				},
				parents: function(a) {
					for (var b = [], c = this; c.length > 0;) c = x.map(c, function(a) {
						return (a = a.parentNode) && !d(a) && b.indexOf(a) < 0 ? (b.push(a), a) : void 0
					});
					return p(b, a)
				},
				parent: function(a) {
					return p(A(this.pluck("parentNode")), a)
				},
				children: function(a) {
					return p(this.map(function() {
						return n(this)
					}), a)
				},
				contents: function() {
					return this.map(function() {
						return C.call(this.childNodes)
					})
				},
				siblings: function(a) {
					return p(this.map(function(a, b) {
						return D.call(n(b.parentNode), function(a) {
							return a !== b
						})
					}), a)
				},
				empty: function() {
					return this.each(function() {
						this.innerHTML = ""
					})
				},
				pluck: function(a) {
					return x.map(this, function(b) {
						return b[a]
					})
				},
				show: function() {
					return this.each(function() {
						"none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = m(this.nodeName))
					})
				},
				replaceWith: function(a) {
					return this.before(a).remove()
				},
				wrap: function(a) {
					var c = b(a);
					if (this[0] && !c) var d = x(a).get(0),
						e = d.parentNode || this.length > 1;
					return this.each(function(b) {
						x(this).wrapAll(c ? a.call(this, b) : e ? d.cloneNode(!0) : d)
					})
				},
				wrapAll: function(a) {
					if (this[0]) {
						x(this[0]).before(a = x(a));
						for (var b;
						(b = a.children()).length;) a = b.first();
						x(a).append(this)
					}
					return this
				},
				wrapInner: function(a) {
					var c = b(a);
					return this.each(function(b) {
						var d = x(this),
							e = d.contents(),
							f = c ? a.call(this, b) : a;
						e.length ? e.wrapAll(f) : d.append(f)
					})
				},
				unwrap: function() {
					return this.parent().each(function() {
						x(this).replaceWith(x(this).children())
					}), this
				},
				clone: function() {
					return this.map(function() {
						return this.cloneNode(!0)
					})
				},
				hide: function() {
					return this.css("display", "none")
				},
				toggle: function(a) {
					return this.each(function() {
						var b = x(this);
						(a === v ? "none" == b.css("display") : a) ? b.show() : b.hide()
					})
				},
				prev: function(a) {
					return x(this.pluck("previousElementSibling")).filter(a || "*")
				},
				next: function(a) {
					return x(this.pluck("nextElementSibling")).filter(a || "*")
				},
				html: function(a) {
					return 0 === arguments.length ? this.length > 0 ? this[0].innerHTML : null : this.each(function(b) {
						var c = this.innerHTML;
						x(this).empty().append(q(this, a, b, c))
					})
				},
				text: function(a) {
					return 0 === arguments.length ? this.length > 0 ? this[0].textContent : null : this.each(function() {
						this.textContent = a === v ? "" : "" + a
					})
				},
				attr: function(a, b) {
					var c;
					return "string" == typeof a && b === v ? 0 == this.length || 1 !== this[0].nodeType ? v : "value" == a && "INPUT" == this[0].nodeName ? this.val() : !(c = this[0].getAttribute(a)) && a in this[0] ? this[0][a] : c : this.each(function(c) {
						if (1 === this.nodeType) if (e(a)) for (w in a) r(this, w, a[w]);
						else r(this, a, q(this, b, c, this.getAttribute(a)))
					})
				},
				removeAttr: function(a) {
					return this.each(function() {
						1 === this.nodeType && r(this, a)
					})
				},
				prop: function(a, b) {
					return a = Y[a] || a, b === v ? this[0] && this[0][a] : this.each(function(c) {
						this[a] = q(this, b, c, this[a])
					})
				},
				data: function(a, b) {
					var c = this.attr("data-" + a.replace(M, "-$1").toLowerCase(), b);
					return null !== c ? t(c) : v
				},
				val: function(a) {
					return 0 === arguments.length ? this[0] && (this[0].multiple ? x(this[0]).find("option").filter(function() {
						return this.selected
					}).pluck("value") : this[0].value) : this.each(function(b) {
						this.value = q(this, a, b, this.value)
					})
				},
				offset: function(a) {
					if (a) return this.each(function(b) {
						var c = x(this),
							d = q(this, a, b, c.offset()),
							e = c.offsetParent().offset(),
							f = {
								top: d.top - e.top,
								left: d.left - e.left
							};
						"static" == c.css("position") && (f.position = "relative"), c.css(f)
					});
					if (0 == this.length) return null;
					var b = this[0].getBoundingClientRect();
					return {
						left: b.left + window.pageXOffset,
						top: b.top + window.pageYOffset,
						width: Math.round(b.width),
						height: Math.round(b.height)
					}
				},
				css: function(b, c) {
					if (arguments.length < 2) {
						var d = this[0],
							e = getComputedStyle(d, "");
						if (!d) return;
						if ("string" == typeof b) return d.style[z(b)] || e.getPropertyValue(b);
						if (Z(b)) {
							var f = {};
							return x.each(Z(b) ? b : [b], function(a, b) {
								f[b] = d.style[z(b)] || e.getPropertyValue(b)
							}), f
						}
					}
					var g = "";
					if ("string" == a(b)) c || 0 === c ? g = j(b) + ":" + l(b, c) : this.each(function() {
						this.style.removeProperty(j(b))
					});
					else for (w in b) b[w] || 0 === b[w] ? g += j(w) + ":" + l(w, b[w]) + ";" : this.each(function() {
						this.style.removeProperty(j(w))
					});
					return this.each(function() {
						this.style.cssText += ";" + g
					})
				},
				index: function(a) {
					return a ? this.indexOf(x(a)[0]) : this.parent().children().indexOf(this[0])
				},
				hasClass: function(a) {
					return a ? B.some.call(this, function(a) {
						return this.test(s(a))
					}, k(a)) : !1
				},
				addClass: function(a) {
					return a ? this.each(function(b) {
						y = [];
						var c = s(this),
							d = q(this, a, b, c);
						d.split(/\s+/g).forEach(function(a) {
							x(this).hasClass(a) || y.push(a)
						}, this), y.length && s(this, c + (c ? " " : "") + y.join(" "))
					}) : this
				},
				removeClass: function(a) {
					return this.each(function(b) {
						return a === v ? s(this, "") : (y = s(this), q(this, a, b, y).split(/\s+/g).forEach(function(a) {
							y = y.replace(k(a), " ")
						}), void s(this, y.trim()))
					})
				},
				toggleClass: function(a, b) {
					return a ? this.each(function(c) {
						var d = x(this),
							e = q(this, a, c, s(this));
						e.split(/\s+/g).forEach(function(a) {
							(b === v ? !d.hasClass(a) : b) ? d.addClass(a) : d.removeClass(a)
						})
					}) : this
				},
				scrollTop: function(a) {
					if (this.length) {
						var b = "scrollTop" in this[0];
						return a === v ? b ? this[0].scrollTop : this[0].pageYOffset : this.each(b ?
						function() {
							this.scrollTop = a
						} : function() {
							this.scrollTo(this.scrollX, a)
						})
					}
				},
				scrollLeft: function(a) {
					if (this.length) {
						var b = "scrollLeft" in this[0];
						return a === v ? b ? this[0].scrollLeft : this[0].pageXOffset : this.each(b ?
						function() {
							this.scrollLeft = a
						} : function() {
							this.scrollTo(a, this.scrollY)
						})
					}
				},
				position: function() {
					if (this.length) {
						var a = this[0],
							b = this.offsetParent(),
							c = this.offset(),
							d = L.test(b[0].nodeName) ? {
								top: 0,
								left: 0
							} : b.offset();
						return c.top -= parseFloat(x(a).css("margin-top")) || 0, c.left -= parseFloat(x(a).css("margin-left")) || 0, d.top += parseFloat(x(b[0]).css("border-top-width")) || 0, d.left += parseFloat(x(b[0]).css("border-left-width")) || 0, {
							top: c.top - d.top,
							left: c.left - d.left
						}
					}
				},
				offsetParent: function() {
					return this.map(function() {
						for (var a = this.offsetParent || E.body; a && !L.test(a.nodeName) && "static" == x(a).css("position");) a = a.offsetParent;
						return a
					})
				}
			}, x.fn.detach = x.fn.remove, ["width", "height"].forEach(function(a) {
				var b = a.replace(/./, function(a) {
					return a[0].toUpperCase()
				});
				x.fn[a] = function(e) {
					var f, g = this[0];
					return e === v ? c(g) ? g["inner" + b] : d(g) ? g.documentElement["scroll" + b] : (f = this.offset()) && f[a] : this.each(function(b) {
						g = x(this), g.css(a, q(this, e, b, g[a]()))
					})
				}
			}), O.forEach(function(b, c) {
				var d = c % 2;
				x.fn[b] = function() {
					var b, e, f = x.map(arguments, function(c) {
						return b = a(c), "object" == b || "array" == b || null == c ? c : W.fragment(c)
					}),
						g = this.length > 1;
					return f.length < 1 ? this : this.each(function(a, b) {
						e = d ? b : b.parentNode, b = 0 == c ? b.nextSibling : 1 == c ? b.firstChild : 2 == c ? b : null, f.forEach(function(a) {
							if (g) a = a.cloneNode(!0);
							else if (!e) return x(a).remove();
							u(e.insertBefore(a, b), function(a) {
								null == a.nodeName || "SCRIPT" !== a.nodeName.toUpperCase() || a.type && "text/javascript" !== a.type || a.src || window.eval.call(window, a.innerHTML)
							})
						})
					})
				}, x.fn[d ? b + "To" : "insert" + (c ? "Before" : "After")] = function(a) {
					return x(a)[b](this), this
				}
			}), W.Z.prototype = x.fn, W.uniq = A, W.deserializeValue = t, x.zepto = W, x
		}();
	window.Zepto = d, void 0 === window.$ && (window.$ = d), function(a) {
		function b(a) {
			return a._zid || (a._zid = m++)
		}
		function c(a, c, f, g) {
			if (c = d(c), c.ns) var h = e(c.ns);
			return (q[b(a)] || []).filter(function(a) {
				return !(!a || c.e && a.e != c.e || c.ns && !h.test(a.ns) || f && b(a.fn) !== b(f) || g && a.sel != g)
			})
		}
		function d(a) {
			var b = ("" + a).split(".");
			return {
				e: b[0],
				ns: b.slice(1).sort().join(" ")
			}
		}
		function e(a) {
			return new RegExp("(?:^| )" + a.replace(" ", " .* ?") + "(?: |$)")
		}
		function f(a, b) {
			return a.del && !s && a.e in t || !! b
		}
		function g(a) {
			return u[a] || s && t[a] || a
		}
		function h(c, e, h, i, k, m, n) {
			var o = b(c),
				p = q[o] || (q[o] = []);
			e.split(/\s/).forEach(function(b) {
				if ("ready" == b) return a(document).ready(h);
				var e = d(b);
				e.fn = h, e.sel = k, e.e in u && (h = function(b) {
					var c = b.relatedTarget;
					return !c || c !== this && !a.contains(this, c) ? e.fn.apply(this, arguments) : void 0
				}), e.del = m;
				var o = m || h;
				e.proxy = function(a) {
					if (a = j(a), !a.isImmediatePropagationStopped()) {
						a.data = i;
						var b = o.apply(c, a._args == l ? [a] : [a].concat(a._args));
						return b === !1 && (a.preventDefault(), a.stopPropagation()), b
					}
				}, e.i = p.length, p.push(e), "addEventListener" in c && c.addEventListener(g(e.e), e.proxy, f(e, n))
			})
		}
		function i(a, d, e, h, i) {
			var j = b(a);
			(d || "").split(/\s/).forEach(function(b) {
				c(a, b, e, h).forEach(function(b) {
					delete q[j][b.i], "removeEventListener" in a && a.removeEventListener(g(b.e), b.proxy, f(b, i))
				})
			})
		}
		function j(b, c) {
			return (c || !b.isDefaultPrevented) && (c || (c = b), a.each(y, function(a, d) {
				var e = c[a];
				b[a] = function() {
					return this[d] = v, e && e.apply(c, arguments)
				}, b[d] = w
			}), (c.defaultPrevented !== l ? c.defaultPrevented : "returnValue" in c ? c.returnValue === !1 : c.getPreventDefault && c.getPreventDefault()) && (b.isDefaultPrevented = v)), b
		}
		function k(a) {
			var b, c = {
				originalEvent: a
			};
			for (b in a) x.test(b) || a[b] === l || (c[b] = a[b]);
			return j(c, a)
		}
		var l, m = 1,
			n = Array.prototype.slice,
			o = a.isFunction,
			p = function(a) {
				return "string" == typeof a
			},
			q = {},
			r = {},
			s = "onfocusin" in window,
			t = {
				focus: "focusin",
				blur: "focusout"
			},
			u = {
				mouseenter: "mouseover",
				mouseleave: "mouseout"
			};
		r.click = r.mousedown = r.mouseup = r.mousemove = "MouseEvents", a.event = {
			add: h,
			remove: i
		}, a.proxy = function(c, d) {
			if (o(c)) {
				var e = function() {
						return c.apply(d, arguments)
					};
				return e._zid = b(c), e
			}
			if (p(d)) return a.proxy(c[d], c);
			throw new TypeError("expected function")
		}, a.fn.bind = function(a, b, c) {
			return this.on(a, b, c)
		}, a.fn.unbind = function(a, b) {
			return this.off(a, b)
		}, a.fn.one = function(a, b, c, d) {
			return this.on(a, b, c, d, 1)
		};
		var v = function() {
				return !0
			},
			w = function() {
				return !1
			},
			x = /^([A-Z]|returnValue$|layer[XY]$)/,
			y = {
				preventDefault: "isDefaultPrevented",
				stopImmediatePropagation: "isImmediatePropagationStopped",
				stopPropagation: "isPropagationStopped"
			};
		a.fn.delegate = function(a, b, c) {
			return this.on(b, a, c)
		}, a.fn.undelegate = function(a, b, c) {
			return this.off(b, a, c)
		}, a.fn.live = function(b, c) {
			return a(document.body).delegate(this.selector, b, c), this
		}, a.fn.die = function(b, c) {
			return a(document.body).undelegate(this.selector, b, c), this
		}, a.fn.on = function(b, c, d, e, f) {
			var g, j, m = this;
			return b && !p(b) ? (a.each(b, function(a, b) {
				m.on(a, c, d, b, f)
			}), m) : (p(c) || o(e) || e === !1 || (e = d, d = c, c = l), (o(d) || d === !1) && (e = d, d = l), e === !1 && (e = w), m.each(function(l, m) {
				f && (g = function(a) {
					return i(m, a.type, e), e.apply(this, arguments)
				}), c && (j = function(b) {
					var d, f = a(b.target).closest(c, m).get(0);
					return f && f !== m ? (d = a.extend(k(b), {
						currentTarget: f,
						liveFired: m
					}), (g || e).apply(f, [d].concat(n.call(arguments, 1)))) : void 0
				}), h(m, b, e, d, c, j || g)
			}))
		}, a.fn.off = function(b, c, d) {
			var e = this;
			return b && !p(b) ? (a.each(b, function(a, b) {
				e.off(a, c, b)
			}), e) : (p(c) || o(d) || d === !1 || (d = c, c = l), d === !1 && (d = w), e.each(function() {
				i(this, b, d, c)
			}))
		}, a.fn.trigger = function(b, c) {
			return b = p(b) || a.isPlainObject(b) ? a.Event(b) : j(b), b._args = c, this.each(function() {
				"dispatchEvent" in this ? this.dispatchEvent(b) : a(this).triggerHandler(b, c)
			})
		}, a.fn.triggerHandler = function(b, d) {
			var e, f;
			return this.each(function(g, h) {
				e = k(p(b) ? a.Event(b) : b), e._args = d, e.target = h, a.each(c(h, b.type || b), function(a, b) {
					return f = b.proxy(e), e.isImmediatePropagationStopped() ? !1 : void 0
				})
			}), f
		}, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(b) {
			a.fn[b] = function(a) {
				return a ? this.bind(b, a) : this.trigger(b)
			}
		}), ["focus", "blur"].forEach(function(b) {
			a.fn[b] = function(a) {
				return a ? this.bind(b, a) : this.each(function() {
					try {
						this[b]()
					} catch (a) {}
				}), this
			}
		}), a.Event = function(a, b) {
			p(a) || (b = a, a = b.type);
			var c = document.createEvent(r[a] || "Events"),
				d = !0;
			if (b) for (var e in b)"bubbles" == e ? d = !! b[e] : c[e] = b[e];
			return c.initEvent(a, d, !0), j(c)
		}
	}(d), function(a) {
		function b(b, c, d) {
			var e = a.Event(c);
			return a(b).trigger(e, d), !e.isDefaultPrevented()
		}
		function c(a, c, d, e) {
			return a.global ? b(c || s, d, e) : void 0
		}
		function d(b) {
			b.global && 0 === a.active++ && c(b, null, "ajaxStart")
		}
		function e(b) {
			b.global && !--a.active && c(b, null, "ajaxStop")
		}
		function f(a, b) {
			var d = b.context;
			return b.beforeSend.call(d, a, b) === !1 || c(b, d, "ajaxBeforeSend", [a, b]) === !1 ? !1 : void c(b, d, "ajaxSend", [a, b])
		}
		function g(a, b, d, e) {
			var f = d.context,
				g = "success";
			d.success.call(f, a, g, b), e && e.resolveWith(f, [a, g, b]), c(d, f, "ajaxSuccess", [b, d, a]), i(g, b, d)
		}
		function h(a, b, d, e, f) {
			var g = e.context;
			e.error.call(g, d, b, a), f && f.rejectWith(g, [d, b, a]), c(e, g, "ajaxError", [d, e, a || b]), i(b, d, e)
		}
		function i(a, b, d) {
			var f = d.context;
			d.complete.call(f, b, a), c(d, f, "ajaxComplete", [b, d]), e(d)
		}
		function j() {}
		function k(a) {
			return a && (a = a.split(";", 2)[0]), a && (a == x ? "html" : a == w ? "json" : u.test(a) ? "script" : v.test(a) && "xml") || "text"
		}
		function l(a, b) {
			return "" == b ? a : (a + "&" + b).replace(/[&?]{1,2}/, "?")
		}
		function m(b) {
			b.processData && b.data && "string" != a.type(b.data) && (b.data = a.param(b.data, b.traditional)), !b.data || b.type && "GET" != b.type.toUpperCase() || (b.url = l(b.url, b.data), b.data = void 0)
		}
		function n(b, c, d, e) {
			return a.isFunction(c) && (e = d, d = c, c = void 0), a.isFunction(d) || (e = d, d = void 0), {
				url: b,
				data: c,
				success: d,
				dataType: e
			}
		}
		function o(b, c, d, e) {
			var f, g = a.isArray(c),
				h = a.isPlainObject(c);
			a.each(c, function(c, i) {
				f = a.type(i), e && (c = d ? e : e + "[" + (h || "object" == f || "array" == f ? c : "") + "]"), !e && g ? b.add(i.name, i.value) : "array" == f || !d && "object" == f ? o(b, i, d, c) : b.add(c, i)
			})
		}
		var p, q, r = 0,
			s = window.document,
			t = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
			u = /^(?:text|application)\/javascript/i,
			v = /^(?:text|application)\/xml/i,
			w = "application/json",
			x = "text/html",
			y = /^\s*$/;
		a.active = 0, a.ajaxJSONP = function(b, c) {
			if (!("type" in b)) return a.ajax(b);
			var d, e, i = b.jsonpCallback,
				j = (a.isFunction(i) ? i() : i) || "jsonp" + ++r,
				k = s.createElement("script"),
				l = window[j],
				m = function(b) {
					a(k).triggerHandler("error", b || "abort")
				},
				n = {
					abort: m
				};
			return c && c.promise(n), a(k).on("load error", function(f, i) {
				clearTimeout(e), a(k).off().remove(), "error" != f.type && d ? g(d[0], n, b, c) : h(null, i || "error", n, b, c), window[j] = l, d && a.isFunction(l) && l(d[0]), l = d = void 0
			}), f(n, b) === !1 ? (m("abort"), n) : (window[j] = function() {
				d = arguments
			}, k.src = b.url.replace(/\?(.+)=\?/, "?$1=" + j), s.head.appendChild(k), b.timeout > 0 && (e = setTimeout(function() {
				m("timeout")
			}, b.timeout)), n)
		}, a.ajaxSettings = {
			type: "GET",
			beforeSend: j,
			success: j,
			error: j,
			complete: j,
			context: null,
			global: !0,
			xhr: function() {
				return new window.XMLHttpRequest
			},
			accepts: {
				script: "text/javascript, application/javascript, application/x-javascript",
				json: w,
				xml: "application/xml, text/xml",
				html: x,
				text: "text/plain"
			},
			crossDomain: !1,
			timeout: 0,
			processData: !0,
			cache: !0
		}, a.ajax = function(b) {
			var c = a.extend({}, b || {}),
				e = a.Deferred && a.Deferred();
			for (p in a.ajaxSettings) void 0 === c[p] && (c[p] = a.ajaxSettings[p]);
			d(c), c.crossDomain || (c.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(c.url) && RegExp.$2 != window.location.host), c.url || (c.url = window.location.toString()), m(c), c.cache === !1 && (c.url = l(c.url, "_=" + Date.now()));
			var i = c.dataType,
				n = /\?.+=\?/.test(c.url);
			if ("jsonp" == i || n) return n || (c.url = l(c.url, c.jsonp ? c.jsonp + "=?" : c.jsonp === !1 ? "" : "callback=?")), a.ajaxJSONP(c, e);
			var o, r = c.accepts[i],
				s = {},
				t = function(a, b) {
					s[a.toLowerCase()] = [a, b]
				},
				u = /^([\w-]+:)\/\//.test(c.url) ? RegExp.$1 : window.location.protocol,
				v = c.xhr(),
				w = v.setRequestHeader;
			if (e && e.promise(v), c.crossDomain || t("X-Requested-With", "XMLHttpRequest"), t("Accept", r || "*/*"), (r = c.mimeType || r) && (r.indexOf(",") > -1 && (r = r.split(",", 2)[0]), v.overrideMimeType && v.overrideMimeType(r)), (c.contentType || c.contentType !== !1 && c.data && "GET" != c.type.toUpperCase()) && t("Content-Type", c.contentType || "application/x-www-form-urlencoded"), c.headers) for (q in c.headers) t(q, c.headers[q]);
			if (v.setRequestHeader = t, v.onreadystatechange = function() {
				if (4 == v.readyState) {
					v.onreadystatechange = j, clearTimeout(o);
					var b, d = !1;
					if (v.status >= 200 && v.status < 300 || 304 == v.status || 0 == v.status && "file:" == u) {
						i = i || k(c.mimeType || v.getResponseHeader("content-type")), b = v.responseText;
						try {
							"script" == i ? (1, eval)(b) : "xml" == i ? b = v.responseXML : "json" == i && (b = y.test(b) ? null : a.parseJSON(b))
						} catch (f) {
							d = f
						}
						d ? h(d, "parsererror", v, c, e) : g(b, v, c, e)
					} else h(v.statusText || null, v.status ? "error" : "abort", v, c, e)
				}
			}, f(v, c) === !1) return v.abort(), h(null, "abort", v, c, e), v;
			if (c.xhrFields) for (q in c.xhrFields) v[q] = c.xhrFields[q];
			var x = "async" in c ? c.async : !0;
			v.open(c.type, c.url, x, c.username, c.password);
			for (q in s) w.apply(v, s[q]);
			return c.timeout > 0 && (o = setTimeout(function() {
				v.onreadystatechange = j, v.abort(), h(null, "timeout", v, c, e)
			}, c.timeout)), v.send(c.data ? c.data : null), v
		}, a.get = function() {
			return a.ajax(n.apply(null, arguments))
		}, a.post = function() {
			var b = n.apply(null, arguments);
			return b.type = "POST", a.ajax(b)
		}, a.getJSON = function() {
			var b = n.apply(null, arguments);
			return b.dataType = "json", a.ajax(b)
		}, a.fn.load = function(b, c, d) {
			if (!this.length) return this;
			var e, f = this,
				g = b.split(/\s/),
				h = n(b, c, d),
				i = h.success;
			return g.length > 1 && (h.url = g[0], e = g[1]), h.success = function(b) {
				f.html(e ? a("<div>").html(b.replace(t, "")).find(e) : b), i && i.apply(f, arguments)
			}, a.ajax(h), this
		};
		var z = encodeURIComponent;
		a.param = function(a, b) {
			var c = [];
			return c.add = function(a, b) {
				this.push(z(a) + "=" + z(b))
			}, o(c, a, b), c.join("&").replace(/%20/g, "+")
		}
	}(d), function(a) {
		a.fn.serializeArray = function() {
			var b, c = [];
			return a([].slice.call(this.get(0).elements)).each(function() {
				b = a(this);
				var d = b.attr("type");
				"fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != d && "reset" != d && "button" != d && ("radio" != d && "checkbox" != d || this.checked) && c.push({
					name: b.attr("name"),
					value: b.val()
				})
			}), c
		}, a.fn.serialize = function() {
			var a = [];
			return this.serializeArray().forEach(function(b) {
				a.push(encodeURIComponent(b.name) + "=" + encodeURIComponent(b.value))
			}), a.join("&")
		}, a.fn.submit = function(b) {
			if (b) this.bind("submit", b);
			else if (this.length) {
				var c = a.Event("submit");
				this.eq(0).trigger(c), c.isDefaultPrevented() || this.get(0).submit()
			}
			return this
		}
	}(d), function(a) {
		"__proto__" in {} || a.extend(a.zepto, {
			Z: function(b, c) {
				return b = b || [], a.extend(b, a.fn), b.selector = c || "", b.__Z = !0, b
			},
			isZ: function(b) {
				return "array" === a.type(b) && "__Z" in b
			}
		}), a.isPC = navigator.platform.indexOf("Win") >= 0 ? !0 : !1;
		try {
			getComputedStyle(void 0)
		} catch (b) {
			var c = getComputedStyle;
			window.getComputedStyle = function(a) {
				try {
					return c(a)
				} catch (b) {
					return null
				}
			}
		}
	}(d), c.exports = d
}), define("lib/zepto/animationShow", ["./zepto"], function(a, b, c) {
	var d = a("./zepto");
	c.exports = d, function(a) {
		a.fn.animationShow = function(b) {
			this.each(function(c, d) {
				var e = a(d);
				e.show().removeClass("z-hide").addClass("animationShow").off("webkitAnimationEnd").on("webkitAnimationEnd", function(a) {
					a.target == d && (e.addClass("z-show").removeClass("animationShow"), b && b())
				})
			})
		}, a.fn.animationHide = function(b) {
			this.each(function(c, d) {
				var e = a(d);
				e.removeClass("z-show").addClass("animationHide").off("webkitAnimationEnd").on("webkitAnimationEnd", function(a) {
					a.target == d && (e.addClass("z-hide").removeClass("animationHide").hide(), b && b())
				})
			})
		}
	}(d)
}), define("lib/zepto/assets", ["./zepto"], function(a, b, c) {
	var d = a("./zepto");
	c.exports = d, function(a) {
		var b, c = [];
		a.fn.remove = function() {
			return this.each(function() {
				this.parentNode && ("IMG" === this.tagName && (c.push(this), this.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=", b && clearTimeout(b), b = setTimeout(function() {
					c = []
				}, 6e4)), this.parentNode.removeChild(this))
			})
		}
	}(d)
}), define("lib/zepto/bak/zepto", [], function(a, b, c) {
	var d = function() {
			function a(a) {
				return null == a ? String(a) : U[V.call(a)] || "object"
			}
			function b(b) {
				return "function" == a(b)
			}
			function c(a) {
				return null != a && a == a.window
			}
			function d(a) {
				return null != a && a.nodeType == a.DOCUMENT_NODE
			}
			function e(b) {
				return "object" == a(b)
			}
			function f(a) {
				return e(a) && !c(a) && Object.getPrototypeOf(a) == Object.prototype
			}
			function g(a) {
				return "number" == typeof a.length
			}
			function h(a) {
				return D.call(a, function(a) {
					return null != a
				})
			}
			function i(a) {
				return a.length > 0 ? x.fn.concat.apply([], a) : a
			}
			function j(a) {
				return a.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
			}
			function k(a) {
				return a in G ? G[a] : G[a] = new RegExp("(^|\\s)" + a + "(\\s|$)")
			}
			function l(a, b) {
				return "number" != typeof b || H[j(a)] ? b : b + "px"
			}
			function m(a) {
				var b, c;
				return F[a] || (b = E.createElement(a), E.body.appendChild(b), c = getComputedStyle(b, "").getPropertyValue("display"), b.parentNode.removeChild(b), "none" == c && (c = "block"), F[a] = c), F[a]
			}
			function n(a) {
				return "children" in a ? C.call(a.children) : x.map(a.childNodes, function(a) {
					return 1 == a.nodeType ? a : void 0
				})
			}
			function o(a, b, c) {
				for (w in b) c && (f(b[w]) || Z(b[w])) ? (f(b[w]) && !f(a[w]) && (a[w] = {}), Z(b[w]) && !Z(a[w]) && (a[w] = []), o(a[w], b[w], c)) : b[w] !== v && (a[w] = b[w])
			}
			function p(a, b) {
				return null == b ? x(a) : x(a).filter(b)
			}
			function q(a, c, d, e) {
				return b(c) ? c.call(a, d, e) : c
			}
			function r(a, b, c) {
				null == c ? a.removeAttribute(b) : a.setAttribute(b, c)
			}
			function s(a, b) {
				var c = a.className,
					d = c && c.baseVal !== v;
				return b === v ? d ? c.baseVal : c : void(d ? c.baseVal = b : a.className = b)
			}
			function t(a) {
				var b;
				try {
					return a ? "true" == a || ("false" == a ? !1 : "null" == a ? null : /^0/.test(a) || isNaN(b = Number(a)) ? /^[\[\{]/.test(a) ? x.parseJSON(a) : a : b) : a
				} catch (c) {
					return a
				}
			}
			function u(a, b) {
				b(a);
				for (var c in a.childNodes) u(a.childNodes[c], b)
			}
			var v, w, x, y, z, A, B = [],
				C = B.slice,
				D = B.filter,
				E = window.document,
				F = {},
				G = {},
				H = {
					"column-count": 1,
					columns: 1,
					"font-weight": 1,
					"line-height": 1,
					opacity: 1,
					"z-index": 1,
					zoom: 1
				},
				I = /^\s*<(\w+|!)[^>]*>/,
				J = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
				K = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
				L = /^(?:body|html)$/i,
				M = /([A-Z])/g,
				N = ["val", "css", "html", "text", "data", "width", "height", "offset"],
				O = ["after", "prepend", "before", "append"],
				P = E.createElement("table"),
				Q = E.createElement("tr"),
				R = {
					tr: E.createElement("tbody"),
					tbody: P,
					thead: P,
					tfoot: P,
					td: Q,
					th: Q,
					"*": E.createElement("div")
				},
				S = /complete|loaded|interactive/,
				T = /^[\w-]*$/,
				U = {},
				V = U.toString,
				W = {},
				X = E.createElement("div"),
				Y = {
					tabindex: "tabIndex",
					readonly: "readOnly",
					"for": "htmlFor",
					"class": "className",
					maxlength: "maxLength",
					cellspacing: "cellSpacing",
					cellpadding: "cellPadding",
					rowspan: "rowSpan",
					colspan: "colSpan",
					usemap: "useMap",
					frameborder: "frameBorder",
					contenteditable: "contentEditable"
				},
				Z = Array.isArray ||
			function(a) {
				return a instanceof Array
			};
			return W.matches = function(a, b) {
				if (!b || !a || 1 !== a.nodeType) return !1;
				var c = a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.matchesSelector;
				if (c) return c.call(a, b);
				var d, e = a.parentNode,
					f = !e;
				return f && (e = X).appendChild(a), d = ~W.qsa(e, b).indexOf(a), f && X.removeChild(a), d
			}, z = function(a) {
				return a.replace(/-+(.)?/g, function(a, b) {
					return b ? b.toUpperCase() : ""
				})
			}, A = function(a) {
				return D.call(a, function(b, c) {
					return a.indexOf(b) == c
				})
			}, W.fragment = function(a, b, c) {
				var d, e, g;
				return J.test(a) && (d = x(E.createElement(RegExp.$1))), d || (a.replace && (a = a.replace(K, "<$1></$2>")), b === v && (b = I.test(a) && RegExp.$1), b in R || (b = "*"), g = R[b], g.innerHTML = "" + a, d = x.each(C.call(g.childNodes), function() {
					g.removeChild(this)
				})), f(c) && (e = x(d), x.each(c, function(a, b) {
					N.indexOf(a) > -1 ? e[a](b) : e.attr(a, b)
				})), d
			}, W.Z = function(a, b) {
				return a = a || [], a.__proto__ = x.fn, a.selector = b || "", a
			}, W.isZ = function(a) {
				return a instanceof W.Z
			}, W.init = function(a, c) {
				var d;
				if (!a) return W.Z();
				if ("string" == typeof a) if (a = a.trim(), "<" == a[0] && I.test(a)) d = W.fragment(a, RegExp.$1, c), a = null;
				else {
					if (c !== v) return x(c).find(a);
					d = W.qsa(E, a)
				} else {
					if (b(a)) return x(E).ready(a);
					if (W.isZ(a)) return a;
					if (Z(a)) d = h(a);
					else if (e(a)) d = [a], a = null;
					else if (I.test(a)) d = W.fragment(a.trim(), RegExp.$1, c), a = null;
					else {
						if (c !== v) return x(c).find(a);
						d = W.qsa(E, a)
					}
				}
				return W.Z(d, a)
			}, x = function(a, b) {
				return W.init(a, b)
			}, x.extend = function(a) {
				var b, c = C.call(arguments, 1);
				return "boolean" == typeof a && (b = a, a = c.shift()), c.forEach(function(c) {
					o(a, c, b)
				}), a
			}, W.qsa = function(a, b) {
				var c, e = "#" == b[0],
					f = !e && "." == b[0],
					g = e || f ? b.slice(1) : b,
					h = T.test(g);
				return d(a) && h && e ? (c = a.getElementById(g)) ? [c] : [] : 1 !== a.nodeType && 9 !== a.nodeType ? [] : C.call(h && !e ? f ? a.getElementsByClassName(g) : a.getElementsByTagName(b) : a.querySelectorAll(b))
			}, x.contains = function(a, b) {
				return a !== b && a.contains(b)
			}, x.type = a, x.isFunction = b, x.isWindow = c, x.isArray = Z, x.isPlainObject = f, x.isEmptyObject = function(a) {
				var b;
				for (b in a) return !1;
				return !0
			}, x.inArray = function(a, b, c) {
				return B.indexOf.call(b, a, c)
			}, x.camelCase = z, x.trim = function(a) {
				return null == a ? "" : String.prototype.trim.call(a)
			}, x.uuid = 0, x.support = {}, x.expr = {}, x.map = function(a, b) {
				var c, d, e, f = [];
				if (g(a)) for (d = 0; d < a.length; d++) c = b(a[d], d), null != c && f.push(c);
				else for (e in a) c = b(a[e], e), null != c && f.push(c);
				return i(f)
			}, x.each = function(a, b) {
				var c, d;
				if (g(a)) {
					for (c = 0; c < a.length; c++) if (b.call(a[c], c, a[c]) === !1) return a
				} else for (d in a) if (b.call(a[d], d, a[d]) === !1) return a;
				return a
			}, x.grep = function(a, b) {
				return D.call(a, b)
			}, window.JSON && (x.parseJSON = JSON.parse), x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
				U["[object " + b + "]"] = b.toLowerCase()
			}), x.fn = {
				forEach: B.forEach,
				reduce: B.reduce,
				push: B.push,
				sort: B.sort,
				indexOf: B.indexOf,
				concat: B.concat,
				map: function(a) {
					return x(x.map(this, function(b, c) {
						return a.call(b, c, b)
					}))
				},
				slice: function() {
					return x(C.apply(this, arguments))
				},
				ready: function(a) {
					return S.test(E.readyState) && E.body ? a(x) : E.addEventListener("DOMContentLoaded", function() {
						a(x)
					}, !1), this
				},
				get: function(a) {
					return a === v ? C.call(this) : this[a >= 0 ? a : a + this.length]
				},
				toArray: function() {
					return this.get()
				},
				size: function() {
					return this.length
				},
				remove: function() {
					return this.each(function() {
						null != this.parentNode && this.parentNode.removeChild(this)
					})
				},
				each: function(a) {
					return B.every.call(this, function(b, c) {
						return a.call(b, c, b) !== !1
					}), this
				},
				filter: function(a) {
					return b(a) ? this.not(this.not(a)) : x(D.call(this, function(b) {
						return W.matches(b, a)
					}))
				},
				add: function(a, b) {
					return x(A(this.concat(x(a, b))))
				},
				is: function(a) {
					return this.length > 0 && W.matches(this[0], a)
				},
				not: function(a) {
					var c = [];
					if (b(a) && a.call !== v) this.each(function(b) {
						a.call(this, b) || c.push(this)
					});
					else {
						var d = "string" == typeof a ? this.filter(a) : g(a) && b(a.item) ? C.call(a) : x(a);
						this.forEach(function(a) {
							d.indexOf(a) < 0 && c.push(a)
						})
					}
					return x(c)
				},
				has: function(a) {
					return this.filter(function() {
						return e(a) ? x.contains(this, a) : x(this).find(a).size()
					})
				},
				eq: function(a) {
					return -1 === a ? this.slice(a) : this.slice(a, +a + 1)
				},
				first: function() {
					var a = this[0];
					return a && !e(a) ? a : x(a)
				},
				last: function() {
					var a = this[this.length - 1];
					return a && !e(a) ? a : x(a)
				},
				find: function(a) {
					var b, c = this;
					return b = "object" == typeof a ? x(a).filter(function() {
						var a = this;
						return B.some.call(c, function(b) {
							return x.contains(b, a)
						})
					}) : 1 == this.length ? x(W.qsa(this[0], a)) : this.map(function() {
						return W.qsa(this, a)
					})
				},
				closest: function(a, b) {
					var c = this[0],
						e = !1;
					for ("object" == typeof a && (e = x(a)); c && !(e ? e.indexOf(c) >= 0 : W.matches(c, a));) c = c !== b && !d(c) && c.parentNode;
					return x(c)
				},
				parents: function(a) {
					for (var b = [], c = this; c.length > 0;) c = x.map(c, function(a) {
						return (a = a.parentNode) && !d(a) && b.indexOf(a) < 0 ? (b.push(a), a) : void 0
					});
					return p(b, a)
				},
				parent: function(a) {
					return p(A(this.pluck("parentNode")), a)
				},
				children: function(a) {
					return p(this.map(function() {
						return n(this)
					}), a)
				},
				contents: function() {
					return this.map(function() {
						return C.call(this.childNodes)
					})
				},
				siblings: function(a) {
					return p(this.map(function(a, b) {
						return D.call(n(b.parentNode), function(a) {
							return a !== b
						})
					}), a)
				},
				empty: function() {
					return this.each(function() {
						this.innerHTML = ""
					})
				},
				pluck: function(a) {
					return x.map(this, function(b) {
						return b[a]
					})
				},
				show: function() {
					return this.each(function() {
						"none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = m(this.nodeName))
					})
				},
				replaceWith: function(a) {
					return this.before(a).remove()
				},
				wrap: function(a) {
					var c = b(a);
					if (this[0] && !c) var d = x(a).get(0),
						e = d.parentNode || this.length > 1;
					return this.each(function(b) {
						x(this).wrapAll(c ? a.call(this, b) : e ? d.cloneNode(!0) : d)
					})
				},
				wrapAll: function(a) {
					if (this[0]) {
						x(this[0]).before(a = x(a));
						for (var b;
						(b = a.children()).length;) a = b.first();
						x(a).append(this)
					}
					return this
				},
				wrapInner: function(a) {
					var c = b(a);
					return this.each(function(b) {
						var d = x(this),
							e = d.contents(),
							f = c ? a.call(this, b) : a;
						e.length ? e.wrapAll(f) : d.append(f)
					})
				},
				unwrap: function() {
					return this.parent().each(function() {
						x(this).replaceWith(x(this).children())
					}), this
				},
				clone: function() {
					return this.map(function() {
						return this.cloneNode(!0)
					})
				},
				hide: function() {
					return this.css("display", "none")
				},
				toggle: function(a) {
					return this.each(function() {
						var b = x(this);
						(a === v ? "none" == b.css("display") : a) ? b.show() : b.hide()
					})
				},
				prev: function(a) {
					return x(this.pluck("previousElementSibling")).filter(a || "*")
				},
				next: function(a) {
					return x(this.pluck("nextElementSibling")).filter(a || "*")
				},
				html: function(a) {
					return 0 === arguments.length ? this.length > 0 ? this[0].innerHTML : null : this.each(function(b) {
						var c = this.innerHTML;
						x(this).empty().append(q(this, a, b, c))
					})
				},
				text: function(a) {
					return 0 === arguments.length ? this.length > 0 ? this[0].textContent : null : this.each(function() {
						this.textContent = a === v ? "" : "" + a
					})
				},
				attr: function(a, b) {
					var c;
					return "string" == typeof a && b === v ? 0 == this.length || 1 !== this[0].nodeType ? v : "value" == a && "INPUT" == this[0].nodeName ? this.val() : !(c = this[0].getAttribute(a)) && a in this[0] ? this[0][a] : c : this.each(function(c) {
						if (1 === this.nodeType) if (e(a)) for (w in a) r(this, w, a[w]);
						else r(this, a, q(this, b, c, this.getAttribute(a)))
					})
				},
				removeAttr: function(a) {
					return this.each(function() {
						1 === this.nodeType && r(this, a)
					})
				},
				prop: function(a, b) {
					return a = Y[a] || a, b === v ? this[0] && this[0][a] : this.each(function(c) {
						this[a] = q(this, b, c, this[a])
					})
				},
				data: function(a, b) {
					var c = this.attr("data-" + a.replace(M, "-$1").toLowerCase(), b);
					return null !== c ? t(c) : v
				},
				val: function(a) {
					return 0 === arguments.length ? this[0] && (this[0].multiple ? x(this[0]).find("option").filter(function() {
						return this.selected
					}).pluck("value") : this[0].value) : this.each(function(b) {
						this.value = q(this, a, b, this.value)
					})
				},
				offset: function(a) {
					if (a) return this.each(function(b) {
						var c = x(this),
							d = q(this, a, b, c.offset()),
							e = c.offsetParent().offset(),
							f = {
								top: d.top - e.top,
								left: d.left - e.left
							};
						"static" == c.css("position") && (f.position = "relative"), c.css(f)
					});
					if (0 == this.length) return null;
					var b = this[0].getBoundingClientRect();
					return {
						left: b.left + window.pageXOffset,
						top: b.top + window.pageYOffset,
						width: Math.round(b.width),
						height: Math.round(b.height)
					}
				},
				css: function(b, c) {
					if (arguments.length < 2) {
						var d = this[0],
							e = getComputedStyle(d, "");
						if (!d) return;
						if ("string" == typeof b) return d.style[z(b)] || e.getPropertyValue(b);
						if (Z(b)) {
							var f = {};
							return x.each(Z(b) ? b : [b], function(a, b) {
								f[b] = d.style[z(b)] || e.getPropertyValue(b)
							}), f
						}
					}
					var g = "";
					if ("string" == a(b)) c || 0 === c ? g = j(b) + ":" + l(b, c) : this.each(function() {
						this.style.removeProperty(j(b))
					});
					else for (w in b) b[w] || 0 === b[w] ? g += j(w) + ":" + l(w, b[w]) + ";" : this.each(function() {
						this.style.removeProperty(j(w))
					});
					return this.each(function() {
						this.style.cssText += ";" + g
					})
				},
				index: function(a) {
					return a ? this.indexOf(x(a)[0]) : this.parent().children().indexOf(this[0])
				},
				hasClass: function(a) {
					return a ? B.some.call(this, function(a) {
						return this.test(s(a))
					}, k(a)) : !1
				},
				addClass: function(a) {
					return a ? this.each(function(b) {
						y = [];
						var c = s(this),
							d = q(this, a, b, c);
						d.split(/\s+/g).forEach(function(a) {
							x(this).hasClass(a) || y.push(a)
						}, this), y.length && s(this, c + (c ? " " : "") + y.join(" "))
					}) : this
				},
				removeClass: function(a) {
					return this.each(function(b) {
						return a === v ? s(this, "") : (y = s(this), q(this, a, b, y).split(/\s+/g).forEach(function(a) {
							y = y.replace(k(a), " ")
						}), void s(this, y.trim()))
					})
				},
				toggleClass: function(a, b) {
					return a ? this.each(function(c) {
						var d = x(this),
							e = q(this, a, c, s(this));
						e.split(/\s+/g).forEach(function(a) {
							(b === v ? !d.hasClass(a) : b) ? d.addClass(a) : d.removeClass(a)
						})
					}) : this
				},
				scrollTop: function(a) {
					if (this.length) {
						var b = "scrollTop" in this[0];
						return a === v ? b ? this[0].scrollTop : this[0].pageYOffset : this.each(b ?
						function() {
							this.scrollTop = a
						} : function() {
							this.scrollTo(this.scrollX, a)
						})
					}
				},
				scrollLeft: function(a) {
					if (this.length) {
						var b = "scrollLeft" in this[0];
						return a === v ? b ? this[0].scrollLeft : this[0].pageXOffset : this.each(b ?
						function() {
							this.scrollLeft = a
						} : function() {
							this.scrollTo(a, this.scrollY)
						})
					}
				},
				position: function() {
					if (this.length) {
						var a = this[0],
							b = this.offsetParent(),
							c = this.offset(),
							d = L.test(b[0].nodeName) ? {
								top: 0,
								left: 0
							} : b.offset();
						return c.top -= parseFloat(x(a).css("margin-top")) || 0, c.left -= parseFloat(x(a).css("margin-left")) || 0, d.top += parseFloat(x(b[0]).css("border-top-width")) || 0, d.left += parseFloat(x(b[0]).css("border-left-width")) || 0, {
							top: c.top - d.top,
							left: c.left - d.left
						}
					}
				},
				offsetParent: function() {
					return this.map(function() {
						for (var a = this.offsetParent || E.body; a && !L.test(a.nodeName) && "static" == x(a).css("position");) a = a.offsetParent;
						return a
					})
				}
			}, x.fn.detach = x.fn.remove, ["width", "height"].forEach(function(a) {
				var b = a.replace(/./, function(a) {
					return a[0].toUpperCase()
				});
				x.fn[a] = function(e) {
					var f, g = this[0];
					return e === v ? c(g) ? g["inner" + b] : d(g) ? g.documentElement["scroll" + b] : (f = this.offset()) && f[a] : this.each(function(b) {
						g = x(this), g.css(a, q(this, e, b, g[a]()))
					})
				}
			}), O.forEach(function(b, c) {
				var d = c % 2;
				x.fn[b] = function() {
					var b, e, f = x.map(arguments, function(c) {
						return b = a(c), "object" == b || "array" == b || null == c ? c : W.fragment(c)
					}),
						g = this.length > 1;
					return f.length < 1 ? this : this.each(function(a, b) {
						e = d ? b : b.parentNode, b = 0 == c ? b.nextSibling : 1 == c ? b.firstChild : 2 == c ? b : null, f.forEach(function(a) {
							if (g) a = a.cloneNode(!0);
							else if (!e) return x(a).remove();
							u(e.insertBefore(a, b), function(a) {
								null == a.nodeName || "SCRIPT" !== a.nodeName.toUpperCase() || a.type && "text/javascript" !== a.type || a.src || window.eval.call(window, a.innerHTML)
							})
						})
					})
				}, x.fn[d ? b + "To" : "insert" + (c ? "Before" : "After")] = function(a) {
					return x(a)[b](this), this
				}
			}), W.Z.prototype = x.fn, W.uniq = A, W.deserializeValue = t, x.zepto = W, x
		}();
	window.Zepto = d, void 0 === window.$ && (window.$ = d), c.exports = d
}), define("lib/zepto/callbacks", ["./zepto"], function(a, b, c) {
	var d = a("./zepto");
	c.exports = d, function(a) {
		a.Callbacks = function(b) {
			b = a.extend({}, b);
			var c, d, e, f, g, h, i = [],
				j = !b.once && [],
				k = function(a) {
					for (c = b.memory && a, d = !0, h = f || 0, f = 0, g = i.length, e = !0; i && g > h; ++h) if (i[h].apply(a[0], a[1]) === !1 && b.stopOnFalse) {
						c = !1;
						break
					}
					e = !1, i && (j ? j.length && k(j.shift()) : c ? i.length = 0 : l.disable())
				},
				l = {
					add: function() {
						if (i) {
							var d = i.length,
								h = function(c) {
									a.each(c, function(a, c) {
										"function" == typeof c ? b.unique && l.has(c) || i.push(c) : c && c.length && "string" != typeof c && h(c)
									})
								};
							h(arguments), e ? g = i.length : c && (f = d, k(c))
						}
						return this
					},
					remove: function() {
						return i && a.each(arguments, function(b, c) {
							for (var d;
							(d = a.inArray(c, i, d)) > -1;) i.splice(d, 1), e && (g >= d && --g, h >= d && --h)
						}), this
					},
					has: function(b) {
						return !(!i || !(b ? a.inArray(b, i) > -1 : i.length))
					},
					empty: function() {
						return g = i.length = 0, this
					},
					disable: function() {
						return i = j = c = void 0, this
					},
					disabled: function() {
						return !i
					},
					lock: function() {
						return j = void 0, c || l.disable(), this
					},
					locked: function() {
						return !j
					},
					fireWith: function(a, b) {
						return !i || d && !j || (b = b || [], b = [a, b.slice ? b.slice() : b], e ? j.push(b) : k(b)), this
					},
					fire: function() {
						return l.fireWith(this, arguments)
					},
					fired: function() {
						return !!d
					}
				};
			return l
		}
	}(d)
}), define("lib/zepto/coffee", ["./zepto"], function(a, b, c) {
	var d = a("./zepto");
	c.exports = d, function(a, b) {
		function c(a) {
			return a.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase()
		}
		function d(a) {
			return e ? e + a : a.toLowerCase()
		}
		var e, f, g, h, i, j, k, l, m, n, o = "",
			p = {
				Webkit: "webkit",
				Moz: "",
				O: "o"
			},
			q = window.document,
			r = q.createElement("div"),
			s = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
			t = {};
		a.each(p, function(a, c) {
			return r.style[a + "TransitionProperty"] !== b ? (o = "-" + a.toLowerCase() + "-", e = c, !1) : void 0
		}), f = o + "transform", t[g = o + "transition-property"] = t[h = o + "transition-duration"] = t[j = o + "transition-delay"] = t[i = o + "transition-timing-function"] = t[k = o + "animation-name"] = t[l = o + "animation-duration"] = t[n = o + "animation-delay"] = t[m = o + "animation-timing-function"] = "", a.fx = {
			off: e === b && r.style.transitionProperty === b,
			speeds: {
				_default: 400,
				fast: 200,
				slow: 600
			},
			cssPrefix: o,
			transitionEnd: d("TransitionEnd"),
			animationEnd: d("AnimationEnd")
		}, a.fn.animate = function(c, d, e, f, g) {
			return a.isFunction(d) && (f = d, e = b, d = b), a.isFunction(e) && (f = e, e = b), a.isPlainObject(d) && (e = d.easing, f = d.complete, g = d.delay, d = d.duration), d && (d = ("number" == typeof d ? d : a.fx.speeds[d] || a.fx.speeds._default) / 1e3), g && (g = parseFloat(g) / 1e3), this.anim(c, d, e, f, g)
		}, a.fn.anim = function(d, e, o, p, q) {
			var r, u, v, w = {},
				x = "",
				y = this,
				z = a.fx.transitionEnd,
				A = !1;
			if (e === b && (e = a.fx.speeds._default / 1e3), q === b && (q = 0), a.fx.off && (e = 0), "string" == typeof d) w[k] = d, w[l] = e + "s", w[n] = q + "s", w[m] = o || "linear", z = a.fx.animationEnd;
			else {
				u = [];
				for (r in d) s.test(r) ? x += r + "(" + d[r] + ") " : (w[r] = d[r], u.push(c(r)));
				x && (w[f] = x, u.push(f)), e > 0 && "object" == typeof d && (w[g] = u.join(", "), w[h] = e + "s", w[j] = q + "s", w[i] = o || "linear")
			}
			return v = function(b) {
				if ("undefined" != typeof b) {
					if (b.target !== b.currentTarget) return;
					a(b.target).unbind(z, v)
				} else a(this).unbind(z, v);
				A = !0, a(this).css(t), p && p.call(this)
			}, e > 0 && (this.bind(z, v), setTimeout(function() {
				A || v.call(y)
			}, 1e3 * e + 25)), this.size() && this.get(0).clientLeft, this.css(w), 0 >= e && setTimeout(function() {
				y.each(function() {
					v.call(this)
				})
			}, 0), this
		}, r = null
	}(d), function(a) {
		a.fn.coffee = function(b) {
			function c() {
				var b = f(8, m.steamMaxSize),
					c = e(1, m.steamsFontFamily),
					d = "#" + e(6, "0123456789ABCDEF"),
					h = f(0, 44),
					i = f(-90, 89),
					j = g(.4, 1),
					l = a.fx.cssPrefix + "transform";
				l = l + ":rotate(" + i + "deg) scale(" + j + ");";
				var p = a('<span class="coffee-steam">' + e(1, m.steams) + "</span>"),
					q = f(0, n - m.steamWidth - b);
				q > h && (q = f(0, h)), p.css({
					position: "absolute",
					left: h,
					top: m.steamHeight,
					"font-size:": b + "px",
					color: d,
					"font-family": c,
					display: "block",
					opacity: 1
				}).attr("style", p.attr("style") + l).appendTo(o).animate({
					top: f(m.steamHeight / 2, 0),
					left: q,
					opacity: 0
				}, f(m.steamFlyTime / 2, 1.2 * m.steamFlyTime), k, function() {
					p.remove(), p = null
				})
			}
			function d() {
				var a = f(-10, 10);
				a += parseInt(o.css("left")), a >= 54 ? a = 54 : 34 >= a && (a = 34), o.animate({
					left: a
				}, f(1e3, 3e3), k)
			}
			function e(a, b) {
				a = a || 1;
				var c = "",
					d = b.length - 1,
					e = 0;
				for (i = 0; a > i; i++) e = f(0, d - 1), c += b.slice(e, e + 1);
				return c
			}
			function f(a, b) {
				var c = b - a,
					d = a + Math.round(Math.random() * c);
				return parseInt(d)
			}
			function g(a, b) {
				var c = b - a,
					d = a + Math.random() * c;
				return parseFloat(d)
			}
			var h = null,
				j = null,
				k = "cubic-bezier(.09,.64,.16,.94)",
				l = a(this),
				m = a.extend({}, a.fn.coffee.defaults, b),
				n = m.steamWidth,
				o = a('<div class="coffee-steam-box"></div>').css({
					height: m.steamHeight,
					width: m.steamWidth,
					left: 60,
					top: -50,
					position: "absolute",
					overflow: "hidden",
					"z-index": 0
				}).appendTo(l);
			return a.fn.coffee.stop = function() {
				clearInterval(h), clearInterval(j)
			}, a.fn.coffee.start = function() {
				h = setInterval(function() {
					c()
				}, f(m.steamInterval / 2, 2 * m.steamInterval)), j = setInterval(function() {
					d()
				}, f(100, 1e3) + f(1e3, 3e3))
			}, l
		}, a.fn.coffee.defaults = {
			steams: ["jQuery", "HTML5", "HTML6", "CSS2", "CSS3", "JS", "$.fn()", "char", "short", "if", "float", "else", "type", "case", "function", "travel", "return", "array()", "empty()", "eval", "C++", "JAVA", "PHP", "JSP", ".NET", "while", "this", "$.find();", "float", "$.ajax()", "addClass", "width", "height", "Click", "each", "animate", "cookie", "bug", "Design", "Julying", "$(this)", "i++", "Chrome", "Firefox", "Firebug", "IE6", "Guitar", "Music", "攻城师", "旅行", "王子墨", "啤酒"],
			steamsFontFamily: ["Verdana", "Geneva", "Comic Sans MS", "MS Serif", "Lucida Sans Unicode", "Times New Roman", "Trebuchet MS", "Arial", "Courier New", "Georgia"],
			steamFlyTime: 5e3,
			steamInterval: 500,
			steamMaxSize: 30,
			steamHeight: 200,
			steamWidth: 300
		}, a.fn.coffee.version = "2.0.0"
	}(d)
}), define("lib/zepto/data", ["./zepto"], function(a, b, c) {
	var d = a("./zepto");
	c.exports = d, function(a) {
		function b(b, d) {
			var i = b[h],
				j = i && e[i];
			if (void 0 === d) return j || c(b);
			if (j) {
				if (d in j) return j[d];
				var k = g(d);
				if (k in j) return j[k]
			}
			return f.call(a(b), d)
		}
		function c(b, c, f) {
			var i = b[h] || (b[h] = ++a.uuid),
				j = e[i] || (e[i] = d(b));
			return void 0 !== c && (j[g(c)] = f), j
		}
		function d(b) {
			var c = {};
			return a.each(b.attributes || i, function(b, d) {
				0 == d.name.indexOf("data-") && (c[g(d.name.replace("data-", ""))] = a.zepto.deserializeValue(d.value))
			}), c
		}
		var e = {},
			f = a.fn.data,
			g = a.camelCase,
			h = a.expando = "Zepto" + +new Date,
			i = [];
		a.fn.data = function(d, e) {
			return void 0 === e ? a.isPlainObject(d) ? this.each(function(b, e) {
				a.each(d, function(a, b) {
					c(e, a, b)
				})
			}) : 0 == this.length ? void 0 : b(this[0], d) : this.each(function() {
				c(this, d, e)
			})
		}, a.fn.removeData = function(b) {
			return "string" == typeof b && (b = b.split(/\s+/)), this.each(function() {
				var c = this[h],
					d = c && e[c];
				d && a.each(b || d, function(a) {
					delete d[b ? g(this) : a]
				})
			})
		}, ["remove", "empty"].forEach(function(b) {
			var c = a.fn[b];
			a.fn[b] = function() {
				var a = this.find("*");
				return "remove" === b && (a = a.add(this)), a.removeData(), c.call(this)
			}
		})
	}(d)
}), define("lib/zepto/deferred", ["./zepto"], function(a, b, c) {
	var d = a("./zepto");
	c.exports = d, function(a) {
		function b(c) {
			var d = [
				["resolve", "done", a.Callbacks({
					once: 1,
					memory: 1
				}), "resolved"],
				["reject", "fail", a.Callbacks({
					once: 1,
					memory: 1
				}), "rejected"],
				["notify", "progress", a.Callbacks({
					memory: 1
				})]
			],
				e = "pending",
				f = {
					state: function() {
						return e
					},
					always: function() {
						return g.done(arguments).fail(arguments), this
					},
					then: function() {
						var c = arguments;
						return b(function(b) {
							a.each(d, function(d, e) {
								var h = a.isFunction(c[d]) && c[d];
								g[e[1]](function() {
									var c = h && h.apply(this, arguments);
									if (c && a.isFunction(c.promise)) c.promise().done(b.resolve).fail(b.reject).progress(b.notify);
									else {
										var d = this === f ? b.promise() : this,
											g = h ? [c] : arguments;
										b[e[0] + "With"](d, g)
									}
								})
							}), c = null
						}).promise()
					},
					promise: function(b) {
						return null != b ? a.extend(b, f) : f
					}
				},
				g = {};
			return a.each(d, function(a, b) {
				var c = b[2],
					h = b[3];
				f[b[1]] = c.add, h && c.add(function() {
					e = h
				}, d[1 ^ a][2].disable, d[2][2].lock), g[b[0]] = function() {
					return g[b[0] + "With"](this === g ? f : this, arguments), this
				}, g[b[0] + "With"] = c.fireWith
			}), f.promise(g), c && c.call(g, g), g
		}
		var c = Array.prototype.slice;
		a.when = function(d) {
			var e, f, g, h = c.call(arguments),
				i = h.length,
				j = 0,
				k = 1 !== i || d && a.isFunction(d.promise) ? i : 0,
				l = 1 === k ? d : b(),
				m = function(a, b, d) {
					return function(f) {
						b[a] = this, d[a] = arguments.length > 1 ? c.call(arguments) : f, d === e ? l.notifyWith(b, d) : --k || l.resolveWith(b, d)
					}
				};
			if (i > 1) for (e = new Array(i), f = new Array(i), g = new Array(i); i > j; ++j) h[j] && a.isFunction(h[j].promise) ? h[j].promise().done(m(j, g, h)).fail(l.reject).progress(m(j, f, e)) : --k;
			return k || l.resolveWith(g, h), l.promise()
		}, a.Deferred = b
	}(d)
}), define("lib/zepto/detect", ["./zepto"], function(a, b, c) {
	var d = a("./zepto");
	c.exports = d, function(a) {
		function b(a) {
			var b = this.os = {},
				c = this.browser = {},
				d = a.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
				e = a.match(/(Android);?[\s\/]+([\d.]+)?/),
				f = !! a.match(/\(Macintosh\; Intel /),
				g = a.match(/(iPad).*OS\s([\d_]+)/),
				h = a.match(/(iPod)(.*OS\s([\d_]+))?/),
				i = !g && a.match(/(iPhone\sOS)\s([\d_]+)/),
				j = a.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
				k = j && a.match(/TouchPad/),
				l = a.match(/Kindle\/([\d.]+)/),
				m = a.match(/Silk\/([\d._]+)/),
				n = a.match(/(BlackBerry).*Version\/([\d.]+)/),
				o = a.match(/(BB10).*Version\/([\d.]+)/),
				p = a.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
				q = a.match(/PlayBook/),
				r = a.match(/Chrome\/([\d.]+)/) || a.match(/CriOS\/([\d.]+)/),
				s = a.match(/Firefox\/([\d.]+)/),
				t = a.match(/MSIE\s([\d.]+)/) || a.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
				u = !r && a.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
				v = u || a.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);
			(c.webkit = !! d) && (c.version = d[1]), e && (b.android = !0, b.version = e[2]), i && !h && (b.ios = b.iphone = !0, b.version = i[2].replace(/_/g, ".")), g && (b.ios = b.ipad = !0, b.version = g[2].replace(/_/g, ".")), h && (b.ios = b.ipod = !0, b.version = h[3] ? h[3].replace(/_/g, ".") : null), j && (b.webos = !0, b.version = j[2]), k && (b.touchpad = !0), n && (b.blackberry = !0, b.version = n[2]), o && (b.bb10 = !0, b.version = o[2]), p && (b.rimtabletos = !0, b.version = p[2]), q && (c.playbook = !0), l && (b.kindle = !0, b.version = l[1]), m && (c.silk = !0, c.version = m[1]), !m && b.android && a.match(/Kindle Fire/) && (c.silk = !0), r && (c.chrome = !0, c.version = r[1]), s && (c.firefox = !0, c.version = s[1]), t && (c.ie = !0, c.version = t[1]), v && (f || b.ios) && (c.safari = !0, f && (c.version = v[1])), u && (c.webview = !0), b.tablet = !! (g || q || e && !a.match(/Mobile/) || s && a.match(/Tablet/) || t && !a.match(/Phone/) && a.match(/Touch/)), b.phone = !(b.tablet || b.ipod || !(e || i || j || n || o || r && a.match(/Android/) || r && a.match(/CriOS\/([\d.]+)/) || s && a.match(/Mobile/) || t && a.match(/Touch/)))
		}
		b.call(a, navigator.userAgent), a.__detect = b
	}(d)
}), define("lib/zepto/event", ["./zepto"], function(a, b, c) {
	var d = a("./zepto");
	c.exports = d, function(a) {
		function b(a) {
			return a._zid || (a._zid = m++)
		}
		function c(a, c, f, g) {
			if (c = d(c), c.ns) var h = e(c.ns);
			return (q[b(a)] || []).filter(function(a) {
				return !(!a || c.e && a.e != c.e || c.ns && !h.test(a.ns) || f && b(a.fn) !== b(f) || g && a.sel != g)
			})
		}
		function d(a) {
			var b = ("" + a).split(".");
			return {
				e: b[0],
				ns: b.slice(1).sort().join(" ")
			}
		}
		function e(a) {
			return new RegExp("(?:^| )" + a.replace(" ", " .* ?") + "(?: |$)")
		}
		function f(a, b) {
			return a.del && !s && a.e in t || !! b
		}
		function g(a) {
			return u[a] || s && t[a] || a
		}
		function h(c, e, h, i, k, m, n) {
			var o = b(c),
				p = q[o] || (q[o] = []);
			e.split(/\s/).forEach(function(b) {
				if ("ready" == b) return a(document).ready(h);
				var e = d(b);
				e.fn = h, e.sel = k, e.e in u && (h = function(b) {
					var c = b.relatedTarget;
					return !c || c !== this && !a.contains(this, c) ? e.fn.apply(this, arguments) : void 0
				}), e.del = m;
				var o = m || h;
				e.proxy = function(a) {
					if (a = j(a), !a.isImmediatePropagationStopped()) {
						a.data = i;
						var b = o.apply(c, a._args == l ? [a] : [a].concat(a._args));
						return b === !1 && (a.preventDefault(), a.stopPropagation()), b
					}
				}, e.i = p.length, p.push(e), "addEventListener" in c && c.addEventListener(g(e.e), e.proxy, f(e, n))
			})
		}
		function i(a, d, e, h, i) {
			var j = b(a);
			(d || "").split(/\s/).forEach(function(b) {
				c(a, b, e, h).forEach(function(b) {
					delete q[j][b.i], "removeEventListener" in a && a.removeEventListener(g(b.e), b.proxy, f(b, i))
				})
			})
		}
		function j(b, c) {
			return (c || !b.isDefaultPrevented) && (c || (c = b), a.each(y, function(a, d) {
				var e = c[a];
				b[a] = function() {
					return this[d] = v, e && e.apply(c, arguments)
				}, b[d] = w
			}), (c.defaultPrevented !== l ? c.defaultPrevented : "returnValue" in c ? c.returnValue === !1 : c.getPreventDefault && c.getPreventDefault()) && (b.isDefaultPrevented = v)), b
		}
		function k(a) {
			var b, c = {
				originalEvent: a
			};
			for (b in a) x.test(b) || a[b] === l || (c[b] = a[b]);
			return j(c, a)
		}
		var l, m = 1,
			n = Array.prototype.slice,
			o = a.isFunction,
			p = function(a) {
				return "string" == typeof a
			},
			q = {},
			r = {},
			s = "onfocusin" in window,
			t = {
				focus: "focusin",
				blur: "focusout"
			},
			u = {
				mouseenter: "mouseover",
				mouseleave: "mouseout"
			};
		r.click = r.mousedown = r.mouseup = r.mousemove = "MouseEvents", a.event = {
			add: h,
			remove: i
		}, a.proxy = function(c, d) {
			if (o(c)) {
				var e = function() {
						return c.apply(d, arguments)
					};
				return e._zid = b(c), e
			}
			if (p(d)) return a.proxy(c[d], c);
			throw new TypeError("expected function")
		}, a.fn.bind = function(a, b, c) {
			return this.on(a, b, c)
		}, a.fn.unbind = function(a, b) {
			return this.off(a, b)
		}, a.fn.one = function(a, b, c, d) {
			return this.on(a, b, c, d, 1)
		};
		var v = function() {
				return !0
			},
			w = function() {
				return !1
			},
			x = /^([A-Z]|returnValue$|layer[XY]$)/,
			y = {
				preventDefault: "isDefaultPrevented",
				stopImmediatePropagation: "isImmediatePropagationStopped",
				stopPropagation: "isPropagationStopped"
			};
		a.fn.delegate = function(a, b, c) {
			return this.on(b, a, c)
		}, a.fn.undelegate = function(a, b, c) {
			return this.off(b, a, c)
		}, a.fn.live = function(b, c) {
			return a(document.body).delegate(this.selector, b, c), this
		}, a.fn.die = function(b, c) {
			return a(document.body).undelegate(this.selector, b, c), this
		}, a.fn.on = function(b, c, d, e, f) {
			var g, j, m = this;
			return b && !p(b) ? (a.each(b, function(a, b) {
				m.on(a, c, d, b, f)
			}), m) : (p(c) || o(e) || e === !1 || (e = d, d = c, c = l), (o(d) || d === !1) && (e = d, d = l), e === !1 && (e = w), m.each(function(l, m) {
				f && (g = function(a) {
					return i(m, a.type, e), e.apply(this, arguments)
				}), c && (j = function(b) {
					var d, f = a(b.target).closest(c, m).get(0);
					return f && f !== m ? (d = a.extend(k(b), {
						currentTarget: f,
						liveFired: m
					}), (g || e).apply(f, [d].concat(n.call(arguments, 1)))) : void 0
				}), h(m, b, e, d, c, j || g)
			}))
		}, a.fn.off = function(b, c, d) {
			var e = this;
			return b && !p(b) ? (a.each(b, function(a, b) {
				e.off(a, c, b)
			}), e) : (p(c) || o(d) || d === !1 || (d = c, c = l), d === !1 && (d = w), e.each(function() {
				i(this, b, d, c)
			}))
		}, a.fn.trigger = function(b, c) {
			return b = p(b) || a.isPlainObject(b) ? a.Event(b) : j(b), b._args = c, this.each(function() {
				"dispatchEvent" in this ? this.dispatchEvent(b) : a(this).triggerHandler(b, c)
			})
		}, a.fn.triggerHandler = function(b, d) {
			var e, f;
			return this.each(function(g, h) {
				e = k(p(b) ? a.Event(b) : b), e._args = d, e.target = h, a.each(c(h, b.type || b), function(a, b) {
					return f = b.proxy(e), e.isImmediatePropagationStopped() ? !1 : void 0
				})
			}), f
		}, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(b) {
			a.fn[b] = function(a) {
				return a ? this.bind(b, a) : this.trigger(b)
			}
		}), ["focus", "blur"].forEach(function(b) {
			a.fn[b] = function(a) {
				return a ? this.bind(b, a) : this.each(function() {
					try {
						this[b]()
					} catch (a) {}
				}), this
			}
		}), a.Event = function(a, b) {
			p(a) || (b = a, a = b.type);
			var c = document.createEvent(r[a] || "Events"),
				d = !0;
			if (b) for (var e in b)"bubbles" == e ? d = !! b[e] : c[e] = b[e];
			return c.initEvent(a, d, !0), j(c)
		}
	}(d)
}), define("lib/zepto/form", ["./zepto"], function(a, b, c) {
	var d = a("./zepto");
	c.exports = d, function(a) {
		a.fn.serializeArray = function() {
			var b, c = [];
			return a([].slice.call(this.get(0).elements)).each(function() {
				b = a(this);
				var d = b.attr("type");
				"fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != d && "reset" != d && "button" != d && ("radio" != d && "checkbox" != d || this.checked) && c.push({
					name: b.attr("name"),
					value: b.val()
				})
			}), c
		}, a.fn.serialize = function() {
			var a = [];
			return this.serializeArray().forEach(function(b) {
				a.push(encodeURIComponent(b.name) + "=" + encodeURIComponent(b.value))
			}), a.join("&")
		}, a.fn.submit = function(b) {
			if (b) this.bind("submit", b);
			else if (this.length) {
				var c = a.Event("submit");
				this.eq(0).trigger(c), c.isDefaultPrevented() || this.get(0).submit()
			}
			return this
		}
	}(d)
}), define("lib/zepto/fx", ["./zepto"], function(a, b, c) {
	var d = a("./zepto");
	c.exports = d, function(a, b) {
		function c(a) {
			return a.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase()
		}
		function d(a) {
			return e ? e + a : a.toLowerCase()
		}
		var e, f, g, h, i, j, k, l, m, n, o = "",
			p = {
				Webkit: "webkit",
				Moz: "",
				O: "o"
			},
			q = window.document,
			r = q.createElement("div"),
			s = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
			t = {};
		a.each(p, function(a, c) {
			return r.style[a + "TransitionProperty"] !== b ? (o = "-" + a.toLowerCase() + "-", e = c, !1) : void 0
		}), f = o + "transform", t[g = o + "transition-property"] = t[h = o + "transition-duration"] = t[j = o + "transition-delay"] = t[i = o + "transition-timing-function"] = t[k = o + "animation-name"] = t[l = o + "animation-duration"] = t[n = o + "animation-delay"] = t[m = o + "animation-timing-function"] = "", a.fx = {
			off: e === b && r.style.transitionProperty === b,
			speeds: {
				_default: 400,
				fast: 200,
				slow: 600
			},
			cssPrefix: o,
			transitionEnd: d("TransitionEnd"),
			animationEnd: d("AnimationEnd")
		}, a.fn.animate = function(c, d, e, f, g) {
			return a.isFunction(d) && (f = d, e = b, d = b), a.isFunction(e) && (f = e, e = b), a.isPlainObject(d) && (e = d.easing, f = d.complete, g = d.delay, d = d.duration), d && (d = ("number" == typeof d ? d : a.fx.speeds[d] || a.fx.speeds._default) / 1e3), g && (g = parseFloat(g) / 1e3), this.anim(c, d, e, f, g)
		}, a.fn.anim = function(d, e, o, p, q) {
			var r, u, v, w = {},
				x = "",
				y = this,
				z = a.fx.transitionEnd,
				A = !1;
			if (e === b && (e = a.fx.speeds._default / 1e3), q === b && (q = 0), a.fx.off && (e = 0), "string" == typeof d) w[k] = d, w[l] = e + "s", w[n] = q + "s", w[m] = o || "linear", z = a.fx.animationEnd;
			else {
				u = [];
				for (r in d) s.test(r) ? x += r + "(" + d[r] + ") " : (w[r] = d[r], u.push(c(r)));
				x && (w[f] = x, u.push(f)), e > 0 && "object" == typeof d && (w[g] = u.join(", "), w[h] = e + "s", w[j] = q + "s", w[i] = o || "linear")
			}
			return v = function(b) {
				if ("undefined" != typeof b) {
					if (b.target !== b.currentTarget) return;
					a(b.target).unbind(z, v)
				} else a(this).unbind(z, v);
				A = !0, a(this).css(t), p && p.call(this)
			}, e > 0 && (this.bind(z, v), setTimeout(function() {
				A || v.call(y)
			}, 1e3 * e + 25)), this.size() && this.get(0).clientLeft, this.css(w), 0 >= e && setTimeout(function() {
				y.each(function() {
					v.call(this)
				})
			}, 0), this
		}, r = null
	}(d)
}), define("lib/zepto/fx_methods", ["./zepto"], function(a, b, c) {
	var d = a("./zepto");
	c.exports = d, function(a, b) {
		function c(c, d, e, f, g) {
			"function" != typeof d || g || (g = d, d = b);
			var h = {
				opacity: e
			};
			return f && (h.scale = f, c.css(a.fx.cssPrefix + "transform-origin", "0 0")), c.animate(h, d, null, g)
		}
		function d(b, d, e, f) {
			return c(b, d, 0, e, function() {
				g.call(a(this)), f && f.call(this)
			})
		}
		var e = window.document,
			f = (e.documentElement, a.fn.show),
			g = a.fn.hide,
			h = a.fn.toggle;
		a.fn.show = function(a, d) {
			return f.call(this), a === b ? a = 0 : this.css("opacity", 0), c(this, a, 1, "1,1", d)
		}, a.fn.hide = function(a, c) {
			return a === b ? g.call(this) : d(this, a, "0,0", c)
		}, a.fn.toggle = function(c, d) {
			return c === b || "boolean" == typeof c ? h.call(this, c) : this.each(function() {
				var b = a(this);
				b["none" == b.css("display") ? "show" : "hide"](c, d)
			})
		}, a.fn.fadeTo = function(a, b, d) {
			return c(this, a, b, null, d)
		}, a.fn.fadeIn = function(a, b) {
			var c = this.css("opacity");
			return c > 0 ? this.css("opacity", 0) : c = 1, f.call(this).fadeTo(a, c, b)
		}, a.fn.fadeOut = function(a, b) {
			return d(this, a, null, b)
		}, a.fn.fadeToggle = function(b, c) {
			return this.each(function() {
				var d = a(this);
				d[0 == d.css("opacity") || "none" == d.css("display") ? "fadeIn" : "fadeOut"](b, c)
			})
		}
	}(d)
}), define("lib/zepto/gesture", ["./zepto"], function(a, b, c) {
	var d = a("./zepto");
	c.exports = d, function(a) {
		function b(a) {
			return "tagName" in a ? a : a.parentNode
		}
		if (a.os.ios) {
			var c, d = {};
			a(document).bind("gesturestart", function(a) {
				{
					var e = Date.now();
					e - (d.last || e)
				}
				d.target = b(a.target), c && clearTimeout(c), d.e1 = a.scale, d.last = e
			}).bind("gesturechange", function(a) {
				d.e2 = a.scale
			}).bind("gestureend", function() {
				d.e2 > 0 ? (0 != Math.abs(d.e1 - d.e2) && a(d.target).trigger("pinch") && a(d.target).trigger("pinch" + (d.e1 - d.e2 > 0 ? "In" : "Out")), d.e1 = d.e2 = d.last = 0) : "last" in d && (d = {})
			}), ["pinch", "pinchIn", "pinchOut"].forEach(function(b) {
				a.fn[b] = function(a) {
					return this.bind(b, a)
				}
			})
		}
	}(d)
}), define("lib/zepto/ie", ["./zepto"], function(a, b, c) {
	var d = a("./zepto");
	c.exports = d, function(a) {
		"__proto__" in {} || a.extend(a.zepto, {
			Z: function(b, c) {
				return b = b || [], a.extend(b, a.fn), b.selector = c || "", b.__Z = !0, b
			},
			isZ: function(b) {
				return "array" === a.type(b) && "__Z" in b
			}
		});
		try {
			getComputedStyle(void 0)
		} catch (b) {
			var c = getComputedStyle;
			window.getComputedStyle = function(a) {
				try {
					return c(a)
				} catch (b) {
					return null
				}
			}
		}
	}(d)
}), define("lib/zepto/ios3", ["./zepto"], function(a, b, c) {
	var d = a("./zepto");
	c.exports = d, function(a) {
		String.prototype.trim === a && (String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/g, "")
		}), Array.prototype.reduce === a && (Array.prototype.reduce = function(b) {
			if (void 0 === this || null === this) throw new TypeError;
			var c, d = Object(this),
				e = d.length >>> 0,
				f = 0;
			if ("function" != typeof b) throw new TypeError;
			if (0 == e && 1 == arguments.length) throw new TypeError;
			if (arguments.length >= 2) c = arguments[1];
			else for (;;) {
				if (f in d) {
					c = d[f++];
					break
				}
				if (++f >= e) throw new TypeError
			}
			for (; e > f;) f in d && (c = b.call(a, c, d[f], f, d)), f++;
			return c
		})
	}()
}), define("lib/zepto/selector", ["./zepto"], function(a, b, c) {
	var d = a("./zepto");
	c.exports = d, function(a) {
		function b(b) {
			return b = a(b), !(!b.width() && !b.height()) && "none" !== b.css("display")
		}
		function c(a, b) {
			a = a.replace(/=#\]/g, '="#"]');
			var c, d, e = h.exec(a);
			if (e && e[2] in g && (c = g[e[2]], d = e[3], a = e[1], d)) {
				var f = Number(d);
				d = isNaN(f) ? d.replace(/^["']|["']$/g, "") : f
			}
			return b(a, c, d)
		}
		var d = a.zepto,
			e = d.qsa,
			f = d.matches,
			g = a.expr[":"] = {
				visible: function() {
					return b(this) ? this : void 0
				},
				hidden: function() {
					return b(this) ? void 0 : this
				},
				selected: function() {
					return this.selected ? this : void 0
				},
				checked: function() {
					return this.checked ? this : void 0
				},
				parent: function() {
					return this.parentNode
				},
				first: function(a) {
					return 0 === a ? this : void 0
				},
				last: function(a, b) {
					return a === b.length - 1 ? this : void 0
				},
				eq: function(a, b, c) {
					return a === c ? this : void 0
				},
				contains: function(b, c, d) {
					return a(this).text().indexOf(d) > -1 ? this : void 0
				},
				has: function(a, b, c) {
					return d.qsa(this, c).length ? this : void 0
				}
			},
			h = new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"),
			i = /^\s*>/,
			j = "Zepto" + +new Date;
		d.qsa = function(b, f) {
			return c(f, function(c, g, h) {
				try {
					var k;
					!c && g ? c = "*" : i.test(c) && (k = a(b).addClass(j), c = "." + j + " " + c);
					var l = e(b, c)
				} catch (m) {
					throw console.error("error performing selector: %o", f), m
				} finally {
					k && k.removeClass(j)
				}
				return g ? d.uniq(a.map(l, function(a, b) {
					return g.call(a, b, l, h)
				})) : l
			})
		}, d.matches = function(a, b) {
			return c(b, function(b, c, d) {
				return !(b && !f(a, b) || c && c.call(a, null, d) !== a)
			})
		}
	}(d)
}), define("lib/zepto/stack", ["./zepto"], function(a, b, c) {
	var d = a("./zepto");
	c.exports = d, function(a) {
		a.fn.end = function() {
			return this.prevObject || a()
		}, a.fn.andSelf = function() {
			return this.add(this.prevObject || a())
		}, "filter,add,not,eq,first,last,find,closest,parents,parent,children,siblings".split(",").forEach(function(b) {
			var c = a.fn[b];
			a.fn[b] = function() {
				var a = c.apply(this, arguments);
				return a.prevObject = this, a
			}
		})
	}(d)
}), define("lib/zepto/touch", ["./zepto"], function(a, b, c) {
	var d = a("./zepto");
	c.exports = d, function(a) {
		function b(a, b, c, d) {
			return Math.abs(a - b) >= Math.abs(c - d) ? a - b > 0 ? "Left" : "Right" : c - d > 0 ? "Up" : "Down"
		}
		function c() {
			k = null, m.last && (m.el.trigger("longTap"), m = {})
		}
		function d() {
			k && clearTimeout(k), k = null
		}
		function e() {
			h && clearTimeout(h), i && clearTimeout(i), j && clearTimeout(j), k && clearTimeout(k), h = i = j = k = null, m = {}
		}
		function f(a) {
			return ("touch" == a.pointerType || a.pointerType == a.MSPOINTER_TYPE_TOUCH) && a.isPrimary
		}
		function g(a, b) {
			return a.type == "pointer" + b || a.type.toLowerCase() == "mspointer" + b
		}
		var h, i, j, k, l, m = {},
			n = 750;
		a(document).ready(function() {
			var o, p, q, r, s = 0,
				t = 0;
			"MSGesture" in window && (l = new MSGesture, l.target = document.body), a(document).bind("MSGestureEnd", function(a) {
				var b = a.velocityX > 1 ? "Right" : a.velocityX < -1 ? "Left" : a.velocityY > 1 ? "Down" : a.velocityY < -1 ? "Up" : null;
				b && (m.el.trigger("swipe"), m.el.trigger("swipe" + b))
			}).on("touchstart MSPointerDown pointerdown", function(b) {
				(!(r = g(b, "down")) || f(b)) && (q = r ? b : b.touches[0], b.touches && 1 === b.touches.length && m.x2 && (m.x2 = void 0, m.y2 = void 0), o = Date.now(), p = o - (m.last || o), m.el = a("tagName" in q.target ? q.target : q.target.parentNode), h && clearTimeout(h), m.x1 = q.pageX, m.y1 = q.pageY, p > 0 && 250 >= p && (m.isDoubleTap = !0), m.last = o, k = setTimeout(c, n), l && r && l.addPointer(b.pointerId))
			}).on("touchmove MSPointerMove pointermove", function(a) {
				(!(r = g(a, "move")) || f(a)) && (q = r ? a : a.touches[0], d(), m.x2 = q.pageX, m.y2 = q.pageY, s += Math.abs(m.x1 - m.x2), t += Math.abs(m.y1 - m.y2))
			}).on("touchend MSPointerUp pointerup", function(c) {
				(!(r = g(c, "up")) || f(c)) && (d(), m.x2 && Math.abs(m.x1 - m.x2) > 30 || m.y2 && Math.abs(m.y1 - m.y2) > 30 ? j = setTimeout(function() {
					m.el.trigger("swipe"), m.el.trigger("swipe" + b(m.x1, m.x2, m.y1, m.y2)), m = {}
				}, 0) : "last" in m && (30 > s && 30 > t ? i = setTimeout(function() {
					var b = a.Event("tap");
					b.cancelTouch = e, m.el.trigger(b), m.isDoubleTap ? (m.el && m.el.trigger("doubleTap"), m = {}) : h = setTimeout(function() {
						h = null, m.el && m.el.trigger("singleTap"), m = {}
					}, 250)
				}, 0) : m = {}), s = t = 0)
			}).on("touchcancel MSPointerCancel pointercancel", e), a(window).on("scroll", e)
		}), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(b) {
			a.fn[b] = function(a) {
				return this.on(b, a)
			}
		})
	}(d)
}), define("modules/app/main", ["lib/zepto/zepto", "lib/zepto/selector", "units/lightAppAd", "lib/zepto/touch", "units/globalAudio", "lib/zepto/coffee", "system/util/objectUtil"], function(a, b, c) {
	var d = a("lib/zepto/zepto"),
		d = a("lib/zepto/selector");
	a("units/lightAppAd");
	var e = (a("units/globalAudio"), function(a) {
		console.log("app init"), this._$app = a, this._$pages = this._$app.find(".page"), this.$currentPage = this._$pages.eq(0), this._isFirstShowPage = !0, this._isInitComplete = !1, this._isDisableFlipPage = !1, this._first = !1, this._$app.height(d(window).height()), this._$pages.height(d(window).height());
		var b = this,
			c = d(window);
		!
		function() {
			c.on("scroll.elasticity", function(a) {
				a.preventDefault()
			}).on("touchmove.elasticity", function(a) {
				a.preventDefault()
			}).on("doubleTap", function(a) {
				a.preventDefault()
			}), c.delegate("img", "mousemove", function(a) {
				a.preventDefault()
			})
		}(), c.on("load", function() {
			var a = null,
				c = null,
				e = 0,
				f = 0,
				g = 0,
				h = 0,
				i = !1,
				j = !1,
				k = !0;
			b._$app.on("mousedown touchstart", function(d) {
				b._isDisableFlipPage || (a = b._$pages.filter(".z-current").get(0), c = null, a && (i = !0, j = !1, k = !0, g = 0, h = 0, "mousedown" == d.type ? (e = d.pageX, f = d.pageY) : (e = d.touches[0].pageX, f = d.touches[0].pageY), a.classList.add("z-move"), a.style.webkitTransition = "none"))
			}).on("mousemove touchmove", function(l) {
				if (i && (c || k) && ("mousemove" == l.type ? (g = l.pageX - e, h = l.pageY - f) : (g = l.touches[0].pageX - e, h = l.touches[0].pageY - f), Math.abs(h) > Math.abs(g))) if (h > 0) {
					if (!b._first && 0 == d(a).index()) return;
					j || k ? (j = !1, k = !1, c && (c.classList.remove("z-active"), c.classList.remove("z-move")), c = a.previousElementSibling, c || (c = d(a).siblings().last()[0]), c ? (c.classList.add("z-active"), c.classList.add("z-move"), c.style.webkitTransition = "none", c.style.webkitTransform = "translateY(-100%)", d(c).trigger("active"), a.style.webkitTransformOrigin = "bottom center") : a.style.webkitTransform = "translateY(0px) scale(1)") : (a.style.webkitTransform = "scale(1)", c.style.webkitTransform = "translateY(-" + (window.innerHeight - h) + "px)")
				} else 0 > h && (!j || k ? (j = !0, k = !1, c && (c.classList.remove("z-active"), c.classList.remove("z-move")), c = a.nextElementSibling, c || (c = d(a).siblings().eq(0)[0]), c ? (c.classList.add("z-active"), c.classList.add("z-move"), c.style.webkitTransition = "none", c.style.webkitTransform = "translateY(" + window.innerHeight + "px)", d(c).trigger("active"), a.style.webkitTransformOrigin = "top center") : a.style.webkitTransform = "translateY(0px) scale(1)") : (a.style.webkitTransform = "scale(1)", c.style.webkitTransform = "translateY(" + (window.innerHeight + h) + "px)"))
			}).on("mouseup touchend", function() {
				i && (i = !1, c ? (b._isDisableFlipPage = !0, a.style.webkitTransition = "-webkit-transform 0.4s ease-out", c.style.webkitTransition = "-webkit-transform 0.4s ease-out", Math.abs(h) > Math.abs(g) && Math.abs(h) > 100 ? (j ? (a.style.webkitTransform = "scale(1)", c.style.webkitTransform = "translateY(0px)") : (a.style.webkitTransform = "scale(1)", c.style.webkitTransform = "translateY(0px)"), setTimeout(function() {
					c.classList.remove("z-active"), c.classList.remove("z-move"), c.classList.add("z-current"), a.classList.remove("z-current"), a.classList.remove("z-move"), b._isDisableFlipPage = !1, this.$currentPage = d(c).trigger("current"), b._first || d(a).index() != b._$pages.size() - 1 || (b._first = !0)
				}, 500)) : (j ? (a.style.webkitTransform = "scale(1)", c.style.webkitTransform = "translateY(100%)") : (a.style.webkitTransform = "scale(1)", c.style.webkitTransform = "translateY(-100%)"), setTimeout(function() {
					c.classList.remove("z-active"), c.classList.remove("z-move"), b._isDisableFlipPage = !1
				}, 500))) : a.classList.remove("z-move"))
			})
		}), c.on("load", function() {
			var a = '<div class="u-guideWrap"><a href="javascript:void(0);" class="u-guideTop z-move"></a></div>';
			b._$pages.not(b._$pages.last()).append(a)
		}), c.on("load", function() {
			var a = d("#app-loading");
			a.addClass("z-hide"), a.on("webkitTransitionEnd", function() {
				a.remove()
			}), b._isInitComplete = !0, b.showPage()
		})
	});
	e.prototype.showPage = function(a) {
		var b = this;
		window._app_showPage ? window._app_showPage : window._app_showPage = function(a) {
			var b, c = typeof a;
			switch (c) {
			case "number":
				b = this._$pages.eq(a);
				break;
			case "string":
				b = this._$pages.filter(a).first();
				break;
			case "object":
				b = d(a)
			}!this._isFirstShowPage || b && b.length || (b = this.$currentPage, this._isFirstShowPage = !1), b && b.length && (this._$pages.filter(".z-current").removeClass("z-current"), b.css("-webkit-transform", "none").addClass("z-current"), this.$currentPage = b)
		}, this._isInitComplete ? window._app_showPage.apply(b, [a]) : d(window).one("load", function() {
			window._app_showPage.apply(b, [a])
		})
	}, e.prototype.disableFlipPage = function() {
		this._isDisableFlipPage = !0
	}, e.prototype.enableFlipPage = function() {
		this._isDisableFlipPage = !1
	};
	var f = new e(d("body"));
	c.exports = f
}), define("modules/form/main", ["lib/zepto/zepto", "units/maskLayer", "lib/zepto/selector", "lib/zepto/touch", "lib/zepto/data", "modules/app/main", "units/lightAppAd", "units/globalAudio"], function(a, b, c) {
	var d = a("lib/zepto/zepto"),
		d = a("units/maskLayer"),
		e = a("modules/app/main"),
		f = d(".page-form");
	c.exports = {
		init: function() {
			f.each(function(a, b) {
				function c(a, b) {
					var c = d('[name="name"]').prop("type");
					return "radio" != c && "checkbox" != c && (a.data("value", a.val()).val(b).addClass("z-error"), a.blur()), h.val("请填写完整").prop("disabled", !0), !1
				}
				console.log("form init"), $page = d(b);
				var f = $page.find(".m-contactForm");
				if (f.length) {
					var g = f.find("#formContact"),
						h = g.find(".btn-submit"),
						i = $page.find(".m-contactFormLayer").maskLayer(),
						j = f.find(".successTipLayer").maskLayer({
							closeButton: !1
						}),
						k = i.maskLayer("getPluginObject"),
						l = j.maskLayer("getPluginObject");
					k.on("show", function() {
						e.disableFlipPage(), d(window).off("scroll.elasticity touchmove.elasticity")
					}), k.on("hide", function() {
						e.enableFlipPage(), g[0].reset(), h.prop("disabled", !1), d(window).on("scroll.elasticity", function(a) {
							a.preventDefault()
						}).on("touchmove.elasticity", function(a) {
							a.preventDefault()
						})
					}), $page.delegate(".m-contactUs a", d.isPC ? "click" : "click", function() {
						k.show()
					}), g.delegate("input.z-error", "focus", function() {
						var a = d(this);
						a.val(a.data("value")).removeClass("z-error"), h.prop("disabled", !1)
					}).delegate(".btn-submit", d.isPC ? "click" : "tap", function() {
						h.prop("disabled") || (g.find("input").blur(), g.submit())
					}), g.on("submit", function(a) {
						a.preventDefault();
						var b = g.find('input[name="name"]'),
							e = (g.find('input[name="sex"]'), g.find('input[name="tel"]')),
							f = g.find('input[name="company"]'),
							h = g.find('input[name="post"]'),
							i = g.find('input[name="email"]');
						if (b.length && 0 == d.trim(b.val()).length) {
							var j = d.trim(b.parent().prev().text());
							return c(b, "请输入" + j + "！")
						}
						if (e.length && 0 == d.trim(e.val()).length) return c(e, "请输入电话！");
						if (e.length > 0 && d.trim(e.val()).length > 0) {
							var m = /^13[0-9]{9}|15[0-9]{9}|17[0-9]{9}|18[0-9]{9}$/;
							if (!d.trim(e.val()).match(m)) return c(e, "电话号码输入不正确！")
						}
						if (i.length && 0 == d.trim(i.val()).length) return c(i, "请输入邮箱！");
						if (i.length > 0 && d.trim(i.val()).length > 0) {
							var m = /(^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$)/i;
							if (!d.trim(i.val()).match(m)) return c(i, "邮箱格式不正确！")
						}
						if (f.length && 0 == d.trim(f.val()).length) {
							var j = d.trim(f.parent().prev().text());
							return c(f, "请输入" + j + "！")
						}
						return h.length && 0 == d.trim(h.val()).length ? c(h, "请输入职务！") : void d.ajax({
							url: g.attr("action"),
							type: g.attr("method"),
							data: g.serialize(),
							dataType: "json",
							success: function() {
								l.show(), setTimeout(function() {
									l.hide(), setTimeout(function() {
										k.hide(), g[0].reset()
									}, 800)
								}, 2e3)
							},
							error: function() {
								alert(d("input[data-fail-msg]").val())
							}
						})
					})
				}
				$page.on("active", function() {
					console.log("form active")
				}).on("current", function() {
					console.log("form current")
				})
			})
		}
	}
}), define("modules/index/animationCloudBg", ["lib/zepto/zepto", "lib/zepto/data"], function(a, b, c) {
	var d = a("lib/zepto/zepto"),
		d = a("lib/zepto/data");
	!
	function() {
		var a = function(a) {
				this.$target = a.addClass("m-animationCloudBg"), this.$target.height(window.innerHeight);
				for (var b = 1; 13 > b; b++) {
					var c = d("<i></i>");
					a.append(c)
				}
			};
		a.prototype.start = function() {
			this.$target.removeClass("z-stop")
		}, a.prototype.stop = function() {
			this.$target.addClass("z-stop")
		}, d.fn.animationCloudBg = function() {
			var b = "init";
			switch (arguments.length > 0 && "string" == typeof arguments[0] && (b = arguments[0]), b) {
			case "init":
				this.each(function(b, c) {
					var e = d(c),
						f = new a(e);
					e.data("plugin_animationcloudbg", f)
				});
				break;
			case "getPluginObject":
				return $item.data("plugin_animationcloudbg");
			case "start":
				var c = this.data("plugin_animationcloudbg");
				c.start();
				break;
			case "stop":
				return $item.data("plugin_animationcloudbg")
			}
			return this
		}
	}(), c.exports = d
}), define("modules/index/main", ["lib/zepto/zepto", "./animationCloudBg", "lib/zepto/data", "./meteorShower", "lib/zepto/touch"], function(a, b, c) {
	var d = a("lib/zepto/zepto"),
		d = a("./animationCloudBg"),
		d = a("./meteorShower"),
		e = d(".page-index");
	c.exports = {
		init: function() {
			var a = d("body");
			e.each(function(b, c) {
				console.log("index init"), $page = d(c), function() {
					var b = $page.find(".m-animationBox"),
						c = "appBg1";
					b.is(".m-animationCloudBg") ? (b.animationCloudBg(), c = "appBg1") : b.is(".m-meteorShower") && (b.meteorShower({
						starCount: 30,
						meteorCount: 26
					}), c = "appBg2"), d(window).on("load", function() {
						a.addClass(c)
					})
				}(), $page.on("active", function() {
					console.log("index active")
				}).on("current", function() {
					console.log("index current")
				})
			})
		}
	}
}), define("modules/index/meteorShower", ["lib/zepto/zepto", "lib/zepto/touch", "lib/zepto/data"], function(a, b, c) {
	var d = a("lib/zepto/zepto"),
		d = a("lib/zepto/touch"),
		d = a("lib/zepto/data");
	!
	function() {
		var a = function(a, b) {
				this.$target = a.addClass("m-meteorShower"), this.settings = d.extend({
					starCount: 30,
					meteorCount: 20
				}, b);
				for (var c, e, f, g, h, i = "", j = 0; j < this.settings.starCount; j++) c = (640 * Math.random()).toFixed(2), e = (600 * Math.random()).toFixed(2), g = Math.random().toFixed(2), h = (1 + 4 * Math.random()).toFixed(), f = Math.round(1 + 3 * Math.random()), i += '<i class="star style' + f + '" style="left:' + c + "px; top:" + e + "px; -webkit-animation-delay:" + g + "s; -webkit-animation: star " + h + 's linear infinite;"></i>';
				for (var j = 0; j < this.settings.meteorCount; j++) c = (800 * Math.random() - 280).toFixed(2), e = (100 * Math.random() - 80).toFixed(2), g = (.5 + 2.5 * Math.random()).toFixed(), h = (1.2 + 2.8 * Math.random()).toFixed(), f = Math.round(1 + 3 * Math.random()), i += '<i class="meteor style' + f + '" style="left:' + c + "px; top:" + e + "px; -webkit-animation-delay:" + g + "s; -webkit-animation: meteor " + h + 's linear infinite;"></i>';
				this.$target.append(i)
			};
		d.fn.meteorShower = function() {
			var b = "init";
			switch (arguments.length > 0 && "string" == typeof arguments[0] && (b = arguments[0]), b) {
			case "init":
				this.each(function(b, c) {
					var e = d(c),
						f = new a(e);
					e.data("plugin_meteorShower", f)
				});
				break;
			case "getPluginObject":
				return $item.data("plugin_meteorShower")
			}
			return this
		}
	}(), c.exports = d
}), define("modules/link/main", ["lib/zepto/zepto", "lib/zepto/selector", "units/maskLayer", "lib/zepto/touch", "lib/zepto/data", "modules/app/main", "units/lightAppAd", "units/globalAudio"], function(a, b, c) {
	var d = a("lib/zepto/zepto"),
		d = a("lib/zepto/selector"),
		d = a("units/maskLayer"),
		e = a("modules/app/main"),
		f = d(".page-link");
	c.exports = {
		init: function() {
			f.each(function(a, b) {
				console.log("link init"), $page = d(b);
				var c = $page.find('[href="weixin:share"]');
				if (c.length) {
					var f = $page.find(".u-maskLayer");
					$page.find(".page-content").append(f), f.maskLayer({
						clickHideMode: 2,
						onShow: function() {
							e.disableFlipPage()
						},
						onHide: function() {
							e.enableFlipPage()
						}
					}), c.on(d.isPC ? "click" : "tap", function() {
						f.maskLayer("show")
					}), f.find("img").on(d.isPC ? "click" : "tap", function() {
						d(this).parent("div").maskLayer("hide")
					})
				}
				$page.on("active", function() {
					console.log("link active")
				}).on("current", function() {
					console.log("link current")
				})
			})
		}
	}
}), define("modules/map/main", ["lib/zepto/zepto", "units/yunlaiMap", "lib/zepto/selector", "lib/zepto/touch", "lib/zepto/data", "http://api.map.baidu.com/getscript?v=1.4&ak=h6rMzpaZgIOMvdzzGEzcGgBk&services=true&t=20140320104737", "modules/app/main", "units/lightAppAd", "units/globalAudio"], function(require, exports, module) {
	var $ = require("lib/zepto/zepto"),
		$ = require("units/yunlaiMap"),
		app = require("modules/app/main"),
		$mapPages = $(".page-map");
	module.exports = {
		init: function() {
			$mapPages.each(function(i, item) {
				console.log("map init"), $page = $(item);
				var $map = $page.find(".u-yunlaiMap"),
					map = $map.yunlaiMap().yunlaiMap("getPluginObject");
				map.on("show", function() {
					app.disableFlipPage()
				}), map.on("hide", function() {
					app.enableFlipPage()
				}), $page.find(".m-distributedPoints").delegate(".mapEnter", $.isPC ? "click" : "click", function(e) {
					var $this = $(this);
					map.show(), map.clearOverlays();
					var markers = $this.data("map-markers");
					if (markers) for (var markersArr = eval(markers), i = 0; i < markersArr.length; i++) {
						var marker = markersArr[i];
						marker.title = marker.name ? marker.name : "", marker.content = (marker.tel ? '电话：<a href="tel:' + marker.tel + '">' + marker.tel : "") + (marker.desc ? "</a><br/>" + marker.desc : "") + "<br/>地址：" + (marker.addr ? marker.addr : ""), delete marker.name, delete marker.tel, delete marker.addr, delete marker.desc, marker.content = marker.content.replace(/(\<br\s*\/\>\s*)+/gi, "<br/>"), 0 == i ? map.addMarker(marker, !0) : map.addMarker(marker)
					}
				});
				var distributedPointsInitFlag = !0;
				$page.on("active", function() {
					console.log("map active");
					var a = $(this);
					distributedPointsInitFlag && (distributedPointsInitFlag = !1, a.find(".m-distributedPoints li").each(function(a, b) {
						b.style.top = b.offsetTop - b.offsetHeight + 6 + "px", b.style.left = b.offsetLeft - b.offsetWidth / 2 + "px", $(b).find("a").css("left", b.offsetWidth / 2 - 31.5)
					}))
				}).on("current", function() {
					console.log("map current")
				})
			})
		}
	}
}), define("modules/mask/main", ["lib/zepto/zepto", "lib/zepto/data", "./mask", "lib/zepto/touch", "modules/app/main", "lib/zepto/selector", "units/lightAppAd", "units/globalAudio", "units/widget"], function(a, b, c) {
	var d = a("lib/zepto/zepto"),
		d = a("lib/zepto/data"),
		e = a("./mask"),
		f = d(".page-mask"),
		g = a("modules/app/main");
	c.exports = {
		init: function() {
			f.each(function(a, b) {
				console.log("m-mask init");
				var c = d(b),
					f = {
						circle1: d(this).find(".mask-circle-1"),
						circle2: d(this).find(".mask-circle-2"),
						circle3: d(this).find(".mask-circle-3"),
						mask: d(this)
					},
					h = new e(f);
				d(this).data("mask", h), h.init(), c.on("active", function() {
					console.log("m-mask active")
				}).on("current", function() {
					console.log("m-mask current")
				}).one("current", function() {
					g.disableFlipPage()
				})
			})
		}
	}
}), define("modules/mask/mask", ["lib/zepto/zepto", "lib/zepto/touch", "lib/zepto/data", "modules/app/main", "lib/zepto/selector", "units/lightAppAd", "units/globalAudio", "units/widget"], function(a, b, c) {
	var d = a("lib/zepto/zepto"),
		d = a("lib/zepto/touch"),
		d = a("lib/zepto/data"),
		e = a("modules/app/main"),
		f = a("units/widget"),
		g = function(a) {
			this.click = "ontouchstart" in window ? "tap" : "click", this.setInter = null, this.setInterOne = null, this.setInterTwo = null, this.setInterThree = null, this.touchNum = 0, this.touchFinish = !1;
			for (i in a) this[i] = a[i]
		};
	g.prototype = d.extend({}, f, {
		init: function() {
			var a = this;
			this.circle1.on(this.click, function() {
				a.touchNum += 1, d(this).hide(), a.maskAnimationTwo(a, 4, 3, 12, 60, function() {
					a.maskAnimationBack(a)
				})
			}), this.circle2.on(this.click, function() {
				a.touchNum += 1, d(this).hide(), a.maskAnimationOne(a, 4, 3, 12, 60, function() {
					a.maskAnimationBack(a)
				})
			}), this.circle3.on(this.click, function() {
				a.touchNum += 1, d(this).hide(), a.maskAnimationThree(a, 4, 3, 12, 60, function() {
					a.maskAnimationBack(a)
				})
			})
		},
		maskAnimationBack: function(a) {
			a.touchNum >= 3 && !a.touchFinish && (a.touchFinish = !0, a.touchFinish && e.enableFlipPage(), a.maskAnimation(a, 4, 5, 20, 80, function() {
				a.mask.find(".touch-1").hide(), a.mask.find(".touch-2").hide(), a.mask.find(".touch-3").hide(), a.mask.find(".touch-4").css("-webkit-mask", "none!importnat")
			}))
		},
		maskAnimationOne: function(a, b, c, e, f, g) {
			clearInterval(a.setInterOne);
			var h = _y_a = _i_a = 0;
			a.setInterOne = setInterval(function() {
				h >= b && (h = 0, _y_a = _y_a >= c ? 0 : _y_a += 1), 
				a.mask.find(".touch-1").css("-webkit-mask-position", 640 * -h + "px " + -_y_a * d(window).height() + "px"), 
				h += 1,
				_i_a++, 
				_i_a >= e && (clearInterval(a.setInterOne), g())
			}, f)
		},
		maskAnimationTwo: function(a, b, c, e, f, g) {
			clearInterval(a.setInterTwo);
			var h = _y_b = _i_b = 0;
			a.setInterTwo = setInterval(function() {
				h >= b && (h = 0, _y_b = _y_b >= c ? 0 : _y_b += 1), a.mask.find(".touch-2").css("-webkit-mask-position", 640 * -h + "px " + -_y_b * d(window).height() + "px"), h += 1, _i_b++, _i_b >= e && (clearInterval(a.setInterTwo), g())
			}, f)
		},
		maskAnimationThree: function(a, b, c, e, f, g) {
			clearInterval(a.setInterThree);
			var h = _y_c = _i_c = 0;
			a.setInterThree = setInterval(function() {
				h >= b && (h = 0, _y_c = _y_c >= c ? 0 : _y_c += 1), a.mask.find(".touch-3").css("-webkit-mask-position", 640 * -h - 20 + "px " + -_y_c * d(window).height() + "px"), h += 1, _i_c++, _i_c >= e && (clearInterval(a.setInterThree), g())
			}, f)
		},
		maskAnimation: function(a, b, c, e, f, g) {
			clearInterval(a.setInter);
			var h = _y = _i = 0;
			a.setInter = setInterval(function() {
				h >= b && (h = 0, _y = _y >= c ? 0 : _y += 1), a.mask.find(".touch-4").css("-webkit-mask-position", 640 * -h + "px " + -_y * d(window).height() + "px"), h += 1, _i++, _i >= e && (clearInterval(a.setInter), g())
			}, f)
		}
	}), c.exports = g
}), define("modules/maskSwear/maskSwear", ["lib/zepto/zepto", "lib/zepto/selector"], function(a) {
	function b(a) {
		a.stopPropagation();
		var b = a.pageX,
			d = a.pageY,
			f = c(this).siblings().eq(0).data("click"),
			g = c(this).siblings().eq(1).data("click");
		c(this).data("click") || (c(this).data("click", "true"), timer = f && g ? setInterval(function() {
			e.globalCompositeOperation = "destination-out", e.drawImage(i, b - redius / 2, d - redius / 2, redius, redius), redius += 2
		}, .3) : setInterval(function() {
			redius > 300 && clearInterval(timer), e.globalCompositeOperation = "destination-out", e.drawImage(i, b - redius / 2, d - redius / 2, redius, redius), redius += 2
		}, .3))
	}
	a("lib/zepto/zepto");
	var c = a("lib/zepto/selector"),
		d = c("#maskSwear"),
		e = d[0].getContext("2d"),
		f = parseInt(c(".circle-wrap").css("top")),
		g = parseInt(c(".circle-wrap").css("left"));
	console.log(f), console.log(g);
	var h = new Image;
	h.crossOrigin = "", h.src = "/template/26/data/images/modules/maskSwear/bg.png", h.onload = function() {
		e.drawImage(h, 0, 0)
	};
	var i = new Image;
	i.crossOrigin = "", i.src = "/template/26/data/images/modules/maskSwear/pen.png";
	var j = c(".circle-wrap span");
	j.on("touchstart click", b)
}), define("modules/teletext/cascadingTeletext", ["lib/zepto/zepto", "lib/zepto/touch", "lib/zepto/data"], function(a, b, c) {
	var d = a("lib/zepto/zepto"),
		d = a("lib/zepto/touch"),
		d = a("lib/zepto/data");
	!
	function() {
		var a = function(a) {
				var b = this;
				this.$target = a.addClass("m-cascadingTeletext"), this.$_currentItem = this.$target.find("li").first().addClass("z-current"), d(window).on("resize", function() {
					b.$target.height(window.innerHeight)
				}).trigger("resize"), this.$target.on(d.isPC ? "click" : "swipeLeft swipeRight", function(a) {
					b.$_currentItem.addClass("swipeLeft" == a.type ? "z-hideToLeft" : "z-hideToRight")
				}).delegate("li", "webkitAnimationEnd", function() {
					b.$target.append(b.$_currentItem), b.$_currentItem.removeClass("z-current z-hideToLeft z-hideToRight"), b.$_currentItem = b.$target.find("li").first().addClass("z-current")
				})
			};
		a.show = function() {
			this.$target.addClass("z-show")
		}, d.fn.cascadingTeletext = function() {
			var b = "init";
			switch (arguments.length > 0 && "string" == typeof arguments[0] && (b = arguments[0]), b) {
			case "init":
				this.each(function(b, c) {
					var e = d(c),
						f = new a(e);
					e.data("plugin_cascadingTeletext", f)
				});
				break;
			case "getPluginObject":
				return $item.data("plugin_cascadingTeletext")
			}
			return this
		}
	}(), c.exports = d
}), define("modules/teletext/main", ["lib/zepto/zepto", "./cascadingTeletext", "lib/zepto/touch", "lib/zepto/data"], function(a, b, c) {
	var d = a("lib/zepto/zepto");
	d = a("./cascadingTeletext");
	var e = d(".page-teletext");
	c.exports = {
		init: function() {
			e.each(function(a, b) {
				console.log("teletext init"), $page = d(b);
				var c = $page.find(".m-cascadingTeletext").cascadingTeletext();
				$page.on("active", function() {
					console.log("teletext active"), c.removeClass("z-viewArea").find("li.z-current").removeClass("z-current")
				}).on("current", function() {
					console.log("teletext current"), c.addClass("z-viewArea").find("li:first").addClass("z-current")
				})
			})
		}
	}
}), define("modules/video/main", ["lib/zepto/zepto", "lib/zepto/touch", "units/maskLayer", "lib/zepto/selector", "lib/zepto/data", "./youkuVideo", "lib/youku/jsapi", "modules/app/main", "units/lightAppAd", "units/globalAudio", "lib/zepto/coffee", "system/util/objectUtil"], function(a, b, c) {
	var d = a("lib/zepto/zepto"),
		d = a("lib/zepto/touch"),
		d = a("units/maskLayer"),
		d = a("./youkuVideo"),
		e = a("modules/app/main"),
		f = a("units/globalAudio"),
		g = d(".page-video");
	c.exports = {
		init: function() {
			g.each(function(a, b) {
				console.log("video init");
				var c, g = d(b),
					h = g.find(".m-btnPlay"),
					i = g.find(".m-youkuVideo"),
					j = "playing",
					k = g.find(".m-youkuVideoLayer").maskLayer({
						onShow: function() {
							h.hide(), e.disableFlipPage(), j = f.playState, f.pause(), f.isAllowManually = !1, c = i.youkuVideo().youkuVideo("getPluginObject")
						},
						onHide: function() {
							h.show(), e.enableFlipPage(), "playing" == j && f.play(), f.isAllowManually = !0, c.destroy()
						}
					}).maskLayer("getPluginObject");
				h.on(d.isPC ? "click" : "tap", function() {
					k.show()
				}), g.on("active", function() {
					console.log("video active")
				}).on("current", function() {
					console.log("video current")
				})
			})
		}
	}
}), define("modules/video/youkuVideo", ["lib/zepto/zepto", "lib/zepto/touch", "lib/zepto/selector", "lib/zepto/data", "lib/youku/jsapi"], function(a, b, c) {
	var d = a("lib/zepto/zepto"),
		d = a("lib/zepto/touch"),
		d = a("lib/zepto/selector"),
		d = a("lib/zepto/data"),
		e = a("lib/youku/jsapi");
	!
	function() {
		var a = 0,
			b = function(b, c) {
				var f = this;
				this.$target = b.addClass("m-youkuVideo"), this.settings = null, this.player = null, this._playerID = "videoBody_" + ++a;
				var g = this.$target.data("devid"),
					h = this.$target.data("src");
				this.settings = d.extend({
					devID: g ? g : "168eed9e805f5239",
					url: h && h.indexOf("youku") >= 0 ? h : "http://v.youku.com/v_show/id_XMTg0NTU2NzMy.html",
					onPlayerReady: function() {
						console.log("event：准备就绪")
					},
					onPlayStart: function() {
						console.log("event：播放开始")
					},
					onPlayEnd: function() {
						console.log("event：播放结束")
					}
				}, c), this.$target.attr("id", this._playerID), this.player = new e.YKU.Player(this._playerID, {
					styleid: "0",
					client_id: f.settings.devID,
					vid: f._getVidByUrl(f.settings.url),
					show_related: !1,
					autoplay: !0,
					events: {
						onPlayerReady: f.settings.onPlayerReady,
						onPlayStart: function(a) {
							f._isPlayStart = !0, f.settings.onPlayStart(a)
						},
						onPlayEnd: f.settings.onPlayEnd
					}
				}), this._isPlayStart = !1, this.$target.on(d.isPC ? "click" : "tap", function() {
					f._isPlayStart || setTimeout(function() {
						f.play()
					}, 200)
				})
			};
		b.prototype._getVidByUrl = function(a) {
			var b = a ? b = a.substring(a.indexOf("/id_") + 4, a.indexOf(".html")) : "";
			return b || console.log("error：视频地址不正确！"), b
		}, b.prototype.play = function() {
			try {
				this.player.playVideo()
			} catch (a) {
				console.log(a)
			}
		}, b.prototype.pause = function() {
			try {
				this.player.pauseVideo()
			} catch (a) {
				console.log(a)
			}
		}, b.prototype.destroy = function() {
			this.$target.html("").data("plugin_video", null), delete this.player
		}, d.fn.youkuVideo = function(a) {
			var c = "init";
			switch (arguments.length > 0 && "string" == typeof arguments[0] && (c = arguments[0]), c) {
			case "init":
				this.each(function(c, e) {
					var f = d(e),
						g = new b(f, a);
					f.data("plugin_video", g)
				});
				break;
			case "getPluginObject":
				return this.data("plugin_video")
			}
			return this
		}
	}(), c.exports = d
}), define("modules/words/iScroll", ["lib/zepto/zepto", "units/widget"], function(a, b, c) {
	function d(a, b, c) {
		"undefined" == typeof a ? (this.wrapper = window, this.scroller = document) : "undefined" == typeof b ? (this.wrapper = "string" == typeof a ? document.querySelector(a) : a, this.scroller = this.wrapper.children[0]) : (this.wrapper = "string" == typeof a ? document.querySelector(a) : a, this.scroller = "string" == typeof b ? document.querySelector(b) : b), this.eventType = {
			touchstart: 1,
			touchmove: 1,
			touchend: 1,
			mousedown: 2,
			mousemove: 2,
			mouseup: 2,
			mouseout: 2
		}, this.ease = {
			quadratic: {
				style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
				fn: function(a) {
					return a * (2 - a)
				}
			},
			circular: {
				style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
				fn: function(a) {
					return Math.sqrt(1 - --a * a)
				}
			},
			back: {
				style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
				fn: function(a) {
					var b = 4;
					return (a -= 1) * a * ((b + 1) * a + b) + 1
				}
			},
			bounce: {
				style: "",
				fn: function(a) {
					return (a /= 1) < 1 / 2.75 ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
				}
			},
			elastic: {
				style: "",
				fn: function(a) {
					var b = .22,
						c = .4;
					return 0 === a ? 0 : 1 == a ? 1 : c * Math.pow(2, -10 * a) * Math.sin(2 * (a - b / 4) * Math.PI / b) + 1
				}
			}
		}, this.self = !0, this.wraperdistand = !1, this.startX = 0, this.startY = 0, this.y = 0, this.x = 0, this.endTime = 0, this.preventDefault = !0, this.preventDefaultException = {
			tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|DIV|A|IMG)$/
		}, this.scrollY = !0, this.scrollX = !1, this.bounce = !0, this.bounceTime = 600, this.resizeTime = 60, this.useTransform = this._prefixStyle("transform"), this.useTransition = this._prefixStyle("transition"), this.hasTouch = "ontouchstart" in window, this.translateZ = this._hasPerspective() ? " translateZ(0)" : "", this.Locked = !0, this.LockThreshold = 10, this.position = !1, this.hasPosition = !1, this.LockPostion = !1, this.LockType = "h";
		for (var d in c) this[d] = c[d];
		this._init(), this.refresh(), this.scrollTo(this.startX, this.startY), this.enable()
	}
	var e = a("lib/zepto/zepto"),
		f = a("units/widget");
	d.prototype = e.extend({}, f, {
		handleEvent: function(a) {
			switch (a.type) {
			case "touchstart":
			case "mousedown":
				this._start(a);
				break;
			case "touchmove":
			case "mousemove":
				this._move(a);
				break;
			case "touchend":
			case "mouseup":
			case "touchcancel":
			case "mousecancel":
				this._end(a);
				break;
			case "orientationchange":
			case "resize":
				break;
			case "webkitTransitionEnd":
			case "MSTransitionEnd":
			case "oTransitionEnd":
			case "transitionend":
				this._transitionEnd(a);
				break;
			case "DOMMouseScroll":
			case "mousewheel":
			case "wheel":
				this._wheel(a);
				break;
			case "keydown":
				this._key(a)
			}
		},
		initEvents: function(a) {
			var b = a ? this.removeEvent : this.addEvent,
				c = this.self ? this.scroller : this.wraperdistand ? this.wraperdistand : this.wrapper;
			b(window, "orientationchange", this), b(window, "resize", this), this.hasTouch ? (b(c, "touchstart", this), b(c, "touchmove", this), b(c, "touchcancel", this), b(c, "touchend", this)) : (b(c, "mousedown", this), b(c, "mousemove", this), b(c, "mousecancel", this), b(c, "mouseup", this)), b(this.scroller, "webkitTransitionEnd", this), b(this.scroller, "MSTransitionEnd", this), b(this.scroller, "oTransitionEnd", this), b(this.scroller, "transitionend", this)
		},
		addEvent: function(a, b, c) {
			a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : a["on" + b] = c
		},
		removeEvent: function(a, b, c) {
			a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent ? a.detachEvent("on" + b, c) : a["on" + b] = null
		},
		_init: function() {
			this.initEvents(!1), this._handleEvent("init")
		},
		destroy: function() {
			this.initEvents(!0), this._handleEvent("destroy")
		},
		refresh: function(a) {
			this.wrapperWidth = this.wrapperWidth ? this.wrapperWidth : this.wrapper.clientWidth, this.wrapperHeight = this.wrapperHeight ? this.wrapperHeight : this.wrapper.clientHeight, this.scrollerWidth = this.scrollerWidth ? this.scrollerWidth : this.scroller.offsetWidth, this.scrollerHeight = this.scrollerHeight ? this.scrollerHeight : this.scroller.offsetHeight, a && (this.scrollerHeight = a), this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this._handleEvent("refresh")
		},
		_preventDefaultException: function(a, b) {
			for (var c in b) if (b[c].test(a[c])) return !0;
			return !1
		},
		_resize: function() {
			var a = this;
			clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
				a.refresh()
			}, this.resizeTime)
		},
		disable: function() {
			this.enabled = !1
		},
		enable: function() {
			this.enabled = !0
		},
		_start: function(a) {
			if (!(1 != this.eventType[a.type] && 0 !== a.button || !this.enabled || this.initiated && this.eventType[a.type] !== this.initiated)) {
				this.preventDefault && !this._preventDefaultException(a.target, this.preventDefaultException) && a.preventDefault();
				var b = a.touches ? a.touches[0] : a;
				this.initiated = this.eventType[a.type], this.moved = !1, this.distY = 0, this.distX = 0, this._transitionTime(), this.isAnimating = !1, this.startTime = this.getTime(), this.useTransition && this.isInTransition && (pos = this.getComputedPosition(), this._translate(Math.round(pos.x), Math.round(pos.y)), this.isInTransition = !1), this.startX = this.x, this.startY = this.y, this.pointY = b.pageY, this.pointX = b.pageX, this._handleEvent("beforeStart")
			}
		},
		_move: function(a) {
			if (this.enabled && this.eventType[a.type] === this.initiated) {
				this.preventDefault && a.preventDefault();
				var b, c, d, e, f = a.touches ? a.touches[0] : a,
					g = f.pageY - this.pointY,
					h = f.pageX - this.pointX,
					i = this.getTime();
				if (this.pointY = f.pageY, this.pointX = f.pageX, this.distY += g, this.distX += h, e = Math.abs(this.distX), d = Math.abs(this.distY), !(i - this.endTime > 300 && 10 > e && 10 > d)) {
					if (!this.hasPosition) {
						if (this.Locked && !this.position) if (e + this.LockThreshold > d) this.position = "h";
						else {
							if (!(d >= e)) return void(this.position = !1);
							this.position = "v"
						} else this.position = "v";
						this.hasPosition = !0
					}
					if (this.LockPostion && this.position == this.LockType) this.moved || this._handleEvent("lockFn_start"), this.moved = !0;
					else {
						g = this.hasVerticalScroll ? g : 0, h = this.hasHorizontalScroll ? h : 0, b = this.x + h, c = this.y + g;
						var j, k;
						(b > 0 || b < this.maxScrollX) && (b = this.bounce ? this.x + h / 3 : b > 0 ? 0 : this.maxScrollX, j = b > 0 ? 0 : this.maxScrollX - b), (c > 0 || c < this.maxScrollY) && (c = this.bounce ? this.y + g / 3 : c > 0 ? 0 : this.maxScrollY, k = c > 0 ? 0 : this.maxScrollY - c), this.moved ? this._handleEvent("move", this.x, this.y, this.maxScrollX, this.maxScrollY, this.wrapper) : this._handleEvent("start"), this.moved = !0, this._translate(b, c), i - this.startTime > 300 && (this.startTime = i, this.startY = this.y)
					}
				}
			}
		},
		_end: function(a) {
			if (this.enabled && this.eventType[a.type] === this.initiated) {
				if (this._handleEvent("end", this.x, this.y, this.maxScrollX, this.maxScrollY, this.wrapper), this.preventDefault && !this._preventDefaultException(a.target, this.preventDefaultException) && a.preventDefault(), this.LockPostion && this.position == this.LockType) Math.abs(this.distX) >= 100;
				else {
					this.sliderX && Math.abs(this.distX) >= 100 && Math.abs(this.distX) > Math.abs(this.distY) + 50 && this.lockFn(this.distX);
					var b, c, d = (a.changedTouches ? a.changedTouches[0] : a, this.getTime() - this.startTime),
						e = Math.round(this.x),
						f = Math.round(this.y),
						g = Math.abs(e - this.startX),
						h = Math.abs(f - this.startY),
						i = 0,
						j = "";
					if (this.scrollTo(e, f), this.isInTransition = 0, this.initiated = 0, this.endTime = this.getTime(), this.resetPosition(this.bounceTime)) return;
					if (this.flick && 300 > d && 50 > g && 50 > h) this.flickFn(a);
					else if (300 > d && (c = this.hasHorizontalScroll ? this.momentum(this.x, this.startX, d, this.maxScrollX, this.wrapperWidth) : {
						destination: e,
						duration: 0
					}, b = this.hasVerticalScroll ? this.momentum(this.y, this.startY, d, this.maxScrollY, this.wrapperHeight) : {
						destination: f,
						duration: 0
					}, e = c.destination, f = b.destination, i = Math.max(c.duration, b.duration), this.isInTransition = 1), e != this.x || f != this.y) return (e > 0 || e < this.maxScrollX || f > 0 || f < this.maxScrollY) && (j = this.ease.quadratic), void this.scrollTo(e, f, i, j)
				}
				this.position = !1, this.hasPosition = !1
			}
		},
		scrollTo: function(a, b, c, d) {
			d = d || this.ease.circular, !c || this.useTransition && d.style ? (this._transitionTimingFunction(d.style), this._transitionTime(c), this._translate(a, b)) : this._animate(a, b, c, d.fn)
		},
		_transitionTime: function(a) {
			a = a || 0, this.scroller.style[this._prefixStyle("transitionDuration")] = a + "ms"
		},
		_transitionTimingFunction: function(a) {
			this.scroller.style[this._prefixStyle("transitionTimingFunction")] = a
		},
		_translate: function(a, b) {
			this.useTransform ? this.scroller.style[this._prefixStyle("transform")] = "translate(" + a + "px," + b + "px)" + this.translateZ : (a = Math.round(a), b = Math.round(b), this.scroller.style.left = a + "px", this.scroller.style.top = b + "px"), this.x = a, this.y = b
		},
		_transitionEnd: function(a) {
			var b = a ? a : window.event;
			b.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.bounceTime) || (this.isInTransition = !1, this._handleEvent("scrollEnd")))
		},
		_animate: function(a, b, c, d) {
			function e() {
				var k, l, m, n = this.getTime();
				return n >= j ? (f.isAnimating = !1, f._translate(a, b), void!f.resetPosition(f.bounceTime)) : (n = (n - i) / c, m = d(n), k = (a - g) * m + g, l = (b - h) * m + h, f._translate(k, l), void(f.isAnimating && __requestAnimationFrame(e)))
			}
			var f = this,
				g = this.x,
				h = this.y,
				i = this.getTime(),
				j = i + c;
			this.isAnimating = !0, e()
		},
		getComputedPosition: function() {
			var a, b, c = window.getComputedStyle(this.scroller, null);
			return this.useTransform ? (c = c[this._prefixStyle("transform")].split(")")[0].split(", "), a = +(c[12] || c[4]), b = +(c[13] || c[5])) : (a = +c.left.replace(/[^-\d.]/g, ""), b = +c.top.replace(/[^-\d.]/g, "")), {
				x: a,
				y: b
			}
		},
		resetPosition: function(a) {
			var b, c, d = this.y,
				e = this.x;
			return a = a || 0, !this.hasHorizontalScroll || this.x > 0 ? (e = 0, b = 0) : this.x < this.maxScrollX && (e = this.maxScrollX, b = this.maxScrollX - this.x), !this.hasVerticalScroll || this.y > 0 ? (d = 0, c = 0) : this.y < this.maxScrollY && (d = this.maxScrollY, c = this.maxScrollY - this.y), e == this.x && d == this.y ? !1 : (this._handleEvent("bounce", b, c, this.wrapper), this.scrollTo(e, d, a, ""), !0)
		}
	}), c.exports = d
}), define("modules/words/main", ["lib/zepto/zepto", "lib/zepto/touch", "lib/zepto/data", "modules/app/main", "lib/zepto/selector", "units/lightAppAd", "units/globalAudio", "units/widget", "./iScroll"], function(require, exports, module) {
	var $ = require("lib/zepto/zepto"),
		$ = require("lib/zepto/touch"),
		$ = require("lib/zepto/data"),
		app = require("modules/app/main"),
		widget = require("units/widget"),
		iScroll = require("./iScroll"),
		words = function() {
			this.wordsWall = null, this.plugin = null, this.openWallBtn = $(".j-wall-open"), this.editWallBtn = null, this.editWallTet = null, this.editWallInput = null, this.submitWallBtn = null, this.wodrdsDetail = null, this.wordsWarn = null;
			var a = this;
			$(".m-words-wall").each(function() {
				var b = $(this).find(".content")[0],
					c = $(this).find(".content-wrap")[0],
					d = new iScroll(b, c);
				$(this).data("scroll", d), a.event(d, a)
			})
		};
	words.prototype = $.extend({}, widget, {
		init: function() {
			this.wallOpen()
		},
		wallOpen: function() {
			var a = this,
				b = Number($(".m-words-btn").data("stoped"));
			b || this.openWallBtn.on(this._click, function() {
				a.wordsWall = $(this).parents(".page-words").find(".m-words-wall"), a.editWallBtn = a.wordsWall.find(".j-wall-edit"), a.editWallTet = a.wordsWall.find(".j-wall-txt"), a.editWallInput = a.wordsWall.find(".j-wall-input"), a.submitWallBtn = a.wordsWall.find(".j-wall-submit"), a.wodrdsDetail = a.wordsWall.find(".m-words-detail"), a.wordsWarn = a.wordsWall.find(".m-words-warn"), a.plugin = a.wordsWall.data("scroll"), a.wallClose(), a.wordEdit(), a.wordSubmit();
				var b = a.wodrdsDetail.find("ul li").size();
				10 > b && (a.wordsWarn.data("noInfo", "true"), a.wordsWarn.hide()), a.wordsWall.show(), setTimeout(function() {
					a.wordsWall.addClass("z-show")
				}, 20);
				var c = a.plugin.scroller.offsetHeight;
				a.plugin.refresh(c - 60), app.disableFlipPage(), a.loadMoreCommend(a)
			})
		},
		wallClose: function() {
			var a = this;
			this.wordsWall.off(this._click), this.wordsWall.on(this._click, function(b) {
				var c = b.target,
					d = $(c);
				(d.parents(".wrap").length > 0 || d.hasClass("wrap")) && d.parents(".j-wall-close").length <= 0 || (a.wordsWall.removeClass("z-show"), setTimeout(function() {
					a.wordsWall.hide()
				}, 500), app.enableFlipPage())
			})
		},
		wordEdit: function() {
			var a = this;
			this.editWallBtn.off(this._click), this.editWallBtn.on("click", function() {
				a.plugin.scrollTo(0, 0), a.editWallTet.focus()
			}), this.editWallTet.off("focus blur"), this.editWallTet.on("focus", function() {
				var b = $(this).next("span");
				b.hide(), a.plugin.initEvents(!0), a.windowStart()
			}), this.editWallTet.on("blur", function() {
				var b = $(this).next("span");
				b.show(), a.plugin.initEvents(!1), a.windowStop()
			}), this.editWallInput.off("focus blur"), this.editWallInput.on("focus", function() {
				a.plugin.initEvents(!0), a.windowStart()
			}), this.editWallInput.on("blur", function() {
				a.plugin.initEvents(!1), a.windowStop()
			})
		},
		wordSubmit: function() {
			var that = this;
			this.submitWallBtn.on(this._click, function() {
				var node = that.wordsWall.find(".m-words-form"),
					verify = that.wordsVerify(node, that);
				if (verify && "true" != that.wordsWall.data("ajaxSubmit")) {
					that.loadingPageShow($(".u-pageLoading")), that.wordsWall.find("input").blur(), that.wordsWall.find("textarea").blur();
					var txt = that.wordsWall.find(".m-words-form").find('textarea[name="content"]').val(),
						name = that.wordsWall.find(".m-words-form").find('input[name="name"]').val(),
						layout_id = $(this).parents(".page").data("layout-id"),
						app_id = $("body").data("app-id"),
						host = $("body").data("form-host"),
						url = host + "/school/comment/" + app_id;
					that.wordsWall.data("ajaxSubmit", "true"), $.ajax({
						url: url,
						cache: !1,
						dataType: "json",
						async: !0,
						type: "POST",
						data: {
							content: txt,
							from: name,
							layout_id: layout_id,
							app_id: app_id
						},
						success: function(msg) {
							if (that.loadingPageHide($(".u-pageLoading")), that.wordsWall.data("ajaxSubmit", "false"), msg.success) {
								var data = eval("(" + msg.data + ")"),
									time = data.date ? data.date : "今天",
									id = data.id,
									h = $("<h4><span></span><strong>发表于" + time + "</strong></h4>");
								h.children("span").text(name);
								var p = $("<p></p>");
								p.text(txt);
								var li = $('<li class="detail-item" data-comment-id="' + id + '"></li>').append(p).append(h);
								that.wodrdsDetail.find("ul").prepend(li);
								var num = parseInt(that.wodrdsDetail.find("h3 em strong").text()) + 1;
								that.wodrdsDetail.find("h3 em strong").text(num), that.wordsWall.find(".m-words-form").find('textarea[name="content"]').val("");
								var height = that.plugin.scroller.offsetHeight;
								that.plugin.refresh(height - 60), that.showCheckMessage($(".u-note"), "提交成功", !0)
							} else that.showCheckMessage($(".u-note"), "提交失败", !1)
						},
						error: function() {
							that.loadingPageHide($(".u-pageLoading")), that.showCheckMessage($(".u-note"), "提交失败", !1), that.wordsWall.data("ajaxSubmit", "false")
						}
					})
				}
			})
		},
		wordsVerify: function(a, b) {
			var c = a.find("input"),
				d = a.find("textarea"),
				e = $(".u-note"),
				f = d.val(),
				g = c.val();
			return "" == $.trim(f) ? (b.showCheckMessage(e, "你想对他说点什么!", !1), d.focus(), !1) : "" == $.trim(g) ? (b.showCheckMessage(e, "请留下大名哦", !1), c.focus(), !1) : f.length >= 140 && "" != f ? (b.showCheckMessage(e, "评论最多只能容纳140个字哦！", !1), d.focus(), !1) : g.length >= 30 && "" != g ? (b.showCheckMessage(e, "名字不能太长哦，30个字", !1), c.focus(), !1) : !0
		},
		event: function(a, b) {
			a._on("move", function() {
				app.disableFlipPage(), b.wordsWall && (b.wordsWall.find("input").blur(), b.wordsWall.find("textarea").blur())
			}), a._on("end", function(a, c, d, e) {
				if ("true" != b.wordsWarn.data("noInfo")) {
					var f = b.plugin.scroller.offsetHeight;
					if (d - a >= 50 || e - c >= 50) {
						if (b.wordsWarn.data("loading", "true"), "true" == b.wordsWarn.data("loadMore")) return;
						b.plugin.refresh(f), b.wordsWarn.find(".warn-txt").hide(), b.wordsWarn.find(".warn-loading").show(), b.loadMoreCommend(b)
					} else b.wordsWarn.data("loading", "false"), b.plugin.refresh(f - 60)
				}
			}), a._on("move", function(a, c, d, e, f) {
				$(f).hasClass("content") && "true" != b.wordsWarn.data("noInfo") && "true" != b.wordsWarn.data("loading") && (b.wordsWarn.find(".warn-txt").show(), b.wordsWarn.find(".warn-loading").hide(), d - a >= 50 || e - c >= 50 ? b.wordsWarn.find(".warn-txt").addClass("z-change") : b.wordsWarn.find(".warn-txt").removeClass("z-change"))
			})
		},
		loadMoreCommend: function(obj) {
			obj.wordsWarn.data("loadMore", "true");
			var count = 10,
				start = obj.wodrdsDetail.find("ul li").last().data("comment-id");
			obj && 0 == obj.wodrdsDetail.find("ul li").last().length && (start = 0);
			var layout_id = obj.wodrdsDetail.parents(".page").data("layout-id"),
				app_id = $("body").data("app-id"),
				host = $("body").data("form-host"),
				url = host + "/school/getcomment/" + app_id;
			$.ajax({
				url: url,
				cache: !1,
				dataType: "json",
				async: !0,
				type: "POST",
				data: {
					count: count,
					start: start,
					layout_id: layout_id,
					app_id: app_id
				},
				success: function(msg) {
					if (msg.success) {
						var data = eval("(" + msg.data + ")"),
							count = data.count;
						console.log(data.data);
						for (var i = 0; i < data.data.length; i++) {
							var h = $("<h4><span>" + data.data[i].from + "</span><strong>发表于" + data.data[i].date + "</strong></h4>"),
								p = $("<p>" + data.data[i].content + "</p>"),
								li = $('<li class="detail-item" data-comment-id="' + data.data[i].id + '"></li>').append(p).append(h);
							obj.wodrdsDetail.find("ul").append(li)
						}
						$(".comment-count").html(count), data.length < 10 && (obj.wordsWarn.data("noInfo", "true"), obj.wordsWarn.hide())
					} else {
						obj.wordsWarn.data("loadMore", "false"), obj.wordsWarn.data("loading", "false");
						var height = obj.plugin.scroller.offsetHeight;
						obj.plugin.refresh(height - 60), obj.showCheckMessage($(".u-note"), "提交失败!", !1)
					}
					obj.wordsWarn.data("loadMore", "false"), obj.wordsWarn.data("loading", "false");
					var height = obj.plugin.scroller.offsetHeight;
					obj.plugin.refresh(height - 60), obj.plugin.resetPosition()
				},
				error: function() {
					console.log("yyyhyyyy"), obj.wordsWarn.data("loadMore", "false"), obj.wordsWarn.data("loading", "false");
					var a = obj.plugin.scroller.offsetHeight;
					obj.plugin.refresh(a - 60), obj.showCheckMessage($(".u-note"), "errorThrown!", !1)
				}
			})
		},
		windowStart: function() {
			$(window).off("scroll.elasticity touchmove.elasticity")
		},
		windowStop: function() {
			$(window).on("scroll.elasticity", function(a) {
				a.preventDefault()
			}).on("touchmove.elasticity", function(a) {
				a.preventDefault()
			})
		}
	});
	var wordsEnter = new words;
	module.exports = wordsEnter
}), define("page/main", ["modules/app/main", "lib/zepto/zepto", "lib/zepto/selector", "units/lightAppAd", "units/globalAudio", "modules/index/main", "modules/index/animationCloudBg", "modules/index/meteorShower", "modules/teletext/main", "modules/teletext/cascadingTeletext", "modules/link/main", "units/maskLayer", "modules/video/main", "lib/zepto/touch", "modules/video/youkuVideo", "modules/map/main", "units/yunlaiMap", "modules/form/main", "modules/words/main", "lib/zepto/data", "units/widget", "modules/words/iScroll", "modules/mask/main", "modules/mask/mask"], function(a) {
	window.app = a("modules/app/main"), a("modules/index/main").init(), a("modules/teletext/main").init(), a("modules/link/main").init(), a("modules/video/main").init(), a("modules/map/main").init(), a("modules/form/main").init(), a("modules/words/main").init(), a("modules/mask/main").init(), $(".page").first().trigger("current"), console.log("\n运行成功！"), $(".app-footer").after($("input[data-weixin-callback]"))
}), define("system/app", ["lib/zepto/zepto"], function(a) {
	a("lib/zepto/zepto.js")
}), define("system/platform", ["lib/zepto/zepto"], function(a, b, c) {
	a("lib/zepto/zepto.js");
	c.exports = {
		device: {},
		os: {},
		browser: {}
	}
}), define("system/util/objectUtil", [], function(a, b, c) {
	var d = function() {};
	d.prototype.createEmptyObject = function(a) {
		var b = {},
			c = function() {};
		if ("function" == typeof a) for (var d in a.prototype)"function" == typeof a.prototype[d] && (b[d] = c);
		return b
	};
	var e = new d;
	c.exports = e
}), define("system/util/stringUtil", [], function(a, b, c) {
	var d = {
		getBytesLength: function(a) {
			var b = a.match(/[^-ÿ]/gi);
			return a.length + (null == b ? 0 : b.length)
		}
	};
	c.exports = d
}), define("units/globalAudio", ["lib/zepto/zepto", "lib/zepto/touch", "lib/zepto/coffee", "system/util/objectUtil"], function(a, b, c) {
	var d = a("lib/zepto/zepto"),
		d = a("lib/zepto/touch"),
		d = a("lib/zepto/coffee"),
		e = a("system/util/objectUtil"),
		f = function(a) {
			this._$globalAudio = a, this._$tip = d("<span></span>"), this.audio = this._$globalAudio.find("audio")[0], this.isAllowManually = !1, this.playState = "ready";
			var b = this;
			this._$globalAudio.append(this._$tip), this._$globalAudio.coffee({
				steams: ['<img src="/template/22/source/styles/img/musicalNotes.png"/>', '<img src="/template/22/source/styles/img/musicalNotes.png"/>', '<img src="/template/22/source/styles/img/musicalNotes.png"/>', '<img src="/template/22/source/styles/img/musicalNotes.png"/>', '<img src="/template/22/source/styles/img/musicalNotes.png"/>', '<img src="/template/22/source/styles/img/musicalNotes.png"/>'],
				steamHeight: 100,
				steamWidth: 50
			}), this.audio.autoplay && (this.audio.pause(), d(window).on("load", function() {
				b.play()
			})), d(window).on("load", function() {
				b.isAllowManually = !0
			}), this._$globalAudio.on(d.isPC ? "click" : "tap", function(a) {
				a.preventDefault(), b.isAllowManually && (b._$globalAudio.is(".z-play") ? b.pause() : b.play())
			}), d(document).one("touchstart", function() {
				b.audio.play()
			})
		};
	f.prototype.play = function() {
		this._$globalAudio.is(".z-play") || (this.audio.play(), this._$globalAudio.removeClass("z-pause").addClass("z-play"), this._showTip("开启"), this.playState = "playing", d.fn.coffee.start())
	}, f.prototype.pause = function() {
		this._$globalAudio.is(".z-pause") || (this.audio.pause(), this._$globalAudio.removeClass("z-play").addClass("z-pause"), this._showTip("关闭"), this.playState = "pause", d.fn.coffee.stop())
	}, f.prototype._showTip = function(a) {
		var b = this;
		this._$tip.text(a), this._$tip.addClass("z-show"), setTimeout(function() {
			b._$tip.removeClass("z-show")
		}, 1e3)
	};
	var g, h = d(".u-globalAudio");
	g = h.length ? new f(d(".u-globalAudio")) : e.createEmptyObject(f), c.exports = g
}), define("units/lightAppAd", ["lib/zepto/zepto", "lib/zepto/touch"], function(a, b, c) {
	var d = a("lib/zepto/zepto"),
		d = a("lib/zepto/touch"),
		e = function() {
			this.$lightAppAd, this._init()
		};
	e.prototype._init = function() {
		var a = this;
		if (d(".m-lightAppAd").length <= 0) {
			a.$lightAppAd = d('<div class="m-lightAppAd"><a href="javascript:void(0);" class="m-lightAppAd-link-guide"></a><div class="m-lightAppAd-body"><div class="m-lightAppAd-title"></div><a href="http://i.liveapp.cn/?a=46" class="m-lightAppAd-link-get"></a><a href="tel:4000168906" class="m-lightAppAd-link-tel"></a></div></div>'), d(".page:last").find(".page-content").append(a.$lightAppAd);
			var b = a.$lightAppAd.find(".m-lightAppAd-link-guide"),
				c = a.$lightAppAd.find(".m-lightAppAd-body");
			d(".m-lightAppAd-body").find("a").on("click", function(a) {
				a.preventDefault()
			}), b.on(d.isPC ? "click" : "click", function(b) {
				a.$lightAppAd.addClass("z-showBody"), b.stopPropagation(), setTimeout(function() {
					d(".m-lightAppAd-body").find("a").off("click")
				}, 500)
			}), a.$lightAppAd.on(d.isPC ? "click" : "click", function() {
				a.$lightAppAd.removeClass("z-showBody"), d(".m-lightAppAd-body").find("a").on("click", function(a) {
					a.preventDefault()
				})
			}), c.on(d.isPC ? "click" : "click", function(a) {
				a.stopPropagation()
			})
		}
	}, e.prototype.remove = function() {
		this.$lightAppAd.remove()
	}, c.exports = new e
}), define("units/maskLayer", ["lib/zepto/zepto", "lib/zepto/selector", "lib/zepto/touch", "lib/zepto/data"], function(a, b, c) {
	var d = a("lib/zepto/zepto"),
		d = a("lib/zepto/selector"),
		d = a("lib/zepto/touch"),
		d = a("lib/zepto/data");
	!
	function() {
		var a = function(a, b) {
				var c = this;
				if (this._$maskLayer = a.addClass("u-maskLayer"), this.state = this._$maskLayer.is(".z-show") ? "show" : "hide", this.settings = d.extend({
					clickHideMode: 1,
					closeButton: !0,
					onShow: function() {},
					onHide: function() {}
				}, b), this._events = {
					show: [],
					hide: []
				}, this._events.show.push(this.settings.onShow), this._events.hide.push(this.settings.onHide), this.settings.closeButton) {
					var e = d('<a href="javascript:void(0);" class="u-maskLayer-close"></a>');
					c._$maskLayer.append(e), e.on(d.isPC ? "click" : "tap", function(a) {
						a.preventDefault(), c.hide()
					})
				}
				"show" == this.state ? c.show("_init") : c.hide("_init"), this.settings.clickHideMode && (c._$maskLayer.on(d.isPC ? "click" : "tap", function() {
					c.hide()
				}), 1 == c.settings.clickHideMode && c._$maskLayer.children().on(d.isPC ? "click" : "tap", function(a) {
					a.stopPropagation()
				}))
			};
		a.prototype.on = function(a, b) {
			this._events[a] && b && this._events[a].push(b)
		}, a.prototype.trigger = function(a) {
			if (this._events[a]) for (var b = this._events[a], c = 0; c < b.length; c++) b[c]()
		}, a.prototype.show = function() {
			var a = this;
			"_init" == arguments[0] ? this._$maskLayer.addClass("z-show").show() : (this._$maskLayer.show().removeClass("z-hide").addClass("z-showing"), setTimeout(function() {
				a._$maskLayer.addClass("z-show").removeClass("z-showing"), a.state = "show", a.trigger("show")
			}, 500))
		}, a.prototype.hide = function() {
			var a = this;
			"_init" == arguments[0] ? this._$maskLayer.addClass("z-hide").hide() : (this._$maskLayer.removeClass("z-show").addClass("z-hideing"), setTimeout(function() {
				a._$maskLayer.addClass("z-hide").removeClass("z-hideing").hide(), a.state = "hide", a.trigger("hide")
			}, 500))
		}, d.fn.maskLayer = function(b) {
			var c = "init";
			switch (arguments.length > 0 && "string" == typeof arguments[0] && (c = arguments[0]), c) {
			case "init":
				this.each(function(c, e) {
					var f = d(e),
						g = new a(f, b);
					f.data("plugin_maskLayer", g)
				});
				break;
			case "getPluginObject":
				return this.data("plugin_maskLayer");
			default:
				var e = this.data("plugin_maskLayer"),
					f = e[c];
				if (f) {
					var g = [];
					arguments.length > 1 && (g = arguments[1]), f.apply(e, g)
				}
			}
			return this
		}
	}(), c.exports = d
}), define("units/tip", ["lib/zepto/zepto", "lib/zepto/animationShow"], function(a, b, c) {
	function d() {
		this._$tipTemplate = e('<div class="u-tip"><i></i><p>{content}</p></div>'), this._$body = e("body")
	}
	var e = a("lib/zepto/zepto");
	e = a("lib/zepto/animationShow"), d.prototype.show = function(a, b, c) {
		a = a ? a : "这是一个提示信息！", b = b ? b : 2e3, c = c ? c : "info";
		var d = this._$tipTemplate.clone().addClass("z-" + c);
		d.children("p").text(a), this._$body.append(d), d.css("margin-left", d.width() / -2), setTimeout(function() {
			d.remove()
		}, b)
	}, d.prototype.info = function(a, b) {
		this.show(a, b, "info")
	}, d.prototype.success = function(a, b) {
		this.show(a, b, "success")
	}, d.prototype.error = function(a, b) {
		this.show(a, b, "error")
	}, d.prototype.warning = function(a, b) {
		this.show(a, b, "warning")
	};
	var f = new d;
	c.exports = f
}), define("units/weixin", ["lib/zepto/zepto"], function(a, b, c) {
	var d = a("lib/zepto/zepto");
	c.exports = d, function(a) {
		a.fn.wx = function(b) {
			function c(a, b) {
				var d = 2e3;
				b = b || 0, !0 === window.G_WEIXIN_READY || "WeixinJSBridge" in window ? a.apply(null, []) : d >= b && setTimeout(function() {
					c(a, b++)
				}, 15)
			}
			var d = a(this),
				e = a.extend({}, a.fn.wx.defaults, b);
			document.addEventListener("WeixinJSBridgeReady", function() {
				window.G_WEIXIN_READY = !0
			}, !1); {
				var f = {
					execHandler: function(a) {
						if (a && a instanceof Object) {
							var b = a.callback || null,
								c = a.args || [],
								d = a.context || null,
								e = a.delay || -1;
							b && b instanceof Function && ("number" == typeof e && e >= 0 ? setTimeout(function() {
								b.apply(d, c)
							}, e) : b.apply(d, c))
						}
					},
					execAfterMergerHandler: function(a, b) {
						if (a && a instanceof Object) {
							var c = a.args || [];
							a.args = b.concat(c)
						}
						this.execHandler(a)
					}
				},
					g = {
						Share: {
							weibo: function(a, b) {
								c(function() {
									WeixinJSBridge.on("menu:share:weibo", function() {
										WeixinJSBridge.invoke("shareWeibo", a, function(a) {
											-1 == a.err_msg.indexOf("cancel") && f.execAfterMergerHandler(b, [a])
										})
									})
								})
							},
							timeline: function(a, b) {
								c(function() {
									WeixinJSBridge.on("menu:share:timeline", function() {
										WeixinJSBridge.invoke("shareTimeline", a, function(a) {
											-1 == a.err_msg.indexOf("cancel") && f.execAfterMergerHandler(b, [a])
										})
									})
								})
							},
							message: function(a, b) {
								c(function() {
									WeixinJSBridge.on("menu:share:appmessage", function() {
										WeixinJSBridge.invoke("sendAppMessage", a, function(a) {
											-1 == a.err_msg.indexOf("cancel") && f.execAfterMergerHandler(b, [a])
										})
									})
								})
							}
						},
						setToolbar: function(a, b) {
							c(function() {
								WeixinJSBridge.call(!0 === a ? "showToolbar" : "hideToolbar"), f.execAfterMergerHandler(b, [a])
							})
						},
						setOptionMenu: function(a, b) {
							c(function() {
								WeixinJSBridge.call(!0 === a ? "showOptionMenu" : "hideOptionMenu"), f.execAfterMergerHandler(b, [a])
							})
						},
						pay: function(a, b) {
							c(function() {
								var c = {
									appId: "",
									timeStamp: "",
									nonceStr: "",
									"package": "",
									signType: "",
									paySign: ""
								},
									d = b || {},
									e = null,
									g = [a];
								for (var h in c) c.hasOwnProperty(h) && (c[h] = a[h] || "", console.info(h + " = " + c[h]));
								WeixinJSBridge.invoke("getBrandWCPayRequest", c, function(a) {
									var b = "get_brand_wcpay_request:";
									switch (a.err_msg) {
									case b + "ok":
										e = d.success;
										break;
									case b + "fail":
										e = d.fail || d.error;
										break;
									case b + "cancel":
										e = d.cancel || d.error;
										break;
									default:
										e = d.error
									}
									f.execAfterMergerHandler(e, g)
								})
							})
						}
					},
					h = {
						content: e.con
					},
					i = {
						img_url: e.img,
						img_width: 180,
						img_height: 180,
						link: e.link,
						desc: e.con,
						title: e.title
					};
				a.extend({
					appid: "wx21f7e6a981efd178"
				}, i)
			}
			return g.Share.timeline(i, e.handler), g.Share.message(i, e.handler), g.Share.weibo(h, e.handler), d
		}, a.fn.wx.defaults = {
			title: "云来轻APP",
			con: "云来轻APP",
			link: document.URL,
			img: location.protocol + "//" + location.hostname + ":" + location.port + "/template/19/img/wx_img_01@2x.jpg"
		}, a.fn.wx.version = "1.0.0"
	}(d)
}), define("units/widget", [], function(a, b, c) {
	var d = function() {
			this.name = "基类，扩展共有方法", this._click = "ontouchstart" in window ? "tap" : "click", this.hasTouch = "ontouchstart" in window ? !0 : !1, this._events = {}, this._isMotion = !! window.DeviceMotionEvent, this._elementStyle = document.createElement("div").style, this._UC = RegExp("Android").test(navigator.userAgent) && RegExp("UC").test(navigator.userAgent) ? !0 : !1, this._weixin = RegExp("MicroMessenger").test(navigator.userAgent) ? !0 : !1, this._iPhoen = RegExp("iPhone").test(navigator.userAgent) || RegExp("iPod").test(navigator.userAgent) || RegExp("iPad").test(navigator.userAgent) ? !0 : !1, this._Android = RegExp("Android").test(navigator.userAgent) ? !0 : !1, this._IsPC = function() {
				for (var a = navigator.userAgent, b = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"), c = !0, d = 0; d < b.length; d++) if (a.indexOf(b[d]) > 0) {
					c = !1;
					break
				}
				return c
			}, this.getTime = Date.now ||
			function() {
				return (new Date).getTime()
			}
		};
	d.prototype = {
		_isOwnEmpty: function(a) {
			for (var b in a) if (a.hasOwnProperty(b)) return !1;
			return !0
		},
		_vendor: function() {
			for (var a, b = ["t", "webkitT", "MozT", "msT", "OT"], c = 0, d = b.length; d > c; c++) if (a = b[c] + "ransform", a in this._elementStyle) return b[c].substr(0, b[c].length - 1);
			return !1
		},
		_prefixStyle: function(a) {
			return this._vendor() === !1 ? !1 : "" === this._vendor() ? a : this._vendor() + a.charAt(0).toUpperCase() + a.substr(1)
		},
		_hasPerspective: function() {
			var a = this._prefixStyle("perspective") in this._elementStyle;
			return a && "webkitPerspective" in this._elementStyle && this._injectStyles("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(b) {
				a = 9 === b.offsetLeft && 3 === b.offsetHeight
			}), !! a
		},
		_injectStyles: function(a, b, c, d) {
			var e, f, g, h, i = document.createElement("div"),
				j = document.body,
				k = j || document.createElement("body"),
				l = "modernizr";
			if (parseInt(c, 10)) for (; c--;) g = document.createElement("div"), g.id = d ? d[c] : l + (c + 1), i.appendChild(g);
			return e = ["&#173;", '<style id="s', l, '">', a, "</style>"].join(""), i.id = l, (j ? i : k).innerHTML += e, k.appendChild(i), j || (k.style.background = "", k.style.overflow = "hidden", h = docElement.style.overflow, docElement.style.overflow = "hidden", docElement.appendChild(k)), f = b(i, a), j ? i.parentNode.removeChild(i) : (k.parentNode.removeChild(k), docElement.style.overflow = h), !! f
		},
		_translateZ: function() {
			return this._hasPerspective ? " translateZ(0)" : ""
		},
		addEvent: function(a, b, c) {
			a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : a["on" + b] = c
		},
		removeEvent: function(a, b, c) {
			a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent ? a.detachEvent("on" + b, c) : a["on" + b] = null
		},
		_handleEvent: function(a) {
			if (this._events[a]) {
				var b = 0,
					c = this._events[a].length;
				if (c) for (; c > b; b++) this._events[a][b].apply(this, [].slice.call(arguments, 1))
			}
		},
		_on: function(a, b) {
			this._events[a] || (this._events[a] = []), this._events[a].push(b)
		},
		execHandler: function(a) {
			if (a && a instanceof Object) {
				var b = a.callback || null,
					c = a.opts || [],
					d = a.context || null,
					e = a.delay || -1;
				b && b instanceof Function && ("number" == typeof e && e >= 0 ? setTimeout(function() {
					b.call(d, c)
				}, e) : b.call(d, c))
			}
		},
		momentum: function(a, b, c, d, e) {
			var f, g, h = a - b,
				i = Math.abs(h) / c,
				j = .001;
			return f = a + i * i / (2 * j) * (0 > h ? -1 : 1), g = i / j, d > f ? (f = e ? d - e / 2.5 * (i / 8) : d, h = Math.abs(f - a), g = h / i) : f > 0 && (f = e ? e / 2.5 * (i / 8) : 0, h = Math.abs(a) + f, g = h / i), {
				destination: Math.round(f),
				duration: g
			}
		},
		loadingPageShow: function(a) {
			a.length >= 1 && a.show()
		},
		loadingPageHide: function(a) {
			a.length >= 1 && a.hide()
		},
		showCheckMessage: function(a, b, c) {
			c ? (a.removeClass("error").addClass("sucess"), a.html(b), a.addClass("z-show"), setTimeout(function() {
				a.removeClass("z-show")
			}, 2e3)) : (a.addClass("error").removeClass("sucess"), a.html(b), a.addClass("z-show"), setTimeout(function() {
				a.removeClass("z-show")
			}, 2e3))
		}
	};
	var e = new d;
	c.exports = e
}), define("units/ylmap", ["lib/zepto/zepto"], function(a, b, c) {
	var d = a("lib/zepto/zepto");
	c.exports = d, function(a) {
		a.fn.ylmap = function(b) {
			a.fn.ylmap.defaults = {
				detal: {
					sign_name: "TXjiang",
					contact_tel: 18624443174,
					address: "天安门"
				},
				latitude: 39.915,
				longitude: 116.404,
				fnOpen: null,
				fnClose: null
			};
			var c = a.extend({}, a.fn.ylmap.defaults, b);
			return this.addClass("ylmap").each(function() {
				function b() {
					var b = document.createElement("script");
					b.src = "http://api.map.baidu.com/api?v=1.4&callback=mapInit", document.head.appendChild(b);
					var c = document.createElement("style");
					c.type = "text/css";
					var e = d();
					e ? (mapScale = 1, phoneScale = 1) : mapScale = phoneScale > 1 ? 1 : 1 / phoneScale;
					var f = (a(window).height(), ".ylmap.open,.ylmap.mapOpen {height:100%;width:100%;background:#fff;}.ylmap img {max-width:initial!important;}.ylmap .tit { position:absolute; left:0; bottom:0; height:70px; width:100%; overflow: hidden; background:rgba(0,0,0,0.5);z-index:1;}.ylmap .tit p { margin-right:100px; }.ylmap .tit p a { position:relative; display:block; font-size:24px; color:#fff; height:70px; line-height:70px; padding-left:70px; }.ylmap .tit p a span { position:absolute; left:15px; top:15px; display:inline-block; width:40px;height:40px; }.ylmap .tit .close_map { display:none; position: absolute; bottom: 15px; right: 20px; width: 40px; height: 40px; margin-right:0; cursor:pointer; background-position: -100px -73px; }.ylmap .map_close_btn{position:absolute;top:10px;left:10px;width:80px;box-shadow:0 0 2px rgba(0,0,0,0.6) inset, 0 0 2px rgba(0,0,0,0.6);height:80px;border-radius:80%;color:#fff;background:rgba(230,45,36,0.8);text-align:center;line-height:80px;font-size:26px; font-weight:bold;cursor:pointer;z-index:1;}.ylmap.open .map_close_btn{display:block;}.ylmap.mapOpen .map_close_btn{display:block;}#BDMap {transform:scale(" + mapScale + ");-webkit-transform:scale(" + mapScale + ");}#BDMap {width:100%;height:100%;}#BDMap img{width:auto;height:auto;}.ylmap.open .transitBtn{display:block;}.ylmap.mapOpen .transitBtn{display:block;}.transitBtn {display:none;position:absolute;z-index:3000;}.transitBtn a{display:block;width:80px;box-shadow:0 0 2px rgba(0,0,0,0.6) inset, 0 0 2px rgba(0,0,0,0.6);height:80px;border-radius:80%;color:#fff;background:rgba(230,45,36,0.8);text-align:center;line-height:80px;font-size:24px; font-weight:bold}.transitBtn.close {top:10px;right:10px;}.transitBtn.bus {top:10px;right:110px;}.transitBtn.car {top:110px;right:10px;}.transitBtn.bus a{background:rgba(28,237,235,0.8);}.transitBtn.car a{background:rgba(89,237,37,0.8);}#transit_result{display:none;position:absolute;top:0;left:0;width:100%;height:100%;z-index:1000;overflow-y:scroll;}#transit_result.open{display:block;}#transit_result h1{font-size:26px!important;}#transit_result div[onclick^='Instance']{background:none!important;}#transit_result span{display:inline-block;font-size:20px;padding:0 5px;}#transit_result table {font-size:20px!important;}#transit_result table td{padding:5px 10px!important;line-height:150%!important;}.infoWindow p{margin-bottom:10px;}.infoWindow .window_btn .open_navigate{display:inline-block;padding:2px 6px; margin-right:10px;border:1px solid #ccc;border-radius:6px;text-align:center;cursor:pointer;}.anchorBL{display:none!important;}");
					c.innerHTML = f, document.head.appendChild(c)
				}
				function d() {
					for (var a = navigator.userAgent, b = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"), c = !0, d = 0; d < b.length; d++) if (a.indexOf(b[d]) > 0) {
						c = !1;
						break
					}
					return c
				}
				var e, f, g, h, i = a(this),
					j = c.detal,
					k = c.latitude,
					l = c.longitude,
					m = c.fnClose,
					n = (c.fnOpen, i.hasClass("bigOpen")),
					o = null,
					p = null,
					q = null,
					r = null,
					s = a('<div id="BDMap" class="BDMap"></div>');
				if (i.append(s), i.append(a('<div id="transit_result"></div>')), i.append(a('<div class="tit"><p><a href="javascript:void(0)"><span class="css_sprite01"></span>' + j.address + "</a></p></div>")), i.append(a('<p class="map_close_btn">退出</p>')), i.length > 0) {
					i.height()
				}
				n && i.find(".map_close_btn").css("display", "block"), a("#transit_result").length > 0 && "" != a("#transit_result").html() && a(".transitBtn").removeClass("hide");
				var t = function() {
						i.size() > 0 && (f = new BMap.Map(s.attr("id")), g = new BMap.Point(l, k), h = new BMap.Marker(g), f.enableScrollWheelZoom(), f.enableInertialDragging(), f.centerAndZoom(g, 15), f.addOverlay(h), u(), h.addEventListener("click", function() {
							u()
						}), f.addEventListener("click", function() {
							return !1
						}), f.addEventListener("zoomend", function() {
							var a = f.getZoom();
							f.centerAndZoom(g, a)
						}))
					},
					u = function() {
						v(h, j)
					},
					v = function(b, c) {
						var d = a('<div class="infoWindow"></div>');
						"undefined" != typeof c.contact_tel && d.append('<p class="tel"><a href="tel:' + c.contact_tel + '">' + c.contact_tel + "</a></p>"), d.append('<p class="address">' + c.address + "</p>"), d.append('<div class="window_btn"><span class="open_navigate open_bus" onclick="open_navigate(this)">公交</span><span class="open_navigate open_car" onclick="open_navigate(this)">自驾</span><span class="State"></span></div>');
						var e = {
							width: 0,
							height: 0,
							title: " "
						},
							g = new BMap.InfoWindow(d[0], e);
						b.openInfoWindow(g, f.getCenter())
					};
				open_navigate = function(b) {
					o = a(b).hasClass("open_bus") ? "bus" : "car", navigate(), a(".infoWindow").find("span.State").html("正在定位您的位置！")
				}, navigate = function() {
					window.navigator.geolocation ? window.navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
						timeout: 1e4
					}) : alert("sorry！您的设备不支持定位功能")
				}, handleError = function(b) {
					var c;
					switch (b.code) {
					case b.TIMEOUT:
						c = "获取超时!请稍后重试!";
						break;
					case b.POSITION_UNAVAILABLE:
						c = "无法获取当前位置!";
						break;
					case b.PERMISSION_DENIED:
						c = "您已拒绝共享地理位置!";
						break;
					case b.UNKNOWN_ERROR:
						c = "无法获取当前位置!"
					}
					a(".infoWindow").find("span.State").length > 0 ? a(".infoWindow").find("span.State").html(c) : alert(c)
				}, handleSuccess = function(b) {
					var c = b.coords,
						d = c.latitude,
						e = c.longitude;
					r = new BMap.Point(e, d), a(".infoWindow").find("span.State").html("获取信息成功，正在加载中！"), "bus" == o ? bus_transit() : self_transit(), s.parent().addClass(n ? "mapOpen" : "open")
				}, a(".map_close_btn").on("click", function() {
					i.removeClass("mapOpen open"), m && m()
				}), bus_transit = function() {
					if (p && p.clearResults(), q && q.clearResults(), !r) return void alert("抱歉：定位失败！");
					a(".fn-audio").hide(), "function" == typeof loadingPageShow && loadingPageShow(), a(".infoWindow").find("span.State").html("正在绘制出导航路线");
					var b = a("#transit_result") || a('<div id="transit_result"></div>');
					b.appendTo(i), p = new BMap.TransitRoute(f, {
						renderOptions: {
							map: f,
							panel: "transit_result",
							autoViewport: !0
						},
						onSearchComplete: searchComplete
					}), p.search(r, g)
				}, self_transit = function() {
					if (p && p.clearResults(), q && q.clearResults(), !r) return void alert("抱歉：定位失败！");
					a(".fn-audio").hide(), "function" == typeof loadingPageShow && loadingPageShow(), a(".infoWindow").find("span.State").html("正在绘制出导航路线");
					var b = a("#transit_result") || a('<div id="transit_result"></div>');
					b.appendTo(i), q = new BMap.DrivingRoute(f, {
						renderOptions: {
							map: f,
							panel: b.attr("id"),
							autoViewport: !0
						},
						onSearchComplete: searchComplete
					}), q.search(r, g)
				}, searchComplete = function(b) {
					function c() {
						var a;
						a = window.event.touches[0].pageY, e = a
					}
					function d(b) {
						b.stopPropagation(), b.preventDefault();
						var c;
						c = window.event.touches[0].pageY;
						var d = a(this).scrollTop();
						a(this).scrollTop(d + e - c), e = c
					}
					0 == b.getNumPlans() ? (alert("非常抱歉,未搜索到可用路线"), f.reset(), f.centerAndZoom(g, 15), u(), a("#transit_result").removeClass("open").hide(), a(".transitBtn").hide()) : (a("#transit_result").addClass("open"), a(".infoWindow").find("span.State").html(""), !a(".transitBtn").length > 0 && (a("#transit_result").after(a('<p class="transitBtn close" onclick="transit_result_close()"><a href="javascript:void(0)">关闭</a></p>')), a("#transit_result").after(a('<p class="transitBtn bus" onclick="bus_transit()"><a href="javascript:void(0)">公交</a></p>')), a("#transit_result").after(a('<p class="transitBtn car" onclick="self_transit()"><a href="javascript:void(0)">自驾</a></p>'))), i.find(".close_map").show(), a("#transit_result").addClass("open"), a(".transitBtn").show(), a("#transit_result").on("touchstart", c), a("#transit_result").on("touchmove", d)), "function" == typeof loadingPageHide && loadingPageHide(), n || i.css({
						position: "absolute",
						top: "0",
						left: "0",
						height: "100%"
					}), a(".close").find("a").html(a("#transit_result").hasClass("open") ? "关闭" : "打开")
				}, transit_result_close = function() {
					a("#transit_result").hasClass("open") ? (a("#transit_result").removeClass("open"), a(".close").find("a").html("打开")) : (a("#transit_result").addClass("open"), a(".close").find("a").html("关闭"))
				}, window.mapInit = t, b()
			})
		}
	}(d)
}), define("units/yunlaiMap", ["lib/zepto/zepto", "lib/zepto/selector", "lib/zepto/touch", "lib/zepto/data", "http://api.map.baidu.com/getscript?v=1.4&ak=h6rMzpaZgIOMvdzzGEzcGgBk&services=true&t=20140320104737"], function(a, b, c) {
	var d = a("lib/zepto/zepto"),
		d = a("lib/zepto/selector"),
		d = a("lib/zepto/touch"),
		d = a("lib/zepto/data");
	a("http://api.map.baidu.com/getscript?v=1.4&ak=h6rMzpaZgIOMvdzzGEzcGgBk&services=true&t=20140320104737"), function() {
		var a = 0,
			b = function(b, c) {
				var e = this;
				this._$yunlaiMap = b.addClass("u-yunlaiMap"), this._mapID = "map_" + ++a, this._$mapBox = d('<div id="' + this._mapID + '" class="baiduMap"></div>'), this._$mapToolBar = d('<div class="mapToolBar"><a href="javascript:void(0);" class="closeMap">关闭</a><span class="navigationControl"><a href="javascript:void(0);" class="z-current" data-route-type="1">公交</a><a href="javascript:void(0);" data-route-type="2">自驾</a><a href="javascript:void(0);" data-route-type="3">步行</a></span><span class="navigationTip">正在获取您所在的位置...</span></div>'), this._$navigationTip = this._$mapToolBar.find(".navigationTip"), this._$navigationControl = this._$mapToolBar.find(".navigationControl"), this._$mapRoutePanel = d('<div class="mapRoutePanel"><div id="routeResult_' + this._mapID + '" class="routeResult"><p class="noRouteInfo">暂无路线信息！</p></div><a href="javascript:void(0);" class="toggle"></a></div>'), this._baiduMap = null, this.markers = [], this._activedPoint = new BMap.Point(116.404, 39.915), this.settings = d.extend({
					markers: [],
					mapType: 0
				}, c), this._events = {
					show: [],
					hide: []
				}, this._$yunlaiMap.append(this._$mapRoutePanel), this._$yunlaiMap.append(this._$mapToolBar), this._$yunlaiMap.append(this._$mapBox), this._$yunlaiMap.is(".z-hide") && this._$yunlaiMap.hide(), this._baiduMap = new BMap.Map(e._mapID, {
					mapType: e._util.mapTypes[e.settings.mapType]
				}), this._baiduMap.enableScrollWheelZoom(), this._baiduMap.enableInertialDragging(), this._baiduMap.centerAndZoom(e._activedPoint, 12);
				var f = new BMap.MapTypeControl({
					mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
				});
				f.setOffset(new BMap.Size(145, 246)), this._baiduMap.addControl(f), this._$yunlaiMap.delegate(".closeMap", "click", function(a) {
					a.preventDefault(), e.hide()
				}), this._$navigationControl.delegate("a", "click", function() {
					var a = d(this),
						b = a.data("route-type");
					e.drawRoute(null, e._activedPoint, b), e._setNavigationMode(b)
				}), this._$mapRoutePanel.delegate(".toggle", "click", function() {
					e._$mapRoutePanel.toggleClass("z-show")
				}), this._$yunlaiMap.on("mousedown mousemove mouseup touchstart touchmove touchend", function(a) {
					a.stopPropagation()
				})
			};
		b.prototype._util = {
			geocoder: new BMap.Geocoder,
			geolocation: new BMap.Geolocation,
			mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP, BMAP_SATELLITE_MAP, BMAP_PERSPECTIVE_MAP]
		}, b.prototype.on = function(a, b) {
			this._events[a] && this._events[a].push(b)
		}, b.prototype.trigger = function(a) {
			if (this._events[a]) for (var b = this._events[a], c = 0; c < b.length; c++) b[c]()
		}, b.prototype.show = function() {
			var a = this;
			this._$yunlaiMap.addClass("z-hide"), this._$yunlaiMap.show(), setTimeout(function() {
				a._$yunlaiMap.removeClass("z-hide"), a.trigger("show")
			}, 0), this._$navigationTip.hide(), this._$navigationControl.hide(), this._$mapRoutePanel.hide()
		}, b.prototype.hide = function() {
			var a = this;
			this._$yunlaiMap.addClass("z-hide"), this.trigger("hide"), setTimeout(function() {
				a._$yunlaiMap.hide()
			}, 520)
		}, b.prototype._updateNavigationInfo = function(a, b) {
			switch (a) {
			case 0:
				this._showNavigationTip(b ? b : "正在获取您所在的位置...", "loading"), this._$mapRoutePanel.removeClass("z-show").find(".routeResult").html('<p class="noRouteInfo">暂无路线信息！</p>'), console.log(b ? b : "正在获取您所在的位置...");
				break;
			case 1:
				this._showNavigationTip(b ? b : "获取位置失败！", "error", 5e3), console.log(b ? b : "获取位置失败！");
				break;
			case 2:
				this._showNavigationTip(b ? b : "正在绘制公交路线！", "loading"), this._setNavigationMode(1), console.log(b ? b : "正在绘制公交路线！");
				break;
			case 3:
				this._showNavigationTip(b ? b : "正在绘制驾车路线！", "loading"), this._setNavigationMode(2), console.log(b ? b : "正在绘制驾车路线！");
				break;
			case 4:
				this._showNavigationTip(b ? b : "正在绘制步行路线！", "loading"), this._setNavigationMode(3), console.log(b ? b : "正在绘制步行路线！");
				break;
			case 5:
				this._showNavigationTip(b ? b : "路线绘制成功！", "success", 1e3), console.log(b ? b : "路线绘制成功！");
				var c = this;
				setTimeout(function() {
					c._$navigationTip.html("").hide(), c._$navigationControl.show(), c._$mapRoutePanel.show().addClass("z-show")
				}, 1e3);
				break;
			case 6:
				this._showNavigationTip(b ? b : "路线绘制失败！", "error", 5e3), this._$mapRoutePanel.removeClass("z-show"), console.log(b ? b : "路线绘制失败！")
			}
		}, b.prototype._showNavigationTip = function(a, b, c) {
			if (a = a ? a : "", b && (a = '<i class="icon-' + b + '"></i>' + a), this._$navigationTip.html(a).show(), this._$navigationControl.hide(), c) {
				var d = this;
				setTimeout(function() {
					d._$navigationTip.html("").hide()
				}, c)
			}
		}, b.prototype._setNavigationMode = function(a) {
			var b = this._$navigationControl.find("a");
			b.filter(".z-current").removeClass("z-current"), b.filter('[data-route-type="' + a + '"]').addClass("z-current")
		}, b.prototype.addMarker = function(a) {
			var b = this,
				c = new BMap.Point(a.lng, a.lat),
				e = new BMap.Marker(c),
				f = new BMap.InfoWindow,
				g = '<div class="navigationButtons"> <a href="#" data-route-type="1">公交</a><a href="#" data-route-type="2">自驾</a><a href="#" data-route-type="3">步行</a> </div>';
			return a.title && f.setTitle(a.title), a.content && f.setContent(a.content + g), a.title && a.content || b._util.geocoder.getLocation(c, function(b) {
				b && (a.title || (b.address = b.address ? b.address : "未知地点", f.setTitle(b.address)), a.content || (b.business = b.business ? b.business : "无", f.setContent("周边：" + b.business + g)))
			}), e.addEventListener("click", function() {
				this.openInfoWindow(f), b._activedPoint = this.point, window._yunlaiMap_initRouted || (window._yunlaiMap_initRouted = !0, d(".BMap_bubble_content").delegate(".navigationButtons a", "click", function() {
					var a = e.getPosition(),
						c = d(this).data("route-type");
					b.drawRoute(null, a, c)
				}))
			}), b._baiduMap.addOverlay(e), b.markers.push(e), b._baiduMap.centerAndZoom(c, 12), window.clearTimeout(window._yunlaiMap_addMarker_timeout), window._yunlaiMap_addMarker_timeout = setTimeout(function() {
				b._baiduMap.setZoom(10), b._baiduMap.setCenter(c), 1 == b.markers.length && e.dispatchEvent("click"), e.openInfoWindow(f)
			}, 200), e
		}, b.prototype.addMarkers = function(a) {
			for (var b = this, c = 0; c < a.length; c++) b.addMarker(a[c])
		}, b.prototype.clearMarkers = function() {
			for (var a = 0; a < this.markers.length; a++) this._baiduMap.removeOverlay(this.markers[a])
		}, b.prototype.drawRoute = function(a, b, c) {
			var d = this;
			if (c = c ? c : 1, b) if (a) switch (c) {
			case 1:
				d.drawTransitRoute(a, b);
				break;
			case 2:
				d.drawDrivingRoute(a, b);
				break;
			case 3:
				d.drawWalkingRoute(a, b)
			} else d._updateNavigationInfo(0), d._util.geolocation.getCurrentPosition(function(a) {
				a && a.point ? d.drawRoute(a.point, b, c) : d._updateNavigationInfo(1)
			}, {
				enableHighAccuracy: !0,
				timeout: 12e3,
				maximumAge: 6e4
			})
		}, b.prototype.drawTransitRoute = function(a, b) {
			var c = this;
			b && (a ? (c._updateNavigationInfo(2), c._transitRoute || (c._transitRoute = new BMap.TransitRoute(c._baiduMap, {
				renderOptions: {
					map: c._baiduMap,
					panel: "routeResult_" + c._mapID,
					autoViewport: !0
				},
				onSearchComplete: function(a) {
					a._plans && a._plans.length > 0 ? c._updateNavigationInfo(5) : c._updateNavigationInfo(6, "取经之路路途遥远，咱们还是坐灰机吧！^_^")
				}
			})), c.clearRoutes(), c._transitRoute.search(a, b)) : c.drawRoute(a, b, 1))
		}, b.prototype.drawDrivingRoute = function(a, b) {
			var c = this;
			b && (a ? (c._updateNavigationInfo(3), c._drivingRoute || (c._drivingRoute = new BMap.DrivingRoute(c._baiduMap, {
				renderOptions: {
					map: c._baiduMap,
					panel: "routeResult_" + c._mapID,
					autoViewport: !0
				},
				onSearchComplete: function(a) {
					a._plans && a._plans.length > 0 ? c._updateNavigationInfo(5) : c._updateNavigationInfo(6, "取经之路路途遥远，咱们还是坐灰机吧！^_^")
				}
			})), c.clearRoutes(), c._drivingRoute.search(a, b)) : c.drawRoute(a, b, 2))
		}, b.prototype.drawWalkingRoute = function(a, b) {
			var c = this;
			b && (a ? (c._updateNavigationInfo(4), c._walkingRoute || (c._walkingRoute = new BMap.WalkingRoute(c._baiduMap, {
				renderOptions: {
					map: c._baiduMap,
					panel: "routeResult_" + c._mapID,
					autoViewport: !0
				},
				onSearchComplete: function(a) {
					a._plans && a._plans.length > 0 ? c._updateNavigationInfo(5) : c._updateNavigationInfo(6, "取经之路路途遥远，咱们还是坐灰机吧！^_^")
				}
			})), c.clearRoutes(), c._walkingRoute.search(a, b)) : c.drawRoute(a, b, 3))
		}, b.prototype.clearRoutes = function() {
			this._transitRoute && this._transitRoute.clearResults(), this._drivingRoute && this._drivingRoute.clearResults(), this._walkingRoute && this._walkingRoute.clearResults(), this._$navigationControl.hide(), this._$mapRoutePanel.removeClass("z-show").find(".routeResult").html('<p class="noRouteInfo">暂无路线信息！</p>')
		}, b.prototype.clearOverlays = function() {
			this._baiduMap.clearOverlays(), this.clearRoutes(), this.markers.length = 0
		}, b.prototype.changeMapType = function(a) {
			this._baiduMap.setMapType(this._util.mapTypes[a])
		}, d.fn.yunlaiMap = function(a) {
			var c = "init";
			switch (arguments.length > 0 && "string" == typeof arguments[0] && (c = arguments[0]), c) {
			case "init":
				this.each(function(c, e) {
					var f = d(e),
						g = new b(f, a);
					f.data("plugin_yunlaiMap", g)
				});
				break;
			case "getPluginObject":
				return this.data("plugin_yunlaiMap");
			default:
				var e = this.data("plugin_yunlaiMap"),
					f = e[c];
				if (f) {
					var g = [];
					arguments.length > 1 && (g = arguments[1]), f.apply(e, g)
				}
			}
			return this
		}
	}(), c.exports = d
});
