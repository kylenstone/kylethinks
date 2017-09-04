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
	assets = require('metalsmith-assets'),
	devBuild = ((process.env.NODE_ENV || '').trim().toLowerCase() !== 'production'),
    htmlmin = devBuild ? null : require('metalsmith-html-minifier'),
	browsersync = devBuild ? require('metalsmith-browser-sync') : null;

console.log((devBuild ? 'Development' : 'Production'), 'build, version', pkg.version);

var ms = metalsmith(dir.base)
	// .clean(!devBuild) // clean folder before a production build
	.metadata({
		site: {
			name: 'Kyle Thinks',
			description: "Kyle Stone: Agile leader, digital project manager, strategic thinker"
		}
	})
	.destination(dir.dest)
	.use(markdown())
	.use(collections({
		article: {
			sortBy: 'date',
			reverse: 'true',
			metadata: {
				name: 'article'
			}
		},
		post: {
			sortBy: 'date',
			reverse: 'true',
			metadata: {
				name: 'post'
				}
			}
		}))	
    .use(sass({
    	outputStyle: 'expanded',
    	outputDir: './css'
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
	.use(assets({ // copy assets (images, etc.)
	    source: dir.source + 'assets/',
	    destination: 'assets/'
	}))
	.build(function (err)  {
		if (err) {
			console.log(err);
		}
		else {
			console.log('kylethinks built!');
		}
	});