# Code rules for this project.

### Structure
Main idea is to keep modularity. Hence, the structure is the following:
<pre>
| root
     | app
            | assets (static: images, some HTML/Pug, partials)
            | errors (NodeJS error handlers)
            | models (files for operating with each Entity)
            | scripts (now, all scripts are in one big heap; later, this dir will be separated by categories)
            | styles (also, like in scripts, one big heap)
            | views (Jade/Pug files as templates for dynamic pages)
                | errors (error views, .pug files)
            > config.js (options for server)
            > index.js (express app)
            > layout.pug (layout for all .pug files, both static and dynamic)
            > server.js
     | fakeDB (database simulation using the file system)
            | questions
            | tests (files that represent tests data)
     | public
            ("compiled" files: gulp tasks result)
            (Also, NOTE that this dir is deleted each time gulp run "clean" task)
     | tasks
            (gulp tasks)
     > code-rules.md (this file)
     > gulpfile.js (obviously, gulp file)
     > index.html (index to redirect on index.html inside "public" dir; used for gh-pages)
     > LICENSE (project license)
     > package.json (file that represent project details, settings, links, dependencies)
     > Procfile (file for deploy on Heroku)
     > README.md (project description and other details)
</pre>
1. `|` is a directory
2. `>` is an important file
3. text inside brackets `()` is a description

### Pug (Jade) files
There are 2 types of .pug files: for static and for dynamic content. Both of them extends "layout.pug".
Blocks order in "layout.pug" is the following:
1. block title
2. block styles
3. block scripts
4. block scripts-after-body
5. block content (usually it's the block with maximum size)

### SASS files
1. Extension for files is *.scss*.
2. Global variables are in the "_global-variables" file. It should not contain any styles to prevent code duplicates while extending.
3. Basic set of styles that corresponds EVERY page is in the "all-pages-common" file. Do not extend from it to prevent code duplicates. It included by default in all pages (in layout).
4. "Extending grid in SASS, not setting it in HTML" is an **experiment**.
