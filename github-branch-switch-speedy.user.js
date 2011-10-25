// ==UserScript==
// @name          github-branch-switch-speedy
// @namespace     http://xerus.org
// @description   Press enter to switch to a branch/tag in switching (W) mode
// @include       https://github.com/*
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

function main() {
	var j = $.noConflict(true);
	j('input#context-commitish-filter-field').keyup(function(e) {
		if (e.which == 13) {
			var branches = j('div.subnav-bar div.commitish-item.branch-commitish.selector-item:visible a');
			if (branches.length == 1) {
				// if there's only one branch shown, press enter to change
				var link = j(branches).attr('href');
				window.location = link;
			}
		}
	});
}

// load jQuery and execute the main function
addJQuery(main);
