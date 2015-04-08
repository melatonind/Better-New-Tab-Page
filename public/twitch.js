var followers = [];
var channelStuff;
$.ajax({
  dataType: "jsonp",
  url: 'https://api.twitch.tv/kraken/users/hicough/follows/channels',
  }).done(function ( data ) {
    console.log(data);
    channelStuff = data;
    var total = data._total - 4;
    for (var i = 0; i < total; i++) {
      channelInfo = channelStuff.follows[i].channel;
      // var addHtml = "<div class='col-xs-6 row'><a href='" + channelInfo.url + "'>";
      // addHtml += "<div class='col-xs-2'><img class='img-responsive' src='" + channelInfo.logo + "'></div>";
      // addHtml += "<div class='col-xs-9'><h4>" + channelInfo.display_name + "<div class=" + channelInfo.name + "></div>";
      // addHtml += "<small>" + channelInfo.status + "</small></h4></div>";
      // addHtml += "</a></div>";
      //$(".appendData").append(addHtml);

      console.log(channelInfo.name)
      
      followers.push(channelInfo.name);
      
      if (i === (total-1)) {
        getLiveInfo();
      }
    }
  });

function getLiveInfo() {
  for (var i = 0; i < followers.length; i++) {
    var channelUrl = "https://api.twitch.tv/kraken/streams/" + followers[i];
    $.ajax({
      dataType: "jsonp",
      url: channelUrl,
      async: false,
    }).done(function ( channelObject ) {
      if (channelObject.stream) {
        
        var live = "<a href=" + channelObject.stream.channel.url + " class='liveElement'><div class='col-xs-12'>";
        live += "<img src=" + channelObject.stream.preview.large + " class='img-responsive img-rounded'>";
        live += "<h4>" + channelObject.stream.channel.display_name + "<br><small>playing " + channelObject.stream.channel.game;
        live += "</a></small></h4></div>";
        
        $(".liveData").append(live);
      }
    });  
  }
  
}


		   
