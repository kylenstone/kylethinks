# kylethinks

[Copyleft](https://www.copyleft.org/) Kyle Nolan Stone

# How a metalsmith project works

The best description I've found comes from Mark "Keeto" Obcena at [Keetology](https://keetology.com/blog/rebuilding-keetology):

> Metalsmith takes a source directory you specify and recursively reads the files inside to build a map object. The keys of this map are the paths of the files relative to the source directory, and the values are the contents of the file.

> Now this map object (together with some other objects) are passed to plugins, which are just JavaScript functions. A plugin can then do some operations on the “files” in the map to transform them, filter them, or to create new files in the map.

> For example, a “Markdown plugin” can take the values of all keys that end with ".md", transform the values from Markdown to HTML, then add new keys to the map object to represent ".html" versions of the ".md" files.

> The user specifies the order the plugins are called. Transformations done by one plugin to the map are seen by the next plugin, so the whole process can be viewed as a modular build-pipeline.

> The process ends with Metalsmith “building” the files by writing the files in the map to the user specified destination directory.


# Running the blog

- ```npm install metalsmith```
- ```npm start```

# Inspiration
[metalsmith-base](https://github.com/evocode/metalsmith-base)

### partials ###

```build.js``` looks for partials at ```layouts/partials```.  A partial at ```partials/nav.html``` can be used as ```{{> nav }}```, however a partial nested in a subdirectory would be invoked as ```{{> header/main_nav}}```.  See [consolidate.js](https://github.com/tj/consolidate.js/)

### assets ###
assets from the `src` folder are included in this repo but their duplicates in `public/assets` are ignored via a rule in the `.gitignore` file.  This may require `build`ing the site for everything to load correctly.