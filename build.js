var metalsmith = require('metalsmith');

metalsmith(__dirname)
	.metadata({
		site: {
			name: 'Kylethinks',
			description: "Kyle thinks"
		}
	})
	.source('./src')
	.destination('./public')
	.build(function (err)  {
		if (err) {
			console.log(err);
		}
		else {
			console.log('kylethinks built!');
		}
	});