if (typeof(window.FoundationDocs) === 'undefined') { window.FoundationDocs = {}; }
if (typeof(window.FoundationDocs.Github) === 'undefined') { window.FoundationDocs.Github = {}; }

var FoundationDocs = window.FoundationDocs;
!(function() {
  // TODO:  Make this depend on which repo we're in
  var githubBaseUrl = 'https://api.github.com/repos/zurb/foundation-sites';
  FoundationDocs.Github.fetchCommits = function() {

    var commits = [];
    async.map(window.relatedFiles, function(file, callback) {
      var url= githubBaseUrl + '/commits?path=' + file;
      $.getJSON(url, function(res) {
        callback(null, res);
      });
    }, function(err, results) {
      FoundationDocs.Github.aggregateResults(results, function(err, results) {
        FoundationDocs.Github.displayResults(results);
      });
    });
  };

  FoundationDocs.Github.aggregateResults = function(arrays, callback) {
    var results = {};
    for(var i = 0; i < arrays.length; i++) {
      for(var j = 0; j < arrays[i].length; j++) {
        var commit = arrays[i][j];
        if(commit.author) {
          var id = commit.author.id;
          results[id] = results[id] || {count: 0};
          results[id].author = commit.author;
          results[id].count += 1;
          var timestamp = commit.commit.author.date;
          if(!results[id].timestamp || results[id].timestamp < timestamp) {
            results[id].timestamp = Date.parse(timestamp);
            results[id].message = commit.commit.message;
            results[id].url = commit.commit.url;
          }
        }
      }
    }

    results = $.map(results, function(value, index) {
      return [value];
    });
    async.sortBy(results, function(item, cb) {
      cb(null, item.timestamp);
    }, callback);
  };

  // TODO:  Figure out if its worth putting a real templating solution in place
  // on the client side
  FoundationDocs.Github.createIssue = function(data) { 
    var str = '<div class="github-issue">' +
      '<a href="' + data.url + '" target="_blank"></a>' +
      '<span class="github-issue-title">' +
        '<div class="github-issue-avatar"> ' +
          '<img src="' + data.author.avatar_url+ '&size=75" alt="Github Contributor"/>' +
        '</div>' +
        '<span class="github-issue-author">' + data.author.login + '</span> ' +
        '<span class="github-issue-action">pushed ' + data.count + ' commit' + (data.count > 1 ? 's' : '') + '</span>' +
      '</span>' + 
      '<span class="github-issue-subtitle">' + data.message + '</span>' +
    '</div>';
    return str;
  };

  FoundationDocs.Github.displayResults = function(results) {
    var str = '';
    for(var i = 0; i < results.length; i++) {
      str = str + FoundationDocs.Github.createIssue(results[i]);
    }
    console.log(str);
    $('[data-github-issues]').html(str);
  };

})();

if(window.relatedFiles && $('[data-github-issues]').is('*')) {
  FoundationDocs.Github.fetchCommits()
}
