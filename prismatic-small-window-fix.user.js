// ==UserScript==
// @name          prismatic-small-window-fix
// @namespace     http://xerus.org
// @description   Fixes j/k keys in windows less than 1200 pixels wide
// @include       http://getprismatic.com/*
// ==/UserScript==

var injectMe = function() {
	var articleReady;
	articleReady = setInterval( function() {
		if (typeof(Article) === 'undefined' || typeof(Article.prototype.increase) === 'undefined') {
			return
		}

		Article.prototype.increase = function () {
		  // if $(window).width is less than 1200, elementFromPoint will match the article itself, rather than the div.right,
		  // so we need to make sure we end up with an article
		  this.current=$(document.elementFromPoint($(window).width()/2,120))
		  .parents('.article').andSelf().filter('.article').data('idx')
		  , this.goto(++this.current);
		  return
		}

		Article.prototype.decrease = function() { 
			this.current=$(document.elementFromPoint($(window).width()/2,120))
			.parents('.article').andSelf().filter('.article').data('idx')
		, this.goto(--this.current);
		  return
		}

		clearInterval(articleReady)
	}, 200);
};

scriptNode = document.createElement('script');
scriptNode.textContent = 'var injectMe = ' + injectMe.toString() + '; injectMe();'
document.head.appendChild(scriptNode);
