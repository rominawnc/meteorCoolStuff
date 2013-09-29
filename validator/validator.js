_.mixin({		
	mysupervalidator: function(key,options, validator) {
		this.key=key;
		var self=this;
		this.NonEmptyString = Match.Where(function (x) {				
			var errorText=self.key+" cannot be empty";
			if(Match.test(x, String) && x.length !== 0){					
				return true;
			}else{				
				Session.set("currentError"+Meteor.userId(),errorText);
				return false;
			}
		});
		this.IsDateString = Match.Where(function(x){
			var errorText=self.key+" must be a valid date";
			if(Match.test(x, String) && x.match('[0-9]{2}/[0-9]{2}/[0-9]{4}')){
				return true;
			}else{				
				Session.set("currentError"+Meteor.userId(),errorText);
				return false;
			}							
		});
		this.PositiveNumber = Match.Where(function (x) {		
			var errorText=self.key+" must be a number";
			
		  	if (!_.isNumeric(x)){
				Session.set("currentError"+Meteor.userId(),errorText);
		  		return false;
		  	}
		  	return x >= 0;	
		});

		return Match.test(options[key], this[validator]);	
	},
	isNumeric: function(n) {
  		return !isNaN(parseFloat(n)) && isFinite(n);
  	}

});
