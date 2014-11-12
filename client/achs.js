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
    $('.cycle-slideshow').on('cycle-before', function(event, opts){
      if (opts.currSlide === 1){
        $('.principal-busqueda').addClass('fondo-azul').removeClass('fondo-rojo');
        $('.dropdowns').removeClass('rojo').addClass('azul');
      } else {
        $('.principal-busqueda').addClass('fondo-rojo').removeClass('fondo-azul');
        $('.dropdowns').removeClass('azul').addClass('rojo');
      }
    });
    $(document).click(function(e) {
      if (e.target.className !== 'drop-title'){
        $('.displayed').removeClass('displayed');
      }
    });
  });
});

Casos = new Meteor.Collection('casos');

Template.casosFatales.helpers({
  fichas: function(){
    return Casos.find({"tipo_caso": {$ne: "caso-grave" }}, {limit: 3});
  }
});

Template.principal.helpers({
  searching: function() {
    if (Session.get('searching')) {
      return true;
    }
  }
});

Template.principal.rendered = function () {
 $('.abrir-modal').click(function() {
  var nombreImagen = $(this).data('nombre-imagen'); 
  $.modal('<div><img src="/'+nombreImagen+'"></div>', {
    overlayId: 'overlay-pagina',
    overlayClose: true
  });
 });
}


Template.casosGraves.helpers({
  fichas: function(){
    return Casos.find({"tipo_caso": "caso-grave"}, {limit: 3});
  }
});

Template.searchResults.helpers({
  busqueda: function(){
    if (Session.get('query') !== '' && Session.get('query') !== undefined) {
      var q = Session.get('query');
      var results = Casos.find({keywords: q});
      if (results.count() === 0) {
        Session.set('showSpinner', false);
        return false;
      } else {
        return results;
      }
    }
  }
});


Template.searchBar.events({
  'click .drop > ul > li' : function (e, template) {
    var self = $(e.currentTarget),
        busqueda = self.html();
  
    if (busqueda !== '' && busqueda.length > 2 ) {
      Session.set('searching', true);
      Session.set('query', busqueda);
      $('#search-results').slideDown(800);
    } else {
      Session.set('searching', false);
      $('#search-results').slideUp(800);
    }

    $('.drop > ul').removeClass('displayed').addClass('hidden');


  }, 
  'click .drop-title' : function (e, template) {
    var self = $(e.currentTarget);
    $('.displayed').removeClass('displayed');
    self.siblings('ul').removeClass('hidden').addClass('displayed');
  } 
});


Template.agregarCaso.events({
  'click #agregar': function (e) {
    var inputs= $('input[type="text"]'),
        data = {},
        vals = [],
        lastPushed;

    inputs.each(function (i, el) {
      var attr = $(el).attr('data-field'),
          val = $(el).val();

      if ($('input[data-field="'+attr+'"]').length === 1 && val !== '') {
        data[attr] = val;
      } else if (val !== '') {
        lastPushed  = vals.push(val);
        if (lastPushed  === $('input[data-field="'+attr+'"]').filter(function() { return $(this).val() !== ''}).length && val !== '') {
          data[attr] = vals;
          vals = [];
          lastPushed = undefined;
        } 
      }

    });

    e.preventDefault();
    Meteor.call('add', data);
    inputs.each(function (i, el) {
      $(el).val('');
    });

  },
  'change #select-tipo-caso' : function (e) {
    $('#tipo-caso').val($('#select-tipo-caso').val());
  }
  ,
  'focus #imagen-url' : function () {
    $('#imagen-url').val('http://186.64.114.70/~alertasf/imagenes/');
  },
  'focus #link-pdf' : function () {
    $('#link-pdf').val('http://186.64.114.70/~alertasf/pdf/');
  }
});



UI.registerHelper('fichasCargadas', function() {
  return Session.get('fichasCargadas');
});


Template.principal.events({
  'blur #buscarContenido, keypress, keyup, keydown' : function(evt, ui) {

  }
});


Template.header.events({
  'click .menu > li > a' : function(e, tmpl) {
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



