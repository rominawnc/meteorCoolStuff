Scores = new Meteor.Collection("scores");
Games = new Meteor.Collection("games");
Games.allow({
	//only logged in users can add games
	insert: function(idUser,game){
		return idUser && game.owner===idUser;
	},
	update : function(idUser,game,fields,modifier){
		if (idUser !== game.owner)
	      return false; // not the owner

	    var allowed = ["name"];
	    if (_.difference(fields, allowed).length) //underscore magic diff :)
	      return false; // tried to write to forbidden field

	    // A good improvement would be to validate the type of the new
	    // value of the field (and if a string, the length.) In the
	    // future Meteor will have a schema system to make that easier.
	    return true;
	},
	remove: function(idUser,game){
		return game.owner=== idUser;
	}
});

Scores.allow({	
	//only allow scores to be added by a logged in user
	insert: function(idUser,score){
		return idUser && score.owner===idUser;
	}, 	
	update: function (idUser, score, fields, modifier) {
		if (idUser !== score.owner)
	      return false; // not the owner

	    var allowed = ["idGame", "date", "points", "idCharacter"];
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
	//options should include game name
	addGame: function(options){
		_.mysupervalidator("name", options, "NonEmptyString");
		Deps.flush();
		
		/**
		Important:
		** Only check for errors in the client, since the server cannot get the session var and will throw undefined. If checking against undefined, the server wont save the data, even when the client accepts it as valid
		*/
		if(Meteor.isClient){
			if(typeof(Session)!="undefined" && Session.get("currentError"+Meteor.userId())!=null){
				return false;
			}
		}
		if (!this.userId){
			throw new Meteor.Error(403, "You must be logged in");
		}	
		return Games.insert({	
			owner:this.userId,
			name: options.name,		 
		});	
	
	},
	// options should include: title, description, x, y, public
	addScore: function (options) {
		_.mysupervalidator('points',options, "PositiveNumber");
		Deps.flush();
		_.mysupervalidator('date',options, "IsDateString");
		Deps.flush();
		/**
		Important:
		** Only check for errors in the client, since the server cannot get the session var and will throw undefined. If checking against undefined, the server wont save the data, even when the client accepts it as valid
		*/
		if(Meteor.isClient){
			if(typeof(Session)!="undefined" && Session.get("currentError"+Meteor.userId())!=null){
				return false;
			}
		}
		if (!this.userId){
			throw new Meteor.Error(403, "You must be logged in");
		}
		return Scores.insert({
		  owner: this.userId,
		  points: options.points,
		  date: options.date,
		  idGame: options.idGame,		 
		});	
	},
	removeScore: function (id){
		try{
			Scores.remove(id);
		}catch(e){
			$.pinesNotifyErrors(Session.set("currentError"+Meteor.userId(),"Could not delete the selected item;"));
		}
	}
});