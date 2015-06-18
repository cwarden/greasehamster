// ==UserScript==
// @name         sfdc-org-name
// @namespace    http://greatvines.com
// @description  Show Salesforce.com Org name at the top of Salesforce pages
// @match        https://*.salesforce.com/*
// @match        https://*.cloudforce.com/*
// @version      1.1
//
// Doesn't work on VisualForce pages yet because the session id in the cookie
// on the VisualForce domain isn't valid for the API call.  Probably need to
// set a global variable on any VisualForce pages using {!GETSESSIONID()}.
// /* @match       https://*.visual.force.com/* */
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
	var jq = $.noConflict(true);
	var match = document.cookie.match(/\bsid=([^;]+)/);
	if (match) {
		__sfdcSessionId = match[1];
	} else {
		return;
	}
	jq.getScript('/soap/ajax/25.0/connection.js', function() {
		sforce.connection.query("SELECT Name FROM Organization LIMIT 1", {
			onSuccess: function(result) {
				jq('table#phHeader td.right div.messages').append(result.records.Name);
			},
			onFailure: function(error) {
				console.log(error.faultstring);
			}
		});
	});

}

if (self != top) {
	return;
}

// load jQuery and execute the main function
addJQuery(main);

