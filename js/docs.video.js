$('.docs-video-trigger').click(function() {
  $(this).next('#docs-video-container').toggleClass('is-Open');
  $(this).next('#docs-video-container').foundation('destroy');
  $(this).next('#docs-video-container').remove();
});
