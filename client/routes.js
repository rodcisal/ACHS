Router.map(function() {
  this.route('principal',{
    path: '/'
  });
  this.route('mostrarCaso', {
    path: '/casos/:numero_ficha',
    data: function() {
      return Casos.findOne({"numero_ficha":parseInt(this.params.numero_ficha)});
    }
  });
});

Router.configure({
  layoutTemplate: 'header'
});

Router._filters = {
  resetScroll: function () {
    var scrollTo = window.currentScroll || 0;
    $('body').scrollTop(scrollTo);
    $('body').css("min-height", 0);
  }
};

var filters = Router._filters;

if(Meteor.isClient) {
  Router.onAfterAction(filters.resetScroll); // for all pages
}

animateContentOut = function(pause) {
    return $('#content').removeClass("animated fadeIn");
}
Router.onAfterAction(animateContentOut);

animateContentIn = function() {
    return $('#content').addClass("animated fadeIn");
}
Router.onAfterAction(animateContentIn);

