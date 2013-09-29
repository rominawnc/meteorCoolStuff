if (Meteor.isClient) {
  Template.scoreCRUD.events({
    'click #addScoreBtn' : function (){
      Session.set("errors"+Meteor.userId(),[]);
      var options={};
      options.points=parseInt($("#points").val());
      options.game=$("#game").val();
      options.date=$("#date").val();
      var meteorReturn=Meteor.call("addScore",options, function(e){        
          Meteor.call("pinesNotifyErrors",Session.get("errors"+Meteor.userId()));
      });
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
