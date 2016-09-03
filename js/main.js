require.config({
    //Base url for all library
    baseUrl: 'components',
    //Set path for jquery
    paths: {
        app: '../js',
        angular: 'angular/angular',
        jquery: 'jquery/dist/jquery',
        fullpage: 'fullpage.js/jquery.fullpage'
    },

    // angular does not support AMD out of the box, put it in a shim
    shim: {
        'angular': {
            exports: 'angular'
        },
        'fullpage': ['jquery']
    }
});

//Load the main app module to start the app
var dependencies = ['app/portfolio', 'app/portfolio.directive', 'app/portfolio.controller'];

require(dependencies, function (app) {
    app.init();
});