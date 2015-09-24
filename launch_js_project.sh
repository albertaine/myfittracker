#!/bin/sh

PROJECT_NAME=$1



#------------------------------ SET YOUR VALUES. DON'T CHANGE DEFAULT SECTIONS  -----------------------------

PROJECT_VERSION="1.0.0"
PROJECT_AUTHOR="Albert Kovalchuk"

# DON'T CHANGE
BOWER_DEFAULT_COMPONENTS="jquery bootstrap"

BOWER_COMPONENTS="normalize.css angular angular-bootstrap angular-route"

# DON'T CHANGE
NODE_DEFAULT_MODULES="wiredep gulp-useref gulp-if gulp-concat gulp-uglify gulp-minify-css"

NODE_MODULES="ng-annotate gulp-ng-annotate gulp-sass"

NODE_DEPLOY_MODULES="gulp-webserver"

#------------------------------------------------------------------------------------------------------------



echo "Creating project ${PROJECT_NAME} version ${PROJECT_VERSION}"

html_index_template="<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="UTF-8">\n\t<title>${PROJECT_NAME}</title>\n\n\t<!-- build:css css/vendor.css -->\n\t<!-- bower:css -->\n\t<!-- endbower -->\n\t<link rel=\"stylesheet\" href=\"bower_components/bootstrap/dist/css/bootstrap.css\" />\n\t<link rel=\"stylesheet\" href=\"bower_components/bootstrap/dist/css/bootstrap-theme.css\" />\n\t<link rel=\"stylesheet\" href=\"bower_components/angular-bootstrap/ui-bootstrap-csp.css\" />\n\t<!-- endbuild -->\n\n\t<!-- build:css css/app.css -->\n\t<link rel=stylesheet href=\"css/sass.css\">\n\t<link rel="stylesheet" href=\"css/lib.css\">\n\t<link rel="stylesheet" href=\"css/main.css\">\n\t<!-- endbuild -->\n\t</head>\n<body>\n\t<h1>${PROJECT_NAME}</h1>\n\t<form action=\"\">\n\t\t<button class=\"btn btn-info\">Button</button>\n\t\t<button class=\"btn2 btn-info\">Button 2</button>\n\t</form>\n\n\t<!-- build:js scripts/vendor.js -->\n\t<!-- bower:js -->\n\t<!-- endbower -->\n\t<!-- endbuild -->\n\n\t<!-- build:js scripts/app.js -->\n\t<script src=\"js/lib.js\"></script>\n\t<script src=\"js/main.js\"></script>\n\t<!-- endbuild -->\n</body>\n</html>"
js_lib_template="\$(function() {\n\tconsole.log('in lib.js');\n});"
js_main_template="\$(function() {\n\tconsole.log('in main.js');\n});"
scss_style_template="\$but_backgr : #3CE222;\n\$but_color : #E211AC;\n\n.btn2 {\n\tbackground: \$but_backgr;\n\tcolor: \$but_color;\n}\n"
css_button_template=".btn {\n\tbackground: blue;\n\tcolor: white;\n}"
css_main_template="body {\n\tbackground: #ccc;\n}"

bower_json_template="{\n\t\"name\" : \"${PROJECT_NAME}\",\n\t\"version\" : \"${PROJECT_VERSION}\",\n\t\"authors\" : [\"${PROJECT_AUTHOR}\"],\n\t\"license\" : \"MIT\",\n\t\"ignore\" : [\n\t\t\"**/.*\",\n\t\t\"node_modules\",\n\t\t\"app/bower_components\",\n\t\t\"test\",\n\t\t\"tests\"],\n\t\"dependencies\" : {}\n}"
bower_rc_template="{\n\t\"directory\" : \"app/bower_components\"\n}"
package_json_template="{\n\t\"name\" : \"${PROJECT_NAME}\",\n\t\"version\" : \"${PROJECT_VERSION}\",\n\t\"description\" : \"\",\n\t\"main\" : \"index.js\",\n\t\"scripts\" : {\n\t\t\"test\" : \"echo \\\"Error: no test specified\\\" && exit 1\"\n\t},\n\t\"author\" : \"${PROJECT_AUTHOR}\",\n\t\"license\" : \"ISC\",\n\t\"devDependencies\" : {}\n}"
gulpfile_js_template="'use strict';\n\nvar gulp = require('gulp'),\n\twiredep = require('wiredep').stream,\n\tuseref = require('gulp-useref'),\n\tgulpif = require('gulp-if'),\n\tuglify = require('gulp-uglify'),\n\tminifyCss = require('gulp-minify-css'),\n\tconcat = require('gulp-concat'),\n\tscss = require('gulp-sass'),\n\tngAnnotate = require('gulp-ng-annotate'),\n\twebserver = require('gulp-webserver');\n\ngulp.task('scss', function () {\n\tgulp.src('app/css/scss/**/*.scss')\n\t.pipe(scss())\n\t\n\t.pipe(concat('sass.css'))\n\t.pipe(gulp.dest('app/css'));\n});\n\ngulp.task('bower', function () {\n\tgulp.src('./app/index.html')\n\t\t.pipe(wiredep({\n\t\t\tdirectory : 'app/bower_components'\n\t\t}))\n\t\t.pipe(gulp.dest('./app'));\n});\n\ngulp.task('watch', function () {\n\tgulp.watch('app/css/scss/**/*.scss', ['scss']);\n});\n\ngulp.task('webserver', function () {\n\tgulp.src('app')\n\t\t.pipe(webserver({\n\t\t\tlivereload: true,\n\t\t\topen: true\n\t\t}));\n});\n\ngulp.task('default', [\n\t'scss',\n\t'bower',\n\t'watch',\n\t'webserver'\n]);\n\ngulp.task('css-vendor', function () {\n\tgulp.src([\n\t\t'app/bower_components/bootstrap/dist/css/bootstrap.css',\n\t\t'app/bower_components/bootstrap/dist/css/bootstrap-theme.css',\n\t\t'app/bower_components/angular-bootstrap/ui-bootstrap-csp.css'\n\t])\n\t\t.pipe(concat('vendor.css'))\n\t\t.pipe(gulp.dest('build/css'));\n});\n\ngulp.task('build', ['scss', 'css-vendor', 'bower'], function () {\n\tvar assets = useref.assets();\n\n\treturn gulp.src('app/*.html')\n\t\t.pipe(assets)\n\t\t.pipe(gulpif('*.js', uglify()))\n\t\t.pipe(gulpif('*.css', minifyCss()))\n\t\t.pipe(assets.restore())\n\t\t.pipe(useref())\n\t\t.pipe(gulp.dest('build'));\n});\n"

mkdir ./$PROJECT_NAME/www/build -p
mkdir ./$PROJECT_NAME/www/app/css -p
mkdir ./$PROJECT_NAME/www/app/css/scss -p
mkdir ./$PROJECT_NAME/www/app/js -p

cd ./$PROJECT_NAME/www/app

#touch index.html
echo $html_index_template > index.html

#touch ./css/scss/style.scss
echo $scss_style_template > ./css/scss/style.scss

#touch ./css/lib.css
echo $css_button_template > ./css/lib.css

#touch ./css/main.css
echo $css_main_template > ./css/main.css

#touch ./js/lib.js
echo $js_lib_template > ./js/lib.js

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
npm install --save-dev ${NODE_DEFAULT_MODULES} ${NODE_MODULES} ${NODE_DEPLOY_MODULES}



# Wire dependencies to index.html
#gulp bower

# Build entire project
#gulp build

# Run project with browser
gulp

echo ---------
echo All Done!
echo ---------
