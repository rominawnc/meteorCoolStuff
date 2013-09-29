/**
Notification helper 
*/

(function($) {
  $.extend({

      pinesNotifyErrors: function(errors){    
        
        if(typeof($)!="undefined" && errors!=null){
          $.pnotify({
              title: "Oops",
              text:  errors!=""?errors:"Something went wrong",
              type: "error"
            });   
        }            
    },
    resetErrorsForUser: function(){
      Session.set("currentError"+Meteor.userId(),null);
      $.pnotify_remove_all();
    }
  });
})(jQuery);
  