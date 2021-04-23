$(document).ready(function(){

    let noAvatar = false;
  
  
  let profileImg = $('#profile-pic')
  let missingimg = $('#profile-pic-wrapper')
  console.log(missingimg)
  
  // double check how to access "src" attribute
  if (!profileImg.attr('src') && missingimg.length) {
  missingimg.addClass('profile-pic')
   var username = missingimg.data('username');
    //var intial = JSON.stringify(username);
   missingimg.text(username.charAt(0));
 /*  
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
  */  
    let bgAvatar = missingimg.data('bgcolor');
    console.log(bgAvatar)
    if (bgAvatar){
       missingimg.css('background-color', bgAvatar)
    }
  /*  else {
      //in db save value like 00ff00
      <form id="background-post" method="post">
          <input type="text" value="bgColor"></input>
      </form>
      document.getElementById("background-post").submit();
      profileImg.style.backgroundColor = bgColor
    }
  */
  
  }
  
  
  });