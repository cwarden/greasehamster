// ==UserScript==
// @name          apex-highlighter
// @namespace     http://marketingcrc.com
// @description   Syntax highlight Apex classes and triggers in Salesforce
// @include       https://*.salesforce.com/*
// ==/UserScript==

// from http://bit.ly/guiCKN
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// All your GM code must be inside this function
function main() {
	var syntax, codeLocation, brush;
	$.noConflict();
	switch (jQuery('h1.pageType').text()) {
		// TODO: create Apex and VisualForce brushes
		// Use Java and XML brushes for now
		case 'Visualforce Page':
			brush = 'Xml';
			codeLocation = 'pre.codeBlock';
			break;
		case 'Apex Class':
		case 'Apex Trigger':
			brush = 'Java';
			codeLocation = 'pre.codeBlock table tbody tr td + td';
			break;
		default:
			// no code block on this page
			return;
	}
	syntax = brush.toLowerCase();

	jQuery('pre.codeBlock').addClass('origCodeBlock').before('<script type="syntaxhighlighter" class="brush: ' + syntax + '"><![CDATA[' + jQuery(codeLocation).html().replace(/<br>/g, '\n') + ']]></script>');

	jQuery('head').append('<link href="http://alexgorbatchev.com/pub/sh/current/styles/shThemeDefault.css" rel="stylesheet" type="text/css" />');
	jQuery.getScript('http://alexgorbatchev.com/pub/sh/current/scripts/shCore.js', function() {
		jQuery.getScript('http://alexgorbatchev.com/pub/sh/current/scripts/shBrush' + brush + '.js', function() {
			SyntaxHighlighter.highlight();
			jQuery('pre.origCodeBlock').remove();
			jQuery('td.code code').addClass('codeBlock');
		});
	});

}

// TODO: abort if this page doesn't require syntax highlighting

// load jQuery and execute the main function
addJQuery(main);
