if (Meteor.isClient) {
  Deps.autorun(function (e) {
    var comput =$.pinesNotifyErrors(Session.get("currentError"+Meteor.userId()));
    
  });

  Template.scoreCRUD.events({
    'click #addScoreBtn' : function (){      
      var options={};
      Meteor.call("resetErrorsForUser");

      options.points=$("#points").val();
      options.game=$("#game").val();
      options.date=$("#date").val();
      var meteorReturn=Meteor.call("addScore",options);
    }
  });

  Template.scoreCRUD.scores =function(){
      return Scores.find({owner:Meteor.userId()}, {sort:{points:1, game:1}});
  };

  Template.scoreCRUD.rendered = function(){
    $('#date').datepicker();
  };

  Template.scoreCRUD.NOW = function(){
      var now=new Date();
      return now.getMonth()+"/"+now.getDay()+"/"+now.getYear();
  };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
