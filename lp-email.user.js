// ==UserScript==
// @name          quick-lp-email
// @namespace     http://greatvines.com
// @description   Show LiquidPlanner Task email address in header
// @match         https://app.liquidplanner.com/*
// @version       1.1
//
// ==/UserScript==

// from http://bit.ly/guiCKN
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js");
  script.addEventListener('load', function() {
	  var script = document.createElement("script");
	  script.textContent = "(" + callback.toString() + ")();";
	  document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// All your GM code must be inside this function
function main() {
	var $gm = $.noConflict(true);

	var updateEmail = function() {
		try {
			var id = LP.Treeitem.grid.getSelectedRowId();
			var address = id + "-" + LP.JSON.emailInbox;
			var num = id.replace(/\D/g, '');

			$gm('div#filter_cues span.email').remove();
			$gm('div#filter_cues').append('<span class="email"><a href="mailto:' + address + '">' + address + '</a> (' + num + ')</span>');
		} catch (e) {
			console.log(e);
		}
	};
	updateEmail();
	$gm(document).on('click', 'td.ti_name', function() { setTimeout(updateEmail, 100); });
	$gm(document).on('keyup', function() { setTimeout(updateEmail, 100); });
}

if (self != top) {
	return;
}

// load jQuery and execute the main function
addJQuery(main);


