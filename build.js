var metalsmith = require('metalsmith'),
	collections = require('metalsmith-collections'),
	markdown = require('metalsmith-markdown'),
	layouts = require('metalsmith-layouts'),
	handlebars = require('handlebars'),
	serve = require('metalsmith-serve');

metalsmith(__dirname)
	.metadata({
		site: {
			name: 'Kyle thinks',
			description: "Kyle Stone: Agile leadership, technical project management, digital production"
		}
	})
	.destination('./public')
	.use(markdown())
    .use(layouts({
            engine: 'handlebars',
            directory: './layouts',
            default: 'article.html',
            pattern: ["*/*/*html","*/*html","*html"],
            partials: 'layouts/partials'
        }))	
	.use(collections({
		articles: {
			pattern: '*.md',
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
	.use(serve({
		verbose: true
	}))
	.build(function (err)  {
		if (err) {
			console.log(err);
		}
		else {
			console.log('kylethinks built!');
		}
	});