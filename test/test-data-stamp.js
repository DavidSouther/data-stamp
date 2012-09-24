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
	ok(data.load, "data.load is available.");
});

test("Simple Values", function() {
	var val = "";
	var dom = data.stamp(val);
	equal(dom.length, 1, "Returned one element.");
	equal(dom[0].tagName.toLowerCase(), "span", "Returned element was a span.");
	equal("", dom.text(), "Text is the same.");

	var val2 = "Hello";
	var dom2 = data.stamp(val2);
	equal(dom2.text(), "Hello", "Basic text set.");

	var val3 = 42;
	var dom3 = data.stamp(val3);
	equal(dom3.text(), "42", "Basic number converted.");
});

test("Simple Arrays", function(){
	var val = [];
	var dom = data.stamp(val);
	equal(dom.length, 1, "Returned 1 element.");
	equal(dom[0].tagName.toLowerCase(), "ul", "Returned element was ul.");

	var val2 = [1, 2, 3];
	var dom2 = data.stamp(val2);
	equal(dom2.find("li").length, 3, "Returned list with children.");
	equal(dom2.find(":nth-child(2)").text(), "2", "Children have correct names.");
});

test("Simple Objects", function(){
	var val = {};
	var dom = data.stamp(val);
	equal(dom.length, 1, "Returned 1 element.");
	equal(dom[0].tagName.toLowerCase(), "div", "Returned element was div.");

	var val2 = {a: 1, b: 2, c: 3};
	var dom2 = data.stamp(val2);
	equal(dom2.children().length, 3, "Returned div with 3 children.");
	equal(dom2.find(":nth-child(3) b").length, 1, "Child has <b> leader.");
});

test("Complex objects", function(){
	var val = {a: 1, b: { c: 2, d: 3}, e: [4, 5, 6]};
	var dom = data.stamp(val);
	equal(dom.children().length, 3, "Got values back.");
	equal(dom.children(":nth-child(2)").find("div > span").length, 2, "Sub object has 2 children.");
	equal(dom.children(":nth-child(2)").find("div > span > b:first").text(), "c", "Correct value in child.");
	equal(dom.children(":nth-child(3)").find("li").length, 3, "Sub array has list of three.");
	$("#fixture").append(dom);
});

}(jQuery));
