#!/bin/sh

PROJECT_NAME=$1



#------------------------------ SET YOUR VALUES. DON'T CHANGE DEFAULT SECTIONS  -----------------------------

PROJECT_VERSION="1.0.0"
PROJECT_AUTHOR="Albert Kovalchuk"

# DON'T CHANGE
BOWER_DEFAULT_COMPONENTS="jquery bootstrap"

BOWER_COMPONENTS="normalize.css angular angular-bootstrap ui-route angular-mocks"

# DON'T CHANGE
NODE_DEFAULT_MODULES="gulp-sass gulp-concat ng-annotate gulp-ng-annotate"

NODE_MODULES="gulp-webserver"

NODE_DEPLOY_MODULES="gulp-uglify gulp-minify-css"

NODE_TEST_MODULES="jasmine jasmine-core karma karma-jasmine karma-chrome-launcher karma-firefox-launcher karma-junit-reporter"

#------------------------------------------------------------------------------------------------------------



echo "Creating project ${PROJECT_NAME} version ${PROJECT_VERSION}"

html_index_template="<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="UTF-8">\n\t<title>${PROJECT_NAME}</title>\n\n\t<link rel=stylesheet href=\"css/_concat/vendor.css\">\n\t<link rel=stylesheet href=\"css/_concat/app.css\">\n\n</head>\n<body>\n\t<h1>${PROJECT_NAME}</h1>\n\n\t<form action=\"\">\n\t\t<button class=\"btn btn1 btn-info\">Button 1</button>\n\t\t<button class=\"btn btn2 btn-info\">Button 2</button>\n\t</form>\n\n\t<script src=\"js/_concat/vendor.js\"></script>\n\t<script src=\"js/_concat/app.js\"></script>\n\n</body>\n</html>"
js_main_template="\$(function() {\n\tconsole.log('in main.js');\n});"
scss_style_template="\$but_backgr : #3CE222;\n\$but_color : #E211AC;\n\n.btn2 {\n\tbackground: \$but_backgr;\n\tcolor: \$but_color;\n}\n"
css_main_template=".btn1 {\n\tbackground: blue;\n\tcolor: white;\n}"

bower_json_template="{\n\t\"name\" : \"${PROJECT_NAME}\",\n\t\"version\" : \"${PROJECT_VERSION}\",\n\t\"authors\" : [\"${PROJECT_AUTHOR}\"],\n\t\"license\" : \"MIT\",\n\t\"ignore\" : [\n\t\t\"**/.*\",\n\t\t\"node_modules\",\n\t\t\"app/bower_components\",\n\t\t\"test\",\n\t\t\"tests\"],\n\t\"dependencies\" : {}\n}"
bower_rc_template="{\n\t\"directory\" : \"app/bower_components\"\n}"
package_json_template="{\n\t\"name\" : \"${PROJECT_NAME}\",\n\t\"version\" : \"${PROJECT_VERSION}\",\n\t\"description\" : \"\",\n\t\"main\" : \"index.js\",\n\t\"scripts\" : {\n\t\t\"test\" : \"echo \\\"Error: no test specified\\\" && exit 1\"\n\t},\n\t\"author\" : \"${PROJECT_AUTHOR}\",\n\t\"license\" : \"ISC\",\n\t\"devDependencies\" : {}\n}"

