var metalsmith = require('metalsmith'),
	markdown = require('metalsmith-markdown'),
	collections = require('metalsmith-collections'),	
	layouts = require('metalsmith-layouts'),
	handlebars = require('handlebars'),
	serve = require('metalsmith-serve');

metalsmith(__dirname)
	.metadata({
		site: {
			name: 'Kyle thinks',
			description: "Kyle Stone: Agile leader, digital project manager, strategic thinker"
		}
	})
	.destination('./public')
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
    .use(layouts({
            engine: 'handlebars',
            directory: './layouts',
            default: 'article.html',
            pattern: ["*/*/*html","*/*html","*html"],
            partials: 'layouts/partials'
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