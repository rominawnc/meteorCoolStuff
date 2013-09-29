
	_.mixin({		
		mysupervalidator: function(key,options, validator) {
			if (typeof(Session.get("errors"+Meteor.userId())) == "undefined"){
				Session.set("errors"+Meteor.userId(),[]);
			}
			this.key=key;
			var self=this;
			this.NonEmptyString = Match.Where(function (x) {				
				var errorText=self.key+" cannot be empty";
				if(Match.test(x, String) && x.length !== 0){					
					return true;
				}else{
					var tmpSession=Session.get("errors"+Meteor.userId());
					tmpSession.push(errorText);
					Session.set("errors"+Meteor.userId(),tmpSession);					
					return false;
				}
			});
			this.IsDateString = Match.Where(function(x){
				var errorText=self.key+" must be a valid date";
				if(Match.test(x, String) && x.match('[0-9]{2}/[0-9]{2}/[0-9]{4}')){
					return true;
				}else{
					var tmpSession=Session.get("errors"+Meteor.userId());
					tmpSession.push(errorText);
					Session.set("errors"+Meteor.userId(),tmpSession);	
					return false;
				}							
			});
			this.PositiveNumber = Match.Where(function (x) {
				var errorText=self.key+" must be a number";
				
			  	if (isNaN(x) || (!isNaN(x) && !Match.test(x, Number))){
					var tmpSession=Session.get("errors"+Meteor.userId());
					tmpSession.push(errorText);
			  		Session.set("errors"+Meteor.userId(),tmpSession);
			  		return false;
			  	}
			  	return x >= 0;	
			});

			return Match.test(options[key], this[validator]);
		}
	});