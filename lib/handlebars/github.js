var handlebars = require('handlebars');

handlebars.registerHelper('setupSourceFiles', function(files) {
  var str = "<script>window.relatedFiles=" + JSON.stringify(files) + "</script>";
  return str;
});
