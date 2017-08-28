# kylethinks

Set-up inspired by [metalsmith-base](https://github.com/evocode/metalsmith-base)

### partials ###

```build.js``` looks for partials at ```layouts/partials```.  A partial at ```partials/nav.html``` can be used as ```{{> nav }}```, however a partial nested in a subdirectory would be invoked as ```{{> header/main_nam}}```.  See [consolidate.js](https://github.com/tj/consolidate.js/)