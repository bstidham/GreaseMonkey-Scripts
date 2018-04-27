// ==UserScript==
// @name        Mouseless
// @namespace   com.billstidham.firefox
// @description Mouseless browsing
// @include     *
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

var mouseless = {
    "0-9": ""
  , focusMap: []
  , "on": false
  , inFrame: function() {
      try {
          return window.self !== window.top;
      } catch (e) {
          return true;
      }
  }
  , toggle: function() {
      mouseless["on"] = !mouseless["on"];
      mouseless["0-9"] = "";
      mouseless["focusMap"] = [];
  }
  , buildFocusMap: function(level, context) {
      if (!level) level = 0
      if (!context) context = $(document);
      i = mouseless["focusMap"].length;
      inputs_selector = "a[href], select, input[type!='hidden'], textarea";
      console.log("level: " + level);
      console.log("context: " + context);
      console.log("i: " + i);
      console.log("inFrame: " + mouseless["inFrame"]());
      $(inputs_selector, context).each(function() {
        i++;
        mouseless["focusMap"][i] = this;
        $("<span style='margin-left:2pt; color:black; background-color:lightgray; z-index: 999; position: absolute;' id='mlb_" + i + "'>[" + i + "]</span>").insertAfter(this);
      });
      console.log("Mouseless: " + JSON.stringify(mouseless));
//       text_nodes = $(":visible", context).not(inputs_selector).filter(function() {
//         return $(this).text().trim() != "";
//       });
//       console.log("test_nodes: " + JSON.stringify(text_nodes));
//       $(text_nodes).each(function() {
//         console.log("node text: " + $(this).text());
//       });
  }
  , handleKeyDown: function(e) {
      if(mouseless["inFrame"]()) {
        console.log("Frame: {keyCode: " + e.keyCode + "}");
        window.parent.$(window.parent.document).trigger($.Event('keydown', {ctrlKey: e.ctrlKey, keyCode: e.keyCode}));
      } else {
        console.log("TopWindow: {keyCode: " + e.keyCode + "}");
        if(e.ctrlKey && (e.keyCode == 96 || e.keyCode == 48)) { //ctrl+0
          mouseless["toggle"]();
          if(mouseless["on"]) {
            $(document.activeElement).blur();
            mouseless["buildFocusMap"]();
          } else {
            $("[id^='mlb_']").remove();
          }
          return;
        }
        if(mouseless["on"]) {
          switch (e.keyCode) {
            case 27: //esc
              mouseless["toggle"]();
              $("[id^='mlb_']").remove();
              break;
            case 13: //enter
              if(mouseless["focusMap"][mouseless["0-9"]]) {
                mouseless["focusMap"][mouseless["0-9"]].focus();
              }
              mouseless["toggle"]();
              $("[id^='mlb_']").remove();
              e.preventDefault();
              break;
            case 96: case 48: mouseless["0-9"] += "0"; break;
            case 97: case 49: mouseless["0-9"] += "1"; break;
            case 98: case 50: mouseless["0-9"] += "2"; break;
            case 99: case 51: mouseless["0-9"] += "3"; break;
            case 100: case 52: mouseless["0-9"] += "4"; break;
            case 101: case 53: mouseless["0-9"] += "5"; break;
            case 102: case 54: mouseless["0-9"] += "6"; break;
            case 103: case 55: mouseless["0-9"] += "7"; break;
            case 104: case 56: mouseless["0-9"] += "8"; break;
            case 105: case 57: mouseless["0-9"] += "9"; break;
          }
          console.log(mouseless);
        }
      }
  }
};

$(document).ready(function() {
  $(window).focus();
  $(window).on("keydown", mouseless["handleKeyDown"]);
});
