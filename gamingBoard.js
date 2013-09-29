if (Meteor.isClient) {
  Template.scoreCRUD.events({
    'click #addScoreBtn' : function (){
      var options={};
      options.points=parseInt($("#points").val());
      options.game=$("#game").val();
      Meteor.call("addScore",options);
    }
  });
  Template.scoreCRUD.scores =function(){
      return Scores.find({owner:Meteor.userId()}, {sort:{points:1, game:1}});
  };
  Template.scoreCRUD.rendered = function(){
    $('#date').datepicker();
  };
  Template.scoreCRUD.NOW = function(){
      return new Date();
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
