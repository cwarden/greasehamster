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
	$.noConflict();
	if (jQuery('pre.codeBlock').length == 0) {
		// no code block on this page
		return;
	}

	jQuery('pre.codeBlock').addClass('origCodeBlock').before('<script type="syntaxhighlighter" class="brush: java codeBlock"><![CDATA[' + jQuery('pre.codeBlock table tbody tr td + td').html().replace(/<br>/g, '\n') + ']]></script>');

	jQuery('head').append('<link href="http://alexgorbatchev.com/pub/sh/current/styles/shThemeDefault.css" rel="stylesheet" type="text/css" />');
	jQuery.getScript('http://alexgorbatchev.com/pub/sh/current/scripts/shCore.js', function() {
		jQuery.getScript('http://alexgorbatchev.com/pub/sh/current/scripts/shBrushJava.js', function() {
			SyntaxHighlighter.highlight();
			jQuery('pre.origCodeBlock').remove();
			jQuery('td.code code').addClass('codeBlock');
		});
	});

}

// TODO: abort if this page doesn't require syntax highlighting

// load jQuery and execute the main function
addJQuery(main);
