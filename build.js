#!/usr/bin/env node

/*
Metalsmith build file
Build site with `node ./build.js` or `npm start`
Build production site with `npm run production`
*/

'use strict';

var
// env
  devBuild = ((process.env.NODE_ENV || '').trim().toLowerCase() !== 'production'),
  pkg = require('./package.json'),  


// main directories
  dir = {
    base: __dirname + '/',
    source: './src/',
    dest: './public/',
  },

// modules
	metalsmith = require('metalsmith'),
	markdown = require('metalsmith-markdown'),
	collections = require('metalsmith-collections'),	
	layouts = require('metalsmith-layouts'),
	handlebars = require('handlebars'),
	sass = require('metalsmith-sass'),
	coffee = require('metalsmith-coffee'),
	devBuild = ((process.env.NODE_ENV || '').trim().toLowerCase() !== 'production'),
	browsersync = devBuild ? require('metalsmith-browser-sync') : null;

console.log((devBuild ? 'Development' : 'Production'), 'build, version', pkg.version);

var ms = metalsmith(dir.base)
	// .clean(!devBuild)
	.metadata({
		site: {
			name: 'Kyle thinks',
			description: "Kyle Stone: Agile leader, digital project manager, strategic thinker"
		}
	})
	.destination(dir.dest)
	.use(markdown())
	.use(collections({
		articles: {
			sortBy: 'date',
			reverse: 'true',
			metadata: {
				name: 'articles'
			}
		},
		posts: {
			sortBy: 'date',
			reverse: 'true',
			metadata: {
				name: 'posts'
				}
			}
		}))	
    .use(sass({
    	outputStyle: 'expanded',
    	outputDir: function(originalPath) { 
        // this will change scss/some/path to css/some/path
        	return originalPath.replace("scss", "css");
      }
    }))
	.use(coffee())
    .use(layouts({
            engine: 'handlebars',
            directory: './layouts',
            default: 'article.html',
            pattern: ["*/*/*html","*/*html","*html"],
            partials: 'layouts/partials'
        }))

if (browsersync) ms.use(browsersync({ // start test server
  server: dir.dest,
  files: [dir.source + '**/*']
}));

ms
	.build(function (err)  {
		if (err) {
			console.log(err);
		}
		else {
			console.log('kylethinks built!');
		}
	});