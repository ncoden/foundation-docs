/**
 * This module generates a table of contents from the <h2>s on a page.
 */

!function() {

var $h2s = $('.docs-component h2');
var $toc = $('[data-docs-toc]');

// Get the dimensions of the docs-header + in-page nav
// This value should be piped into the data-threshold="" value for the Magellan in-page nav (TOC)
// var docsHeaderHeight = Foundation.Box.GetDimensions('.docs-toc-wrap');
// console.log(docsHeaderHeight);

$h2s.each(function() {
  // Ignore <h2>s inside of a rendered code sample
  if ($(this).parents('.docs-code-live').length) return;

  var text = $(this).text();
  var anchor = $(this).children('a').attr('href');

  $toc.append('<li><a href="'+anchor+'">'+text+'</a></li>');
});

// Initialize Magellan on the generated table of contents
if ($toc.length) {
  if (typeof Foundation !== 'undefined') {
    new Foundation.Magellan($toc, {});
  }
}

}();
