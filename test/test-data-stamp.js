/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
/*global jQuery:false, JEFRi:false, isLocal:false*/

(function($){

module("data-stamp");

test("Unit Testing Environment", function () {
	expect(1);
	ok( !isLocal, "Unit tests shouldn't be run from file://, especially in Chrome. If you must test from file:// with Chrome, run it with the --allow-file-access-from-files flag!" );
});

test("D-S-Proto", function(){
	ok(data.stamp, "data.stamp is available.");
});

test("Simple Values", function() {
	var val = "";
	var dom = data.stamp(val);
	equal(dom.length, 1, "Returned one element.");
	equal(dom[0].tagName.toLowerCase(), "div", "Returned element was div.");
	equal("", dom.text(), "Text is the same.");

	var val2 = "Hello";
	var dom2 = data.stamp(val2);
	equal(dom2.text(), "Hello", "Basic text set.");

	var val3 = 42;
	var dom3 = data.stamp(val3);
	equal(dom3.text(), "42", "Basic number converted.");
});


}(jQuery));
