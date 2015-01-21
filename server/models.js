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


//Kadira

Kadira.connect('Xd46j9KXKx3FB9T4r', 'a74776db-90b9-4c42-ab1f-706a7ba37347')