gulpfile_js_template="'use strict';\n\nvar gulp = require('gulp'),\n\tuglify = require('gulp-uglify'),\n\tminifyCss = require('gulp-minify-css'),\n\tconcat = require('gulp-concat'),\n\tscss = require('gulp-sass'),\n\tngAnnotate = require('gulp-ng-annotate'),\n\twebserver = require('gulp-webserver');\n\ngulp.task('css-vendor', function () {\n\tgulp.src([\n\t\t'app/bower_components/bootstrap/dist/css/bootstrap.css',\n\t\t'app/bower_components/bootstrap/dist/css/bootstrap-theme.css',\n\t\t'app/bower_components/angular-bootstrap/ui-bootstrap-csp.css',\n\t\t'app/bower_components/angular/angular-csp.css'\n\t])\n\t\t.pipe(concat('vendor.css'))\n\t\t.pipe(gulp.dest('app/css/_concat'));\n});\n\ngulp.task('css-vendor-prod', function () {\n\tgulp.src([\n\t\t'app/bower_components/bootstrap/dist/css/bootstrap.min.css',\n\t\t'app/bower_components/bootstrap/dist/css/bootstrap-theme.min.css',\n\t\t'app/bower_components/angular-bootstrap/ui-bootstrap-csp.css',\n\t\t'app/bower_components/angular/angular-csp.css'\n\t])\n\t\t.pipe(concat('vendor.css'))\n\t\t.pipe(gulp.dest('build/css/_concat'));\n});\n\ngulp.task('scss', function () {\n\tgulp.src('app/css/scss/**/*.scss')\n\t.pipe(scss())\n\t.pipe(concat('all-sass.css'))\n\t.pipe(gulp.dest('app/css'));\n});\n\ngulp.task('css', function () {\n\tgulp.src([\n\t\t'app/css/**/*.css',\n\t\t'!app/css/scss/**/*.*',\n\t\t'!app/css/_concat/**/*.*'\n\t])\n\t\t.pipe(concat('app.css'))\n\t\t.pipe(gulp.dest('app/css/_concat'));\n});\n\ngulp.task('css-prod', ['scss'], function () {\n\tgulp.src([\n\t\t'app/css/**/*.css',\n\t\t'!app/css/scss/**/*.*',\n\t\t'!app/css/_concat/**/*.*'\n\t])\n\t\t.pipe(concat('app.css'))\n\t\t.pipe(minifyCss())\n\t\t.pipe(gulp.dest('build/css/_concat'));\n});\n\ngulp.task('js-vendor', function () {\n\tgulp.src([\n\t\t'app/bower_components/angular/angular.js',\n\t\t'app/bower_components/angular-ui-router/release/angular-ui-router.js',\n\t\t'app/bower_components/jquery/dist/jquery.js',\n\t\t'app/bower_components/bootstrap/dist/js/bootstrap.js',\n\t\t'app/bower_components/angular-bootstrap/ui-bootstrap.js',\n\t\t'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js'\n\t])\n\t\t.pipe(concat('vendor.js'))\n\t\t.pipe(gulp.dest('app/js/_concat'));\n});\n\ngulp.task('js-vendor-prod', function () {\n\tgulp.src([\n\t\t'app/bower_components/angular/angular.min.js',\n\t\t'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',\n\t\t'app/bower_components/jquery/dist/jquery.min.js',\n\t\t'app/bower_components/bootstrap/dist/js/bootstrap.min.js',\n\t\t'app/bower_components/angular-bootstrap/ui-bootstrap.min.js',\n\t\t'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'\n\t])\n\t\t.pipe(concat('vendor.js'))\n\t\t.pipe(gulp.dest('build/js/_concat'));\n});\n\ngulp.task('js', function () {\n\tgulp.src([\n\t\t'app/js/**/*.js',\n\t\t'!app/js/_concat/**/*.*',\n\t\t'!app/**/*_test.js'\n\t])\n\t\t.pipe(concat('app.js'))\n\t\t.pipe(gulp.dest('app/js/_concat'));\n});\n\ngulp.task('js-prod', function () {\n\tgulp.src([\n\t\t'app/js/**/*.js',\n\t\t'!app/js/_concat/**/*.*',\n\t\t'!app/**/*_test.js'\n\t])\n\t\t.pipe(concat('app.js'))\n\t\t.pipe(ngAnnotate())\n\t\t.pipe(uglify())\n\t\t.pipe(gulp.dest('build/js/_concat'));\n});\n\ngulp.task('watch', function () {\n\tgulp.watch('app/css/scss/**/*.scss', ['scss', 'css']);\n\tgulp.watch('app/css/**/*.css', ['scss', 'css']);\n\tgulp.watch('app/js/**/*.js', ['js']);\n});\n\ngulp.task('webserver', function () {\n\tgulp.src('app')\n\t\t.pipe(webserver({\n\t\t\tlivereload: true,\n\t\t\topen: true\n\t\t}));\n});\n\ngulp.task('webserver-prod', function () {\n\tgulp.src('build')\n\t\t.pipe(webserver({\n\t\t\tlivereload: true,\n\t\t\topen: true\n\t\t}));\n});\n\ngulp.task('default', [\n\t'css-vendor',\n\t'scss',\n\t'css',\n\t'js-vendor',\n\t'js',\n\t'watch',\n\t'webserver'\n]);\n\ngulp.task('html-prod', function () {\n\tgulp.src('app/**/*.html')\n\t\t.pipe(gulp.dest('build'));\n});\n\ngulp.task('build', [\n\t'css-vendor-prod',\n\t'css-prod',\n\t'js-vendor-prod',\n\t'js-prod',\n\t'html-prod',\n\t'webserver-prod'\n]);\n\n"

mkdir ./$PROJECT_NAME/www/build -p
mkdir ./$PROJECT_NAME/www/app/css -p
mkdir ./$PROJECT_NAME/www/app/css/_concat -p
mkdir ./$PROJECT_NAME/www/app/css/scss -p
mkdir ./$PROJECT_NAME/www/app/js -p
mkdir ./$PROJECT_NAME/www/app/js/_concat -p

cd ./$PROJECT_NAME/www/app

#touch index.html
echo $html_index_template > index.html

#touch ./css/scss/style.scss
echo $scss_style_template > ./css/scss/style.scss

#touch ./css/main.css
echo $css_main_template > ./css/main.css

#touch ./js/main.js
echo $js_main_template > ./js/main.js

cd ..

#touch ./bower.json
echo $bower_json_template > ./bower.json

#touch ./.bowerrc
echo $bower_rc_template > ./.bowerrc

#touch ./package.json
echo $package_json_template > ./package.json



# Install Bower default components
bower install --save ${BOWER_DEFAULT_COMPONENTS} ${BOWER_COMPONENTS}



# Link Gulp

#touch gulpfile.js
echo $gulpfile_js_template > ./gulpfile.js



# Install or link Gulp
#npm install --save-dev gulp
npm link --save-dev gulp

# Install default node modules
npm install --save-dev ${NODE_DEFAULT_MODULES} ${NODE_MODULES} ${NODE_DEPLOY_MODULES} ${NODE_TEST_MODULES}



echo -----------------------------------------
echo "All Done! Use 'gulp build' for production"
echo -----------------------------------------

# Run project with browser
gulp
