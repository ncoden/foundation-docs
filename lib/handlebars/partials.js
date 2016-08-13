var fs         = require('fs');
var handlebars = require('handlebars');
var path       = require('path');

var PARTIALS = ['building-blocks', 'docs-header', 'header', 'javascript-reference', 'sass-reference', 'sidebar', 'table-of-contents', 'examples', 'github-recent-activity', 'github-help-wanted', 'related-resources', 'video', ];

for (var i in PARTIALS) {
  handlebars.registerPartial(PARTIALS[i], fs.readFileSync(path.join(__dirname, '../../templates/partials/'+PARTIALS[i]+'.hbs')).toString());
}
