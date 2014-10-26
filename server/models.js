Casos = new Meteor.Collection('casos');

Meteor.publish('casos', function() {
  return Casos.find({"tipo_caso": {$ne: "caso-grave" } });
});

Meteor.publish('casosGraves', function(){
  return Casos.find({"tipo_caso": "caso-grave"})
});


Meteor.methods({
	add: function (data) {
		Casos.insert(data);
	}
});




