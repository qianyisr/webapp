require.config
  baseUrl : './scripts/'
  shim : 
    underscore :
      exports : '_'
    backbone : 
      deps : [
        'underscore'
        'jquery'
      ]
      exports : 'Backbone'
    backboneLocalStorage :
      deps : [
        'backbone'
      ]
    app : 
      deps : [
        'underscore'
        'jquery'
        'backbone'
      ]

  paths : 
    jquery : '../bower_components/jquery/jquery'
    underscore : '../bower_components/underscore/underscore'
    backbone : '../bower_components/backbone/backbone'
    backboneLocalStorage: '../bower_components/backbone/examples/backbone.localStorage'

require ['app'], (app) ->
  app.init()