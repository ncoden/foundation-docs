if (typeof(window.FoundationDocs) === 'undefined') { window.FoundationDocs = {}; }
if (typeof(window.FoundationDocs.RecentViews) === 'undefined') { window.FoundationDocs.RecentViews = {}; }

var FoundationDocs = window.FoundationDocs;
!(function() {
  var storageNameBase = 'FOUNDATION_RECENT_VIEWS';
  var siteType = $('.docs-component').data().framework;
  var storageName = storageNameBase + "_" + siteType;
  var maxLength = 5;

  FoundationDocs.RecentViews.storeViews = function(views) {
    localStorage.setItem(storageName, JSON.stringify(views));
    return views;
  };

  FoundationDocs.RecentViews.addCurrent = function() {
    var name = $('h1').text();
    var url = window.location.href;
    FoundationDocs.RecentViews.clearView(name);
    var views = FoundationDocs.RecentViews.getViews();
    views.unshift({name: name, url: url})
    views.slice(maxLength - 1, 1)
    FoundationDocs.RecentViews.storeViews(views);
    return;
  }

  FoundationDocs.RecentViews.getViews = function() {
    var viewStr = localStorage.getItem(storageName);
    if (viewStr) {
      return JSON.parse(viewStr);
    } else {
      return [];
    }
  };

  // Find view with name, remove it, return true if
  // found and removed, false otherwise.
  FoundationDocs.RecentViews.clearView = function(name) {
    var views = FoundationDocs.RecentViews.getViews();
    var found = -1;
    for(var i = 0; i < views.length; i++) {
      if(views[i].name === name) {
        found = i;
        break;
      }
    }
    if(found > -1) {
      views.splice(i, 1);
      FoundationDocs.RecentViews.storeViews(views);
      return true;
    }
    return false;
  };

  FoundationDocs.RecentViews.clearViews = function() {
    FoundationDocs.RecentViews.storeViews([]);
  };

  FoundationDocs.RecentViews.updateViewsList = function() {
    var views = FoundationDocs.RecentViews.getViews();
    var viewStr = ''
    for(var i = 0; i < views.length; i++) {
      viewStr = viewStr + "<li class='recently-viewed-item'><a href='" + views[i].url + "'>" + views[i].name + "</a></li>";
    }
    $('[data-recently-viewed]').html(viewStr);
  };

})();

FoundationDocs.RecentViews.addCurrent();
FoundationDocs.RecentViews.updateViewsList();
