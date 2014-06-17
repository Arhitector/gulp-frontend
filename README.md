# Boilerplate requirejs, backbonejs (+ marionettejs), jquery.

##Steps for starting:
1. Install [nodejs](http://nodejs.org/)
2. Open console window
3. Move to the project folder
4. Type npm install (---- Wait a little bit -----)
5. Type npm start (or gulp)

That is all.

Open browser, and page [localhost:8080/markup](http://localhost:8080/markup).
This is the first page of our project.

##Bower support:
- .bowerrc - config path to js files
- bower.json - list of additional lib's and plugins

Bower will install packages automatically, after npm install.

##Some good plugins, we use here:
- [r.js](https://www.npmjs.org/package/requirejs) - use for building all js files in one;
- fake server [sinon.js](http://sinonjs.org/) - use for fake response on ajax request (emulation server response);
- less - convert all less files in one css file (default);
- sass - convert all scss files in one css file;
- clean - file remover;
- jade - convert all jade plugins to html (optional, you can use jade or html or both);
- imagesmin - minified all images;
- watch - watching when css, less or js file is changed, and rebuild this files (livereload also present);
- connect - start simple web server on page [localhost:8080//markup](http://localhost:8080/markup);
- [karma](https://www.npmjs.org/package/karma) - [test runner](http://karma-runner.github.io/0.6/plus/RequireJS.html)
- [mocha](http://visionmedia.github.io/mocha/) - framework for testing
- [chai](http://chaijs.com/) - lexical library for any testing framework

## Let's see a little bit deeper into our project:
- package.json.
	This is file which contain all plugins for nodejs.
	Open it and you can see list all of them.
	Install all this plugins see step №4.
- Gulpfile.js
	This file contains all configuration options of that plugins we installed before.
	See details [gulpjs](http://gulpjs.com/).
- test (folder)
	- karma.conf.js (settings for karma - test runner) [example](http://karma-runner.github.io/0.6/plus/RequireJS.html).
	- test-config.js (settings for requirejs for test).
	- spec - folder with test modules
	- spec/index.Spec.js - example of module for tests
- app (folder)
	All front-end files located here.

This was small description of main files and folders in the project.

##Next step is to clarify js files of our project, which located at app/js:
- config.js - requirejs config: path, shims, packages etc. Details: [requirejs](http://requirejs.org/docs/api.html); One remark about 4 row, its file(s) name which will be load after requirejs;
- init.js - load  after requirejs and before modules and:
	- init fake serveer;
	- init backbone routes;
	- and ALL YOU WANT do here;

##Usefull commands:
- gulp (the same as npm start);
- gulp build (rebuild js, css, images (minification) files and create folder "build" with minified version of this files);
- gulp clean (remove all builded files);
- gulp test (run unit testing);

## Don't forget:
1. Project use jade for html, less or sass for css (USE NEW :))
2. If you want use source map for js debug, turn it on in your browser. How to, and support, see google. (diff for any browser)
3. Min version of js file doesn't support fake server.
4. Use dev version of js during development proccess. (See index.html)
5. You can change css engine here Gulpfile.js
6. Don't want use JADE? Just put your html file in app/markup folder