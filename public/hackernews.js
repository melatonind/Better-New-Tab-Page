$.getJSON('/api', function(stories) {
  for (var i = 0; i < stories.length; i++) {
    var story = stories[i];

    var story_template = _.template($('#story-template').html());
    var elem = story_template(story);
    $('.hackerNews').append(elem);

    // var e = '<div class="list-group-item row"><div class="col-xs-2">';
    //     e += '<a  href="' + story.url + '"><img class="img-thumbnail" src="' + story.thumbnail_url + '" style="border:1px solid #dddddd; padding: 0px;">';
    //     e += "</div>"
    //     e += "<div class='col-xs-10'>";
    //     e += "<h5>" + story.title + "</a><small> (" + story.domain + ")</small></h5>";
    //     e += "<div class='" + story.story_id + " comment'></div><small><h5>";
    //     e += story.score + " points | " + moment.unix(story.time).fromNow() + " | ";
        
    //     if (story.comment_length > 1) {
    //       e += "<a href='" + story.comments_url + "'>" + story.comment_length + " comments</a>";
    //     } else if (story.comment_length == 1) {
    //       e += "<a href='" + story.comments_url + "'>" + 1 + " comment</a>";
    //     } else {
    //       e += "<a href='" + story.comments_url + "'>Discuss</a>";
    //     }
      
    //     e += "</small></h5>";
    //     e += "</div></div></div>";
    //     $('.hackerNews').append(e);
        
      if (story.comment_length != 0) {
        $("." + story.story_id).append(shorten(story.first_comment_text, 200));
      }
  }
});

function shorten(text, maxLength) {
    var ret = text;
    ret = ret.replace(/(<p[\s\S]+?>|<\/p>)/g, " ");
    if (ret.length > maxLength) {
        ret = ret.substr(0,maxLength-3) + "...";
    }
    return ret;
}