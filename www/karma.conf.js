module.exports = function (config) {
    config.set({

        basePath: './',

        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-ui-router/release/angular-ui-router.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/jquery/dist/jquery.js',
            'app/js/**/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browser: [
            'Chrome'
            //'Mozilla'
        ],

        plugins: [
            'karma-chrome-launcher',
            //'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        reporters: ['progress', 'junit'],

        junitReporter: {
            outputDir: 'test_out',
            outputFile: 'unit.xml',
            suite: ''
        }

    });
};
