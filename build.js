var metalsmith = require('metalsmith'),
	markdown = require('metalsmith-markdown'),
	layouts = require('metalsmith-layouts'),
	handlebars = require('handlebars'),
	collections = require('metalsmith-collections');

metalsmith(__dirname)
	.metadata({
		site: {
			name: 'Kylethinks',
			description: "Kyle thinks"
		}
	})
	.source('./src')
	.destination('./public')
	.use(markdown())
    .use(layouts({
            engine: 'handlebars',
            directory: './layouts',
            default: 'article.html',
            pattern: ["*/*/*html","*/*html","*html"],
            partials: {
            	header: 'partials/header',
            	footer: 'partials/footer'
            }
        }))	
	.use(collections({
		articles: {
			sortBy: 'date',
			reverse: 'true',
			metadata: {
				name: 'Articles'
			}
		},
		posts: {
			sortBy: 'date',
			reverse: 'true',
			metadata: {
				name: 'Blog posts'
				}
			}
		}))
	.build(function (err)  {
		if (err) {
			console.log(err);
		}
		else {
			console.log('kylethinks built!');
		}
	});