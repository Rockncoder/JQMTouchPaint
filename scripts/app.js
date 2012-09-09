

var RocknCoder = RocknCoder || {};
RocknCoder.Pages = RocknCoder.Pages || {};

(function () {
	"use strict";

	// put the page events into one string
	RocknCoder.PageEvents = "pagebeforeshow pageshow pagebeforechange pagechange pagebeforehide pagehide";

	// the kernel remains unchanged
	RocknCoder.Pages.Kernel = function (event) {
		var that = this,
			eventType = event.type,
			pageName = $(this).attr("data-rnc-jspage");
		if (RocknCoder && RocknCoder.Pages && pageName && RocknCoder.Pages[pageName] && RocknCoder.Pages[pageName][eventType]) {
			RocknCoder.Pages[pageName][eventType].call(that);
		}
	};

	// anonymous function which binds to the page's page events
	(function () {
		$("div[data-rnc-jspage]").on(
			RocknCoder.PageEvents,
			RocknCoder.Pages.Kernel
		);
	}());

	// anonymous function which binds to the document's pageload event
	(function () {
		$(document).bind(
			'pageload',
			function (event, obj) {
				console.log("pageload");
				$("div[data-rnc-jspage]")
					// to make sure we aren't double hooking events clear them all
					.off(RocknCoder.PageEvents)
					// then hook them all  (the newly loaded page is in DOM at this point)
					.on(RocknCoder.PageEvents, RocknCoder.Pages.Kernel);
			}
		);
	}());

	// size the content area
	RocknCoder.Dimensions = (function () {
		var get = function () {
			var isFirstPass = false,
				isIPhone = (/iphone/gi).test(navigator.appVersion),
				width = $(window).width(),
				height = $(window).height() + (isIPhone ?  60 : 0),
				hHeight = $('header').outerHeight(),
				fHeight = $('footer').outerHeight();
			return {
				width: width,
				height: height - hHeight - fHeight
			};
		};
		return {
			get: get
		};
	}());
}());
