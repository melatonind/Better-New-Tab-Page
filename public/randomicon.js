var icons = ["bicycle", "birthday-cake", "paint-brush", "anchor", "bolt", "camera-retro", "cube", "eye", "fire", "gears", "flash", "meh-o", "moon-o", "star", "spoon", "terminal", "money", "bitcoin", "paperclip", "scissors", "android", "apple", "angellist", "github-alt", "html5", "css3", "ambulance", "medkit", "asterisk"];

function getIcon() {
  var iconNum = Math.floor((Math.random() * (icons.length)));
  $(".randomIcon").removeClass("fa-plus").addClass("fa-" + icons[iconNum]);
}

getIcon();