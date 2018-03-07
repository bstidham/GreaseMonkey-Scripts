// ==UserScript==
// @name           BS Facebook Timeline Cleaner
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @require        http://code.jquery.com/jquery-1.7.1.min.js
// @grant       none
// @version 3
// @namespace com.billstidham.greasemonkey.facebook.bsfacebooktimelinecleaner
// @description Delete Facebook activity
// ==/UserScript==

/*
 * For jQuery Conflicts.
 */
this.$ = this.jQuery = jQuery.noConflict(true);

/*
 * No warranty. Use with your own risk. V0.6
 */

$(document).ready(function() {

  var BSFBTimelineCleaner = (function() {

    /*
     * Method: isPageAllActivity
     * 
     * @return boolean true if current page is Activity Log
     */
    var isPageActivityLog = function() {
      return /(allactivity)/g.test($(location).attr('href'));
    };
    
    /*
     * Handlers
     */
    $(window).on('/BSFBTimelineCleaner/ScrollSearchResultsClick', function() {
      search_more_results = $('#search_more_results a');
      if (search_more_results.length) {
        search_more_results.click();
        setTimeout(5000, $(window).trigger('/BSFBTimelineCleaner/ScrollSearchResultsClick'));
      }
    });
		
    var init = function() {
      $("div._2o3t").append("<div><div><span>BS Facebook Timeline Cleaner</span></div><div><input id='btnScrollSearchResults' type='button' value='Scroll search results'/></div></div>");
      $("#btnScrollSearchResults").on("click", function() {$(window).trigger('/BSFBTimelineCleaner/ScrollSearchResultsClick');});
    };
    init();
    
    return {
      isPageActivityLog: isPageActivityLog
    };
  })();
  
});

