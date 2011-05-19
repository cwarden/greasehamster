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
	// jQuery('pre.codeBlock').replaceWith('<script type="syntaxhighlighter" class="brush: java"><![CDATA[' + jQuery('pre.codeBlock table tbody tr td + td').text() + ']]></script>');
	// jQuery('pre.codeBlock').replaceWith('<pre class="brush: java">' + jQuery('pre.codeBlock table tbody tr td + td').html().replace(/<br>/g, '\n').replace(/</g, '&lt;') + '</pre>')

	jQuery('pre.codeBlock').replaceWith('<script type="syntaxhighlighter" class="brush: java codeBlock"><![CDATA[' + jQuery('pre.codeBlock table tbody tr td + td').html().replace(/<br>/g, '\n') + ']]></script>');

	/*
	jQuery('head').append('<link href="http://alexgorbatchev.com/pub/sh/current/styles/shThemeDefault.css" rel="stylesheet" type="text/css" />' +
	'<script src="http://alexgorbatchev.com/pub/sh/current/scripts/shCore.js" type="text/javascript"></script>' +
	'<script src="http://alexgorbatchev.com/pub/sh/current/scripts/shBrushJava.js" type="text/javascript"></script>');
	*/

	jQuery('head').append('<link href="http://alexgorbatchev.com/pub/sh/current/styles/shThemeDefault.css" rel="stylesheet" type="text/css" />');
	jQuery.getScript('http://alexgorbatchev.com/pub/sh/current/scripts/shCore.js', function() {
		jQuery.getScript('http://alexgorbatchev.com/pub/sh/current/scripts/shBrushJava.js', function() {
			SyntaxHighlighter.highlight();
			jQuery('td.code code').addClass('codeBlock');
		});
	});

}

// load jQuery and execute the main function
addJQuery(main);
