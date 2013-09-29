
Scores = new Meteor.Collection("scores");

Scores.allow({
	//only allow scores to be added by a logged in user
	insert: function(idUser,score){
		return idUser && score.owner===idUser;
	}, 	
	update: function (idUser, score, fields, modifier) {
		if (idUser !== score.owner)
	      return false; // not the owner

	    var allowed = ["game", "date", "points", "idCharacter"];
	    if (_.difference(fields, allowed).length) //underscore magic diff :)
	      return false; // tried to write to forbidden field

	    // A good improvement would be to validate the type of the new
	    // value of the field (and if a string, the length.) In the
	    // future Meteor will have a schema system to make that easier.
	    return true;
	},	
	remove: function (idUser, score) {
	    // only the owner can remove scores. 
	    return score.owner === idUser;
	}
});

Meteor.methods({
	// options should include: title, description, x, y, public
	addScore: function (options) {
		var errors=[];
		_.mysupervalidator('points',options, "PositiveNumber");
		_.mysupervalidator('game',options, "NonEmptyString");
		_.mysupervalidator('date',options, "IsDateString");

		if(Session.get("errors"+Meteor.userId()).length==0){
			if (!this.userId){
				throw new Meteor.Error(403, "You must be logged in");
			}
			return Scores.insert({
			  owner: this.userId,
			  points: options.points,
			  date: options.date,
			  game: options.game,
			 
			});	
		}
		
	},
	pinesNotifyErrors: function(errors){		
		for(var i =0;i<errors.length;i++){
			$.pnotify({
		      title: "Oops",
		      text:  errors[i]?errors[i]:"Something went wrong",
		      type: "error"
		    });	
		}
	    
	}
});