(function($) {
  var nhvsite = {};
  nhvsite.templates = {};
  nhvsite.templates.gg_post = function gg_post() {
    var template;
    template = '<div><a href="{{link}}" class="post-title">{{title}}</a>';
    template += ' <div class="post-author">{{author}}</div></div>';
    return template
  };

  nhvsite.templates.tweet = function tweet() {
    return '<div class="event">{{title}}<div class="pubdate"><a href="{{link}}">{{publishedDate}}</a></div></div>';
  };

  $(document).ready( function () {
    $.jGFeed('http://groups.google.com/group/newhavenjs/feed/atom_v1_0_msgs.xml',
             function (feeds) {
               if (!feeds) {
                 return false;
               }

               $.each(feeds.entries, function (index,feed) {
                 $("#google-groups-posts").append(Mustache.to_html(nhvsite.templates.gg_post(), feed));
               });
             }, 6);

    $.jGFeed('http://twitter.com/statuses/user_timeline/18841573.rss',
             function (feeds) {
               if (!feeds) {
                 return false;
               }

               $.each(feeds.entries, function (index, feed) {
                 $('#events').append(Mustache.to_html(nhvsite.templates.tweet(), feed).replace(/newhavenjs:\s/, '')).linkify();
               });
             }, 5);

    // HA!
    $(window).konami( function () {
      var markup = '<div class="konami"><p>JavaScript</p>';
      markup += '<p class="secret"><code>levels.push( new Level({bonus: "konami"}) );</code></p>';
      markup += '</div>'
      $("#page").fadeOut();
      $("body").append(markup);
      setTimeout(function () { $(".konami").fadeIn(); }, 1500);
    });
  });
})(jQuery);
