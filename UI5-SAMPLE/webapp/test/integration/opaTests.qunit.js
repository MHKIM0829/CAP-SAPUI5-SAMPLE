/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/istn/ifl/UI5-SAMPLE/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});