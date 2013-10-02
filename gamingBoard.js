if (Meteor.isClient) {
  Deps.autorun(function (e) {
    var comput =$.pinesNotifyErrors(Session.get("currentError"+Meteor.userId()));
    
  });

  Template.scoreCRUD.events({
    'click #addScoreBtn' : function (){      
      var options={};
      $.resetErrorsForUser();
      var gameObj=Games.findOne({name:$("#game").val()});
      console.log(gameObj);
      if (gameObj){
        options.idGame= gameObj._id;
      }else{
          gameObj=Meteor.call("addGame", {name:$("#game").val()});
          options.idGame=gameObj;
      }      
      options.points=$("#points").val();
      options.date=$("#date").val();
      var meteorReturn=Meteor.call("addScore",options);
    }    
  });


  Template.gameScore.events({
    'click #removeBtn'  : function(){
      var meteorReturn= Meteor.call("removeScore", this._id);
    }
  });

  Template.game.scores =function(gameId){
      return Scores.find({owner:Meteor.userId(),idGame:gameId}, {sort:{points:1, idGame:1}});
  };

  Template.scoreCRUD.games = function(){
    var gameIds= _.map(_.uniq(Scores.find({owner:Meteor.userId()}, {sort:{idGame:1}}).fetch(),false,function(s){return s.idGame;}), function(a){return a.idGame;});
    return Games.find( { _id: { $in: gameIds } }).fetch();
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
