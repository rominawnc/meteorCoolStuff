if (Meteor.isClient) {
  Deps.autorun(function (e) {
    var comput =$.pinesNotifyErrors(Session.get("currentError"+Meteor.userId()));
    
  });

  Template.scoreCRUD.events({
    'click #addScoreBtn' : function (){      
      var options={};
      $.resetErrorsForUser();
      options.points=$("#points").val();
      options.game=$("#game").val();
      options.date=$("#date").val();
      var meteorReturn=Meteor.call("addScore",options);
    }
  });

  Template.gameScore.events({
    'click #removeBtn'  : function(){
      var meteorReturn= Meteor.call("removeScore", this._id);
    }
  });

  Template.game.scores =function(gameName){
      return Scores.find({owner:Meteor.userId(),game:gameName}, {sort:{points:1, game:1}});
  };

  Template.scoreCRUD.games = function(){
    return _.uniq(Scores.find({owner:Meteor.userId()}, {sort:{points:1, game:1}}).fetch(),false,function(s){return s.game;});
  }

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
