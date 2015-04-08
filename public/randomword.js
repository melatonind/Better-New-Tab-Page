$.ajax({
  url      : 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent('http://dictionary.reference.com/wordoftheday/wotd.rss'),
  dataType : 'json',
  success  : function (data) {
    if (data.responseData.feed && data.responseData.feed.entries) {
      $.each(data.responseData.feed.entries, function (i, e) {
        var lol = e.content.split(":");
		$(".randomWord").append(lol[0]);
		$(".randomDesc").append(lol[1]);
      });
    }
  }
});