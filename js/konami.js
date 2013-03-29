(function($) {

  $.fn.konami = function(callback, code) {
    if (code == null) { 
      code = "38384040373937396665";
    }

    return this.each(function() {
      var kkeys = "";
      $(this).keydown(function(e){
        kkeys = kkeys + e.keyCode;
        if (kkeys.length > code.length) {
          kkeys = kkeys.slice(code.length * -1);
        }
        if ( kkeys === code ){
          kkeys = "";
          callback(e);
        }
      });
    });
  }

})(jQuery);
