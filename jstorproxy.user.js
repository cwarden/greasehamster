/*

A small Greasemonkey script to rewrite JSTOR links on websites to use a proxy.

Adopted from Chris Harper's Amazon Affiliate script.

Christian G. Warden - cwarden@xerus.org

*/

// ==UserScript==
// @name          JSTORProxy
// @namespace     http://xn.pinkhamster.net/
// @description   Rewrite JSTOR links to use a proxy
// @include       *
// ==/UserScript==

(function() {
/*
 * The proxy server will be appending to domain in jstor.org urls 
*/
var defaultProxy = "libaccess.sjlibrary.org";
var proxy = '';

if (!GM_getValue('proxy')) {
	proxy = prompt("What proxy would you like to use for JSTOR?", defaultProxy);
	GM_setValue('proxy', proxy);
} else {
	proxy = GM_getValue('proxy');
}

var allLinks = document.getElementsByTagName("a");

for (i = 0; i < allLinks.length; i++)
{
   var href = allLinks[i].href;
	var journalSites = /(.*\b(ieeexplore\.ieee\.org|jstor\.org|interscience\.wiley\.com|sagepub\.com|elsevier\.com|journals.cambridge.org|metapress\.com))(\/|%2F)(.*)/i;
   if (href.match(journalSites))
   {
		GM_log("found jstor link: " + href);
	  var matches = href.match(journalSites);
	  allLinks[i].setAttribute("href", matches[1] + "." + proxy + matches[3] + matches[4]);
   }
}
})();




