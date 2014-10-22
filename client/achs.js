Meteor.subscribe('casos', function() {
  Session.set('fichasCargadas', true);
});

Meteor.subscribe('casosGraves');
//init sessions

Session.setDefault('searching', false);

Meteor.startup(function(){
  $(window).load(function(){
    $('.cycle-slideshow').cycle();
    Session.set('carouselLoaded', true);
    console.log(Session.get('carouselLoaded'));
    $('.cycle-slideshow').on('cycle-before', function(event, opts){
      console.log(opts.currSlide);
      if (opts.currSlide === 1){
        $('.principal-busqueda').addClass('fondo-azul').removeClass('fondo-rojo');
        $('.dropdowns').removeClass('rojo').addClass('azul');
      } else {
        $('.principal-busqueda').addClass('fondo-rojo').removeClass('fondo-azul');
        $('.dropdowns').removeClass('azul').addClass('rojo');
      }
    });
  });
});

Casos = new Meteor.Collection('casos');

Template.casosFatales.fichas = function() {
  return Casos.find({"tipo_caso": {$ne: "caso-grave" } });
}

Template.principal.searching = function() {
  if (Session.get('searching')) {
    return true;
  }
}

Template.casosGraves.fichas = function() {
  return Casos.find({"tipo_caso": "caso-grave"});
}

UI.registerHelper('fichasCargadas', function() {
  return Session.get('fichasCargadas');
});

Template.searchResults.busqueda = function() {
  var q = Session.get('query');
  var results = Casos.find({keywords: q});
  if (results.count() === 0) {
    console.log('nr');
    Session.set('showSpinner', false);
    return false;
  } else {
    console.log(results.count());
    return results;
  }
}


Template.principal.events({
  'blur #buscarContenido, keypress, keyup, keydown' : function(evt, ui) {
    var busqueda = document.getElementById('buscarContenido').value;
    if (busqueda !== '' && busqueda.length > 2 ) {
      Session.set('searching', true);
      Session.set('query', busqueda);
      $('#search-results').slideDown(800);
    } else {
      Session.set('searching', false);
      $('#search-results').slideUp(800);
    }
  }
});


Template.header.events({
  'click .menu > li > a' : function(e, tmpl) {
    console.log($(event.target));
    var $anchor = $(event.target);
    $('html, body')
    .stop() //stop the animation
    .animate({
        scrollTop: //scrollTop setea la barra de scroll
            $($anchor.attr('href'))
            .offset()
            .top
    }, 1000);
    event.preventDefault();
  }
});



